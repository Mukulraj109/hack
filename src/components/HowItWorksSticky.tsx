import { useRef, useState } from "react";
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
  Presentation,
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
    title: "Register and pick a track",
    body: "Sign up, form or join a team, and choose one of three briefs when tracks open. Use whatever stack you already know — no boilerplate, no gatekeeping.",
    img: "/p1.png",
    alt: "Register and choose your challenge track",
    Icon: ClipboardList,
    accent: "#2a8e9e",
    bullets: [
      "Solo or team of up to four",
      "Three open briefs to choose from",
      "Bring your own stack",
    ],
  },
  {
    num: "02",
    title: "Build within 100 hours",
    body: "From kickoff you have a fixed remote window to design, build, and document. Submit a repo or package recruiters can review in under two minutes.",
    img: "/p2.png",
    alt: "Build and submit your project during the sprint",
    Icon: Code2,
    accent: "#0891b2",
    bullets: [
      "100-hour synchronous sprint",
      "Daily community check-ins",
      "Tool-agnostic — ship how you want",
    ],
  },
  {
    num: "03",
    title: "Present to the panel",
    body: "Judges score clarity, execution, and hiring signal. Shortlisted teams advance to the recruiter-facing round — rubrics are public before judging opens.",
    img: "/p3.png",
    alt: "Industry judges evaluate projects",
    Icon: Presentation,
    accent: "#0e7490",
    bullets: [
      "Public scoring rubric",
      "Live Q&A with the panel",
      "Top 10 advance to recruiters",
    ],
  },
  {
    num: "04",
    title: "Top teams meet recruiters",
    body: "The top 10 teams are introduced to 30 hiring partners. Everyone else leaves with proof of work, a certificate, and a portfolio-ready submission.",
    img: "/p4.png",
    alt: "Get discovered by recruiters",
    Icon: Briefcase,
    accent: "#06b6d4",
    bullets: [
      "Curated recruiter intros",
      "Demo + repo + team snapshot",
      "Certificate for every finisher",
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

  return (
    <section
      ref={sectionRef}
      className="hiw-sticky"
      id="feature-section"
      style={{ height: `${STEPS.length * 100}vh` }}
      aria-label="How it works"
    >
      <div className="hiw-sticky__viewport">
        <header className="hiw-sticky__head">
          <p className="hiw-sticky__label">Process</p>
          <h2 className="hiw-sticky__title">How it works</h2>
          <p className="hiw-sticky__intro">
            Four steps from signup to recruiter intros — same timeline for every team.
          </p>
        </header>

        <div className="hiw-sticky__progress" role="progressbar" aria-valuemin={1} aria-valuemax={STEPS.length} aria-valuenow={active + 1}>
          <motion.div className="hiw-sticky__progress-fill" style={{ width: progressWidth }} />
        </div>

        <div className="hiw-sticky__stage">
          <div className="hiw-sticky__rail" aria-hidden>
            {STEPS.map((s, i) => (
              <button
                key={s.num}
                className={`hiw-rail__dot${i === active ? " is-active" : ""}${i < active ? " is-done" : ""}`}
                onClick={() => {
                  if (!sectionRef.current) return;
                  const rect = sectionRef.current.getBoundingClientRect();
                  const target =
                    window.scrollY + rect.top + (rect.height * (i + 0.5)) / STEPS.length - window.innerHeight / 2;
                  window.scrollTo({ top: target, behavior: "smooth" });
                }}
                aria-label={`Jump to step ${s.num}: ${s.title}`}
              >
                <span className="hiw-rail__num">{s.num}</span>
                <span className="hiw-rail__bar" aria-hidden />
              </button>
            ))}
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
                  <span className="hiw-copy__num">Step {step.num} <span className="hiw-copy__divider">/</span> {STEPS.length.toString().padStart(2, "0")}</span>
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
