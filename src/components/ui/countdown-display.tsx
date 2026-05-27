"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CountdownDisplayProps {
  targetDate: Date;
  className?: string;
  showLabels?: boolean;
  variant?: "default" | "large" | "minimal";
}

export function CountdownDisplay({
  targetDate,
  className = "",
  showLabels = true,
  variant = "default",
}: CountdownDisplayProps) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const difference = targetDate.getTime() - Date.now();
    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, ended: true };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      ended: false,
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (timeLeft.ended) {
    return (
      <div className={cn("text-center", className)}>
        <motion.span
          className="text-lg font-bold text-amber-600"
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          Event has ended
        </motion.span>
      </div>
    );
  }

  const segments = [
    { value: timeLeft.days, label: "Days" },
    { value: timeLeft.hours, label: "Hours" },
    { value: timeLeft.minutes, label: "Min" },
    { value: timeLeft.seconds, label: "Sec" },
  ];

  const sizeClasses = {
    default: "px-3 py-2 text-lg",
    large: "px-4 py-3 text-2xl",
    minimal: "px-2 py-1 text-sm",
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {segments.map((segment, index) => (
        <div key={segment.label} className="flex items-center gap-2">
          <motion.div
            className={cn(
              "flex flex-col items-center rounded-xl border bg-white shadow-sm",
              sizeClasses[variant]
            )}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <span className={cn(
              "font-mono font-black tabular-nums text-slate-800",
              variant === "large" && "text-3xl",
              variant === "minimal" && "text-base",
              variant === "default" && "text-xl"
            )}>
              {String(segment.value).padStart(2, "0")}
            </span>
            {showLabels && (
              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                {segment.label}
              </span>
            )}
          </motion.div>
          {index < segments.length - 1 && (
            <span className={cn(
              "font-bold text-slate-300",
              variant === "large" && "text-2xl",
              variant === "minimal" && "text-xs",
              variant === "default" && "text-lg"
            )}>:</span>
          )}
        </div>
      ))}
    </div>
  );
}

// Circular countdown variant
interface CircularCountdownProps {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  className?: string;
}

export function CircularCountdown({ days, hours, minutes, seconds, className = "" }: CircularCountdownProps) {
  const segments = [
    { value: days, label: "Days", max: 30 },
    { value: hours, label: "Hours", max: 24 },
    { value: minutes, label: "Min", max: 60 },
    { value: seconds, label: "Sec", max: 60 },
  ];

  return (
    <div className={cn("flex gap-4", className)}>
      {segments.map((seg, i) => {
        const percentage = (seg.value / seg.max) * 100;
        const circumference = 2 * Math.PI * 40;
        const strokeDashoffset = circumference - (percentage / 100) * circumference;

        return (
          <div key={seg.label} className="relative flex flex-col items-center">
            <div className="relative h-24 w-24">
              {/* Background circle */}
              <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="6"
                  className="text-slate-100"
                />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  initial={{ strokeDashoffset: circumference }}
                  animate={{ strokeDashoffset }}
                  transition={{ duration: 0.5 }}
                  style={{ strokeDashoffset }}
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#06b6d4" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
              </svg>
              {/* Center text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-black text-slate-800">
                  {String(seg.value).padStart(2, "0")}
                </span>
              </div>
            </div>
            <span className="mt-1 text-xs font-semibold text-slate-400">{seg.label}</span>
          </div>
        );
      })}
    </div>
  );
}
