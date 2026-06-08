import { useState, useRef } from "react";
import { useHackathonAuth } from "./auth/HackathonAuthContext";
import { useSprintDashboard } from "./hooks/useSprintDashboard";
import { useCountdownTick } from "./hooks/useConfigCountdown";
import SprintReelsSection from "./components/sprint/SprintReelsSection";
import SprintTrackPickModal from "./components/sprint/SprintTrackPickModal";
import PointsTrackerItem from "./components/sprint/PointsTrackerItem";
import { DashboardSkeleton } from "./components/sprint/SprintPageSkeleton";
import SprintLoadError from "./components/sprint/SprintLoadError";
import SocialFollowLinks from "./components/SocialFollowLinks";
import SocialShareClaimModal from "./components/SocialShareClaimModal";

/** Placeholder panel until judge CMS; photos via env or defaults */
const SPRINT_JUDGES = [
  {
    name: "Dr. Aris Thorne",
    role: "CTO @ NexCore",
    expertise: "AI Ethics",
    initials: "AT",
    imageUrl:
      import.meta.env.VITE_JUDGE_PHOTO_ARIS ||
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=480&h=360&fit=crop&crop=faces",
  },
  {
    name: "Elena Rodriguez",
    role: "VP Prod @ Flow",
    expertise: "UX/UI",
    initials: "ER",
    imageUrl:
      import.meta.env.VITE_JUDGE_PHOTO_ELENA ||
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=480&h=360&fit=crop&crop=faces",
  },
];

// Countdown Timer Component
function CountdownTimer({ targetDate }) {
  const timeLeft = useCountdownTick(targetDate);

  return (
    <div className="sprint-dashboard-countdown">
      {String(timeLeft.days).padStart(2, "0")}d : {String(timeLeft.hours).padStart(2, "0")}h : {String(timeLeft.minutes).padStart(2, "0")}m : {String(timeLeft.seconds).padStart(2, "0")}s
    </div>
  );
}

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
function Sidebar({ onNavigate }) {
  const navItems = [
    { icon: "dashboard", label: "Dashboard", active: true, href: "/sprint" },
    { icon: "upload_file", label: "Submission", active: false, href: "/submission" },
    { icon: "map", label: "Roadmap", active: false, href: "#" },
    { icon: "group", label: "Team", active: false, href: "#" },
    { icon: "event", label: "Event Site", active: false, href: "#" },
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
      {/* Logo and Branding */}
      <div style={{ marginBottom: "24px", paddingLeft: "16px" }}>
        <img
          src="/firststep-logo.png"
          alt="FirstStep Logo"
          style={{
            width: "180px",
            height: "auto",
            display: "block",
            marginBottom: "0px"
          }}
        />
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "14px",
          fontWeight: "600",
          color: "#3d4947",
          margin: 0,
          paddingLeft: "24px"
        }}>Hackathon Portal</p>
      </div>

      <nav style={{ flex: 1, display: "flex", flexDirection: "column", gap: "4px" }}>
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href === "#" ? "#" : undefined}
            onClick={(e) => {
              e.preventDefault();
              if (item.href !== "#" && onNavigate) {
                onNavigate(item.href);
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
              borderRight: item.active ? "4px solid #00685f" : "4px solid transparent",
              background: item.active ? "rgba(0, 104, 95, 0.1)" : "transparent",
              color: item.active ? "#00685f" : "#3d4947",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "14px",
              fontWeight: item.active ? "700" : "500",
              textDecoration: "none",
              transition: "all 0.2s ease",
              transform: "translateX(0)",
              cursor: "pointer"
            }}
            onMouseEnter={(e) => {
              if (!item.active) {
                e.currentTarget.style.background = "#eceef0";
                e.currentTarget.style.transform = "translateX(4px)";
              }
            }}
            onMouseLeave={(e) => {
              if (!item.active) {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.transform = "translateX(0)";
              }
            }}
          >
            <Icon name={item.icon} filled={item.active} />
            {item.label}
          </a>
        ))}
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

