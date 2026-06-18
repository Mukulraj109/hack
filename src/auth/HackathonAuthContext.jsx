import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { apiFetch } from "../lib/api";
import { isIdTokenExpired, isSessionExpiredError } from "../lib/authSession";
import { getDisplayProfile } from "../lib/displayUser";
import { getFirstStepDashboardWithHackathonContext } from "../lib/firstStepEnv";
import { buildGateSessionFromStatus, fetchHackathonGateStatus, markHackathonRegistrationInProgress } from "../lib/hackathonGateStatus";

const HackathonAuthContext = createContext(null);
const SSO_ATTEMPT_KEY = "hackathon_sso_prompt_none_attempted";
const SSO_INFLIGHT_KEY = "hackathon_sso_redirect_inflight";

function readSsoParams() {
  if (typeof window === "undefined") {
    return { fromFirstStep: false, loginHint: undefined, loginRequired: false };
  }
  const params = new URLSearchParams(window.location.search);
  return {
    fromFirstStep: params.get("from") === "firststep",
    loginHint: params.get("login_hint")?.trim() || undefined,
    loginRequired: params.get("error") === "login_required",
  };
}

function cleanAuthCallbackParams() {
  const params = new URLSearchParams(window.location.search);
  if (!params.get("error") && !params.get("code") && !params.get("state")) {
    return;
  }
  const keep = new URLSearchParams();
  if (params.get("from") === "firststep") keep.set("from", "firststep");
  const hint = params.get("login_hint");
  if (hint) keep.set("login_hint", hint);
  const qs = keep.toString();
  window.history.replaceState({}, document.title, qs ? `${window.location.pathname}?${qs}` : window.location.pathname);
}

function authParams() {
  const audience = import.meta.env.VITE_AUTH0_AUDIENCE;
  return {
    ...(audience ? { audience } : {}),
    scope: "openid profile email offline_access",
  };
}

function redirectUri() {
  return import.meta.env.VITE_AUTH0_CALLBACK_URL || window.location.origin;
}

/** Paths that require auth — attempt silent SSO when arriving from FirstStep. */
function isPortalPath() {
  if (typeof window === "undefined") return false;
  const path = window.location.pathname;
  return ["/sprint", "/submission", "/roadmap", "/team", "/admin"].some(
    (portalPath) => path === portalPath || path.startsWith(`${portalPath}/`)
  );
}

