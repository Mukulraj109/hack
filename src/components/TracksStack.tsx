import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionStyle,
} from "framer-motion";
import {
  Bot,
  Network,
  Sparkles,
  ChevronRight,
  Lock,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Track = {
  num: string;
  title: string;
  desc: string;
  img: string;
  Icon: LucideIcon;
  accent: string;
  accentSoft: string;
  accentRing: string;
  gradient: string;
  tags: string[];
};

const TRACKS: Track[] = [
  {
    num: "01",
    title: "AI Career Agent",
    desc: "Build an AI workflow that moves candidates faster from job search to recruiter conversations — drafting outreach, ranking roles, prepping interviews, the lot.",
    img: "/p5.png",
    Icon: Bot,
    accent: "#2a8e9e",
    accentSoft: "rgba(42, 142, 158, 0.14)",
    accentRing: "rgba(42, 142, 158, 0.35)",
    gradient: "linear-gradient(135deg, #2a8e9e 0%, #0891b2 100%)",
    tags: ["AI", "Automation", "LLMs"],
  },
  {
    num: "02",
    title: "Recruiter Bridge",
    desc: "Design a way to put great teams, proof of work, and hiring context in front of recruiters — a portfolio, a matching engine, a feed, your call.",
    img: "/p6.png",
    Icon: Network,
    accent: "#0891b2",
    accentSoft: "rgba(8, 145, 178, 0.14)",
    accentRing: "rgba(8, 145, 178, 0.35)",
    gradient: "linear-gradient(135deg, #0891b2 0%, #6366f1 100%)",
    tags: ["UX", "Hiring", "Web"],
  },
  {
    num: "03",
    title: "Open Build",
    desc: "Use any stack and any tools to build something useful for international hiring. The wildcard track — surprise us with a product recruiters will love.",
    img: "/p7.png",
    Icon: Sparkles,
    accent: "#6366f1",
    accentSoft: "rgba(99, 102, 241, 0.14)",
    accentRing: "rgba(99, 102, 241, 0.35)",
    gradient: "linear-gradient(135deg, #6366f1 0%, #ec4899 100%)",
    tags: ["Any Stack", "Open"],
  },
];

function SectionHeader() {
  return (
    <header className="trackstack__head trackstack__head--in-card">
      <p className="trackstack__eyebrow">
        <span className="trackstack__eyebrow-dot" aria-hidden="true" />
        Pick your path
      </p>
      <h2 className="trackstack__title">
        <span className="trackstack__title-line">
          Three tracks.{" "}
          <span className="trackstack__title-accent">One winning build.</span>
        </span>
      </h2>
      <p className="trackstack__intro">
        Scroll to flip through the briefs. Pick the one that best shows recruiters what
        you can ship in <strong>100 remote hours.</strong>
      </p>
    </header>
  );
}

function StackCard({ track, index }: { track: Track; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isFirstCard = index === 0;

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const opacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 0.9, 0.7]);

  const stickyTop = isFirstCard
    ? "var(--trackstack-nav-offset)"
    : `calc(var(--trackstack-nav-offset) + var(--trackstack-head-in-card) + ${index} * var(--trackstack-step))`;

  const style: MotionStyle = {
    "--track-accent": track.accent,
    "--track-accent-soft": track.accentSoft,
    "--track-accent-ring": track.accentRing,
    "--track-gradient": track.gradient,
    top: stickyTop,
    zIndex: index + 1,
    scale,
    opacity,
  } as MotionStyle;

  return (
    <motion.article
      ref={cardRef}
      className={`trackstack__card${isFirstCard ? " trackstack__card--lead" : ""}`}
      style={style}
    >
      {isFirstCard && <SectionHeader />}

      <div className="trackstack__card-rail" />
      <div className="trackstack__card-inner">
        <div className="trackstack__card-left">
          <div className="trackstack__card-meta">
            <span className="trackstack__card-num" aria-hidden="true">
              {track.num}
            </span>
            <span className="trackstack__card-chip">TRACK {track.num}</span>
          </div>
          <h3 className="trackstack__card-title">{track.title}</h3>
          <p className="trackstack__card-desc">{track.desc}</p>
          <div className="trackstack__card-tags">
            {track.tags.map((t) => (
              <span key={t} className="trackstack__card-tag">
                {t}
              </span>
            ))}
          </div>
          <div className="trackstack__card-foot">
            <span className="trackstack__card-cta">
              Full brief coming soon
              <ChevronRight className="w-4 h-4 trackstack__card-cta-arrow" />
            </span>
            <span className="trackstack__card-lock" aria-hidden="true">
              <Lock className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>

        <div className="trackstack__card-right">
          <span className="trackstack__card-iconwrap" aria-hidden="true">
            <track.Icon className="w-7 h-7" strokeWidth={2.2} />
          </span>
          <div className="trackstack__card-media">
            <div className="trackstack__card-glow" aria-hidden="true" />
            <img
              src={track.img}
              alt={track.title}
              className="trackstack__card-img"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export function TracksStack() {
  return (
    <section id="tracks-section" className="trackstack">
      <div className="trackstack__decor" aria-hidden="true">
        <div className="trackstack__grid" />
        <div className="trackstack__blob trackstack__blob--a" />
        <div className="trackstack__blob trackstack__blob--b" />
      </div>

      <div className="trackstack__wrap">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="trackstack__stage"
        >
          <motion.div
            className="trackstack__cards"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            {TRACKS.map((track, i) => (
              <StackCard key={track.num} track={track} index={i} />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default TracksStack;