// Hoverable Card Component
function GlassCard({ children, style = {}, className = "", id }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      id={id}
      className={className}
      style={{
        background: "rgba(255, 255, 255, 0.85)",
        backdropFilter: isHovered ? "blur(16px)" : "blur(12px)",
        border: isHovered ? "1px solid rgba(255, 255, 255, 0.8)" : "1px solid rgba(255, 255, 255, 0.4)",
        boxShadow: isHovered ? "0 8px 30px rgba(13, 148, 136, 0.12)" : "0 4px 20px rgba(13, 148, 136, 0.08)",
        borderRadius: "12px",
        transform: isHovered ? "translateY(-4px) scale(1.01)" : "translateY(0) scale(1)",
        transition: "all 0.3s ease",
        ...style
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </div>
  );
}

// Track Card Component
function TrackCard({ status, title, description, trackId }) {
  const assetHref =
    import.meta.env[`VITE_TRACK_ASSET_${String(trackId || "").toUpperCase().replace(/-/g, "_")}`] || "#";
  const statusConfig = {
    completed: { bg: "#00685f", badge: "#008378", icon: "check_circle", filled: true },
    active: { bg: "#006591", badge: "#006591", icon: "play_circle", filled: true },
    locked: { bg: "#e0e3e5", badge: "#3d4947", icon: "lock", filled: false },
  };
  const config = statusConfig[status];

  return (
    <GlassCard className={`sprint-track-card${status === "locked" ? " sprint-track-card--locked" : ""}`}>
      <div className="sprint-track-card__head">
        <div
          className="sprint-track-card__icon"
          style={{ background: `${config.bg}20`, color: config.bg }}
        >
          <Icon name={config.icon} filled={config.filled} size={20} />
        </div>
        <span
          className="sprint-track-card__status"
          style={{ background: `${config.badge}20`, color: config.badge }}
        >
          {status}
        </span>
      </div>

      <h4 className="sprint-track-card__title">{title}</h4>
      <p className="sprint-track-card__desc">{description}</p>

      <div className="sprint-track-card__footer">
        <a
          href={status === "locked" ? undefined : assetHref}
          onClick={(e) => {
            if (status === "locked" || assetHref === "#") e.preventDefault();
          }}
          className={`sprint-track-card__asset ${
            status === "locked" ? "sprint-track-card__asset--locked" : "sprint-track-card__asset--active"
          }`}
        >
          <Icon name="download" size={16} />
          Asset Pack
        </a>
      </div>
    </GlassCard>
  );
}

// Judge profile card — photo + details (matches portal glass cards)
function JudgeProfileCard({ name, role, expertise, initials, imageUrl }) {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <GlassCard className="sprint-judge-card" style={{ padding: 0, overflow: "hidden" }}>
      <div className="sprint-judge-card__media">
        {!imgFailed && imageUrl ? (
          <img
            src={imageUrl}
            alt=""
            className="sprint-judge-card__photo"
            loading="lazy"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <div className="sprint-judge-card__fallback" aria-hidden="true">
            {initials}
          </div>
        )}
      </div>
      <div className="sprint-judge-card__body">
        <p className="sprint-judge-card__name">{name}</p>
        <p className="sprint-judge-card__role">{role}</p>
        <span className="sprint-judge-card__expertise">{expertise}</span>
      </div>
    </GlassCard>
  );
}

