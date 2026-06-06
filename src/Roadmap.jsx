import { useEffect, useState } from "react";
import InfoSessionFormModal from "./components/InfoSessionFormModal";
import { useConfigCountdown } from "./hooks/useConfigCountdown";
import { RoadmapSkeleton } from "./components/sprint/SprintPageSkeleton";
import { navigateTo } from "./lib/appNavigation";
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

function getStatus(startStr, endStr) {
  const now = new Date();
  const start = new Date(startStr);
  const end = endStr ? new Date(endStr) : new Date(startStr);
  if (now > end) return "completed";
  if (now >= start && now <= end) return "active";
  return "upcoming";
}

const pointsSummary = [
  { action: "Registration", points: 25, icon: "📝" },
  { action: "Social Sharing", points: 50, icon: "📣" },
  { action: "Judge Evaluation", points: 175, icon: "⚖️" },
];

const phases = [
  {
    id: 1,
    icon: "🏁",
    title: "Pre-Sprint Setup",
    dates: "July 1 – July 7",
    color: "#00c5a3",
    milestones: [
      {
        title: "Registration Launch",
        date: "July 1st, 12:00 PM EST",
        start: "2026-07-01T12:00:00",
        end: "2026-07-07T23:59:59",
        description: "Sign up and secure your spot. Applications reviewed within 24 hours.",
        badge: "⚡ SPOTS CAPPED AT 100 TEAMS",
        badgeColor: "#ef4444",
        icon: "🚀",
        side: "left",
      },
      {
        title: "Team Formation Opens",
        date: "July 1st",
        start: "2026-07-01T00:00:00",
        end: "2026-07-07T23:59:59",
        description:
          "Create your 2-member team or join one with a team code. Solo builders must create a team to participate. Bank 25 points instantly.",
        icon: "👥",
        side: "right",
      },
      {
        title: "Share & Earn 50 Points",
        date: "July 1 – July 7",
        start: "2026-07-01T00:00:00",
        end: "2026-07-07T23:59:59",
        description:
          "Download pre-built templates from the Teams tab, post on LinkedIn and Instagram, submit screenshots on your dashboard. 50 easy points before the sprint begins.",
        icon: "📣",
        side: "left",
      },
      {
        title: "Information Sessions",
        date: "Before July 8th",
        start: "2026-07-01T00:00:00",
        end: "2026-07-07T23:59:59",
        description:
          "Free live sessions to get you sprint-ready. Join, ask questions, and get clarity before the build begins.",
        icon: "🎓",
        side: "right",
        hasSignup: true,
      },
    ],
  },
  {
    id: 2,
    icon: "⚡",
    title: "The 100-Hour Arena",
    dates: "July 8 – July 12",
    color: "#006875",
    milestones: [
      {
        title: "Kickoff & Track Reveal",
        date: "July 8th, 8:00 PM EST",
        start: "2026-07-08T20:00:00",
        end: "2026-07-08T23:59:59",
        description:
          "Track briefs go live and the 100-hour build clock starts ticking. Pick your tools, pick your approach — no restrictions.",
        icon: "⚡",
        side: "left",
      },
      {
        title: "Starter Assets Released",
        date: "July 8th, 8:00 PM EST",
        start: "2026-07-08T20:00:00",
        end: "2026-07-08T23:59:59",
        description:
          "Track-specific Git repos and starter assets drop at kickoff. Each track comes with its own starting kit to hit the ground running.",
        icon: "📦",
        side: "right",
      },
      {
        title: "Hard Stop Deadline",
        date: "July 12th, 11:59 PM EST",
        start: "2026-07-12T00:00:00",
        end: "2026-07-12T23:59:59",
        description: "Final call — lock in all 3 deliverables. No extensions, no exceptions.",
        icon: "🔒",
        side: "left",
        subItems: [
          { title: "Video Demo", desc: "Google Drive link (public access) with your approach and live demo" },
          { title: "Git Repo URL", desc: "Your complete project codebase" },
          { title: "Written Document", desc: "Completed FirstStep questionnaire" },
        ],
      },
    ],
  },
  {
    id: 3,
    icon: "🏆",
    title: "The Finish Line",
    dates: "July 13 – July 20",
    color: "#e8a0bf",
    milestones: [
      {
        title: "Final Evaluations",
        date: "July 17th, 8:00 PM EST",
        start: "2026-07-17T20:00:00",
        end: "2026-07-17T23:59:59",
        description:
          "Official scorecards go live. Projects judged on creativity, execution, problem understanding, and uniqueness of solution.",
        icon: "📊",
        side: "right",
      },
      {
        title: "Winners Announced",
        date: "July 20th",
        start: "2026-07-20T00:00:00",
        end: "2026-07-20T23:59:59",
        description: "Final rankings published and winners notified directly by email.",
        icon: "🏆",
        side: "left",
      },
      {
        title: "Top 10 → Recruiter Spotlight",
        date: "After July 20th",
        start: "2026-07-21T00:00:00",
        end: "2026-07-31T23:59:59",
        description:
          "Top 10 teams automatically packaged as a premium talent bundle — live demo, GitHub repo, and resumes sent directly to 30+ elite recruiters.",
        badge: "🔥 YOUR WORK MEETS PEOPLE WHO HIRE",
        badgeColor: "#006875",
        icon: "🤝",
        side: "right",
      },
      {
        title: "Credentials Issued",
        date: "After July 20th",
        start: "2026-07-21T00:00:00",
        end: "2026-07-31T23:59:59",
        description:
          "Every participant who completed the challenge receives a verified digital badge and certificate of participation.",
        icon: "🎖️",
        side: "left",
      },
    ],
  },
];

