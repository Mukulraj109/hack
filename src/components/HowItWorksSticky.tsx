import { Fragment, useRef, useState, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  useTransform,
} from "framer-motion";
import {
  ClipboardList,
  Code2,
  ClipboardCheck,
  Briefcase,
  ArrowDown,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Step = {
  num: string;
  title: string;
  body: string;
  img: string;
  alt: string;
  Icon: LucideIcon;
  bullets: string[];
  accent: string;
};

const STEPS: Step[] = [
  {
    num: "01",
    title: "Register & Form Your Team",
    body: "Sign up on the website, get approved within 24 hours, and create or join a 2-member team from your dashboard. Solo builders must create a team to participate.",
    img: "/p1.png",
    alt: "Register and form your team",
    Icon: ClipboardList,
    accent: "#2a8e9e",
    bullets: [
      "2-member teams max",
      "5 specialized tracks to choose from",
      "Bring your own stack — zero restrictions",
    ],
  },
  {
    num: "02",
    title: "Build for 100 Hours",
    body: "The clock starts on July 8th at 8 PM EST. Track briefs and starter Git repos drop at kickoff — grab your assets, pick your approach, and start building. Use any tools, any stack, any APIs. Zero restrictions.",
    img: "/p2.png",
    alt: "Build for 100 hours during the sprint",
    Icon: Code2,
    accent: "#0891b2",
    bullets: [
      "100-hour remote sprint — July 8 to July 12",
      "Starter assets and Git repos provided per track",
      "Tool-agnostic — ship how you want",
    ],
  },
  {
    num: "03",
    title: "Submit & Get Judged",
    body: "Lock in your 3 deliverables before July 12th at 11:59 PM EST. Judges evaluate every submission on creativity, execution, problem understanding, and uniqueness of solution. Scorecards go live on July 17th — top 10 teams automatically advance to the recruiter spotlight.",
    img: "/p3.png",
    alt: "Submit deliverables and get judged",
    Icon: ClipboardCheck,
    accent: "#0e7490",
    bullets: [
      "3 deliverables: video demo, Git repo, written questionnaire",
      "Judged on creativity, execution, and uniqueness",
      "Top 10 teams sent directly to 30+ hiring partners",
    ],
  },
  {
    num: "04",
    title: "Top Teams Meet Hiring Partners",
    body: "The top 10 teams are automatically packaged as a premium talent bundle — live demo, GitHub repo, and resumes — sent directly to 30+ hiring partners. Everyone else walks away with a verified digital badge, a certificate, and a portfolio-ready project to showcase.",
    img: "/p4.png",
    alt: "Top teams meet hiring partners",
    Icon: Briefcase,
    accent: "#06b6d4",
    bullets: [
      "Top 10 packaged and sent to 30+ hiring partners automatically",
      "Live demo + Git repo + resume in one bundle",
      "Verified digital badge and certificate for every finisher",
    ],
  },
];

export function HowItWorksSticky() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const idx = Math.min(STEPS.length - 1, Math.max(0, Math.floor(progress * STEPS.length)));
    if (idx !== active) setActive(idx);
  });

  const progressWidth = useTransform(scrollYProgress, (p) => `${Math.min(100, p * 100)}%`);

  const step = STEPS[active];

  const jumpToStep = useCallback((index: number) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const target =
      window.scrollY +
      rect.top +
      (rect.height * (index + 0.5)) / STEPS.length -
      window.innerHeight / 2;
    window.scrollTo({ top: target, behavior: "smooth" });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="hiw-sticky"
      id="feature-section"
      style={{ height: `${STEPS.length * 100}vh` }}
      aria-label="How it works"
    >
      <div className="hiw-sticky__viewport">
        <div className="hiw-sticky__pin-head">
          <header className="hiw-sticky__head">
            <p className="hiw-sticky__label">Process</p>
            <h2 className="hiw-sticky__title">How it works</h2>
            <p className="hiw-sticky__intro">
              Four steps from signup to recruiter intros — same timeline for every team.
            </p>
          </header>

          <div
            className="hiw-sticky__progress"
            role="progressbar"
            aria-valuemin={1}
            aria-valuemax={STEPS.length}
            aria-valuenow={active + 1}
          >
            <motion.div className="hiw-sticky__progress-fill" style={{ width: progressWidth }} />
          </div>
        </div>

        <div className="hiw-sticky__stage">
          <div className="hiw-sticky__rail" aria-label="Process steps">
            {STEPS.map((s, i) => (
              <Fragment key={s.num}>
                <button
                  type="button"
                  className={`hiw-rail__dot${i === active ? " is-active" : ""}${i < active ? " is-done" : ""}`}
                  onClick={() => jumpToStep(i)}
                  aria-label={`Jump to step ${s.num}: ${s.title}`}
                  aria-current={i === active ? "step" : undefined}
                >
                  <span className="hiw-rail__num">{s.num}</span>
                  <span className="hiw-rail__bar" aria-hidden />
                </button>
                {i < STEPS.length - 1 ? (
                  <span
                    className={`hiw-rail__connector${i < active ? " is-done" : ""}${i === active ? " is-active" : ""}`}
                    aria-hidden
                  />
                ) : null}
              </Fragment>
            ))}
          </div>

          <div className="hiw-sticky__media">
            <div className="hiw-media__decor" aria-hidden>
              <div className="hiw-media__grid" />
              <motion.div
                className="hiw-media__blob"
                animate={{ background: `radial-gradient(closest-side, ${step.accent}66, transparent 70%)` }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />
            </div>
            <AnimatePresence mode="wait">
              <motion.figure
                key={step.num}
                initial={{ opacity: 0, scale: 0.96, y: 24 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: -24 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="hiw-media__card"
              >
                <img src={step.img} alt={step.alt} loading="lazy" decoding="async" />
                <figcaption className="hiw-media__caption">
                  <span className="hiw-media__caption-num" style={{ color: step.accent }}>
                    {step.num}
                  </span>
                  <span className="hiw-media__caption-title">{step.title}</span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          <div className="hiw-sticky__copy">
            <AnimatePresence mode="wait">
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -28 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="hiw-copy"
              >
                <div className="hiw-copy__head">
                  <span
                    className="hiw-copy__icon"
                    style={{
                      background: `${step.accent}22`,
                      color: step.accent,
                      borderColor: `${step.accent}55`,
                    }}
                  >
                    <step.Icon className="w-5 h-5" />
                  </span>
                  <span className="hiw-copy__num">
                    Step {step.num} <span className="hiw-copy__divider">/</span>{" "}
                    {STEPS.length.toString().padStart(2, "0")}
                  </span>
                </div>
                <h3 className="hiw-copy__title">{step.title}</h3>
                <p className="hiw-copy__body">{step.body}</p>
                <ul className="hiw-copy__bullets">
                  {step.bullets.map((b, i) => (
                    <motion.li
                      key={b}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.15 + i * 0.07 }}
                    >
                      <span className="hiw-bullet-dot" style={{ background: step.accent }} aria-hidden />
                      {b}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <motion.div
          className="hiw-sticky__scroll-hint"
          initial={{ opacity: 0 }}
          animate={{ opacity: active === STEPS.length - 1 ? 0 : 1 }}
          transition={{ duration: 0.3 }}
          aria-hidden
        >
          <ArrowDown className="w-4 h-4" />
          <span>Scroll</span>
        </motion.div>
      </div>
    </section>
  );
}

export default HowItWorksSticky;
