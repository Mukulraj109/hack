"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
}

export function BentoCard({
  children,
  className = "",
}: BentoCardProps) {
  return (
    <motion.div
      className={cn(
        "rounded-2xl border-2 border-slate-100 bg-white shadow-sm transition-all hover:shadow-lg",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
