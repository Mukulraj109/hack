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

function FlipUnit({ label, value }: { label: string; value: number }) {
  const display = pad(value);
  return (
    <div className="flex flex-col items-center">
      <div
        className="relative w-[68px] sm:w-[78px] md:w-[88px] h-[78px] sm:h-[90px] md:h-[100px] rounded-2xl overflow-hidden border border-cyan-300/40"
        style={{
          background:
            "linear-gradient(160deg, rgba(255,255,255,0.95) 0%, rgba(229,247,250,0.95) 100%)",
          boxShadow:
            "0 14px 35px rgba(2, 51, 69, 0.18), inset 0 1px 0 rgba(255,255,255,0.9)",
        }}
      >
        <div
          aria-hidden
          className="absolute left-0 right-0 top-1/2 h-px bg-[#02334520] z-10"
        />
        <AnimatePresence mode="popLayout">
          <motion.span
            key={display}
            initial={{ y: -28, opacity: 0, rotateX: -90 }}
            animate={{ y: 0, opacity: 1, rotateX: 0 }}
            exit={{ y: 28, opacity: 0, rotateX: 90 }}
            transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
            className="absolute inset-0 flex items-center justify-center font-black text-[#023345] tracking-tight tabular-nums"
            style={{ fontSize: "clamp(28px, 4vw, 42px)" }}
          >
            {display}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="mt-2 text-[11px] sm:text-xs uppercase tracking-[0.18em] font-bold text-slate-500">
        {label}
      </span>
    </div>
  );
}

export function CountdownTimer({ targetDate }: { targetDate: Date }) {
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
      className="relative w-full max-w-[520px] rounded-[26px] p-5 sm:p-6 mt-7"
      style={{
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.96) 0%, rgba(230,244,247,0.96) 100%)",
        border: "1px solid rgba(42, 142, 158, 0.22)",
        boxShadow: "0 22px 50px rgba(2, 51, 69, 0.10)",
      }}
    >
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2a8e9e] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#2a8e9e]"></span>
          </span>
          <span className="text-[12px] sm:text-[13px] font-extrabold tracking-widest uppercase text-[#023345]">
            Hackathon starts in
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-bold text-slate-500">
          <Calendar className="w-3.5 h-3.5 text-[#2a8e9e]" />
          June 10
          <span className="text-slate-300">•</span>
          <Clock className="w-3.5 h-3.5 text-[#2a8e9e]" />
          8:00 PM EST
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2 sm:gap-3">
        <FlipUnit label="Days" value={timeLeft.days} />
        <FlipUnit label="Hours" value={timeLeft.hours} />
        <FlipUnit label="Minutes" value={timeLeft.minutes} />
        <FlipUnit label="Seconds" value={timeLeft.seconds} />
      </div>
    </motion.div>
  );
}

export default CountdownTimer;