export function HackathonAuthProvider({ children }) {
  const {
    isAuthenticated,
    isLoading: auth0Loading,
    loginWithRedirect,
    logout,
    getAccessTokenSilently,
    getIdTokenClaims,
    user: auth0User,
  } = useAuth0();
  const [session, setSession] = useState(null);
  const [firstStepBridge, setFirstStepBridge] = useState(null);
  const [bridgeLoading, setBridgeLoading] = useState(() => {
    const { fromFirstStep, loginHint } = readSsoParams();
    return fromFirstStep && Boolean(loginHint);
  });
  const [loading, setLoading] = useState(true);
  const [ssoChecking, setSsoChecking] = useState(() => isPortalPath());
  const [error, setError] = useState(null);
  const tokenCacheRef = useRef({ token: null, expiresAt: 0 });
  const tokenInflightRef = useRef(null);
  const reauthTriggeredRef = useRef(false);
  const ssoStartedRef = useRef(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const { loginRequired, fromFirstStep } = readSsoParams();
    const hasAuthCallback = Boolean(params.get("code") || params.get("error"));

    if (hasAuthCallback || loginRequired) {
      try {
        sessionStorage.removeItem(SSO_INFLIGHT_KEY);
      } catch {
        // ignore
      }
    }

    if (loginRequired && !fromFirstStep) {
      try {
        sessionStorage.setItem(SSO_ATTEMPT_KEY, "1");
      } catch {
        // ignore
      }
    }
    cleanAuthCallbackParams();
  }, []);

  const forceReauth = useCallback(
    (reason) => {
      if (reauthTriggeredRef.current) return true;
      reauthTriggeredRef.current = true;
      tokenCacheRef.current = { token: null, expiresAt: 0 };
      console.warn("[hackathon] session expired, redirecting to login:", reason);
      loginWithRedirect({
        appState: {
          returnTo:
            typeof window !== "undefined"
              ? `${window.location.pathname}${window.location.search}`
              : "/sprint",
        },
        authorizationParams: {
          ...authParams(),
          redirect_uri: import.meta.env.VITE_AUTH0_CALLBACK_URL || window.location.origin,
          prompt: "login",
        },
      });
      return true;
    },
    [loginWithRedirect]
  );

  const handleAuthError = useCallback(
    (err) => {
      if (!isSessionExpiredError(err)) return false;
      return forceReauth(err.message || "session expired");
    },
    [forceReauth]
  );

  const getIdToken = useCallback(async () => {
    const now = Date.now();
    const cached = tokenCacheRef.current;
    if (cached.token && cached.expiresAt - now > 60_000) {
      return cached.token;
    }

    if (tokenInflightRef.current) {
      return tokenInflightRef.current;
    }

    tokenInflightRef.current = (async () => {
      try {
        const cachedClaims = await getIdTokenClaims();
        const cachedRaw = cachedClaims?.__raw ?? null;
        if (cachedRaw && !isIdTokenExpired(cachedClaims)) {
          const expMs =
            typeof cachedClaims?.exp === "number" ? cachedClaims.exp * 1000 : now + 3_600_000;
          tokenCacheRef.current = { token: cachedRaw, expiresAt: expMs };
          return cachedRaw;
        }

        await getAccessTokenSilently({
          authorizationParams: authParams(),
          cacheMode: cached.expiresAt <= now ? "off" : "on",
        });
        const claims = await getIdTokenClaims();
        const token = claims?.__raw ?? null;
        if (!token) {
          return null;
        }

        if (isIdTokenExpired(claims)) {
          forceReauth("id token expired");
          return null;
        }

        const expMs =
          typeof claims?.exp === "number" ? claims.exp * 1000 : now + 3_600_000;
        tokenCacheRef.current = { token, expiresAt: expMs };
        return token;
      } catch (err) {
        const auth0Code = String(err?.error || "").toLowerCase();
        if (
          auth0Code === "login_required" ||
          auth0Code === "consent_required" ||
          isSessionExpiredError(err)
        ) {
          return null;
        }
        throw err;
      } finally {
        tokenInflightRef.current = null;
      }
    })();

    return tokenInflightRef.current;
  }, [getAccessTokenSilently, getIdTokenClaims, forceReauth]);

  const loadGateStatusFallback = useCallback(async () => {
    const email = auth0User?.email;
    if (!email) return null;
    try {
      const status = await fetchHackathonGateStatus(email);
      return buildGateSessionFromStatus(status);
    } catch (fallbackErr) {
      console.warn("[hackathon] gate status fallback failed:", fallbackErr);
      return buildGateSessionFromStatus({
        email,
        hasRegistration: false,
        canWrite: false,
        accountStatus: "pending",
      });
    }
  }, [auth0User?.email]);

  const loadBridgeSession = useCallback(async (email) => {
    const status = await fetchHackathonGateStatus(email);
    return buildGateSessionFromStatus({ ...status, email });
  }, []);

  const refreshSession = useCallback(async (options = {}) => {
    const silent = options.silent === true;
    const markSubmitted = options.markSubmitted === true;
    const { fromFirstStep, loginHint } = readSsoParams();
    const bridgeEmail = loginHint || auth0User?.email;

    if (markSubmitted && bridgeEmail) {
      try {
        const status = await markHackathonRegistrationInProgress(bridgeEmail);
        const bridge = buildGateSessionFromStatus({ ...status, email: bridgeEmail });
        setFirstStepBridge(bridge);
        if (!isAuthenticated) return;
      } catch (markErr) {
        console.warn("[hackathon] mark registration submitted failed:", markErr);
      }
    }

    if (!isAuthenticated) {
      if (fromFirstStep && loginHint) {
        try {
          if (!silent) setLoading(true);
          const bridge = await loadBridgeSession(loginHint);
          setFirstStepBridge(bridge);
        } catch (bridgeErr) {
          console.warn("[hackathon] bridge refresh failed:", bridgeErr);
        } finally {
          if (!silent) setLoading(false);
        }
      }
      return;
    }

    try {
      if (!silent) setLoading(true);
      setError(null);
      const token = await getIdToken();
      if (!token) {
        const fallback = await loadGateStatusFallback();
        if (fallback) setSession(fallback);
        return;
      }
      const res = await apiFetch("/api/hackathon/me", { token });
      setSession(res.data);
      reauthTriggeredRef.current = false;
    } catch (err) {
      console.error("[hackathon] session error:", err.status, err.message, err.data);
      const fallback = await loadGateStatusFallback();
      if (fallback) {
        setSession(fallback);
        setError(null);
      } else {
        const detail = err.data?.error || err.data?.message || err.message || "Failed to load session";
        setError(detail);
        setSession(null);
      }
    } finally {
      if (!silent) setLoading(false);
    }
  }, [isAuthenticated, getIdToken, loadGateStatusFallback, loadBridgeSession, auth0User?.email]);

  /** When Auth0 SSO fails, trust login_hint from FirstStep for the registration gate. */
  useEffect(() => {
    if (auth0Loading) return undefined;

    if (isAuthenticated) {
      setFirstStepBridge(null);
      setBridgeLoading(false);
      return undefined;
    }

    const { fromFirstStep, loginHint } = readSsoParams();
    if (!fromFirstStep || !loginHint) {
      setFirstStepBridge(null);
      setBridgeLoading(false);
      return undefined;
    }

    let cancelled = false;
    setBridgeLoading(true);

    (async () => {
      try {
        const status = await fetchHackathonGateStatus(loginHint);
        if (cancelled) return;
        setFirstStepBridge(buildGateSessionFromStatus({ ...status, email: loginHint }));
      } catch (bridgeErr) {
        console.warn("[hackathon] firststep bridge session failed:", bridgeErr);
        if (cancelled) return;
        setFirstStepBridge(
          buildGateSessionFromStatus({
            email: loginHint,
            hasRegistration: false,
            canWrite: false,
            accountStatus: "pending",
          })
        );
      } finally {
        if (!cancelled) setBridgeLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [auth0Loading, isAuthenticated]);

  useEffect(() => {
    if (auth0Loading) return;

    if (isAuthenticated) {
      try {
        sessionStorage.removeItem(SSO_ATTEMPT_KEY);
        sessionStorage.removeItem(SSO_INFLIGHT_KEY);
      } catch {
        // ignore
      }
      setSsoChecking(false);
      return;
    }

    if (!isPortalPath()) {
      setSsoChecking(false);
      return;
    }

    const { fromFirstStep, loginHint, loginRequired } = readSsoParams();

    if (fromFirstStep) {
      try {
        sessionStorage.removeItem(SSO_ATTEMPT_KEY);
      } catch {
        // ignore
      }
    }

    if (!fromFirstStep) {
      setSsoChecking(false);
      return;
    }

    // FirstStep passes login_hint — use bridge session for the gate; don't block on Auth0 redirect.
    if (loginHint) {
      setSsoChecking(false);
      return;
    }

    try {
      if (sessionStorage.getItem(SSO_ATTEMPT_KEY)) {
        setSsoChecking(false);
        return;
      }
    } catch {
      setSsoChecking(false);
      return;
    }

    if (ssoStartedRef.current) return;
    ssoStartedRef.current = true;

    const returnQs = new URLSearchParams({ from: "firststep" });
    if (loginHint) returnQs.set("login_hint", loginHint);

    try {
      sessionStorage.setItem(SSO_INFLIGHT_KEY, "1");
    } catch {
      // ignore
    }

    setSsoChecking(true);
    loginWithRedirect({
      appState: {
        returnTo: `${window.location.pathname}?${returnQs.toString()}`,
      },
      authorizationParams: {
        ...authParams(),
        prompt: loginRequired ? "login" : "none",
        redirect_uri: redirectUri(),
        ...(loginHint ? { login_hint: loginHint } : {}),
      },
    });
  }, [auth0Loading, isAuthenticated, loginWithRedirect]);

  useEffect(() => {
    if (auth0Loading) return;
    refreshSession();
  }, [auth0Loading, isAuthenticated, refreshSession]);

  useEffect(() => {
    if (!isAuthenticated) {
      tokenCacheRef.current = { token: null, expiresAt: 0 };
      reauthTriggeredRef.current = false;
    }
  }, [isAuthenticated]);

  const login = useCallback(
    (returnTo = "/sprint") => {
      try {
        sessionStorage.removeItem(SSO_ATTEMPT_KEY);
      } catch {
        // ignore
      }
      loginWithRedirect({
        appState: { returnTo },
        authorizationParams: {
          ...authParams(),
          redirect_uri: redirectUri(),
        },
      });
    },
    [loginWithRedirect]
  );

  /**
   * Option A — send the user to FirstStep to log in with FirstStep's own Auth0 app
   * (callback URL from VITE_FIRSTSTEP_CALLBACK_URL, e.g. http://localhost:5174/).
   * Avoids Auth0 "callback URL mismatch" on the hackathon Auth0 application.
   */
  const loginForFirstStep = useCallback(() => {
    window.location.href = getFirstStepDashboardWithHackathonContext();
  }, []);

  const signOut = useCallback(() => {
    const returnTo =
      import.meta.env.VITE_AUTH0_CALLBACK_URL || window.location.origin;
    logout({ logoutParams: { returnTo } });
  }, [logout]);

  const sessionUser = session?.user ?? firstStepBridge?.user ?? null;
  const hasPortalAccess = isAuthenticated || Boolean(firstStepBridge?.user);
  const profile = useMemo(
    () => getDisplayProfile(auth0User, sessionUser),
    [auth0User, sessionUser]
  );

  const value = useMemo(
    () => ({
      isAuthenticated,
      hasPortalAccess,
      auth0Loading,
      auth0User,
      loading: auth0Loading || loading || ssoChecking || bridgeLoading,
      error,
      session,
      user: sessionUser,
      profile,
      team: session?.team ?? null,
      canWrite: session?.user?.canWrite ?? false,
      accountStatus: session?.user?.accountStatus ?? null,
      hasRegistration: session?.user?.hasRegistration ?? false,
      isAdmin: session?.user?.isAdmin ?? false,
      login,
      loginForFirstStep,
      signOut,
      refreshSession,
      handleAuthError,
      getAccessToken: getIdToken,
    }),
    [
      isAuthenticated,
      hasPortalAccess,
      auth0Loading,
      auth0User,
      loading,
      ssoChecking,
      bridgeLoading,
      error,
      session,
      sessionUser,
      profile,
      login,
      loginForFirstStep,
      signOut,
      refreshSession,
      handleAuthError,
      getIdToken,
    ]
  );

  return (
    <HackathonAuthContext.Provider value={value}>{children}</HackathonAuthContext.Provider>
  );
}

export function useHackathonAuth() {
  const ctx = useContext(HackathonAuthContext);
  if (!ctx) {
    throw new Error("useHackathonAuth must be used within HackathonAuthProvider");
  }
  return ctx;
}
