import { SUBMISSION_ZIP_EMAIL } from "../../config/submission";

function Icon({ name, size = 24, style = {} }) {
  return (
    <span className="material-symbols-outlined" style={{ fontSize: size, ...style }}>
      {name}
    </span>
  );
}

export default function SupplementaryZipEmailStep({ confirmed, disabled, onChange }) {
  const mailtoHref = `mailto:${SUBMISSION_ZIP_EMAIL}?subject=${encodeURIComponent(
    "Hackathon submission ZIP"
  )}`;

  return (
    <div
      style={{
        border: "2px solid rgba(0, 104, 95, 0.2)",
        borderRadius: "12px",
        padding: "20px 24px",
        background: "rgba(0, 104, 95, 0.04)",
      }}
    >
      <div style={{ display: "flex", gap: "12px", alignItems: "flex-start", marginBottom: "16px" }}>
        <Icon name="mail" style={{ fontSize: "28px", color: "#00685f", flexShrink: 0 }} />
        <div>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "14px",
              lineHeight: "22px",
              color: "#191c1e",
              margin: 0,
            }}
          >
            Email your team&apos;s final project ZIP (decks, diagrams, backups, etc.) to{" "}
            <a
              href={mailtoHref}
              style={{ color: "#00685f", fontWeight: 600, textDecoration: "underline" }}
            >
              {SUBMISSION_ZIP_EMAIL}
            </a>
            . Use the same email as your FirstStep login and include your team name in the
            subject line.
          </p>
        </div>
      </div>

      <label
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "12px",
          cursor: disabled ? "not-allowed" : "pointer",
          opacity: disabled ? 0.6 : 1,
        }}
      >
        <input
          type="checkbox"
          checked={Boolean(confirmed)}
          disabled={disabled}
          onChange={(e) => onChange(e.target.checked)}
          style={{
            width: "20px",
            height: "20px",
            marginTop: "2px",
            accentColor: "#00685f",
            flexShrink: 0,
          }}
        />
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "14px",
            lineHeight: "20px",
            color: "#191c1e",
          }}
        >
          I have sent our supplementary ZIP file to{" "}
          <strong style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "13px" }}>
            {SUBMISSION_ZIP_EMAIL}
          </strong>
        </span>
      </label>
    </div>
  );
}
