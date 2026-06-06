// Shared Layout for Sprint Dashboard pages
// Contains Header, Sidebar, and wraps page content

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useHackathonAuth } from "./auth/HackathonAuthContext";
import "./styles/sprint-portal.css";
import "./styles/sprint-portal-mobile.css";
import SubmissionCountdownBar from "./components/sprint/SubmissionCountdownBar";
import SprintUserMenu from "./components/sprint/SprintUserMenu";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";

const SPRINT_SIDEBAR_WIDTH = 288;
const SPRINT_SIDEBAR_COLLAPSED_WIDTH = 72;
const SPRINT_TOP_BAR_HEIGHT = 116;
const SIDEBAR_STORAGE_KEY = "sprint-sidebar-collapsed";

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

function readSidebarCollapsed() {
  try {
    return localStorage.getItem(SIDEBAR_STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

// Sidebar Navigation (brand logo lives in the top bar)
function Sidebar({ currentPath, onNavigate, collapsed, onToggleCollapsed, closeSidebarOnMobile, isAdmin }) {
  const navItems = [
    { icon: "dashboard", label: "Dashboard", path: "/sprint" },
    { icon: "upload_file", label: "Submission", path: "/submission" },
    { icon: "map", label: "Roadmap", path: "/roadmap" },
    { icon: "group", label: "Team", path: "/team" },
    ...(isAdmin
      ? [{ icon: "admin_panel_settings", label: "Admin", path: "/admin" }]
      : []),
    { icon: "event", label: "Event Site", path: "/" },
  ];

  return (
    <aside
      className={`sprint-sidebar${collapsed ? " sprint-sidebar--collapsed" : ""}`}
      aria-label="Portal navigation"
      aria-expanded={!collapsed}
    >
      <nav className="sprint-sidebar__nav">
        {navItems.map((item) => {
          const isActive = currentPath === item.path;
          return (
            <a
              key={item.label}
              href={item.path === "#" ? "#" : undefined}
              title={collapsed ? item.label : undefined}
              onClick={(e) => {
                e.preventDefault();
                if (item.path !== "#" && onNavigate) {
                  onNavigate(item.path);
                  if (closeSidebarOnMobile) closeSidebarOnMobile();
                }
              }}
              className={`sprint-sidebar__link${isActive ? " sprint-sidebar__link--active" : ""}`}
            >
              <Icon name={item.icon} filled={isActive} />
              <span className="sprint-sidebar__label">{item.label}</span>
            </a>
          );
        })}
      </nav>

      <button
        type="button"
        className="sprint-sidebar__toggle"
        onClick={onToggleCollapsed}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        <Icon name={collapsed ? "chevron_right" : "chevron_left"} size={22} />
        <span className="sprint-sidebar__toggle-label">
          {collapsed ? "Expand" : "Collapse"}
        </span>
      </button>
    </aside>
  );
}

// Sticky top bar: sidebar logo + hackathon title + page title + profile (one row)
function SprintTopBar({ title, onNavigate, collapsed, onToggleCollapsed, brandWidth }) {
  return (
    <div className="sprint-top-bar">
      <div
        className={`sprint-top-bar__brand${collapsed ? " sprint-top-bar__brand--collapsed" : ""}`}
        style={{ width: brandWidth }}
      >
        {collapsed ? (
          <button
            type="button"
            className="sprint-top-bar__menu-btn"
            onClick={onToggleCollapsed}
            aria-label="Expand navigation"
          >
            <Icon name="menu" size={26} />
          </button>
        ) : (
          <div
            role="button"
            tabIndex={0}
            className="sprint-top-bar__brand-hit"
            onClick={() => onNavigate?.("/")}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onNavigate?.("/");
              }
            }}
          >
            <img
              src="/firststep-logo.png"
              alt="FirstStep"
              className="sprint-top-bar__brand-logo"
            />
          </div>
        )}
      </div>

      <header className="sprint-top-bar__header">
        <h2 className="sprint-top-bar__hackathon-title">First Step Annual Hackathon 2026</h2>
        <h2 className="sprint-top-bar__page-title">{title}</h2>
        <div className="sprint-top-bar__profile">
          <SprintUserMenu variant="header" />
        </div>
      </header>
    </div>
  );
}

// Mobile-only header: [menu] · logo (top) + event title (below) · [profile]
function SprintMobileHeader({ collapsed, onToggleCollapsed, onNavigate, headerRef, isGuest }) {
  return (
    <header className="sprint-mobile-header" ref={headerRef}>
      {!isGuest && (
        <button
          type="button"
          className="sprint-mobile-header__menu"
          onClick={onToggleCollapsed}
          aria-label={collapsed ? "Open navigation" : "Close navigation"}
          aria-expanded={!collapsed}
        >
          <Icon name={collapsed ? "menu" : "close"} size={22} />
        </button>
      )}

      <div className="sprint-mobile-header__brand">
        <a
          href="/"
          className="sprint-mobile-header__logo-link"
          onClick={(e) => {
            e.preventDefault();
            onNavigate?.("/");
          }}
        >
          <img
            src="/firststep-logo.png"
            alt="FirstStep"
            className="sprint-mobile-header__logo"
            width={278}
            height={156}
            decoding="async"
          />
        </a>
        <p className="sprint-mobile-header__hackathon">First Step Annual Hackathon 2026</p>
      </div>

      <div className="sprint-mobile-header__profile">
        <SprintUserMenu variant="header" />
      </div>
    </header>
  );
}

