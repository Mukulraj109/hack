import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Play, Sparkles } from "lucide-react";

export type ReelItem = {
  id: string;
  title: string;
  caption: string;
  src: string;
  poster?: string;
  badge?: string;
};

/** Placeholders — swap `src` / `poster` when real reels are ready */
export const REEL_PLACEHOLDERS: ReelItem[] = [
  {
    id: "kickoff",
    title: "Hackathon kickoff",
    caption: "100-hour sprint energy",
    src: "https://videos.pexels.com/video-files/3255275/3255275-uhd_2560_1440_25fps.mp4",
    poster: "/p1.png",
    badge: "Epic Start",
  },
  {
    id: "build",
    title: "Build in public",
    caption: "Ship proof recruiters can scan",
    src: "https://videos.pexels.com/video-files/3194287/3194287-uhd_2560_1440_25fps.mp4",
    poster: "/p2.png",
    badge: "In Action",
  },
  {
    id: "team",
    title: "Team up",
    caption: "Solo or squad of four",
    src: "https://videos.pexels.com/video-files/7578651/7578651-hd_1920_1080_25fps.mp4",
    poster: "/p3.png",
    badge: "Collaborate",
  },
  {
    id: "present",
    title: "Present to judges",
    caption: "Demo day highlights",
    src: "https://videos.pexels.com/video-files/7653214/7653214-hd_1920_1080_25fps.mp4",
    poster: "/p4.png",
    badge: "Winner Vibes",
  },
];

function useMobileReelsLayout() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return isMobile;
}

