import { ZOHO_SOCIAL_SHARE_CLAIM_FORM_URL } from "../../config/zohoForms";

const CLAIMABLE_IDS = new Set(["instagram", "linkedin"]);

function Icon({ name, filled = false, size = 16 }) {
  return (
    <span
      className="material-symbols-outlined"
      style={{
        fontVariationSettings: filled ? "'FILL' 1" : "'FILL' 0",
        fontSize: size,
      }}
      aria-hidden
    >
      {name}
    </span>
  );
}

function ClaimButton({ disabled = false }) {
  const content = (
    <>
      <span>Claim</span>
      <Icon name="open_in_new" size={13} />
    </>
  );

  if (disabled) {
    return (
      <button
        type="button"
        className="points-claim-btn points-claim-btn--placeholder"
        disabled
        title="Add VITE_ZOHO_SOCIAL_SHARE_CLAIM_FORM_URL to enable"
      >
        {content}
      </button>
    );
  }

  return (
    <a
      href={ZOHO_SOCIAL_SHARE_CLAIM_FORM_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="points-claim-btn"
    >
      {content}
    </a>
  );
}

function StatusBadge({ tone, label }) {
  return <span className={`points-tracker-badge points-tracker-badge--${tone}`}>{label}</span>;
}

export default function PointsTrackerItem({
  id,
  completed,
  icon,
  label,
  points,
  status,
  earned = 0,
}) {
  const isSocial = CLAIMABLE_IDS.has(id);
  const showClaim =
    isSocial && !completed && status !== "locked" && status !== "submitted";
  const hasFormUrl = Boolean(ZOHO_SOCIAL_SHARE_CLAIM_FORM_URL);

  let hint = null;
  let badge = null;

  if (isSocial) {
    if (completed) badge = <StatusBadge tone="done" label="Verified" />;
    else if (status === "submitted") badge = <StatusBadge tone="review" label="In review" />;
    else if (status === "rejected") hint = "Resubmit your share proof";
    else if (status === "locked") hint = "Join a team to unlock";
    else if (showClaim) hint = "Share + submit proof";
  } else if (id === "judge" && completed && earned > 0) {
    badge = <StatusBadge tone="done" label="Scored" />;
  }

  return (
    <div
      className={`points-tracker-item${completed ? " points-tracker-item--done" : ""}${
        status === "locked" ? " points-tracker-item--locked" : ""
      }`}
    >
      <div
        className={`points-tracker-item__icon${
          completed ? " points-tracker-item__icon--done" : ""
        }`}
      >
        <Icon name={icon} filled={completed} />
      </div>

      <div className="points-tracker-item__content">
        <div className="points-tracker-item__head">
          <span className="points-tracker-item__label">{label}</span>
          {(showClaim || badge) && (
            <div className="points-tracker-item__head-actions">
              {showClaim && <ClaimButton disabled={!hasFormUrl} />}
              {badge}
            </div>
          )}
          <span className="points-tracker-item__points">{points}</span>
        </div>

        {hint && (
          <p className="points-tracker-item__hint">{hint}</p>
        )}
      </div>
    </div>
  );
}
