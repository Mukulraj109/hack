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
    <div className="sprint-dashboard-countdown" style={{
      fontFamily: "'Hanken Grotesk', sans-serif",
      fontSize: "32px",
      fontWeight: "600",
      color: "#00685f",
      letterSpacing: "-0.01em",
      lineHeight: "40px"
    }}>
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
    <GlassCard style={{
      padding: "24px",
      display: "flex",
      flexDirection: "column",
      height: "100%",
      opacity: status === "locked" ? 0.75 : 1,
      filter: status === "locked" ? "grayscale(50%)" : "none"
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
        <div style={{
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          background: `${config.bg}20`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: config.bg
        }}>
          <Icon name={config.icon} filled={config.filled} size={20} />
        </div>
        <span style={{
          padding: "2px 8px",
          borderRadius: "4px",
          fontSize: "10px",
          fontWeight: "700",
          textTransform: "uppercase",
          background: `${config.badge}20`,
          color: config.badge
        }}>
          {status}
        </span>
      </div>

      <h4 style={{
        fontFamily: "'Hanken Grotesk', sans-serif",
        fontSize: "18px",
        lineHeight: "24px",
        fontWeight: "600",
        color: "#191c1e",
        marginBottom: "8px"
      }}>{title}</h4>

      <p style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: "14px",
        lineHeight: "20px",
        color: "#3d4947",
        flex: 1
      }}>{description}</p>

      <div style={{ paddingTop: "16px", borderTop: "1px solid #eceef0", marginTop: "auto" }}>
        <a
          href={status === "locked" ? undefined : assetHref}
          onClick={(e) => {
            if (status === "locked" || assetHref === "#") e.preventDefault();
          }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: "none",
            border: "none",
            padding: 0,
            cursor: status === "locked" ? "not-allowed" : "pointer",
            color: status === "locked" ? "rgba(61, 73, 71, 0.4)" : "#00685f",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "12px",
            fontWeight: "500",
            textDecoration: "none",
          }}
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
    <GlassCard style={{
      overflow: "hidden",
      padding: 0,
      transform: isHovered && !playing ? "translateY(-4px) scale(1.02)" : "translateY(0) scale(1)"
    }}
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
    >
      <div
        style={{
          aspectRatio: "16/9",
          position: "relative",
          background: "#191c1e",
          cursor: playing ? "default" : "pointer"
        }}
        onClick={!playing ? handlePlay : undefined}
      >
        <video
          ref={videoRef}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: playing ? 1 : isHovered ? 0.8 : 0.6,
            transition: "opacity 0.3s ease"
          }}
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
          <div style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none"
          }}>
            <button
              type="button"
              aria-label="Play video"
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "50%",
                background: isHovered ? "#00685f" : "rgba(0, 104, 95, 0.9)",
                color: "#ffffff",
                border: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
                transform: isHovered ? "scale(1.1)" : "scale(1)",
                transition: "all 0.3s ease",
                pointerEvents: "auto"
              }}
            >
              <Icon name="play_arrow" filled size={32} />
            </button>
          </div>
        )}

        <div style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "16px",
          background: playing
            ? "linear-gradient(transparent, rgba(0, 0, 0, 0.65))"
            : "transparent",
          pointerEvents: "none"
        }}>
          <p style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "14px",
            color: "#ffffff",
            textShadow: "0 2px 4px rgba(0,0,0,0.5)"
          }}>{title}</p>
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
        <GlassCard style={{
          padding: "32px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
          overflow: "hidden"
        }}>
          <div style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "128px",
            height: "128px",
            background: "rgba(0, 104, 95, 0.05)",
            borderRadius: "50%",
            marginRight: "-64px",
            marginTop: "-64px",
            filter: "blur(32px)"
          }}></div>
          <div>
            <h2 className="sprint-hero-greeting">
              Hi, team{" "}
              <span className="sprint-hero-greeting__name">{teamLabel}</span>
            </h2>
          </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", alignItems: "center", marginTop: "24px" }}>
                {team && (
                  <span style={{
                    padding: "6px 14px",
                    background: teamStatusLabel === "Active" ? "#008378" : "#6d7a77",
                    color: "#f4fffc",
                    borderRadius: "9999px",
                    fontSize: "11px",
                    fontWeight: "700",
                    textTransform: "uppercase",
                    fontFamily: "'JetBrains Mono', monospace",
                    letterSpacing: "0.04em",
                  }}>{teamStatusLabel}</span>
                )}
                <div style={{
                  padding: "8px 16px",
                  background: "rgba(0, 104, 95, 0.1)",
                  color: "#00685f",
                  fontWeight: "700",
                  borderRadius: "8px",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "14px"
                }}>Points: {pointsCurrent} / {pointsMax}</div>
                {rank != null && team && (
                  <div style={{
                    padding: "8px 16px",
                    background: "#eceef0",
                    borderRadius: "8px",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "14px",
                  }}>
                    Rank #{rank}
                  </div>
                )}
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  <button
                    type="button"
                    disabled={!canWrite}
                    onClick={() => onNavigate?.("/submission")}
                    style={{
                    padding: "10px 24px",
                    background: "#00685f",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "9999px",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "14px",
                    cursor: canWrite ? "pointer" : "not-allowed",
                    opacity: canWrite ? 1 : 0.6,
                    boxShadow: "0 4px 14px rgba(0, 104, 95, 0.2)",
                    transition: "all 0.2s ease"
                  }}>Upload submission</button>
                  <button
                    type="button"
                    onClick={scrollToPoints}
                    style={{
                    padding: "10px 24px",
                    background: "transparent",
                    color: "#00685f",
                    border: "1px solid #00685f",
                    borderRadius: "9999px",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "14px",
                    cursor: "pointer"
                  }}>Score more points</button>
                  {!team && (
                    <button
                      type="button"
                      onClick={() => onNavigate?.("/team")}
                      style={{
                        padding: "10px 24px",
                        background: "transparent",
                        color: "#00685f",
                        border: "1px solid #00685f",
                        borderRadius: "9999px",
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "14px",
                        cursor: "pointer",
                      }}
                    >
                      Create or join team
                    </button>
                  )}
                </div>
              </div>
            </GlassCard>

            {/* Countdown */}
            <GlassCard style={{
              padding: "32px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              background: "linear-gradient(to bottom right, rgba(255,255,255,0.8), rgba(0, 104, 95, 0.05))"
            }}>
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
          <div className="sprint-dashboard-body" style={{ display: "flex", gap: "32px" }}>
            {/* Left Column */}
            <div style={{ flex: 1 }}>
              {/* Track Challenges */}
              <div style={{ marginBottom: "32px" }}>
                <h3 style={{
                  fontFamily: "'Hanken Grotesk', sans-serif",
                  fontSize: "24px",
                  lineHeight: "32px",
                  fontWeight: "600",
                  color: "#191c1e",
                  marginBottom: "24px",
                  paddingLeft: "4px"
                }}>Available Track Challenges</h3>
                <div className="sprint-dashboard-tracks" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
                  {trackCards.map((track) => (
                    <TrackCard key={track.id} {...track} trackId={track.id} />
                  ))}
                </div>
              </div>

              <SprintReelsSection />
              <SocialFollowLinks variant="inline-row" />
            </div>

            {/* Right Sidebar */}
            <aside className="sprint-dashboard-aside" style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
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
