import { useHackathonAuth } from "./HackathonAuthContext";

export function RequireHackathonAuth({ children, fallback = null }) {
  const { isAuthenticated, loading, login } = useHackathonAuth();

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center p-8">
        <p style={{ color: "#6d7a77", fontFamily: "'Inter', sans-serif" }}>Loading…</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    if (fallback) return fallback;
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 p-8 text-center">
        <h2
          className="text-2xl font-bold"
          style={{ fontFamily: "'Hanken Grotesk', sans-serif", color: "#002B36" }}
        >
          Sign in to continue
        </h2>
        <p style={{ color: "#6d7a77", maxWidth: "28rem" }}>
          Use your FirstStep account to access the hackathon portal.
        </p>
        <button
          type="button"
          className="btn-claim"
          onClick={() => login("/sprint")}
          style={{ border: "none", cursor: "pointer" }}
        >
          <span className="btn-claim__label">Sign in with FirstStep</span>
        </button>
      </div>
    );
  }

  return children;
}
