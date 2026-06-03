import { useRef, useState } from "react";

function Icon({ name, size = 24, style = {} }) {
  return (
    <span className="material-symbols-outlined" style={{ fontSize: size, ...style }}>
      {name}
    </span>
  );
}

export default function ResumeUploadField({
  resumeFileName,
  disabled,
  onUpload,
}) {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleFile = async (file) => {
    if (!file || disabled) return;
    setError(null);
    setUploading(true);
    try {
      await onUpload(file);
    } catch (err) {
      setError(err?.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="application/pdf,.pdf"
        className="sr-only"
        disabled={disabled || uploading}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          e.target.value = "";
        }}
      />
      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        onClick={() => !disabled && !uploading && inputRef.current?.click()}
        onKeyDown={(e) => {
          if ((e.key === "Enter" || e.key === " ") && !disabled && !uploading) {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          background: "#f2f4f6",
          borderRadius: "8px",
          padding: "12px",
          border: "2px dashed rgba(188,201,198,0.5)",
          cursor: disabled ? "not-allowed" : "pointer",
          opacity: disabled ? 0.6 : 1,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px", minWidth: 0 }}>
          <Icon name="description" />
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "14px",
              color: resumeFileName ? "#191c1e" : "#6d7a77",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {uploading
              ? "Uploading…"
              : resumeFileName || "Drop PDF here (Max 5MB)"}
          </span>
        </div>
        <button
          type="button"
          disabled={disabled || uploading}
          onClick={(e) => {
            e.stopPropagation();
            if (!disabled && !uploading) inputRef.current?.click();
          }}
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "12px",
            color: "#00685f",
            padding: "4px 12px",
            background: "rgba(107, 216, 203, 0.3)",
            borderRadius: "9999px",
            border: "none",
            cursor: disabled ? "not-allowed" : "pointer",
            flexShrink: 0,
          }}
        >
          {resumeFileName ? "Replace" : "Select File"}
        </button>
      </div>
      {error && (
        <p style={{ fontSize: "12px", color: "#ba1a1a", marginTop: "4px" }}>{error}</p>
      )}
    </div>
  );
}