// Main Layout Component
export default function SprintLayout({ children, title, currentPath, onNavigate }) {
  const { isAuthenticated, loading: authLoading, isAdmin } = useHackathonAuth();
  const isGuest = !authLoading && !isAuthenticated;
  const isSubmission = currentPath === "/submission";
  const isRoadmap = currentPath === "/roadmap";
  const [sidebarCollapsed, setSidebarCollapsed] = useState(readSidebarCollapsed);
  const mobileHeaderRef = useRef(null);
  const [mobileTopBarHeight, setMobileTopBarHeight] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem(SIDEBAR_STORAGE_KEY, sidebarCollapsed ? "1" : "0");
    } catch {
      /* ignore */
    }
  }, [sidebarCollapsed]);

  /* Mobile: sync drawer offset to measured header height (inline desktop var must not leave a gap) */
  useLayoutEffect(() => {
    const el = mobileHeaderRef.current;
    if (!el || typeof window === "undefined") return undefined;

    const sync = () => {
      if (window.innerWidth <= 767) {
        setMobileTopBarHeight(el.offsetHeight);
      } else {
        setMobileTopBarHeight(null);
      }
    };

    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    window.addEventListener("resize", sync);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", sync);
    };
  }, []);

  /* Tab change: scroll to top, close mobile drawer */
  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    if (typeof window !== "undefined" && window.innerWidth <= 767) {
      setSidebarCollapsed(true);
    }
  }, [currentPath]);

  const toggleSidebar = useCallback(() => {
    setSidebarCollapsed((v) => !v);
  }, []);

  const closeSidebarOnMobile = useCallback(() => {
    if (window.innerWidth <= 767) {
      setSidebarCollapsed(true);
    }
  }, []);

  const sidebarWidth = sidebarCollapsed ? SPRINT_SIDEBAR_COLLAPSED_WIDTH : SPRINT_SIDEBAR_WIDTH;
  const contentOffset = isGuest ? 0 : sidebarWidth;
  const brandWidth = isGuest ? SPRINT_SIDEBAR_WIDTH : sidebarWidth;

  return (
    <div
      className={[
        "sprint-portal",
        isSubmission ? "sprint-portal--submission" : "",
        sidebarCollapsed ? "sprint-portal--sidebar-collapsed" : "",
        isGuest ? "sprint-portal--guest" : "",
      ].filter(Boolean).join(" ")}
      style={{
        "--sprint-sidebar-width": `${sidebarWidth}px`,
        "--sprint-content-offset": `${contentOffset}px`,
        "--sprint-top-bar-height":
          mobileTopBarHeight != null
            ? `${mobileTopBarHeight}px`
            : `${SPRINT_TOP_BAR_HEIGHT}px`,
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500&family=Hanken+Grotesk:wght@600;700;900&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        rel="stylesheet"
      />

      <SprintTopBar
        title={title}
        onNavigate={onNavigate}
        collapsed={sidebarCollapsed}
        onToggleCollapsed={toggleSidebar}
        brandWidth={brandWidth}
      />

      <SprintMobileHeader
        collapsed={sidebarCollapsed}
        onToggleCollapsed={toggleSidebar}
        onNavigate={onNavigate}
        headerRef={mobileHeaderRef}
        isGuest={isGuest}
      />

      {!isGuest && (
        <>
          {!sidebarCollapsed && (
            <div
              className="sprint-sidebar__mobile-backdrop"
              onClick={() => closeSidebarOnMobile()}
              aria-hidden="true"
            />
          )}

          <Sidebar
            currentPath={currentPath}
            onNavigate={onNavigate}
            collapsed={sidebarCollapsed}
            onToggleCollapsed={toggleSidebar}
            closeSidebarOnMobile={closeSidebarOnMobile}
            isAdmin={isAdmin}
          />
        </>
      )}

      <div className="sprint-portal__shell">
        <main className="sprint-portal__main">
          {isSubmission && <SubmissionCountdownBar />}
          <div
            className={[
              "sprint-portal__content",
              isSubmission ? "sprint-portal__content--submission" : "",
              isRoadmap ? "sprint-portal__content--roadmap" : "",
              isGuest ? "sprint-portal__content--guest" : "",
            ].filter(Boolean).join(" ")}
          >
            {children}
          </div>
        </main>
      </div>

      <div className="sprint-portal__footer-full">
        <Footer />
      </div>

      <WhatsAppButton />
    </div>
  );
}