const statusConfig = {
  completed: { dot: "#22c55e", label: "Done" },
  active: { dot: "#f59e0b", label: "Live Now" },
  upcoming: { dot: "#94a3b8", label: "Upcoming" },
};

function CardContent({ milestone, phaseColor, status, onSignupClick }) {
  const [hovered, setHovered] = useState(false);
  const s = statusConfig[status];

  return (
    <div
      className="roadmap-v2__card"
      style={{
        borderColor: hovered ? phaseColor : "#e2e8f0",
        boxShadow: hovered
          ? `0 8px 32px ${phaseColor}18, 0 2px 8px rgba(0,0,0,0.06)`
          : "0 1px 4px rgba(0,0,0,0.04)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="roadmap-v2__status">
        <span
          className={`roadmap-v2__status-dot${status === "active" ? " roadmap-v2__status-dot--pulse" : ""}`}
          style={{ background: s.dot }}
        />
        <span className="roadmap-v2__status-label" style={{ color: s.dot }}>
          {s.label}
        </span>
      </div>

      <div className="roadmap-v2__card-icon">{milestone.icon}</div>

      <h3 className="roadmap-v2__card-title">{milestone.title}</h3>

      <div className="roadmap-v2__card-date" style={{ color: phaseColor }}>
        {milestone.date}
      </div>

      {milestone.badge && (
        <div
          className="roadmap-v2__badge"
          style={{
            background: `${milestone.badgeColor}14`,
            color: milestone.badgeColor,
            borderColor: `${milestone.badgeColor}33`,
          }}
        >
          {milestone.badge}
        </div>
      )}

      <p className="roadmap-v2__card-desc">{milestone.description}</p>

      {milestone.hasSignup && (
        <button
          type="button"
          className="roadmap-v2__signup-btn"
          style={{ background: phaseColor }}
          onClick={onSignupClick}
          aria-label="Sign up for an information session"
        >
          Sign Up for a Session
          <span aria-hidden="true">→</span>
        </button>
      )}

      {milestone.subItems && (
        <div className="roadmap-v2__sub-items">
          {milestone.subItems.map((item, i) => (
            <div
              key={item.title}
              className="roadmap-v2__sub-item"
              style={{ borderLeftColor: phaseColor }}
            >
              <div className="roadmap-v2__sub-item-title">{item.title}</div>
              <div className="roadmap-v2__sub-item-desc">{item.desc}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function milestoneDotClass(status) {
  return `roadmap-v2__milestone-dot roadmap-v2__milestone-dot--${status}`;
}

function milestoneDotStyle(status, phaseColor) {
  const s = statusConfig[status];
  return {
    background: status === "completed" ? s.dot : "#fff",
    borderColor: status === "active" ? phaseColor : s.dot,
    boxShadow:
      status === "active"
        ? `0 0 0 6px ${phaseColor}22`
        : status === "completed"
          ? `0 0 0 4px ${s.dot}28`
          : undefined,
  };
}

function MilestoneCard({ milestone, phaseColor, index, onSignupClick, isMobile }) {
  const [visible, setVisible] = useState(false);
  const status = getStatus(milestone.start, milestone.end);
  const s = statusConfig[status];
  const isLeft = milestone.side === "left";

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 120 * index + 200);
    return () => clearTimeout(timer);
  }, [index]);

  if (isMobile) {
    return (
      <div
        className={`roadmap-v2__milestone-row roadmap-v2__milestone-row--mobile${visible ? " roadmap-v2__milestone-row--visible" : ""}`}
      >
        <div className="roadmap-v2__milestone-mobile-dot-wrap">
          <div
            className={milestoneDotClass(status)}
            style={milestoneDotStyle(status, phaseColor)}
          />
        </div>
        <CardContent
          milestone={milestone}
          phaseColor={phaseColor}
          status={status}
          onSignupClick={onSignupClick}
        />
      </div>
    );
  }

  return (
    <div
      className={`roadmap-v2__milestone-row${visible ? " roadmap-v2__milestone-row--visible" : ""}`}
    >
      <div className="roadmap-v2__milestone-side roadmap-v2__milestone-side--left">
        {isLeft && (
          <CardContent
            milestone={milestone}
            phaseColor={phaseColor}
            status={status}
            onSignupClick={onSignupClick}
          />
        )}
      </div>

      <div className="roadmap-v2__milestone-center">
        <div
          className={milestoneDotClass(status)}
          style={milestoneDotStyle(status, phaseColor)}
        />
        <div
          className="roadmap-v2__milestone-line"
          style={{ background: `linear-gradient(to bottom, ${s.dot}44, ${s.dot}11)` }}
        />
      </div>

      <div className="roadmap-v2__milestone-side roadmap-v2__milestone-side--right">
        {!isLeft && (
          <CardContent
            milestone={milestone}
            phaseColor={phaseColor}
            status={status}
            onSignupClick={onSignupClick}
          />
        )}
      </div>
    </div>
  );
}

function SectionHeader({ phase }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={`roadmap-v2__section-header${visible ? " roadmap-v2__section-header--visible" : ""}`}>
      <div className="roadmap-v2__section-icon">{phase.icon}</div>
      <h2 className="roadmap-v2__section-title">{phase.title}</h2>
      <p className="roadmap-v2__section-dates">{phase.dates}</p>
    </div>
  );
}

function PointsSummaryRow() {
  return (
    <div className="roadmap-v2__points">
      {pointsSummary.map((p) => (
        <div key={p.action} className="roadmap-v2__points-card">
          <span className="roadmap-v2__points-icon">{p.icon}</span>
          <div className="roadmap-v2__points-copy">
            <div className="roadmap-v2__points-label">{p.action}</div>
            <div className="roadmap-v2__points-value">{p.points} pts</div>
          </div>
        </div>
      ))}
      <div className="roadmap-v2__points-total">
        <span className="roadmap-v2__points-icon">🎯</span>
        <div className="roadmap-v2__points-copy">
          <div className="roadmap-v2__points-label roadmap-v2__points-label--light">Total Possible</div>
          <div className="roadmap-v2__points-value roadmap-v2__points-value--light">250 pts</div>
        </div>
      </div>
    </div>
  );
}

function FinalCTA() {
  return (
    <div className="roadmap-v2__cta">
      <div className="roadmap-v2__cta-icon">🚀</div>
      <h2 className="roadmap-v2__cta-title">Ready to Build Something Extraordinary?</h2>
      <p className="roadmap-v2__cta-desc">
        100 teams. 100 hours. 30+ recruiters watching. Your next opportunity starts here.
      </p>
      <button
        type="button"
        className="roadmap-v2__cta-btn"
        onClick={() => navigateTo("/sprint")}
        aria-label="Go to dashboard home"
      >
        Dashboard Home →
      </button>
      <p className="roadmap-v2__cta-footer">
        Questions? Reach us at{" "}
        <a href="mailto:hackathon@firststepjob.com" className="roadmap-v2__cta-email">
          hackathon@firststepjob.com
        </a>
      </p>
    </div>
  );
}

export default function RoadmapContent() {
  const isMobile = useSprintMobileLayout();
  const { loading: configLoading } = useConfigCountdown();
  const [modalOpen, setModalOpen] = useState(false);

  const openSignupModal = () => setModalOpen(true);
  const closeSignupModal = () => setModalOpen(false);

  let globalIndex = 0;

  if (configLoading) {
    return (
      <div className="roadmap-v2">
        <div className="roadmap-v2__inner">
          <RoadmapSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="roadmap-v2">
      <div className="roadmap-v2__bg roadmap-v2__bg--top" aria-hidden="true" />
      <div className="roadmap-v2__bg roadmap-v2__bg--bottom" aria-hidden="true" />

      <div className="roadmap-v2__inner">
        <header className="roadmap-v2__hero">
          <div className="roadmap-v2__badge">✦ Event Roadmap</div>

          <h1 className="roadmap-v2__title">
            Event Timeline & <span className="roadmap-v2__title-accent">Roadmap</span>
          </h1>

          <p className="roadmap-v2__subtitle">
            Your complete journey through the hackathon — from registration to results. Stay ahead of
            every deadline and know exactly what&apos;s coming next.
          </p>

          <PointsSummaryRow />

          <p className="roadmap-v2__points-footnote">
            📊 Your live score and leaderboard rank are always visible on your dashboard
          </p>
        </header>

        <div className="roadmap-v2__timeline">
          {phases.map((phase) => (
            <div key={phase.id} className="roadmap-v2__phase">
              <SectionHeader phase={phase} />
              {phase.milestones.map((m) => {
                const card = (
                  <MilestoneCard
                    key={m.title}
                    milestone={m}
                    phaseColor={phase.color}
                    index={globalIndex}
                    onSignupClick={openSignupModal}
                    isMobile={isMobile}
                  />
                );
                globalIndex += 1;
                return card;
              })}
            </div>
          ))}

          <FinalCTA />
        </div>
      </div>

      <InfoSessionFormModal
        open={modalOpen}
        sessionLabel="Information Session"
        onClose={closeSignupModal}
      />
    </div>
  );
}
