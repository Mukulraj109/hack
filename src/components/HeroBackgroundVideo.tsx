import { useEffect, useRef, useState } from "react";

export const HERO_VIDEO_SRC =
  "https://videos.pexels.com/video-files/7653214/7653214-hd_1920_1080_25fps.mp4";

export const HERO_VIDEO_POSTER = "/Gemini_Generated_Image_oxc8kaoxc8kaoxc8.png";

/** Team collaboration — used on Register CTA (distinct from hero) */
export const REGISTER_VIDEO_SRC =
  "https://videos.pexels.com/video-files/3255275/3255275-uhd_2560_1440_25fps.mp4";

export const REGISTER_VIDEO_POSTER = "/p4.png";

type HeroBackgroundVideoProps = {
  className?: string;
  variant?: "hero" | "section";
  src?: string;
  poster?: string;
};

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return reduced;
}

export function HeroBackgroundVideo({
  className = "",
  variant = "hero",
  src,
  poster,
}: HeroBackgroundVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const isHero = variant === "hero";
  const videoSrc = src ?? HERO_VIDEO_SRC;
  const videoPoster = poster ?? HERO_VIDEO_POSTER;

  useEffect(() => {
    if (prefersReducedMotion) return;

    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  const scrimClass = `hero-scrim ${isHero ? "hero-scrim--hero" : "hero-scrim--section"}`;
  const rootClass = `hero-bg-video ${isHero ? "hero-bg-video--fullbleed" : "hero-bg-video--section"} ${className}`.trim();

  return (
    <div ref={containerRef} className={rootClass} aria-hidden>
      {prefersReducedMotion ? (
        <img
          src={videoPoster}
          alt=""
          className="hero-bg-media"
          fetchPriority={isHero ? "high" : undefined}
          decoding="async"
        />
      ) : (
        <video
          ref={videoRef}
          className="hero-bg-media"
          autoPlay
          muted
          loop
          playsInline
          preload={isHero ? "metadata" : "none"}
          poster={videoPoster}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}
      <div className={scrimClass} />
    </div>
  );
}
