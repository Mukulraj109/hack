"use client";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagicButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
}

export function MagicButton({
  children,
  className = "",
  onClick,
  variant = "primary",
}: MagicButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <motion.button
      ref={buttonRef}
      className={cn(
        "relative overflow-hidden rounded-full px-8 py-3.5 font-bold text-white transition-all duration-300",
        variant === "primary"
          ? "bg-gradient-to-r from-cyan-600 to-teal-600 shadow-lg shadow-cyan-900/30"
          : "border-2 border-slate-300 bg-white text-slate-800 shadow-sm",
        className
      )}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 -translate-x-full"
        animate={{
          translateX: isHovered ? "200%" : "-100%",
        }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
        }}
      />

      {/* Glow effect on hover */}
      <motion.div
        className={cn(
          "absolute inset-0 rounded-full opacity-0 blur-lg transition-opacity duration-300",
          variant === "primary" ? "bg-cyan-400" : "bg-slate-200"
        )}
        animate={{ opacity: isHovered ? 0.5 : 0 }}
      />

      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </motion.button>
  );
}

export default MagicButton;
