import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { apiFetch } from "../lib/api";
import { getDisplayProfile } from "../lib/displayUser";

const HackathonAuthContext = createContext(null);

function authParams() {
  const audience = import.meta.env.VITE_AUTH0_AUDIENCE;
  return {
    ...(audience ? { audience } : {}),
    scope: "openid profile email",
  };
}

export function HackathonAuthProvider({ children }) {
  const {
    isAuthenticated,
    isLoading: auth0Loading,
    loginWithRedirect,
    logout,
    getIdTokenClaims,
    user: auth0User,
  } = useAuth0();
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getIdToken = useCallback(async () => {
    const claims = await getIdTokenClaims();
    return claims?.__raw ?? null;
  }, [getIdTokenClaims]);

  const refreshSession = useCallback(async () => {
    if (!isAuthenticated) {
      setSession(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const token = await getIdToken();
      if (!token) {
        throw new Error("Could not obtain ID token after login");
      }
      const res = await apiFetch("/api/hackathon/me", { token });
      setSession(res.data);
    } catch (err) {
      const detail = err.data?.error || err.data?.message || err.message || "Failed to load session";
      console.error("[hackathon] session error:", err.status, detail, err.data);
      setError(detail);
      setSession(null);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, getIdToken]);

  useEffect(() => {
    if (auth0Loading) return;
    refreshSession();
  }, [auth0Loading, isAuthenticated, refreshSession]);

  const login = useCallback(
    (returnTo = "/sprint") => {
      loginWithRedirect({
        appState: { returnTo },
        authorizationParams: {
          ...authParams(),
          redirect_uri: import.meta.env.VITE_AUTH0_CALLBACK_URL || window.location.origin,
        },
      });
    },
    [loginWithRedirect]
  );

  const signOut = useCallback(() => {
    const returnTo =
      import.meta.env.VITE_AUTH0_CALLBACK_URL || window.location.origin;
    logout({ logoutParams: { returnTo } });
  }, [logout]);

  const sessionUser = session?.user ?? null;
  const profile = useMemo(
    () => getDisplayProfile(auth0User, sessionUser),
    [auth0User, sessionUser]
  );

  const value = useMemo(
    () => ({
      isAuthenticated,
      auth0Loading,
      auth0User,
      loading: auth0Loading || loading,
      error,
      session,
      user: sessionUser,
      profile,
      team: session?.team ?? null,
      canWrite: session?.user?.canWrite ?? false,
      accountStatus: session?.user?.accountStatus ?? null,
      hasRegistration: session?.user?.hasRegistration ?? false,
      login,
      signOut,
      refreshSession,
      getAccessToken: getIdToken,
    }),
    [
      isAuthenticated,
      auth0Loading,
      auth0User,
      loading,
      error,
      session,
      sessionUser,
      profile,
      login,
      signOut,
      refreshSession,
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
