import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./styles/sprint-portal.css";

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

// Enhanced Glass Card with 3D effect
function GlassCard({ children, style = {}, className = "", isActive = false, isMobile = false }) {
  const [isHovered, setIsHovered] = useState(false);
  const hoverLift = !isMobile && isHovered;

  return (
    <motion.div
      className={`roadmap-glass-card rounded-2xl p-8 ${className}`}
      style={{
        background: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: `1px solid rgba(255, 255, 255, ${isActive ? "0.8" : "0.5"})`,
        boxShadow: isActive
          ? `0 25px 50px -12px rgba(0, 106, 97, 0.25), 0 0 40px rgba(0, 106, 97, 0.15), inset 0 1px 0 rgba(255,255,255,0.8)`
          : hoverLift
          ? `0 20px 40px rgba(13, 148, 136, 0.15), inset 0 1px 0 rgba(255,255,255,0.8)`
          : `0 4px 20px rgba(13, 148, 136, 0.08), inset 0 1px 0 rgba(255,255,255,0.6)`,
        transform: hoverLift ? "translateY(-4px) scale(1.02)" : "translateY(0) scale(1)",
        transition: isMobile ? "box-shadow 0.25s ease" : "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        ...style
      }}
      onMouseEnter={isMobile ? undefined : () => setIsHovered(true)}
      onMouseLeave={isMobile ? undefined : () => setIsHovered(false)}
      whileHover={isMobile ? undefined : { y: -8 }}
    >
      {/* Top highlight */}
      <div
        className="absolute inset-x-8 top-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)",
          opacity: isActive ? 1 : 0.5
        }}
      />
      {children}
    </motion.div>
  );
}

// Timeline Node Marker with 3D effect
function TimelineNode({ status = "completed", isActive = false, isMobile = false }) {
  const config = {
    completed: { bg: "linear-gradient(135deg, #00685f 0%, #008378 100%)", icon: "check", glow: "#00685f" },
    active: { bg: "linear-gradient(135deg, #00685f 0%, #00a08a 100%)", icon: "play_arrow", glow: "#00685f" },
    locked: { bg: "linear-gradient(135deg, #6b7775 0%, #8a9290 100%)", icon: "lock", glow: "#6b7775" },
    upcoming: { bg: "linear-gradient(135deg, #006591 0%, #0087b8 100%)", icon: "star", glow: "#006591" },
  };
  const c = config[status] || config.completed;

  return (
    <motion.div
      className="relative"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      {/* Outer glow */}
      {isActive && (
        <div
          className="absolute inset-0 rounded-full animate-pulse"
          style={{
            background: c.glow,
            opacity: 0.3,
            filter: "blur(12px)",
            transform: "scale(1.5)"
          }}
        />
      )}
      {/* Main circle */}
      <motion.div
        className="w-16 h-16 rounded-full flex items-center justify-center shadow-xl"
        style={{
          background: c.bg,
          boxShadow: `0 8px 32px ${c.glow}40, inset 0 2px 4px rgba(255,255,255,0.3), inset 0 -2px 4px rgba(0,0,0,0.1)`,
        }}
        whileHover={isMobile ? undefined : { scale: 1.15 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        {/* Inner highlight */}
        <div
          className="absolute inset-2 rounded-full opacity-30"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.5) 0%, transparent 50%)"
          }}
        />
        <Icon name={c.icon} size={28} style={{ color: "#ffffff", position: "relative", zIndex: 1 }} />
      </motion.div>
      {/* Bottom connector */}
      <div
        className="roadmap-timeline-node__stem absolute left-1/2 top-full w-1 -translate-x-1/2"
        style={{
          height: "80px",
          background: status === "completed" || status === "active"
            ? "linear-gradient(180deg, #00685f 0%, #bcc9c6 100%)"
            : "linear-gradient(180deg, #bcc9c6 0%, #bcc9c6 100%)"
        }}
      />
    </motion.div>
  );
}

