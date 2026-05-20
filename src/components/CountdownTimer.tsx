import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock } from "lucide-react";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getTimeLeft(target: Date): TimeLeft {
  const total = target.getTime() - Date.now();
  if (total <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(total / (1000 * 60 * 60 * 24)),
    hours: Math.floor((total / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((total / 1000 / 60) % 60),
    seconds: Math.floor((total / 1000) % 60),
  };
}

const pad = (n: number) => String(n).padStart(2, "0");

function FlipUnit({
  label,
  value,
  compact = false,
  glass = false,
}: {
  label: string;
  value: number;
  compact?: boolean;
  glass?: boolean;
}) {
  const display = pad(value);
  const faceClass = compact
    ? "relative min-w-[72px] w-[72px] sm:min-w-[84px] sm:w-[84px] md:min-w-[96px] md:w-[96px] h-[64px] sm:h-[70px] md:h-[74px] rounded-2xl overflow-hidden border border-white/25 shrink-0"
    : "relative w-[68px] sm:w-[78px] md:w-[88px] h-[78px] sm:h-[90px] md:h-[100px] rounded-2xl overflow-hidden border border-cyan-300/40";

  return (
    <motion.div className="flex flex-col items-center">
      <motion.div
        className={faceClass}
        style={{
          background: glass
            ? "linear-gradient(160deg, rgba(255,255,255,0.26) 0%, rgba(255,255,255,0.08) 55%, rgba(0,0,0,0.08) 100%)"
            : "linear-gradient(160deg, rgba(255,255,255,0.95) 0%, rgba(229,247,250,0.95) 100%)",
          boxShadow: glass
            ? undefined
            : "0 14px 35px rgba(2, 51, 69, 0.18), inset 0 1px 0 rgba(255,255,255,0.9)",
        }}
      >
        <motion.div
          aria-hidden
          className={`absolute left-0 right-0 top-1/2 h-px z-10 ${glass ? "bg-white/20" : "bg-[#02334520]"}`}
        />
        <AnimatePresence mode="popLayout">
          <motion.span
            key={display}
            initial={{ y: -28, opacity: 0, rotateX: -90 }}
            animate={{ y: 0, opacity: 1, rotateX: 0 }}
            exit={{ y: 28, opacity: 0, rotateX: 90 }}
            transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
            className={`absolute inset-0 flex items-center justify-center font-black tracking-tight tabular-nums ${
              glass ? "text-white" : "text-[#023345]"
            }`}
            style={{ fontSize: compact ? "clamp(28px, 2.8vw, 40px)" : "clamp(28px, 4vw, 42px)" }}
          >
            {display}
          </motion.span>
        </AnimatePresence>
      </motion.div>
      <span
        className={`uppercase tracking-[0.18em] font-bold ${
          compact ? "mt-2 text-[11px] sm:text-[12px]" : "mt-2 text-[11px] sm:text-xs"
        } ${glass ? "text-white/80" : "text-slate-500"}`}
      >
        {label}
      </span>
    </motion.div>
  );
}

export function CountdownTimer({
  targetDate,
  variant = "default",
}: {
  targetDate: Date;
  variant?: "default" | "glass";
}) {
  const glass = variant === "glass";
  const compact = glass;
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => getTimeLeft(targetDate));

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft(targetDate)), 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className={
        glass
          ? "countdown-glass relative w-full rounded-3xl p-5 sm:p-6 md:p-7"
          : "relative w-full max-w-[520px] rounded-[26px] p-5 sm:p-6 mt-7"
      }
      style={
        glass
          ? {
              background:
                "linear-gradient(135deg, rgba(255, 255, 255, 0.14) 0%, rgba(255, 255, 255, 0.06) 100%)",
              border: "1px solid rgba(255, 255, 255, 0.24)",
              backdropFilter: "blur(16px) saturate(140%)",
              WebkitBackdropFilter: "blur(16px) saturate(140%)",
              boxShadow:
                "0 16px 44px rgba(0, 0, 0, 0.22), 0 2px 6px rgba(0, 0, 0, 0.10), inset 0 1px 0 rgba(255, 255, 255, 0.12)",
            }
          : {
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.96) 0%, rgba(230,244,247,0.96) 100%)",
              border: "1px solid rgba(42, 142, 158, 0.22)",
              boxShadow: "0 22px 50px rgba(2, 51, 69, 0.10)",
            }
      }
    >
      <motion.div className={`flex items-center justify-between flex-wrap gap-2 ${compact ? "mb-4 sm:mb-5" : "mb-4"}`}>
        <motion.div className="flex items-center gap-2.5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7dd3e8] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#7dd3e8]"></span>
          </span>
          <span
            className={`${compact ? "text-[14px] sm:text-[16px] md:text-[17px]" : "text-[11px] sm:text-[12px]"} font-extrabold tracking-[0.18em] uppercase ${
              glass ? "text-white" : "text-[#023345]"
            }`}
          >
            Hackathon starts in
          </span>
        </motion.div>
        <motion.div
          className={`flex items-center gap-2 ${compact ? "text-[13px] sm:text-[15px] md:text-[16px]" : "text-[10px] sm:text-[11px]"} font-semibold ${
            glass ? "text-white/85" : "text-slate-500"
          }`}
        >
          <Calendar className={`${compact ? "w-[18px] h-[18px]" : "w-3.5 h-3.5"} ${glass ? "text-[#7dd3e8]" : "text-[#2a8e9e]"}`} />
          June 10
          <span className={glass ? "text-white/35" : "text-slate-300"}>•</span>
          <Clock className={`${compact ? "w-[18px] h-[18px]" : "w-3.5 h-3.5"} ${glass ? "text-[#7dd3e8]" : "text-[#2a8e9e]"}`} />
          8:00 PM EST
        </motion.div>
      </motion.div>

      <motion.div className={`grid grid-cols-4 ${compact ? "gap-3 sm:gap-4 md:gap-5" : "gap-2 sm:gap-3"} justify-items-center`}>
        <FlipUnit label="Days" value={timeLeft.days} compact={compact} glass={glass} />
        <FlipUnit label="Hours" value={timeLeft.hours} compact={compact} glass={glass} />
        <FlipUnit label="Minutes" value={timeLeft.minutes} compact={compact} glass={glass} />
        <FlipUnit label="Seconds" value={timeLeft.seconds} compact={compact} glass={glass} />
      </motion.div>
    </motion.div>
  );
}

export default CountdownTimer;
