import { useEffect, useRef, useState } from "react";
import { useHackathonAuth } from "../../auth/HackathonAuthContext";

function useSprintMobileLayout() {
  const [mobile, setMobile] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches
  );

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const sync = () => setMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return mobile;
}

export default function SprintUserMenu({ variant = "default" }) {
  const isHeader = variant === "header";
  const isMobile = useSprintMobileLayout();
  const isCompactHeader = isHeader && isMobile;
  const avatarSize = isCompactHeader ? 32 : isHeader ? 44 : 32;
  const nameFontSize = isHeader ? 18 : 14;
  const initialsFontSize = isCompactHeader ? 13 : isHeader ? 17 : 12;
  const { profile, signOut, loading, isAuthenticated, login } = useHackathonAuth();
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

  if (!loading && !isAuthenticated) {
    return (
      <button
        type="button"
        className="sprint-user-menu__sign-in"
        onClick={() => login(typeof window !== "undefined" ? window.location.pathname : "/sprint")}
      >
        Sign in
      </button>
    );
  }

  const rootClass = [
    "sprint-user-menu",
    isHeader ? "sprint-user-menu--header" : "",
    isCompactHeader ? "sprint-user-menu--compact" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div ref={rootRef} className={rootClass} style={{ position: "relative" }}>
      <button
        type="button"
        className="sprint-user-menu__trigger"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        style={{
          display: "flex",
          alignItems: "center",
          gap: isHeader ? 14 : 12,
          padding: isHeader ? "4px 8px" : "4px 8px",
          margin: isHeader ? "-4px -8px" : "-4px -8px",
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
            className="sprint-user-menu__avatar"
            style={{
              width: avatarSize,
              height: avatarSize,
              borderRadius: "50%",
              objectFit: "cover",
              border: "2px solid #89f5e7",
            }}
          />
        ) : (
          <div
            className="sprint-user-menu__avatar"
            style={{
              width: avatarSize,
              height: avatarSize,
              borderRadius: "50%",
              background: "#89f5e7",
              color: "#00685f",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "'Hanken Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: initialsFontSize,
            }}
          >
            {loading ? "…" : initials}
          </div>
        )}
        <span
          className="sprint-user-menu__name"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: nameFontSize,
            fontWeight: isHeader ? 600 : 400,
            color: "#191c1e",
            maxWidth: isHeader ? 200 : 180,
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
          className={`sprint-user-menu__panel${isCompactHeader ? " sprint-user-menu__panel--compact" : ""}`}
          style={{
            position: "absolute",
            right: 0,
            top: isCompactHeader ? "calc(100% + 6px)" : "calc(100% + 8px)",
            minWidth: isCompactHeader ? 0 : isHeader ? 280 : 220,
            width: isCompactHeader ? "min(220px, calc(100vw - 24px))" : undefined,
            maxWidth: isCompactHeader ? "calc(100vw - 24px)" : undefined,
            background: "#fff",
            border: "1px solid #eceef0",
            borderRadius: isCompactHeader ? 10 : isHeader ? 14 : 12,
            boxShadow: "0 8px 24px rgba(2, 51, 69, 0.12)",
            padding: isCompactHeader ? "4px 0" : isHeader ? "10px 0" : "8px 0",
            zIndex: 100,
          }}
        >
          {email && (
            <p className="sprint-user-menu__email">
              {email}
            </p>
          )}
          <button
            type="button"
            role="menuitem"
            className="sprint-user-menu__logout"
            onClick={() => {
              setOpen(false);
              signOut();
            }}
          >
            Log out
          </button>
        </div>
      )}
    </div>
  );
}
