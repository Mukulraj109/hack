import { Auth0Provider } from "@auth0/auth0-react";
import { replaceAppPath } from "../lib/appNavigation";

/** Same Auth0 shape as first-step firststep_frontend-main (development profile). */
export function Auth0ProviderWithNavigate({ children }) {
  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
  const audience = import.meta.env.VITE_AUTH0_AUDIENCE;
  const redirectUri = import.meta.env.VITE_AUTH0_CALLBACK_URL || window.location.origin;

  if (!domain || !clientId) {
    throw new Error("Missing VITE_AUTH0_DOMAIN or VITE_AUTH0_CLIENT_ID in .env.local");
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
        audience: audience,
        scope: "openid profile email offline_access",
      }}
      useRefreshTokens={true}
      cacheLocation="localstorage"
      onRedirectCallback={(appState) => {
        try {
          sessionStorage.removeItem("hackathon_sso_prompt_none_attempted");
          sessionStorage.removeItem("hackathon_sso_redirect_inflight");
        } catch {
          // ignore
        }
        replaceAppPath(appState?.returnTo || "/sprint");
      }}
    >
      {children}
    </Auth0Provider>
  );
}
