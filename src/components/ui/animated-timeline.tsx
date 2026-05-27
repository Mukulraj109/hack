"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { LucideIcon, CheckCircle2, Circle, Clock, Gift } from "lucide-react";

interface TimelineItem {
  id: string;
  title: string;
  description: string;
  points: string;
  icon?: LucideIcon;
  status?: "completed" | "active" | "locked";
  action?: string;
  helper?: string;
}

interface AnimatedTimelineProps {
  items: TimelineItem[];
  className?: string;
  accentColor?: "cyan" | "purple" | "orange" | "green";
}

const colorMap = {
  cyan: {
    bg: "bg-cyan-500",
    text: "text-cyan-500",
    light: "bg-cyan-50",
    border: "border-cyan-200",
    badge: "bg-cyan-100 text-cyan-700",
  },
  purple: {
    bg: "bg-purple-500",
    text: "text-purple-500",
    light: "bg-purple-50",
    border: "border-purple-200",
    badge: "bg-purple-100 text-purple-700",
  },
  orange: {
    bg: "bg-orange-500",
    text: "text-orange-500",
    light: "bg-orange-50",
    border: "border-orange-200",
    badge: "bg-orange-100 text-orange-700",
  },
  green: {
    bg: "bg-green-500",
    text: "text-green-500",
    light: "bg-green-50",
    border: "border-green-200",
    badge: "bg-green-100 text-green-700",
  },
};

export function AnimatedTimeline({
  items,
  className = "",
  accentColor = "cyan",
}: AnimatedTimelineProps) {
  const colors = colorMap[accentColor];

  return (
    <div className={cn("relative", className)}>
      {/* Timeline track */}
      <div className="absolute left-6 top-0 h-full w-0.5 bg-gradient-to-b from-cyan-400 via-teal-400 to-slate-200" />

      <div className="space-y-6">
        {items.map((item, index) => {
          const Icon = item.icon || Circle;
          const isCompleted = item.status === "completed";
          const isActive = item.status === "active";
          const isLocked = item.status === "locked";

          return (
            <motion.div
              key={item.id}
              className="relative flex gap-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              {/* Timeline node */}
              <div className="relative z-10 flex-shrink-0">
                <motion.div
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-full border-4 transition-all duration-300",
                    isCompleted && "border-green-400 bg-green-50",
                    isActive && `border-cyan-400 bg-cyan-50 ${colors.light}`,
                    isLocked && "border-slate-200 bg-slate-50"
                  )}
                  whileHover={{ scale: 1.1 }}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="h-6 w-6 text-green-500" />
                  ) : isLocked ? (
                    <Clock className="h-5 w-5 text-slate-400" />
                  ) : (
                    <Icon className={cn("h-5 w-5", colors.text)} />
                  )}
                </motion.div>

                {/* Pulse animation for active */}
                {isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-cyan-400"
                    animate={{ scale: [1, 1.4, 1], opacity: [1, 0, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  />
                )}
              </div>

              {/* Content card */}
              <motion.div
                className={cn(
                  "flex-1 rounded-2xl border bg-white p-5 shadow-sm transition-all duration-300",
                  isCompleted && colors.border,
                  isActive && "border-cyan-200 shadow-md shadow-cyan-100",
                  isLocked && "border-slate-200 opacity-75"
                )}
                whileHover={!isLocked ? { x: 4, shadow: "0 8px 24px rgba(0,0,0,0.1)" } : {}}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <h4 className="mb-1 font-bold text-slate-800">{item.title}</h4>
                    <p className="text-sm text-slate-500">{item.description}</p>
                  </div>

                  <motion.span
                    className={cn(
                      "flex-shrink-0 rounded-lg px-3 py-1 text-sm font-bold",
                      isCompleted ? colors.badge : "bg-slate-100 text-slate-600"
                    )}
                    whileHover={{ scale: 1.05 }}
                  >
                    {item.points}
                  </motion.span>
                </div>

                {/* Action and helper */}
                <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
                  <span className="text-xs text-slate-400">{item.helper || ""}</span>
                  {item.action && (
                    <motion.button
                      className={cn(
                        "rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors",
                        isLocked
                          ? "bg-slate-100 text-slate-400"
                          : "bg-cyan-50 text-cyan-600 hover:bg-cyan-100"
                      )}
                      whileHover={!isLocked ? { scale: 1.05 } : {}}
                      whileTap={{ scale: 0.95 }}
                    >
                      {item.action}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// Mini timeline for inline display
interface MiniTimelineProps {
  progress: number; // 0-100
  steps: { label: string; value: string }[];
  className?: string;
}

export function MiniTimeline({ progress, steps, className = "" }: MiniTimelineProps) {
  return (
    <div className={cn("space-y-3", className)}>
      <div className="relative h-2 overflow-hidden rounded-full bg-slate-100">
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-cyan-400 to-teal-400"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>

      <div className="flex justify-between text-xs text-slate-500">
        {steps.map((step, i) => (
          <span key={i} className={progress >= (i + 1) * (100 / steps.length) ? "text-cyan-600 font-medium" : ""}>
            {step.label}
          </span>
        ))}
      </div>
    </div>
  );
}
