import { useEffect, useRef, useState } from "react";
import { useHackathonAuth } from "../../auth/HackathonAuthContext";

export default function SprintUserMenu() {
  const { profile, signOut, loading } = useHackathonAuth();
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  const { displayName, initials, picture, email } = profile;

  return (
    <div ref={rootRef} style={{ position: "relative" }}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "4px 8px",
          margin: "-4px -8px",
          border: "none",
          borderRadius: "8px",
          background: open ? "rgba(0, 104, 95, 0.08)" : "transparent",
          cursor: "pointer",
        }}
      >
        {picture ? (
          <img
            src={picture}
            alt=""
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              objectFit: "cover",
              border: "2px solid #89f5e7",
            }}
          />
        ) : (
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "#89f5e7",
              color: "#00685f",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "'Hanken Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: 12,
            }}
          >
            {loading ? "…" : initials}
          </div>
        )}
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 14,
            color: "#191c1e",
            maxWidth: 180,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {loading ? "Loading…" : displayName}
        </span>
      </button>

      {open && (
        <div
          role="menu"
          style={{
            position: "absolute",
            right: 0,
            top: "calc(100% + 8px)",
            minWidth: 220,
            background: "#fff",
            border: "1px solid #eceef0",
            borderRadius: 12,
            boxShadow: "0 8px 24px rgba(2, 51, 69, 0.12)",
            padding: "8px 0",
            zIndex: 100,
          }}
        >
          {email && (
            <p
              style={{
                margin: 0,
                padding: "8px 16px 12px",
                fontSize: 12,
                color: "#6d7a77",
                borderBottom: "1px solid #eceef0",
                wordBreak: "break-all",
              }}
            >
              {email}
            </p>
          )}
          <button
            type="button"
            role="menuitem"
            onClick={() => {
              setOpen(false);
              signOut();
            }}
            style={{
              display: "block",
              width: "100%",
              textAlign: "left",
              padding: "10px 16px",
              border: "none",
              background: "transparent",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 14,
              color: "#b42318",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(180, 35, 24, 0.06)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
            }}
          >
            Log out
          </button>
        </div>
      )}
    </div>
  );
}
