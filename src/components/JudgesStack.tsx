import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionStyle,
} from "framer-motion";
import { Star, Cpu, MessageSquare, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Judge = {
  num: string;
  role: string;
  Icon: LucideIcon;
  accent: string;
  accentSoft: string;
  accentRing: string;
  gradient: string;
  summary: string;
  bio: string;
  tags: string[];
};

const JUDGES: Judge[] = [
  {
    num: "01",
    role: "Product Leader",
    Icon: Star,
    accent: "#2a8e9e",
    accentSoft: "rgba(42, 142, 158, 0.14)",
    accentRing: "rgba(42, 142, 158, 0.35)",
    gradient: "linear-gradient(135deg, #2a8e9e 0%, #0891b2 100%)",
    summary:
      "Scores product clarity, technical execution, and hiring impact.",
    bio: "Evaluates UX, product strategy, and viability in a consumer market. Full bio posted before judging.",
    tags: ["Product", "UX"],
  },
  {
    num: "02",
    role: "Engineering VP",
    Icon: Cpu,
    accent: "#0891b2",
    accentSoft: "rgba(8, 145, 178, 0.14)",
    accentRing: "rgba(8, 145, 178, 0.35)",
    gradient: "linear-gradient(135deg, #0891b2 0%, #6366f1 100%)",
    summary:
      "Reviews architecture, demo quality, and how well the team used 100 hours.",
    bio: "Reviews code structure, complexity, and architectural choices under time pressure. Full bio posted before judging.",
    tags: ["Engineering", "Architecture"],
  },
  {
    num: "03",
    role: "Head of Talent",
    Icon: MessageSquare,
    accent: "#6366f1",
    accentSoft: "rgba(99, 102, 241, 0.14)",
    accentRing: "rgba(99, 102, 241, 0.35)",
    gradient: "linear-gradient(135deg, #6366f1 0%, #ec4899 100%)",
    summary:
      "Looks for work that makes a candidate easier to evaluate and contact.",
    bio: "Focuses on how clearly your project communicates skills to hiring managers. Full bio posted before judging.",
    tags: ["Hiring", "Recruiting"],
  },
];

function SectionHeader() {
  return (
    <header className="trackstack__head trackstack__head--in-card">
      <p className="trackstack__eyebrow">
        <span className="trackstack__eyebrow-dot" aria-hidden="true" />
        The Panel
      </p>
      <h2 className="trackstack__title">
        <span className="trackstack__title-line">The Judges</span>
      </h2>
      <p className="trackstack__intro">
        Final demos are scored across innovation, execution, and recruiter-ready polish — up
        to <strong>150 judge points</strong> on top of your pre-event milestones.
      </p>
    </header>
  );
}

function JudgeCard({ judge, index }: { judge: Judge; index: number }) {
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
    "--track-accent": judge.accent,
    "--track-accent-soft": judge.accentSoft,
    "--track-accent-ring": judge.accentRing,
    "--track-gradient": judge.gradient,
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
              {judge.num}
            </span>
            <span className="trackstack__card-chip">JUDGE {judge.num}</span>
          </div>

          <p className="trackstack__card-kicker">Name reveal soon</p>
          <h3 className="trackstack__card-title">
            Industry judge · confidential until lineup drop
          </h3>
          <p className="trackstack__card-role">{judge.role}</p>
          <p className="trackstack__card-desc">{judge.summary}</p>

          <div className="trackstack__card-callout">{judge.bio}</div>

          <div className="trackstack__card-tags">
            {judge.tags.map((t) => (
              <span key={t} className="trackstack__card-tag">
                {t}
              </span>
            ))}
          </div>

          <div className="trackstack__card-foot trackstack__card-foot--note">
            <Sparkles
              className="w-4 h-4 shrink-0"
              style={{ color: judge.accent }}
              aria-hidden
            />
            <span className="trackstack__card-foot-text">
              Rubrics and LinkedIn-ready bios publish before the judging window.
            </span>
          </div>
        </div>

        <div className="trackstack__card-right">
          <span className="trackstack__card-iconwrap" aria-hidden="true">
            <judge.Icon className="w-7 h-7" strokeWidth={2.2} />
          </span>
          <div className="trackstack__card-media trackstack__card-media--judge">
            <div className="trackstack__card-glow" aria-hidden="true" />
            <div
              className="trackstack__card-icon-hero"
              style={{ color: judge.accent }}
              aria-hidden="true"
            >
              <judge.Icon className="w-24 h-24 md:w-28 md:h-28" strokeWidth={1.6} />
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export function JudgesStack() {
  return (
    <section id="judges-section" className="trackstack judgestack scroll-mt-28">
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
            {JUDGES.map((judge, i) => (
              <JudgeCard key={judge.num} judge={judge} index={i} />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default JudgesStack;
