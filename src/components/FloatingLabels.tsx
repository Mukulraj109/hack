import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const LABELS = [
  { id: 0, text: "100-hour remote build sprint" },
  { id: 1, text: "get Noticed by Recruiters" },
  { id: 2, text: "5000+ worth Prize Pool" },
  { id: 3, text: "100 Teams · 2 members" },
];

const FloatingLabel = ({ label, index, totalLabels, isHighlighted }) => {
  // Sequential highlight animation: 1st → 2nd → 3rd → 4th → repeat

  return (
    <motion.div
      className={`floating-label-item ${isHighlighted ? "is-highlighted" : ""}`}
      initial={{ opacity: 0.55 }}
      animate={{
        opacity: isHighlighted ? 1 : 0.55,
        scale: isHighlighted ? 1.03 : 1,
      }}
      transition={{
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1]
      }}
    >
      <motion.div
        className="floating-label-content"
        animate={{
          y: isHighlighted ? [0, -4, 0] : [0, -2, 0],
        }}
        transition={{
          duration: isHighlighted ? 2.5 : 3.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <span
          className="floating-label-text"
          style={{
            textShadow: isHighlighted
              ? "0 0 60px rgba(255,255,255,0.7), 0 0 120px rgba(255,255,255,0.4), 0 2px 4px rgba(0,0,0,0.4)"
              : "0 1px 3px rgba(0,0,0,0.3), 0 0 20px rgba(255,255,255,0.06)",
          }}
        >
          {label.text}
        </span>
      </motion.div>

      {/* Glow effect for highlighted - small and contained */}
      {isHighlighted && (
        <motion.div
          className="floating-label-glow"
          animate={{
            opacity: [0.4, 0.65, 0.4],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}
    </motion.div>
  );
};

export function FloatingLabels() {
  const containerRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isClient, setIsClient] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Sequential highlight animation: 1st → 2nd → 3rd → 4th → repeat
  useEffect(() => {
    if (!isClient) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % LABELS.length);
    }, 2500); // 2.5 seconds per label

    return () => clearInterval(interval);
  }, [isClient]);

  // Track mouse for subtle parallax
  useEffect(() => {
    if (!isClient) return;

    let animationFrame;
    const handleMouseMove = (e) => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
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
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isClient]);

  if (!isClient) return null;

  const totalLabels = LABELS.length;

  return (
    <div
      ref={containerRef}
      className="floating-labels-container"
      role="region"
      aria-label="Hackathon features"
      style={{
        transform: `perspective(1000px) rotateY(${mousePosition.x * 0.5}deg)`,
      }}
    >
      {/* Subtle gradient scrim for video readability */}
      <div className="floating-labels-scrim" aria-hidden="true" />

      <motion.div
        className="floating-labels-track"
        style={{
          transform: `translateY(${mousePosition.y * -1}px)`,
        }}
      >
        {LABELS.map((label, index) => {
          // Adjusted semi-circle that fits within visible area
          // Arc from -50 to +50 degrees - shifted down so top label has space
          const arcStart = -50;
          const arcEnd = 50;
          const arcSpan = arcEnd - arcStart;
          const angle = arcStart + (index / (totalLabels - 1)) * arcSpan;
          const radians = (angle * Math.PI) / 180;

          // Arc radius for good spacing
          const radius = 165;

          // Position on the arc
          const x = Math.cos(radians) * radius;
          const y = Math.sin(radians) * radius;

          return (
            <motion.div
              key={label.id}
              className="floating-label-wrapper"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              style={{
                position: "absolute",
                left: "0",
                top: `calc(50% + ${y}px)`,
                transform: `translateX(${x}px) translateX(-100%)`,
              }}
            >
              <FloatingLabel
                label={label}
                index={index}
                totalLabels={totalLabels}
                isHighlighted={index === activeIndex}
              />
            </motion.div>
          );
        })}
      </motion.div>

      {/* Ambient particle effects */}
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
