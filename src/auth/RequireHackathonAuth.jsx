import SprintSignInPrompt from "../components/sprint/SprintSignInPrompt";
import { useHackathonAuth } from "./HackathonAuthContext";

export function RequireHackathonAuth({ children, fallback = null, returnTo = "/sprint", onNavigate }) {
  const { isAuthenticated, loading } = useHackathonAuth();

  if (loading) {
    return (
      <div className="sprint-sign-in sprint-sign-in--loading">
        <div className="sprint-sign-in__spinner" role="status" aria-label="Loading">
          <span className="sprint-sign-in__spinner-ring" />
        </div>
        <p className="sprint-sign-in__loading-text">Checking your session…</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    if (fallback) return fallback;
    return <SprintSignInPrompt returnTo={returnTo} onNavigate={onNavigate} />;
  }

  return children;
}
