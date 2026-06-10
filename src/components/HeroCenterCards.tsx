import { motion } from "framer-motion";
import CountdownTimer from "./CountdownTimer";
import { useConfigCountdown } from "../hooks/useConfigCountdown";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
};

function GlassCard({ children, className = "" }) {
  return (
    <div
      className={`glass-card ${className}`}
      style={{
        background: "rgba(2, 51, 69, 0.35)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: "1px solid rgba(255, 255, 255, 0.12)",
        boxShadow: "0 12px 40px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.08)",
      }}
    >
      {children}
    </div>
  );
}

export function HeroCenterCards() {
  const { countdown, startDate, sprintEndDate } = useConfigCountdown();

  return (
    <motion.div
      className="hero-center-cards"
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "clamp(24px, 4vh, 40px)",
        zIndex: 10,
        pointerEvents: "auto",
        width: "85%",
        maxWidth: "700px",
      }}
    >
      {/* Top Card - Countdown Timer (moved to top) */}
      <motion.div
        custom={0}
        initial="hidden"
        animate="visible"
        variants={cardVariants}
        style={{ width: "100%" }}
      >
        <CountdownTimer
          targetDate={startDate}
          sprintEndDate={sprintEndDate}
          started={countdown?.started}
          ended={countdown?.ended}
          remainingMs={countdown?.remaining}
          remainingUntilStartMs={countdown?.remainingUntilStart}
          variant="glass"
        />
      </motion.div>

      {/* Bottom Card - Hackathon Info (wider, shorter) */}
      <motion.div
        custom={1}
        initial="hidden"
        animate="visible"
        variants={cardVariants}
        style={{ width: "100%" }}
      >
        <GlassCard className="hero-info-card">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "clamp(10px, 1.5vh, 14px)",
              textAlign: "center",
              padding: "clamp(18px, 2.5vh, 28px) clamp(32px, 5vw, 56px)",
            }}
          >
            <h2
              style={{
                color: "#ffffff",
                fontSize: "clamp(24px, 3.5vw, 42px)",
                fontWeight: 800,
                letterSpacing: "-0.02em",
                margin: 0,
                lineHeight: 1.15,
                textShadow: "0 2px 12px rgba(0, 0, 0, 0.3)",
              }}
            >
              FirstStep's Annual US Tech Hackathon
            </h2>
            <p
              style={{
                color: "rgba(255, 255, 255, 0.9)",
                fontSize: "clamp(14px, 1.6vw, 20px)",
                fontWeight: 500,
                margin: 0,
                lineHeight: 1.5,
                maxWidth: "560px",
              }}
            >
              First of its kind hackathon to help Job Seekers get notified by Recruiters
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                marginTop: "4px",
                paddingLeft: "8px",
              }}
            >
              <p
                style={{
                  color: "rgba(255, 255, 255, 0.85)",
                  fontSize: "clamp(13px, 1.3vw, 16px)",
                  fontWeight: 500,
                  margin: 0,
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <span
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: "#7dd3e8",
                    flexShrink: 0,
                    boxShadow: "0 0 8px rgba(125, 211, 232, 0.6)",
                  }}
                />
                Subheading 1
              </p>
              <p
                style={{
                  color: "rgba(255, 255, 255, 0.85)",
                  fontSize: "clamp(13px, 1.3vw, 16px)",
                  fontWeight: 500,
                  margin: 0,
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <span
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: "#7dd3e8",
                    flexShrink: 0,
                    boxShadow: "0 0 8px rgba(125, 211, 232, 0.6)",
                  }}
                />
                Subheading 2
              </p>
              <p
                style={{
                  color: "rgba(255, 255, 255, 0.85)",
                  fontSize: "clamp(13px, 1.3vw, 16px)",
                  fontWeight: 500,
                  margin: 0,
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <span
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: "#7dd3e8",
                    flexShrink: 0,
                    boxShadow: "0 0 8px rgba(125, 211, 232, 0.6)",
                  }}
                />
                Subheading 3
              </p>
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </motion.div>
  );
}

export default HeroCenterCards;
