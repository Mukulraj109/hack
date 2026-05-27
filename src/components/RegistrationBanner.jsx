import "../styles/hackathon-registration-banner.css";

const ZOHO_FORM_URL =
  import.meta.env.VITE_ZOHO_FORM_URL ||
  "https://forms.firststepjob.com/FirstStep/form/HackatonClaimtheSpot/formperma/BWCKiy8vnJGfveVcYOFGxRgauZFE53fXEv6DBpqVW0o";

function ExternalIcon() {
  return (
    <span className="hackathon-reg-banner__icon material-symbols-outlined" aria-hidden>
      open_in_new
    </span>
  );
}

export default function RegistrationBanner({ user, onRefresh }) {
  if (!user || user.hasRegistration) {
    return null;
  }

  return (
    <section className="hackathon-reg-banner" aria-labelledby="hackathon-reg-title">
      <div className="hackathon-reg-banner__accent" aria-hidden />
      <div className="hackathon-reg-banner__body">
        <div className="hackathon-reg-banner__copy">
          <p className="hackathon-reg-banner__eyebrow">Action required</p>
          <h3 id="hackathon-reg-title" className="hackathon-reg-banner__title">
            Complete hackathon registration
          </h3>
          <p className="hackathon-reg-banner__text">
            Submit the Zoho form using the same email as your FirstStep login.
          </p>
          <p className="hackathon-reg-banner__email" title={user.email}>
            <span className="hackathon-reg-banner__email-label">Your email</span>
            <span className="hackathon-reg-banner__email-value">{user.email}</span>
          </p>
        </div>

        <div className="hackathon-reg-banner__actions">
          <a
            href={ZOHO_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hackathon-reg-banner__btn hackathon-reg-banner__btn--primary"
          >
            Complete registration
            <ExternalIcon />
          </a>
          {onRefresh && (
            <button
              type="button"
              onClick={onRefresh}
              className="hackathon-reg-banner__btn hackathon-reg-banner__btn--secondary"
            >
              I&apos;ve submitted — refresh status
            </button>
          )}
        </div>
      </div>

      <p className="hackathon-reg-banner__hint">
        The form opens in a new tab. When you&apos;re done, return here and refresh your status.
      </p>
    </section>
  );
}

export function PendingAccountBanner({ user }) {
  if (!user?.hasRegistration || user.accountStatus === "active") {
    return null;
  }

  return (
    <section className="hackathon-reg-banner hackathon-reg-banner--pending" aria-live="polite">
      <div className="hackathon-reg-banner__body">
        <p className="hackathon-reg-banner__pending-title">Registration received</p>
        <p className="hackathon-reg-banner__pending-text">
          Your account is under review. You have read-only access until activation.
        </p>
      </div>
    </section>
  );
}
