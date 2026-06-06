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

function ClaimButton({ onClick }) {
  const handleClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    onClick?.();
  };

  return (
    <button type="button" className="points-claim-btn" onClick={handleClick}>
      <span>Claim</span>
      <Icon name="open_in_new" size={13} />
    </button>
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
  onClaimClick,
}) {
  const isSocial = CLAIMABLE_IDS.has(id);
  const showClaim =
    isSocial && !completed && status !== "locked" && status !== "submitted";

  let hint = null;
  let badge = null;

  if (isSocial) {
    if (completed) badge = <StatusBadge tone="done" label="Verified" />;
    else if (status === "submitted") badge = <StatusBadge tone="review" label="In review" />;
    else if (status === "rejected") {
      hint = "Resubmit your share proof";
      badge = <StatusBadge tone="rejected" label="Rejected" />;
    }
    else if (status === "locked") hint = "Join a team to unlock";
    else if (showClaim) hint = "Share + submit proof";
  } else if (id === "judge" && completed && earned > 0) {
    badge = <StatusBadge tone="done" label="Scored" />;
  }

  const openClaimModal = () => {
    onClaimClick?.(id);
  };

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
              {showClaim && <ClaimButton onClick={openClaimModal} />}
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