function GlassCard({
  reel,
  index,
  isMobile,
  variant = "default",
}: {
  reel: ReelItem;
  index: number;
  isMobile: boolean;
  variant?: "default" | "sprint";
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reduced, setReduced] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const isSprint = variant === "sprint";
  const enableTilt = !isMobile && !isSprint;

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), {
    stiffness: 150,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), {
    stiffness: 150,
    damping: 20,
  });
  const scale = useSpring(1, { stiffness: 200, damping: 20 });

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reduced) return;

    const el = wrapRef.current;
    const video = videoRef.current;
    if (!el || !video) return;

    const scrollRoot = isMobile
      ? el.closest(".reels-masonry-grid")
      : null;

    const io = new IntersectionObserver(
      ([entry]) => {
        const minRatio = isMobile ? 0.55 : 0.25;
        if (entry.isIntersecting && entry.intersectionRatio >= minRatio) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      {
        root: scrollRoot,
        threshold: isMobile ? [0, 0.35, 0.55, 0.75, 1] : 0.25,
      }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced, isMobile]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enableTilt || !wrapRef.current) return;
    const rect = wrapRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseEnter = () => {
    if (!enableTilt) return;
    setIsHovered(true);
    scale.set(1.05);
  };

  const handleMouseLeave = () => {
    if (!enableTilt) return;
    setIsHovered(false);
    scale.set(1);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={wrapRef}
      className={`reel-glass-card${isSprint ? " reel-glass-card--sprint" : ""}`}
      data-reel-index={index}
      onMouseMove={enableTilt ? handleMouseMove : undefined}
      onMouseEnter={enableTilt ? handleMouseEnter : undefined}
      onMouseLeave={enableTilt ? handleMouseLeave : undefined}
      style={
        enableTilt
          ? {
              rotateX,
              rotateY,
              scale,
              transformStyle: "preserve-3d",
            }
          : undefined
      }
      initial={{ opacity: 0, y: isMobile || isSprint ? 24 : 60, scale: isMobile || isSprint ? 1 : 0.8 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: isMobile || isSprint ? 0.5 : 0.7,
        delay: isMobile || isSprint ? index * 0.06 : index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <motion.div
        className="reel-glass-card__border"
        aria-hidden="true"
      />

      <div className="reel-glass-card__body">
        {reel.badge && !isSprint && (
          <motion.div
            className="reel-glass-card__badge"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: isHovered && enableTilt ? 1 : 0.85, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Sparkles className="w-3 h-3" />
            {reel.badge}
          </motion.div>
        )}

        <motion.div
          className="reel-glass-card__media"
        >
          {reduced ? (
            <img
              src={reel.poster ?? "/p1.png"}
              alt=""
              className="reel-glass-card__poster"
            />
          ) : (
            <video
              ref={videoRef}
              className="reel-glass-card__video"
              muted
              loop
              playsInline
              preload="metadata"
              poster={reel.poster}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            >
              <source src={reel.src} type="video/mp4" />
            </video>
          )}

          <div className="reel-glass-card__gradient-overlay" />

          {!isPlaying && (
            <motion.div
              className="reel-glass-card__play"
              aria-hidden="true"
              animate={{ scale: isHovered && enableTilt ? 1.15 : 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <Play className="reel-glass-card__play-icon" fill="currentColor" />
            </motion.div>
          )}

          <motion.div
            className="reel-glass-card__glow"
            animate={{ opacity: isHovered && enableTilt ? 1 : 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            style={{
              background: isHovered
                ? "radial-gradient(ellipse 70% 55% at 50% 42%, rgba(8, 145, 178, 0.14) 0%, rgba(6, 182, 212, 0.06) 42%, transparent 68%)"
                : "transparent",
            }}
          />
        </motion.div>

        <motion.div className="reel-glass-card__meta">
          <motion.h3
            className="reel-glass-card__title"
            animate={{ x: isHovered && enableTilt ? 4 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {reel.title}
          </motion.h3>
          <motion.p
            className="reel-glass-card__caption"
            animate={{ x: isHovered && enableTilt ? 4 : 0 }}
            transition={{ duration: 0.3, delay: 0.05 }}
          >
            {reel.caption}
          </motion.p>
        </motion.div>

        <motion.div
          className="reel-glass-card__underline"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered && enableTilt ? 1 : 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </motion.div>
  );
}

export function ReelsShowcase({
  reels = REEL_PLACEHOLDERS,
  variant = "default",
}: {
  reels?: ReelItem[];
  variant?: "default" | "sprint";
}) {
  const isMobile = useMobileReelsLayout();
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const syncActiveIndex = useCallback(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const cards = grid.querySelectorAll<HTMLElement>("[data-reel-index]");
    if (!cards.length) return;

    const gridRect = grid.getBoundingClientRect();
    const gridCenter = gridRect.left + gridRect.width / 2;

    let closest = 0;
    let closestDist = Infinity;

    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const cardCenter = rect.left + rect.width / 2;
      const dist = Math.abs(cardCenter - gridCenter);
      const idx = Number(card.dataset.reelIndex ?? 0);
      if (dist < closestDist) {
        closestDist = dist;
        closest = idx;
      }
    });

    setActiveIndex(closest);
  }, []);

  useEffect(() => {
    if (!isMobile) return;

    const grid = gridRef.current;
    if (!grid) return;

    syncActiveIndex();
    grid.addEventListener("scroll", syncActiveIndex, { passive: true });
    window.addEventListener("resize", syncActiveIndex);

    return () => {
      grid.removeEventListener("scroll", syncActiveIndex);
      window.removeEventListener("resize", syncActiveIndex);
    };
  }, [isMobile, syncActiveIndex, reels.length]);

  const scrollToReel = (index: number) => {
    const grid = gridRef.current;
    if (!grid) return;
    const card = grid.querySelector<HTMLElement>(`[data-reel-index="${index}"]`);
    card?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  };

  const isSprint = variant === "sprint";

  return (
    <section
      id="reels-section"
      className={`reels-showcase scroll-mt-28${isSprint ? " reels-showcase--sprint" : ""}`}
      aria-label="Event reels"
    >
      <motion.header
        className="reels-showcase__head"
        initial={{ opacity: 0, y: isSprint ? 12 : 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {!isSprint && (
          <motion.p
            className="reels-showcase__label"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Sparkles className="w-4 h-4 inline mr-2" />
            Highlights
          </motion.p>
        )}
        <motion.h2
          className="reels-showcase__title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: isSprint ? 0.1 : 0.2 }}
        >
          See it in motion
        </motion.h2>
        {!isSprint && (
          <motion.p
            className="reels-showcase__intro"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Short clips from past sprints and the community — placeholders for now; swap in your reels when they&apos;re ready.
          </motion.p>
        )}
      </motion.header>

      <motion.div
        ref={gridRef}
        className="reels-masonry-grid"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
      >
        {reels.map((reel, i) => (
          <GlassCard key={reel.id} reel={reel} index={i} isMobile={isMobile} variant={variant} />
        ))}
      </motion.div>

      {isMobile && (
        <motion.div
          className="reels-showcase__dots"
          aria-label="Reel pagination"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {reels.map((reel, i) => (
            <button
              key={reel.id}
              type="button"
              className={`reels-showcase__dot${i === activeIndex ? " is-active" : ""}`}
              aria-label={`Show reel ${i + 1} of ${reels.length}`}
              aria-current={i === activeIndex ? "true" : undefined}
              onClick={() => scrollToReel(i)}
            />
          ))}
        </motion.div>
      )}
    </section>
  );
}

export default ReelsShowcase;
