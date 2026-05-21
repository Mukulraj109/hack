import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

export type ReelItem = {
  id: string;
  title: string;
  caption: string;
  src: string;
  poster?: string;
};

/** Placeholders — swap `src` / `poster` when real reels are ready */
export const REEL_PLACEHOLDERS: ReelItem[] = [
  {
    id: "kickoff",
    title: "Hackathon kickoff",
    caption: "100-hour sprint energy",
    src: "https://videos.pexels.com/video-files/3255275/3255275-uhd_2560_1440_25fps.mp4",
    poster: "/p1.png",
  },
  {
    id: "build",
    title: "Build in public",
    caption: "Ship proof recruiters can scan",
    src: "https://videos.pexels.com/video-files/3194287/3194287-uhd_2560_1440_25fps.mp4",
    poster: "/p2.png",
  },
  {
    id: "team",
    title: "Team up",
    caption: "Solo or squad of four",
    src: "https://videos.pexels.com/video-files/7578651/7578651-hd_1920_1080_25fps.mp4",
    poster: "/p3.png",
  },
  {
    id: "present",
    title: "Present to judges",
    caption: "Demo day highlights",
    src: "https://videos.pexels.com/video-files/7653214/7653214-hd_1920_1080_25fps.mp4",
    poster: "/p4.png",
  },
];

function ReelCard({ reel, index }: { reel: ReelItem; index: number }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reduced, setReduced] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

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

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  return (
    <motion.article
      className="reels-showcase__card"
      ref={wrapRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1]
      }}
      whileHover={{ y: -12, scale: 1.03 }}
    >
      <div className="reels-showcase__media">
        {reduced ? (
          <img src={reel.poster ?? "/p1.png"} alt="" className="reels-showcase__poster" />
        ) : (
          <video
            ref={videoRef}
            className="reels-showcase__video"
            muted
            loop
            playsInline
            preload="metadata"
            poster={reel.poster}
          >
            <source src={reel.src} type="video/mp4" />
          </video>
        )}
        <motion.div
          className="reels-showcase__play"
          aria-hidden
          animate={{
            scale: isHovered ? 1.2 : 1,
            backgroundColor: isHovered ? "rgb(0,255,157)" : "rgba(255,255,255,0.95)",
          }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <Play className="w-5 h-5" style={{ color: isHovered ? "white" : "#023345" }} />
        </motion.div>
        <motion.div
          className="reels-showcase__overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </div>
      <div className="reels-showcase__meta">
        <h3 className="reels-showcase__card-title">{reel.title}</h3>
        <p className="reels-showcase__card-caption">{reel.caption}</p>
      </div>
    </motion.article>
  );
}

export function ReelsShowcase({ reels = REEL_PLACEHOLDERS }: { reels?: ReelItem[] }) {
  return (
    <section id="reels-section" className="reels-showcase scroll-mt-28" aria-label="Event reels">
      <motion.header
        className="reels-showcase__head"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.55, ease: "easeOut" }}
      >
        <p className="reels-showcase__label">Highlights</p>
        <h2 className="reels-showcase__title">See it in motion</h2>
        <p className="reels-showcase__intro">
          Short clips from past sprints and the community — placeholders for now; swap in your reels when they&apos;re ready.
        </p>
      </motion.header>

      <div className="reels-showcase__grid">
        {reels.map((reel, i) => (
          <ReelCard key={reel.id} reel={reel} index={i} />
        ))}
      </div>
    </section>
  );
}

export default ReelsShowcase;
