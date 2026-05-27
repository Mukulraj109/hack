"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Sparkle {
  id: number;
  x: number;
  y: number;
  scale: number;
  opacity: number;
  duration: number;
}

interface SparkleBackgroundProps {
  className?: string;
  particleCount?: number;
  colors?: string[];
  speed?: number;
}

export function SparkleBackground({
  className = "",
  particleCount = 50,
  colors = ["#06b6d4", "#8b5cf6", "#ec4899", "#00ff9d"],
  speed = 1,
}: SparkleBackgroundProps) {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (reduced) return;

    const newSparkles: Sparkle[] = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      scale: Math.random() * 0.5 + 0.5,
      opacity: Math.random() * 0.5 + 0.3,
      duration: Math.random() * 3 + 2,
    }));
    setSparkles(newSparkles);
  }, [particleCount, reduced]);

  if (reduced) return null;

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <AnimatePresence>
        {sparkles.map((sparkle) => (
          <motion.div
            key={sparkle.id}
            className="absolute rounded-full"
            style={{
              left: `${sparkle.x}%`,
              top: `${sparkle.y}%`,
              width: 4 * sparkle.scale,
              height: 4 * sparkle.scale,
              backgroundColor: colors[sparkle.id % colors.length],
              boxShadow: `0 0 ${6 * sparkle.scale}px ${colors[sparkle.id % colors.length]}`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, sparkle.opacity, 0],
              scale: [0, sparkle.scale, 0],
              y: [-10, -30],
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: sparkle.duration / speed,
              repeat: Infinity,
              repeatDelay: Math.random() * 2,
              ease: "easeInOut",
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

export default SparkleBackground;
