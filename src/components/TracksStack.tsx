import { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionStyle,
} from "framer-motion";
import { ChevronRight, Lock } from "lucide-react";
import { fetchCountdownConfig, fetchTracksConfig } from "../lib/configCache";
import { resolveHackathonStartDate } from "../lib/hackathonDates";

type ApiTrack = {
  id: string;
  number: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  accent: string;
  icon: string;
  briefUrl?: string | null;
};

type TrackCard = ApiTrack & {
  accentSoft: string;
  accentRing: string;
  gradient: string;
};

function hexToRgba(hex: string, alpha: number) {
  const normalized = hex.replace("#", "");
  const r = parseInt(normalized.slice(0, 2), 16);
  const g = parseInt(normalized.slice(2, 4), 16);
  const b = parseInt(normalized.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function toTrackCard(track: ApiTrack): TrackCard {
  return {
    ...track,
    accentSoft: hexToRgba(track.accent, 0.12),
    accentRing: hexToRgba(track.accent, 0.25),
    gradient: `linear-gradient(90deg, ${track.accent}, ${hexToRgba(track.accent, 0.55)})`,
  };
}

/** Format in America/New_York so "July 8th 8 PM EST" stays July 8th globally. */
function formatBriefDropLabel(date: Date) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    month: "long",
    day: "numeric",
  }).formatToParts(date);
  const month = parts.find((p) => p.type === "month")?.value ?? "";
  const day = Number(parts.find((p) => p.type === "day")?.value ?? 0);
  const suffix =
    day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
        ? "nd"
        : day % 10 === 3 && day !== 13
          ? "rd"
          : "th";
  return `${month} ${day}${suffix}`;
}

function SectionHeader() {
  return (
    <header className="trackstack__head trackstack__head--in-card">
      <p className="trackstack__eyebrow">
        <span className="trackstack__eyebrow-dot" aria-hidden="true" />
        Choose Your Arena
      </p>
      <h2 className="trackstack__title">
        <span className="trackstack__title-line">
          5 Tracks.{" "}
          <span className="trackstack__title-accent">One Mission.</span>
        </span>
      </h2>
      <p className="trackstack__intro">
        Pick the track that matches your skills. Use any tech stack, any tools, any APIs.
        Full challenge briefs and starter assets drop on July 8th at 8 PM EST.
      </p>
    </header>
  );
}

function StackCard({
  track,
  index,
  briefUnlocked,
  briefDropLabel,
  releaseTimeLabel,
}: {
  track: TrackCard;
  index: number;
  briefUnlocked: boolean;
  briefDropLabel: string;
  releaseTimeLabel: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isFirstCard = index === 0;

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const opacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 0.9, 0.7]);

  const stickyTop = isFirstCard
    ? "var(--trackstack-nav-offset)"
    : `calc(var(--trackstack-nav-offset) + var(--trackstack-head-in-card) + ${index} * var(--trackstack-step))`;

  const style: MotionStyle = {
    "--track-accent": track.accent,
    "--track-accent-soft": track.accentSoft,
    "--track-accent-ring": track.accentRing,
    "--track-gradient": track.gradient,
    top: stickyTop,
    zIndex: index + 1,
    scale,
    opacity,
  } as MotionStyle;

  const showBriefLink = briefUnlocked && track.briefUrl;
  const showBriefAvailable = briefUnlocked && !track.briefUrl;

  return (
    <motion.article
      ref={cardRef}
      className={`trackstack__card${isFirstCard ? " trackstack__card--lead" : ""}`}
      style={style}
    >
      {isFirstCard && <SectionHeader />}

      <div className="trackstack__card-accent-bar" aria-hidden="true" />
      <div className="trackstack__card-inner">
        <div className="trackstack__card-body">
          <div className="trackstack__card-header">
            <div className="trackstack__card-meta">
              <span className="trackstack__card-num" aria-hidden="true">
                {track.number}
              </span>
              <span className="trackstack__card-chip">TRACK {track.number}</span>
            </div>
            <span className="trackstack__card-emoji" aria-hidden="true">
              {track.icon}
            </span>
          </div>

          <p className="trackstack__card-category">{track.category}</p>
          <h3 className="trackstack__card-title">{track.title}</h3>
          <p className="trackstack__card-desc">{track.description}</p>

          <div className="trackstack__card-tags">
            {track.tags.map((t) => (
              <span key={t} className="trackstack__card-tag">
                {t}
              </span>
            ))}
          </div>

          <div className="trackstack__card-foot">
            {showBriefLink ? (
              <a
                href={track.briefUrl!}
                className="trackstack__card-cta trackstack__card-cta--link"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Brief
                <ChevronRight className="w-4 h-4 trackstack__card-cta-arrow" />
              </a>
            ) : showBriefAvailable ? (
              <span className="trackstack__card-cta">Brief available</span>
            ) : (
              <span className="trackstack__card-cta">
                <Lock className="w-3.5 h-3.5" aria-hidden="true" />
                Full brief drops {briefDropLabel}
              </span>
            )}
            <span className="trackstack__card-time">{releaseTimeLabel}</span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export function TracksStack() {
  const [tracks, setTracks] = useState<TrackCard[]>([]);
  const [countdown, setCountdown] = useState<{
    started?: boolean;
    startDate?: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const [tracksRes, countdownRes] = await Promise.all([
          fetchTracksConfig(),
          fetchCountdownConfig(),
        ]);
        if (cancelled) return;
        const apiTracks = (tracksRes.data ?? []) as ApiTrack[];
        setTracks(apiTracks.map(toTrackCard));
        setCountdown(countdownRes.data ?? null);
      } catch (err) {
        console.error("[tracks] failed to load config:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const briefUnlocked = countdown?.started === true;
  const briefDropLabel = useMemo(
    () => formatBriefDropLabel(resolveHackathonStartDate(countdown)),
    [countdown]
  );
  const releaseTimeLabel = "8 PM EST";

  return (
    <section id="tracks-section" className="trackstack trackstack--v2">
      <div className="trackstack__decor" aria-hidden="true">
        <div className="trackstack__grid" />
        <div className="trackstack__blob trackstack__blob--a" />
        <div className="trackstack__blob trackstack__blob--b" />
      </div>

      <div className="trackstack__wrap">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="trackstack__stage"
        >
          {loading && tracks.length === 0 ? (
            <div className="trackstack__loading" aria-busy="true">
              Loading tracks…
            </div>
          ) : (
            <motion.div
              className="trackstack__cards"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              {tracks.map((track, i) => (
                <StackCard
                  key={track.id}
                  track={track}
                  index={i}
                  briefUnlocked={briefUnlocked}
                  briefDropLabel={briefDropLabel}
                  releaseTimeLabel={releaseTimeLabel}
                />
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

export default TracksStack;