// Phase Header - positioned above timeline
function PhaseHeader({ phase, index }) {
  return (
    <motion.div
      className="roadmap-phase-header relative flex justify-center mb-12"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.6 }}
    >
      {/* Centered content card */}
      <div className="relative">
        {/* Decorative line extending from card */}
        <div
          className="absolute top-1/2 left-full w-24 h-px -translate-y-1/2"
          style={{
            background: `linear-gradient(90deg, ${phase.phaseColor}40, transparent)`
          }}
        />
        <div
          className="absolute top-1/2 right-full w-24 h-px -translate-y-1/2"
          style={{
            background: `linear-gradient(270deg, ${phase.phaseColor}40, transparent)`
          }}
        />

        <div className="text-center px-8 py-6 rounded-2xl" style={{
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.6)",
          boxShadow: "0 8px 32px rgba(13, 148, 136, 0.12)"
        }}>
          <div className="inline-flex items-center gap-3 mb-3">
            <span
              className="px-5 py-1.5 text-xs font-bold uppercase tracking-widest rounded-full"
              style={{
                background: phase.phaseBg,
                color: phase.phaseColor,
                boxShadow: `0 4px 16px ${phase.phaseColor}25`
              }}
            >
              {phase.phaseLabel}
            </span>
          </div>
          <h2
            className="text-3xl font-bold mb-2"
            style={{
              fontFamily: "'Hanken Grotesk', sans-serif",
              color: "#002B36",
              letterSpacing: "-0.02em"
            }}
          >
            {phase.title}
          </h2>
          <p className="text-base" style={{ color: "#6d7a77", fontFamily: "'Inter', sans-serif" }}>
            {phase.dateRange}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// Milestone Card with enhanced styling
function MilestoneCard({ milestone, index, isLeft, isMobile = false }) {
  const isGlowing = milestone.isGlowing;

  return (
    <motion.div
      className={`roadmap-milestone-row flex items-center gap-8 mb-16 ${isLeft ? "flex-row" : "flex-row-reverse"}`}
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.7, ease: "easeOut" }}
    >
      {/* Card */}
      <div className="flex-1 max-w-xl">
        <GlassCard isActive={isGlowing} isMobile={isMobile}>
          {milestone.content}
        </GlassCard>
      </div>

      {/* Timeline Node */}
      <div className="flex-shrink-0">
        <TimelineNode status={milestone.status} isActive={isGlowing} isMobile={isMobile} />
      </div>

      {/* Spacer for symmetry */}
      <div className="flex-1 max-w-xl" />
    </motion.div>
  );
}

const CARD_SPRING = { type: "spring", stiffness: 380, damping: 28 };

const CONTACT_EMAIL = "Hackathon@firststepjob.com";

