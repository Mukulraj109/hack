import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionStyle,
} from "framer-motion";
import {
  Star,
  Cpu,
  MessageSquare,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { JUDGE_LINEUP } from "../config/judgeLineup";
import JudgeBioModal from "./JudgeBioModal";

const ICON_MAP: Record<string, LucideIcon> = {
  Star,
  Cpu,
  MessageSquare,
};

type Judge = (typeof JUDGE_LINEUP)[number] & {
  Icon: LucideIcon;
};

const JUDGES: Judge[] = JUDGE_LINEUP.map((judge) => ({
  ...judge,
  Icon: ICON_MAP[judge.iconName] ?? Star,
}));

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
    </header>
  );
}

function JudgeMedia({ judge }: { judge: Judge }) {
  const [imgFailed, setImgFailed] = useState(false);

  if (judge.imageUrl && !imgFailed) {
    return (
      <div className="trackstack__card-media trackstack__card-media--judge">
        <div className="trackstack__card-glow" aria-hidden="true" />
        <img
          src={judge.imageUrl}
          alt={judge.name}
          className="trackstack__card-photo"
          loading="lazy"
          onError={() => setImgFailed(true)}
        />
      </div>
    );
  }

  if (!judge.announcingSoon) {
    return (
      <div className="trackstack__card-media trackstack__card-media--judge">
        <div className="trackstack__card-glow" aria-hidden="true" />
        <div
          className="trackstack__card-initials"
          style={{ background: judge.accentSoft, color: judge.accent }}
          aria-hidden="true"
        >
          {judge.initials}
        </div>
      </div>
    );
  }

  return (
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
  );
}

function JudgeCard({
  judge,
  index,
  onReadMore,
}: {
  judge: Judge;
  index: number;
  onReadMore: (judge: Judge) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isFirstCard = index === 0;
  const showReadMore = Boolean(judge.bio) && !judge.announcingSoon;

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
      className={`trackstack__card${isFirstCard ? " trackstack__card--lead" : ""}${
        judge.announcingSoon ? " trackstack__card--announcing" : ""
      }`}
      style={style}
    >
      {isFirstCard && <SectionHeader />}

      <div className="trackstack__card-rail" />
      <div className="trackstack__card-inner">
        <div className="trackstack__card-left">
          {judge.announcingSoon && (
            <p className="trackstack__card-kicker">Announcing soon</p>
          )}
          <h3
            className={`trackstack__card-title${
              judge.announcingSoon ? " trackstack__card-title--muted" : ""
            }`}
          >
            {judge.name}
          </h3>
          <p className="trackstack__card-role">{judge.role}</p>
          <p className="trackstack__card-desc">{judge.summary}</p>

          {showReadMore && (
            <button
              type="button"
              className="trackstack__card-readmore"
              onClick={() => onReadMore(judge)}
              style={{ color: judge.accent }}
            >
              Read more
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </button>
          )}

          {judge.tags.length > 0 && (
            <div className="trackstack__card-tags">
              {judge.tags.map((t) => (
                <span key={t} className="trackstack__card-tag">
                  {t}
                </span>
              ))}
            </div>
          )}

          {judge.announcingSoon && (
            <div className="trackstack__card-foot trackstack__card-foot--note">
              <Sparkles
                className="w-4 h-4 shrink-0"
                style={{ color: judge.accent }}
                aria-hidden
              />
              <span className="trackstack__card-foot-text">
                Full bio and expertise tags publish once this panel seat is confirmed.
              </span>
            </div>
          )}
        </div>

        <div className="trackstack__card-right">
          <JudgeMedia judge={judge} />
        </div>
      </div>
    </motion.article>
  );
}

export function JudgesStack() {
  const [activeJudge, setActiveJudge] = useState<Judge | null>(null);

  return (
    <>
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
                <JudgeCard
                  key={judge.id}
                  judge={judge}
                  index={i}
                  onReadMore={setActiveJudge}
                />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {activeJudge && (
        <JudgeBioModal judge={activeJudge} onClose={() => setActiveJudge(null)} />
      )}
    </>
  );
}

export default JudgesStack;
