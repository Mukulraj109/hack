import { motion } from "framer-motion";
import { useState, useEffect, useCallback, useRef } from "react";

const PHRASES = [
  "100-Hour Remote Build Sprint.",
  "Get Noticed By Recruiters.",
  "$5,000+ Worth Prize Pool.",
  "100 Teams · 2 Members.",
];

const TYPE_SPEED = 55;
const ERASE_SPEED = 25;
const HOLD_AFTER = 1800;
const HOLD_BLANK = 200;

export function FloatingLabels() {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeProgressIndex, setActiveProgressIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const typingRef = useRef<NodeJS.Timeout | null>(null);
  const erasingRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const clearTimers = useCallback(() => {
    if (typingRef.current) clearTimeout(typingRef.current);
    if (erasingRef.current) clearTimeout(erasingRef.current);
  }, []);

  const typePhrase = useCallback((phrase: string): Promise<void> => {
    return new Promise((resolve) => {
      let i = 0;
      setDisplayText("");
      const step = () => {
        if (i < phrase.length) {
          setDisplayText(phrase.slice(0, ++i));
          typingRef.current = setTimeout(step, TYPE_SPEED);
        } else {
          resolve();
        }
      };
      step();
    });
  }, []);

  const erasePhrase = useCallback((): Promise<void> => {
    return new Promise((resolve) => {
      const step = () => {
        setDisplayText((prev) => {
          if (prev.length > 0) {
            erasingRef.current = setTimeout(step, ERASE_SPEED);
            return prev.slice(0, -1);
          } else {
            resolve();
            return "";
          }
        });
      };
      step();
    });
  }, []);

  useEffect(() => {
    if (!isClient) return;

    let cancelled = false;

    const startCycle = async () => {
      while (!cancelled) {
        setActiveProgressIndex(currentIndex);
        await typePhrase(PHRASES[currentIndex]);
        if (cancelled) break;
        await new Promise((r) => setTimeout(r, HOLD_AFTER));
        if (cancelled) break;
        await erasePhrase();
        if (cancelled) break;
        await new Promise((r) => setTimeout(r, HOLD_BLANK));
        if (cancelled) break;
        setCurrentIndex((prev) => (prev + 1) % PHRASES.length);
      }
    };

    startCycle();

    return () => {
      cancelled = true;
      clearTimers();
    };
  }, [isClient, currentIndex, typePhrase, erasePhrase, clearTimers]);

  useEffect(() => {
    if (!isClient) return;

    let animationFrame: number;
    const handleMouseMove = (e: MouseEvent) => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(() => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;

        setMousePosition({
          x: (clientX / innerWidth - 0.5) * 2,
          y: (clientY / innerHeight - 0.5) * 2,
        });
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [isClient]);

  if (!isClient) return null;

  const indexDisplay = `${String(currentIndex + 1).padStart(2, "0")} / 04`;

  return (
    <div
      className="floating-labels-container"
      role="region"
      aria-label="Hackathon features"
      style={{
        ["--tw-parallax" as string]: `${mousePosition.x * 0.3}deg`
      }}
    >
      <div className="floating-labels-scrim" aria-hidden="true" />

      <motion.div
        className="typewriter-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="tw-index">
          <span className="index-bar" />
          <span className="tw-index-text">{indexDisplay}</span>
        </div>

        <div className="tw-line-container">
          <span className="tw-line">{displayText}</span>
          <span className="tw-cursor" />
        </div>

        <div className="tw-progress">
          {PHRASES.map((_, i) => (
            <motion.span
              key={i}
              className={`tw-progress-bar ${i === activeProgressIndex ? "active" : ""}`}
              animate={
                i === activeProgressIndex
                  ? { opacity: 1 }
                  : { opacity: 0.25 }
              }
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>
      </motion.div>

      <div className="floating-labels-particles" aria-hidden="true">
        {[...Array(4)].map((_, i) => (
          <motion.span
            key={i}
            className="floating-particle"
            animate={{
              y: [0, -20, 0],
              opacity: [0, 0.35, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2 + i * 0.3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.4,
            }}
            style={{
              top: `${5 + i * 28}%`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default FloatingLabels;