/** Mobile-only: left FAB (like WhatsApp) with expandable contact panel */
function RoadmapContactFab({ onDismiss }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onDocClick = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  return (
    <div ref={rootRef} className="roadmap-contact-fab">
      <AnimatePresence>
        {open && (
          <motion.div
            className="roadmap-contact-fab__panel"
            role="dialog"
            aria-label="Contact support"
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
          >
            <button
              type="button"
              className="roadmap-contact-fab__panel-close"
              onClick={() => setOpen(false)}
              aria-label="Close contact menu"
            >
              <Icon name="close" size={18} style={{ color: "#6d7a77" }} />
            </button>
            <p className="roadmap-contact-fab__title">Have questions?</p>
            <p className="roadmap-contact-fab__subtitle">Contact the team</p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="roadmap-contact-fab__cta"
            >
              Contact Us
            </a>
            <button
              type="button"
              className="roadmap-contact-fab__dismiss"
              onClick={() => onDismiss?.()}
            >
              Don&apos;t show again
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        className={`roadmap-contact-fab__trigger${open ? " roadmap-contact-fab__trigger--open" : ""}`}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "Close contact menu" : "Open contact menu"}
      >
        <Icon name="support_agent" size={26} style={{ color: "#00685f" }} />
      </button>
    </div>
  );
}

// Desktop: floating contact bar in main column. Mobile: left FAB only.
function FloatingBanner({ isMobile = false }) {
  const [isVisible, setIsVisible] = useState(true);

  if (isMobile) {
    return isVisible ? <RoadmapContactFab onDismiss={() => setIsVisible(false)} /> : null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="roadmap-contact-dock"
          initial={{ opacity: 0, y: 48 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 32 }}
          transition={{ type: "spring", stiffness: 320, damping: 30 }}
        >
          <motion.div
            className="roadmap-contact-bar"
            whileHover={{ y: -4, boxShadow: "0 20px 50px rgba(0, 104, 95, 0.16)" }}
            transition={CARD_SPRING}
          >
            <div className="roadmap-contact-bar__head">
              <div className="roadmap-contact-bar__icon-wrap" aria-hidden>
                <Icon name="support_agent" size={22} style={{ color: "#00685f" }} />
              </div>

              <div className="roadmap-contact-bar__copy">
                <p className="roadmap-contact-bar__title">Have questions?</p>
                <p className="roadmap-contact-bar__subtitle">Contact the team</p>
              </div>

              <button
                type="button"
                className="roadmap-contact-bar__close"
                onClick={() => setIsVisible(false)}
                aria-label="Dismiss contact banner"
              >
                <Icon name="close" size={20} style={{ color: "#6d7a77" }} />
              </button>
            </div>

            <motion.a
              href={`mailto:${CONTACT_EMAIL}`}
              className="roadmap-contact-bar__cta"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 500, damping: 24 }}
            >
              Contact Us
            </motion.a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** Information sessions — Zoho signup per session (URLs from env when provided) */
const INFORMATION_SESSIONS = [
  {
    icon: "lightbulb",
    label: "Strategy & Briefs",
    formUrl: import.meta.env.VITE_ZOHO_INFO_SESSION_STRATEGY,
  },
  {
    icon: "code",
    label: "Technical Overview",
    formUrl: import.meta.env.VITE_ZOHO_INFO_SESSION_TECHNICAL,
  },
  {
    icon: "videocam",
    label: "Pitch & Demo Prep",
    formUrl: import.meta.env.VITE_ZOHO_INFO_SESSION_PITCH,
  },
];

function InformationSessionsMilestone({ isMobile = false }) {
  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, #00685f20 0%, #00685f10 100%)" }}
        >
          <Icon name="auto_stories" size={28} style={{ color: "#00685f" }} />
        </div>
        <div>
          <h3
            className="text-2xl font-bold"
            style={{ color: "#002B36", fontFamily: "'Hanken Grotesk', sans-serif" }}
          >
            Information sessions
          </h3>
          <p className="text-base" style={{ color: "#6d7a77" }}>
            Want to learn more about the hackathon? Join our session.
          </p>
        </div>
      </div>
      <div className="space-y-3">
        {INFORMATION_SESSIONS.map((session) => {
          const hasForm = Boolean(session.formUrl);
          const RowTag = hasForm ? motion.a : motion.div;
          const rowProps = hasForm
            ? {
                href: session.formUrl,
                target: "_blank",
                rel: "noopener noreferrer",
              }
            : {};

          return (
            <RowTag
              key={session.label}
              className="flex items-center justify-between p-4 rounded-xl transition-all hover:scale-[1.02]"
              style={{
                background: "#f8fafc",
                border: "1px solid rgba(0,0,0,0.05)",
                textDecoration: "none",
                cursor: hasForm ? "pointer" : "default",
              }}
              whileHover={isMobile ? undefined : { background: "#f0f4f4" }}
              {...rowProps}
            >
              <div className="flex items-center gap-3">
                <Icon name={session.icon} size={20} style={{ color: "#00685f" }} />
                <span className="font-medium" style={{ color: "#002B36" }}>
                  {session.label}
                </span>
              </div>
              <span
                className="text-sm font-semibold px-3 py-1 rounded-lg"
                style={{
                  background: hasForm ? "#00685f" : "#00685f15",
                  color: hasForm ? "#f4fffc" : "#00685f",
                }}
              >
                {hasForm ? "Sign up" : "Coming soon"}
              </span>
            </RowTag>
          );
        })}
      </div>
    </div>
  );
}

