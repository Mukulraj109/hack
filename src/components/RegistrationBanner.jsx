import RegistrationFormEmbed from "./RegistrationFormEmbed";
import "../styles/hackathon-registration-banner.css";

export default function RegistrationBanner({ user, onRefresh }) {
  if (!user || user.hasRegistration) {
    return null;
  }

  return <RegistrationFormEmbed user={user} onRefresh={onRefresh} />;
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
