// Shared Layout for Sprint Dashboard pages
// Contains Header, Sidebar, and wraps page content

import "./styles/sprint-portal.css";
import SubmissionCountdownBar from "./components/sprint/SubmissionCountdownBar";
import SprintUserMenu from "./components/sprint/SprintUserMenu";

// Material Icon Component
function Icon({ name, filled = false, size = 24, style = {} }) {
  return (
    <span className="material-symbols-outlined" style={{
      fontVariationSettings: filled ? "'FILL' 1" : "'FILL' 0",
      fontSize: size,
      ...style
    }}>
      {name}
    </span>
  );
}

// Sidebar Navigation
function Sidebar({ currentPath, onNavigate }) {
  const navItems = [
    { icon: "dashboard", label: "Dashboard", path: "/sprint" },
    { icon: "upload_file", label: "Submission", path: "/submission" },
    { icon: "map", label: "Roadmap", path: "/roadmap" },
    { icon: "group", label: "Team", path: "/team" },
    { icon: "event", label: "Event Site", path: "/" },
  ];

  return (
    <aside style={{
      position: "fixed",
      left: 0,
      top: 0,
      height: "100%",
      width: "256px",
      background: "rgba(255, 255, 255, 0.85)",
      backdropFilter: "blur(12px)",
      borderRight: "1px solid rgba(255, 255, 255, 0.4)",
      boxShadow: "0 4px 20px rgba(13, 148, 136, 0.08), 0 0 1px rgba(2, 51, 69, 0.08)",
      display: "flex",
      flexDirection: "column",
      paddingTop: "32px",
      paddingBottom: "32px",
      paddingLeft: "16px",
      paddingRight: "16px",
      gap: "16px",
      zIndex: 60
    }}>
      {/* Logo and Branding - Clickable to home */}
      <div
        style={{ marginBottom: "32px", paddingLeft: "8px", cursor: "pointer" }}
        onClick={() => onNavigate("/")}
      >
        <img
          src="/firststep-logo.png"
          alt="FirstStep Logo"
          style={{
            width: "180px",
            height: "auto",
            display: "block",
            marginBottom: "2px"
          }}
        />
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "14px",
          fontWeight: "600",
          color: "#3d4947",
          margin: 0,
          paddingLeft: "16px"
        }}>Hackathon Portal</p>
      </div>

      <nav style={{ flex: 1, display: "flex", flexDirection: "column", gap: "4px" }}>
        {navItems.map((item) => {
          const isActive = currentPath === item.path;
          return (
            <a
              key={item.label}
              href={item.path === "#" ? "#" : undefined}
              onClick={(e) => {
                e.preventDefault();
                if (item.path !== "#" && onNavigate) {
                  onNavigate(item.path);
                }
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                paddingLeft: "16px",
                paddingRight: "16px",
                paddingTop: "12px",
                paddingBottom: "12px",
                borderRadius: "8px",
                borderRight: isActive ? "4px solid #00685f" : "4px solid transparent",
                background: isActive ? "rgba(0, 104, 95, 0.1)" : "transparent",
                color: isActive ? "#00685f" : "#3d4947",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "14px",
                fontWeight: isActive ? "700" : "500",
                textDecoration: "none",
                transition: "all 0.2s ease",
                transform: "translateX(0)",
                cursor: "pointer"
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = "#eceef0";
                  e.currentTarget.style.transform = "translateX(4px)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.transform = "translateX(0)";
                }
              }}
            >
              <Icon name={item.icon} filled={isActive} />
              {item.label}
            </a>
          );
        })}
      </nav>

      <div style={{ marginTop: "auto", borderTop: "1px solid #eceef0", paddingTop: "16px" }}>
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            paddingLeft: "16px",
            paddingRight: "16px",
            paddingTop: "12px",
            paddingBottom: "12px",
            borderRadius: "8px",
            color: "#3d4947",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "14px",
            fontWeight: "500",
            textDecoration: "none",
            transition: "all 0.2s ease",
            cursor: "pointer"
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "#eceef0"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
        >
          <Icon name="help" />
          Support
        </a>
      </div>
    </aside>
  );
}

// Header Component
function Header({ title }) {
  return (
    <header style={{
      background: "rgba(255, 255, 255, 0.85)",
      backdropFilter: "blur(12px)",
      borderBottom: "1px solid rgba(255, 255, 255, 0.4)",
      boxShadow: "0 4px 20px rgba(13, 148, 136, 0.08)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      height: "64px",
      width: "100%",
      paddingLeft: "40px",
      paddingRight: "40px",
      boxSizing: "border-box",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <h2 style={{
          fontFamily: "'Hanken Grotesk', sans-serif",
          fontSize: "24px",
          lineHeight: "32px",
          fontWeight: "700",
          color: "#00685f"
        }}>{title}</h2>
      </div>
      <SprintUserMenu />
    </header>
  );
}

// Main Layout Component
export default function SprintLayout({ children, title, currentPath, onNavigate }) {
  const isSubmission = currentPath === "/submission";

  return (
    <div
      className={isSubmission ? "sprint-portal sprint-portal--submission" : "sprint-portal"}
      style={{
      minHeight: "100vh",
      background: "radial-gradient(at 0% 0%, rgba(13, 148, 136, 0.05) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(0, 101, 145, 0.05) 0px, transparent 50%), #f7f9fb",
      fontFamily: "'Inter', sans-serif",
      color: "#191c1e"
    }}
    >
      {/* Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500&family=Hanken+Grotesk:wght@600;700;900&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        rel="stylesheet"
      />

      <Sidebar currentPath={currentPath} onNavigate={onNavigate} />

      {/* Main Content Area */}
      <main style={{ marginLeft: "256px", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <div
          style={{
            position: "sticky",
            top: 0,
            zIndex: 50,
            width: "100%",
            flexShrink: 0,
          }}
        >
          <Header title={title} />
          {isSubmission && <SubmissionCountdownBar />}
        </div>
        <div
          style={{
            flex: 1,
            width: "100%",
            padding: isSubmission ? "24px 40px" : "32px",
            maxWidth: isSubmission ? "1440px" : "1280px",
            margin: "0 auto",
            boxSizing: "border-box",
          }}
        >
          {children}
        </div>
      </main>
    </div>
  );
}