// Video Player Component
function VideoPlayer({ title, videoUrl, posterUrl }) {
  const [isHovered, setIsHovered] = useState(false);
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef(null);

  const src = videoUrl || "https://www.w3schools.com/html/mov_bbb.mp4";

  const handlePlay = () => {
    const el = videoRef.current;
    if (!el || playing) return;
    el.play().catch(() => {});
  };

  return (
    <GlassCard
      className="sprint-dashboard-video"
      style={{
        transform: isHovered && !playing ? "translateY(-4px) scale(1.02)" : "translateY(0) scale(1)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`sprint-dashboard-video__stage ${playing ? "sprint-dashboard-video__stage--playing" : "sprint-dashboard-video__stage--idle"}`}
        onClick={!playing ? handlePlay : undefined}
      >
        <video
          ref={videoRef}
          className="sprint-dashboard-video__media"
          style={{ opacity: playing ? 1 : isHovered ? 0.8 : 0.6 }}
          poster={posterUrl || ""}
          muted
          loop
          playsInline
          controls={playing}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
        >
          <source src={src} type="video/mp4" />
        </video>

        {!playing && (
          <div className="sprint-dashboard-video__overlay">
            <button
              type="button"
              aria-label="Play video"
              className={`sprint-dashboard-video__play ${
                isHovered ? "sprint-dashboard-video__play--hover" : "sprint-dashboard-video__play--idle"
              }`}
            >
              <Icon name="play_arrow" filled size={32} />
            </button>
          </div>
        )}

        <div className={`sprint-dashboard-video__caption${playing ? " sprint-dashboard-video__caption--playing" : ""}`}>
          <p className="sprint-dashboard-video__title">{title}</p>
        </div>
      </div>
    </GlassCard>
  );
}

// Main Sprint Dashboard Component - Content Only (layout provided by SprintLayout)
export default function SprintDashboard({ onNavigate }) {
  const dash = useSprintDashboard();
  const {
    loading,
    error,
    reload,
    refreshPointsBreakdown,
    refreshSession,
    canWrite,
    team,
    teamLabel,
    teamStatusLabel,
    teamTrack,
    trackCards,
    pointsItems,
    pointsRailProgress,
    pointsCurrent,
    pointsMax,
    pointsProgressPercent,
    sprintEndDate,
    countdownProgress,
    rank,
    isCaptain,
    configTracks,
  } = dash;

  const { getAccessToken } = useHackathonAuth();
  const [trackModalOpen, setTrackModalOpen] = useState(false);
  const [dismissedTrackPick, setDismissedTrackPick] = useState(false);
  const [socialClaimPlatform, setSocialClaimPlatform] = useState(null);

  const showTrackPick =
    team &&
    isCaptain &&
    !teamTrack &&
    canWrite &&
    !dismissedTrackPick &&
    !loading;

  const endLabel = sprintEndDate
    ? `Ends ${sprintEndDate.toLocaleString(undefined, { dateStyle: "short", timeStyle: "short" })}`
    : "Deadline TBA";

  const briefingVideo =
    import.meta.env.VITE_SPRINT_BRIEFING_VIDEO ||
    "https://www.w3schools.com/html/mov_bbb.mp4";
  const briefingPoster = import.meta.env.VITE_SPRINT_BRIEFING_POSTER || "";

  const scrollToPoints = () => {
    document.getElementById("points-tracker")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const socialShareModal = (
    <SocialShareClaimModal
      open={socialClaimPlatform != null}
      platform={socialClaimPlatform ?? "instagram"}
      onClose={() => setSocialClaimPlatform(null)}
      onSubmitted={refreshPointsBreakdown}
    />
  );

  if (loading) {
    return (
      <>
        <DashboardSkeleton />
        {socialShareModal}
      </>
    );
  }

  if (error) {
    return (
      <>
        <SprintLoadError
          message={error}
          onRetry={async () => {
            await refreshSession({ silent: true });
            await reload();
          }}
        />
        {socialShareModal}
      </>
    );
  }

  return (
    <>
      <SprintTrackPickModal
        open={showTrackPick || trackModalOpen}
        teamId={team?.id}
        tracks={configTracks}
        getAccessToken={getAccessToken}
        onClose={() => {
          setTrackModalOpen(false);
          setDismissedTrackPick(true);
        }}
        onSaved={async () => {
          await refreshSession();
          reload();
        }}
      />

      {socialShareModal}

      {/* Hero Banner */}
      <section className="sprint-dashboard-hero">
        {/* Main Hero */}
        <GlassCard className="sprint-dashboard-hero-card">
          <div className="sprint-dashboard-hero-card__glow" aria-hidden="true" />
          <div className="sprint-dashboard-hero-card__body">
            <h2 className="sprint-hero-greeting">
              Hi, team{" "}
              <span className="sprint-hero-greeting__name">{teamLabel}</span>
            </h2>

            <div className="sprint-dashboard-hero-stats">
              {team && (
                <span
                  className={`sprint-hero-stat sprint-hero-stat--status${
                    teamStatusLabel === "Active" ? " is-active" : ""
                  }`}
                >
                  {teamStatusLabel}
                </span>
              )}
              <span className="sprint-hero-stat sprint-hero-stat--points">
                <span className="sprint-hero-stat__value">
                  {pointsCurrent}
                  <span className="sprint-hero-stat__sep">/</span>
                  {pointsMax}
                </span>
                <span className="sprint-hero-stat__label">pts</span>
              </span>
              {rank != null && team && (
                <span className="sprint-hero-stat sprint-hero-stat--rank">
                  <span className="sprint-hero-stat__label">Rank</span>
                  <span className="sprint-hero-stat__value">#{rank}</span>
                </span>
              )}
            </div>

            <div className="sprint-dashboard-hero-actions">
              <button
                type="button"
                disabled={!canWrite}
                onClick={() => onNavigate?.("/submission")}
                className="sprint-hero-btn sprint-hero-btn--primary"
              >
                Upload submission
              </button>
              <button
                type="button"
                onClick={scrollToPoints}
                className="sprint-hero-btn sprint-hero-btn--secondary"
              >
                Score more points
              </button>
              {!team && (
                <button
                  type="button"
                  onClick={() => onNavigate?.("/team")}
                  className="sprint-hero-btn sprint-hero-btn--secondary sprint-hero-btn--full"
                >
                  Create or join team
                </button>
              )}
            </div>
          </div>
        </GlassCard>

            {/* Countdown */}
            <GlassCard className="sprint-dashboard-countdown-card">
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "12px",
                color: "#3d4947",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: "16px"
              }}>Submission Countdown</span>
              <CountdownTimer targetDate={sprintEndDate} />
              <p style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "12px",
                color: "#3d4947",
                opacity: 0.7,
                marginTop: "8px"
              }}>{endLabel}</p>
              <div style={{ width: "100%", height: "4px", background: "#eceef0", borderRadius: "9999px", marginTop: "24px", overflow: "hidden" }}>
                <div style={{ width: `${countdownProgress}%`, height: "100%", background: "#00685f", borderRadius: "9999px" }}></div>
              </div>
            </GlassCard>
          </section>

          {/* Two-Column Layout */}
          <div className="sprint-dashboard-body">
            {/* Left Column */}
            <div className="sprint-dashboard-main">
              {/* Track Challenges */}
              <div className="sprint-dashboard-section">
                <h3 className="sprint-dashboard-section__title">Available Track Challenges</h3>
                <div className="sprint-dashboard-tracks">
                  {trackCards.map((track) => (
                    <TrackCard key={track.id} {...track} trackId={track.id} />
                  ))}
                </div>
              </div>

              <SprintReelsSection />
              <SocialFollowLinks variant="inline-row" className="sprint-dashboard-social" />
            </div>

            {/* Right Sidebar */}
            <aside className="sprint-dashboard-aside">
              {/* Points Tracker */}
              <GlassCard id="points-tracker" className="points-tracker-card">
                <h4 className="points-tracker-card__title">Points Tracker</h4>
                <div className="points-tracker-list">
                  <div
                    className="points-tracker-list__rail"
                    aria-hidden
                    style={{
                      background: `linear-gradient(180deg, #00685f 0%, #00685f ${pointsRailProgress}%, #eceef0 ${pointsRailProgress}%, #eceef0 100%)`,
                    }}
                  />
                  {pointsItems.map((item) => (
                    <PointsTrackerItem
                      key={item.id}
                      {...item}
                      onClaimClick={setSocialClaimPlatform}
                    />
                  ))}
                </div>
                <div style={{ marginTop: "32px", paddingTop: "24px", borderTop: "1px solid #eceef0" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                    <span style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "12px",
                      color: "#3d4947"
                    }}>Total Progress</span>
                    <span style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "12px",
                      fontWeight: "700",
                      color: "#00685f"
                    }}>{pointsCurrent} / {pointsMax}</span>
                  </div>
                  <div style={{ width: "100%", height: "8px", background: "#eceef0", borderRadius: "9999px", overflow: "hidden" }}>
                    <div style={{ width: `${pointsProgressPercent}%`, height: "100%", background: "#00685f" }}></div>
                  </div>
                </div>
              </GlassCard>

              {/* Briefing Video */}
              <VideoPlayer
                title="How to win the FirstStep Hackathon"
                videoUrl={briefingVideo}
                posterUrl={briefingPoster}
              />

              {/* Judging Panel */}
              <div className="sprint-judges-panel">
                <h4 className="sprint-judges-panel__title">Judging Panel</h4>
                <div className="sprint-judges-panel__list">
                  {SPRINT_JUDGES.map((judge) => (
                    <JudgeProfileCard key={judge.name} {...judge} />
                  ))}
                </div>
              </div>
            </aside>
          </div>
    </>
  );
}
