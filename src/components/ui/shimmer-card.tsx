"use client";
import { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface ShimmerCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  highlightColor?: string;
  enableTilt?: boolean;
}

export function ShimmerCard({
  children,
  className = "",
  highlightColor = "rgba(6, 182, 212, 0.3)",
  enableTilt = true,
  ...props
}: ShimmerCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-0.5, 0.5], ["7.5deg", "-7.5deg"]);
  const rotateY = useTransform(x, [-0.5, 0.5], ["-7.5deg", "7.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || !enableTilt) return;
    const rect = ref.current.getBoundingClientRect();
    const X = (e.clientX - rect.left) / rect.width - 0.5;
    const Y = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(X);
    y.set(Y);
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={cn(
        "relative rounded-2xl overflow-hidden transition-shadow duration-300",
        isHovered && "shadow-2xl shadow-cyan-500/20",
        className
      )}
      style={
        enableTilt
          ? {
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
            }
          : undefined
      }
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {/* Shimmer gradient overlay */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-10 opacity-0"
        animate={{
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        style={{
          background: isHovered
            ? `radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${highlightColor} 0%, transparent 60%)`
            : "transparent",
        }}
      />

      {/* Border glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        animate={{
          boxShadow: isHovered
            ? `inset 0 0 30px ${highlightColor}, 0 0 20px ${highlightColor}`
            : "inset 0 0 0px transparent",
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Content */}
      <div className="relative z-[1]">{children}</div>
    </motion.div>
  );
}

export default ShimmerCard;
