export default function SprintLoadError({ message, onRetry, retryLabel = "Retry", style = {} }) {
  return (
    <div
      className="sprint-load-error"
      role="alert"
      style={{
        padding: "24px",
        marginBottom: "24px",
        background: "rgba(255, 255, 255, 0.88)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid rgba(255, 255, 255, 0.55)",
        borderRadius: "16px",
        boxShadow: "0 4px 24px rgba(13, 148, 136, 0.08)",
        ...style,
      }}
    >
      <p style={{ color: "#ba1a1a", marginBottom: "12px", marginTop: 0 }}>{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          style={{
            padding: "8px 20px",
            background: "#00685f",
            color: "#fff",
            border: "none",
            borderRadius: "9999px",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          {retryLabel}
        </button>
      )}
    </div>
  );
}