// Main Roadmap Content
export default function RoadmapContent() {
  const isMobile = useSprintMobileLayout();
  const phases = [
    {
      phaseLabel: "Phase 1",
      phaseBg: "linear-gradient(135deg, #e0e3e5 0%, #f0f2f3 100%)",
      phaseColor: "#6d7a77",
      title: "Pre-Sprint Setup",
      dateRange: "July 1 - July 7",
      milestones: [
        {
          status: "completed",
          content: (
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #00685f20 0%, #00685f10 100%)" }}>
                  <Icon name="celebration" size={28} style={{ color: "#00685f" }} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold" style={{ color: "#002B36", fontFamily: "'Hanken Grotesk', sans-serif" }}>Registration Launch</h3>
                  <p className="text-base" style={{ color: "#6d7a77" }}>July 1st, 12:00 PM EST</p>
                </div>
              </div>
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold"
                style={{
                  background: "linear-gradient(135deg, #ffdad6 0%, #ffe5e3 100%)",
                  color: "#93000a",
                  boxShadow: "0 2px 12px rgba(185, 26, 26, 0.15)"
                }}
              >
                <Icon name="warning" size={16} />
                LIMITED TO THE FIRST 100 TEAMS
              </div>
            </div>
          ),
        },
        {
          status: "completed",
          content: <InformationSessionsMilestone isMobile={isMobile} />,
        },
      ],
    },
    {
      phaseLabel: "Phase 2",
      phaseBg: "linear-gradient(135deg, rgba(0,104,95,0.15) 0%, rgba(0,104,95,0.08) 100%)",
      phaseColor: "#00685f",
      title: "The 100-Hour Arena",
      dateRange: "July 8 - July 12",
      milestones: [
        {
          status: "active",
          isGlowing: true,
          content: (
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{
                  background: "linear-gradient(135deg, #00685f 0%, #00a08a 100%)",
                  boxShadow: "0 8px 24px rgba(0, 104, 95, 0.4)"
                }}>
                  <Icon name="rocket_launch" size={28} style={{ color: "#ffffff" }} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold" style={{ color: "#002B36", fontFamily: "'Hanken Grotesk', sans-serif" }}>Kickoff & Track Reveal</h3>
                  <p className="text-base font-semibold" style={{ color: "#00685f" }}>July 8th, 8:00 PM EST</p>
                </div>
              </div>
              <p className="text-base leading-relaxed" style={{ color: "#3d4947" }}>
                Track briefs unlock and live build clock starts now. Tool-agnostic sprint begins.
              </p>
              <div className="mt-4 flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: "#00685f" }}></span>
                  <span className="relative inline-flex rounded-full h-3 w-3" style={{ background: "#00685f" }}></span>
                </span>
                <span className="text-sm font-semibold" style={{ color: "#00685f" }}>LIVE NOW</span>
              </div>
            </div>
          ),
        },
        {
          status: "locked",
          content: (
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #6b7775 0%, #8a9290 100%)" }}>
                  <Icon name="timer_off" size={28} style={{ color: "#ffffff" }} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold" style={{ color: "#002B36", fontFamily: "'Hanken Grotesk', sans-serif" }}>Hard Stop Deadline</h3>
                  <p className="text-base font-semibold" style={{ color: "#ba1a1a" }}>July 12th, 11:59 PM EST</p>
                </div>
              </div>
              <p className="text-base leading-relaxed" style={{ color: "#3d4947" }}>
                All links, codebases, and shareable Google Drive videos must be locked in.
              </p>
              <div className="mt-4 flex items-center gap-2">
                <Icon name="lock_clock" size={18} style={{ color: "#6d7a77" }} />
                <span className="text-sm" style={{ color: "#6d7a77" }}>Upcoming</span>
              </div>
            </div>
          ),
        },
      ],
    },
    {
      phaseLabel: "Phase 3",
      phaseBg: "linear-gradient(135deg, rgba(0,101,145,0.15) 0%, rgba(0,101,145,0.08) 100%)",
      phaseColor: "#006591",
      title: "The Matchmaking Results",
      dateRange: "July 13 - July 20",
      milestones: [
        {
          status: "upcoming",
          content: (
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #006591 0%, #0087b8 100%)" }}>
                  <Icon name="workspace_premium" size={28} style={{ color: "#ffffff" }} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold" style={{ color: "#002B36", fontFamily: "'Hanken Grotesk', sans-serif" }}>Final Evaluations</h3>
                  <p className="text-base font-semibold" style={{ color: "#006591" }}>July 17th, 8:00 PM EST</p>
                </div>
              </div>
              <p className="text-base leading-relaxed" style={{ color: "#3d4947" }}>
                Official scorecards published. Total point metrics finalized and winners notified directly via email.
              </p>
            </div>
          ),
        },
        {
          status: "upcoming",
          content: (
            <div className="relative">
              {/* Decorative gradient */}
              <div
                className="absolute -top-8 -right-8 w-40 h-40 rounded-full opacity-20"
                style={{ background: "linear-gradient(135deg, #00685f 0%, #006591 100%)", filter: "blur(40px)" }}
              />
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #00685f 0%, #008378 100%)" }}>
                    <Icon name="handshake" size={28} style={{ color: "#ffffff" }} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold" style={{ color: "#002B36", fontFamily: "'Hanken Grotesk', sans-serif" }}>Recruiter Pipeline</h3>
                    <p className="text-base font-semibold" style={{ color: "#00685f" }}>July 20th, 9:00 AM EST</p>
                  </div>
                </div>
                <p className="text-base leading-relaxed mb-6" style={{ color: "#3d4947" }}>
                  <strong style={{ color: "#002B36" }}>The Grand Finale:</strong> Matchmaking profile data, verified resumes, and the top 10 portfolio packages are formally submitted to our 30+ enterprise recruiting partners.
                </p>
                <div className="flex gap-3">
                  {["MATCHMAKING", "PLACEMENT", "RECRUITING"].map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-2 rounded-xl text-xs font-bold"
                      style={{
                        background: "linear-gradient(135deg, rgba(0, 104, 95, 0.1) 0%, rgba(0, 104, 95, 0.05) 100%)",
                        color: "#00685f",
                        border: "1px solid rgba(0, 104, 95, 0.2)"
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ),
        },
      ],
    },
  ];

  return (
    <div className="roadmap-shell relative min-h-screen" style={{ background: "linear-gradient(180deg, #f7f9fb 0%, #f0f4f4 50%, #f7f9fb 100%)" }}>
      {/* Background decorations */}
      <div
        className="fixed top-0 right-0 w-[600px] h-[600px] rounded-full opacity-30 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(0, 104, 95, 0.15) 0%, transparent 70%)", filter: "blur(60px)" }}
      />
      <div
        className="fixed bottom-0 left-0 w-[500px] h-[500px] rounded-full opacity-20 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(0, 101, 145, 0.15) 0%, transparent 70%)", filter: "blur(60px)" }}
      />

      <div className="roadmap-page relative max-w-6xl mx-auto px-8 py-16">
        {/* Hero Header */}
        <motion.header
          className="text-center mb-20"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            className="inline-flex items-center gap-3 px-5 py-2 rounded-full mb-6"
            style={{
              background: "linear-gradient(135deg, rgba(0, 104, 95, 0.1) 0%, rgba(0, 101, 145, 0.1) 100%)",
              border: "1px solid rgba(0, 104, 95, 0.2)"
            }}
          >
            <Icon name="timeline" size={18} style={{ color: "#00685f" }} />
            <span className="text-sm font-semibold" style={{ color: "#00685f" }}>Event Roadmap</span>
          </motion.div>

          <h1
            className="text-5xl md:text-6xl font-bold mb-6"
            style={{
              fontFamily: "'Hanken Grotesk', sans-serif",
              color: "#002B36",
              letterSpacing: "-0.03em",
              lineHeight: 1.1
            }}
          >
            Event Timeline &{" "}
            <span style={{
              background: "linear-gradient(135deg, #00685f 0%, #006591 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}>
              Roadmap
            </span>
          </h1>

          <p
            className="text-xl max-w-3xl mx-auto"
            style={{
              color: "#6d7a77",
              fontFamily: "'Inter', sans-serif",
              lineHeight: 1.7
            }}
          >
            Track your journey through the Spring Hackathon. Stay ahead of deadlines and unlock milestones as we build the future together.
          </p>
        </motion.header>

        {/* Timeline Container */}
        <div className="roadmap-timeline relative">
          {/* Central Timeline Line */}
          <div
            className="absolute left-1/2 top-0 bottom-0 w-2 -translate-x-1/2 rounded-full hidden md:block"
            style={{
              background: "linear-gradient(180deg, #bcc9c6 0%, #00685f 20%, #00685f 80%, #bcc9c6 100%)",
              boxShadow: "0 0 30px rgba(0, 104, 95, 0.3)"
            }}
          />

          {/* Phases */}
          {phases.map((phase, phaseIndex) => (
            <div key={phaseIndex} className="mb-24">
              <PhaseHeader phase={phase} index={phaseIndex} />

              {/* Milestones */}
              <div className="space-y-20">
                {phase.milestones.map((milestone, milestoneIndex) => (
                  <MilestoneCard
                    key={milestoneIndex}
                    milestone={milestone}
                    index={milestoneIndex}
                    isLeft={milestoneIndex % 2 === 0}
                    isMobile={isMobile}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="roadmap-page__footer-spacer h-32" aria-hidden="true" />
      </div>

      <FloatingBanner isMobile={isMobile} />
    </div>
  );
}
