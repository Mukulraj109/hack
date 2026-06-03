import { useHackathonAuth } from "../../auth/HackathonAuthContext";

const PAGE_LABELS = {
  "/sprint": "Sprint dashboard",
  "/submission": "Submissions",
  "/roadmap": "Roadmap",
  "/team": "Team",
};

const PORTAL_FEATURES = [
  { icon: "dashboard", text: "Track your sprint progress and points" },
  { icon: "upload_file", text: "Submit your hackathon project" },
  { icon: "group", text: "Manage your team and collaborators" },
];

export default function SprintSignInPrompt({ returnTo = "/sprint", onNavigate }) {
  const { login } = useHackathonAuth();
  const pageLabel = PAGE_LABELS[returnTo] || "Hackathon portal";

  return (
    <div className="sprint-sign-in">
      <div className="sprint-sign-in__card">
        <div className="sprint-sign-in__icon-wrap" aria-hidden="true">
          <span className="material-symbols-outlined sprint-sign-in__icon">lock</span>
        </div>

        <p className="sprint-sign-in__eyebrow">First Step Annual Hackathon 2026</p>
        <h2 className="sprint-sign-in__title">Sign in to access {pageLabel}</h2>
        <p className="sprint-sign-in__desc">
          Use your FirstStep account to enter the participant portal. New here?{" "}
          <a
            href="/"
            className="sprint-sign-in__inline-link"
            onClick={(e) => {
              e.preventDefault();
              onNavigate?.("/");
            }}
          >
            Register on the event site
          </a>{" "}
          first, then sign in with the same email.
        </p>

        <ul className="sprint-sign-in__features">
          {PORTAL_FEATURES.map((item) => (
            <li key={item.icon} className="sprint-sign-in__feature">
              <span className="material-symbols-outlined sprint-sign-in__feature-icon" aria-hidden="true">
                {item.icon}
              </span>
              <span>{item.text}</span>
            </li>
          ))}
        </ul>

        <div className="sprint-sign-in__actions">
          <button
            type="button"
            className="btn-claim sprint-sign-in__cta"
            onClick={() => login(returnTo)}
          >
            <span className="btn-claim__label">Sign in with FirstStep</span>
            <svg
              className="btn-claim__arrow"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>

          <a
            href="/"
            className="sprint-sign-in__secondary"
            onClick={(e) => {
              e.preventDefault();
              onNavigate?.("/");
            }}
          >
            Back to event site
          </a>
        </div>
      </div>
    </div>
  );
}
