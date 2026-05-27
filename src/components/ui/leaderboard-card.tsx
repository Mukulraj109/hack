"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Trophy, Medal, TrendingUp, User } from "lucide-react";

interface LeaderboardEntry {
  rank: number;
  team: string;
  points: number;
  note?: string;
  isCurrentUser?: boolean;
}

interface LeaderboardProps {
  entries: LeaderboardEntry[];
  maxPoints: number;
  className?: string;
}

export function Leaderboard({ entries, maxPoints, className = "" }: LeaderboardProps) {
  return (
    <div className={cn("space-y-3", className)}>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-amber-500" />
          <h3 className="font-bold text-slate-800">Leaderboard</h3>
        </div>
        <span className="text-xs font-medium text-slate-400">Live rankings</span>
      </div>

      {/* Entries */}
      <div className="space-y-2">
        {entries.map((entry, index) => (
          <LeaderboardRow
            key={entry.rank}
            entry={entry}
            maxPoints={maxPoints}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}

interface LeaderboardRowProps {
  entry: LeaderboardEntry;
  maxPoints: number;
  index: number;
}

function LeaderboardRow({ entry, maxPoints, index }: LeaderboardRowProps) {
  const isTopThree = entry.rank <= 3;
  const rankColors = {
    1: "bg-gradient-to-br from-amber-400 to-amber-600 text-white shadow-lg shadow-amber-500/30",
    2: "bg-gradient-to-br from-slate-300 to-slate-500 text-white shadow-lg shadow-slate-500/20",
    3: "bg-gradient-to-br from-orange-400 to-orange-600 text-white shadow-lg shadow-orange-500/30",
  };

  return (
    <motion.div
      className={cn(
        "group relative flex items-center gap-4 rounded-xl border p-4 transition-all duration-300",
        entry.isCurrentUser
          ? "border-cyan-300 bg-gradient-to-r from-cyan-50 to-white shadow-md shadow-cyan-100"
          : "border-slate-100 bg-white hover:border-slate-200 hover:shadow-md"
      )}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      whileHover={{ scale: 1.01 }}
    >
      {/* Highlight indicator */}
      {entry.isCurrentUser && (
        <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl bg-cyan-500" />
      )}

      {/* Rank badge */}
      <motion.div
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-full text-sm font-black",
          isTopThree ? rankColors[entry.rank as keyof typeof rankColors] : "bg-slate-100 text-slate-600"
        )}
        whileHover={{ scale: 1.1 }}
      >
        {entry.rank}
      </motion.div>

      {/* Team info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-800 truncate">{entry.team}</span>
          {entry.isCurrentUser && (
            <span className="rounded-full bg-cyan-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-cyan-700">
              You
            </span>
          )}
        </div>
        {entry.note && (
          <p className="text-xs text-slate-400 truncate">{entry.note}</p>
        )}
      </div>

      {/* Points */}
      <div className="text-right">
        <div className="flex items-center gap-1">
          <span className="text-xl font-black text-slate-800">{entry.points}</span>
          <span className="text-xs text-slate-400">/ {maxPoints}</span>
        </div>
        {/* Mini progress bar */}
        <div className="mt-1 h-1 w-16 overflow-hidden rounded-full bg-slate-100">
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-400 to-teal-400"
            initial={{ width: 0 }}
            animate={{ width: `${(entry.points / maxPoints) * 100}%` }}
            transition={{ delay: 0.3, duration: 0.5 }}
          />
        </div>
      </div>

      {/* Medal icon for top 3 */}
      {isTopThree && (
        <motion.div
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-full",
            entry.rank === 1 && "bg-amber-100 text-amber-500",
            entry.rank === 2 && "bg-slate-100 text-slate-400",
            entry.rank === 3 && "bg-orange-100 text-orange-500"
          )}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 + index * 0.1, type: "spring" }}
        >
          <Medal className="h-4 w-4" />
        </motion.div>
      )}
    </motion.div>
  );
}
