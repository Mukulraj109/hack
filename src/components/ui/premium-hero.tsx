"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Clock, Sparkles, Trophy } from "lucide-react";

interface PremiumHeroProps {
  title: string;
  subtitle: string;
  badge?: string;
  teamName?: string;
  currentPoints?: number;
  maxPoints?: number;
  children?: React.ReactNode;
  className?: string;
}

export function PremiumHero({
  title,
  subtitle,
  badge = "FirstStepHack",
  teamName,
  currentPoints = 0,
  maxPoints = 250,
  children,
  className = "",
}: PremiumHeroProps) {
  return (
    <motion.div
      className={cn(
        "relative overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 shadow-2xl",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient orbs */}
        <motion.div
          className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-cyan-500/20 blur-3xl"
          animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-purple-500/20 blur-3xl"
          animate={{ x: [0, -20, 0], y: [0, 20, 0] }}
          transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal-500/10 blur-2xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        />

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Content */}
      <div className="relative z-10 grid gap-8 lg:grid-cols-2 lg:items-center">
        {/* Left content */}
        <div className="space-y-6">
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Sparkles className="h-4 w-4 text-cyan-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-300">
              {badge} · 100-hour sprint
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            className="text-4xl font-black leading-tight text-white lg:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {title}
            <span className="bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
              {" "}
              {subtitle}
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            className="max-w-lg text-base leading-relaxed text-slate-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Ship your demo, upload artifacts, and rack up pre-judge points before finals. Everything here is tuned for teams already checked in.
          </motion.p>

          {/* Team info */}
          {teamName && (
            <motion.div
              className="flex flex-wrap items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-teal-500 text-white">
                  <span className="text-sm font-bold">{teamName.charAt(0)}</span>
                </div>
                <div>
                  <p className="font-semibold text-white">{teamName}</p>
                  <p className="text-xs text-slate-400">Your team</p>
                </div>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div>
                <p className="text-sm text-slate-400">
                  Points{" "}
                  <span className="font-bold text-white">{currentPoints}</span>
                  <span className="text-slate-500"> / {maxPoints}</span>
                </p>
              </div>
            </motion.div>
          )}

          {/* CTAs */}
          <motion.div
            className="flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {children}
          </motion.div>
        </div>

        {/* Right content - Stats */}
        <div className="relative">
          {/* Countdown placeholder */}
          <motion.div
            className="relative rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="absolute -right-2 -top-2 flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/20">
              <Clock className="h-6 w-6 text-amber-400" />
            </div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Time left in sprint
            </div>
            {/* Countdown will be rendered here by parent */}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

// Floating particles effect
export function FloatingParticles({ count = 20 }: { count?: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-1 w-1 rounded-full bg-cyan-400/50"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
