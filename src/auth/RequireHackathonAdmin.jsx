import { useHackathonAuth } from "./HackathonAuthContext";

export function RequireHackathonAdmin({ children, onNavigate }) {
  const { loading, isAdmin } = useHackathonAuth();

  if (loading) {
    return (
      <div className="sprint-sign-in sprint-sign-in--loading">
        <div className="sprint-sign-in__spinner" role="status" aria-label="Loading">
          <span className="sprint-sign-in__spinner-ring" />
        </div>
        <p className="sprint-sign-in__loading-text">Checking admin access…</p>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="admin-access-denied">
        <div className="admin-access-denied__card">
          <span className="material-symbols-outlined admin-access-denied__icon" aria-hidden>
            admin_panel_settings
          </span>
          <h2 className="admin-access-denied__title">Access denied</h2>
          <p className="admin-access-denied__text">
            You do not have admin permissions to view this page.
          </p>
          <button
            type="button"
            className="admin-access-denied__btn"
            onClick={() => onNavigate?.("/sprint")}
          >
            Back to dashboard
          </button>
        </div>
      </div>
    );
  }

  return children;
}
