import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import "./styles/sprint-portal.css";
import TeamSetupPanel from "./components/TeamSetupPanel";
import PosterShareModal from "./components/team/PosterShareModal";
import {
  getTemplateById,
  defaultTemplateId,
  INSTAGRAM_TEMPLATES,
  LINKEDIN_TEMPLATES,
} from "./components/team/posterTemplates";
import { useTeamSocialProof } from "./hooks/useTeamSocialProof";
import { fetchSocialConfig } from "./lib/configCache";
import { useHackathonAuth } from "./auth/HackathonAuthContext";
import WhatsAppButton from "./components/WhatsAppButton";
import { apiFetch } from "./lib/api";

function memberDisplayName(m) {
  const name = [m.firstName, m.lastName].filter(Boolean).join(" ").trim();
  return name || m.email || "Teammate";
}

function memberToCard(m) {
  const skills = [];
  if (m.githubUrl) skills.push("GitHub");
  if (m.linkedinUrl) skills.push("LinkedIn");
  if (m.universityName) skills.push(m.universityName);
  if (m.currentCompanyName) skills.push(m.currentCompanyName);
  if (!skills.length) skills.push("Sprint participant");

  const bioParts = [];
  if (m.universityName) bioParts.push(`Studying at ${m.universityName}.`);
  if (m.currentCompanyName) bioParts.push(`Currently at ${m.currentCompanyName}.`);
  const bio = bioParts.join(" ") || "Building with the team during the 100-hour sprint.";

  return {
    id: m.id,
    name: memberDisplayName(m),
    role: m.isLeader ? "Team Captain" : "Core Member",
    isCaptain: Boolean(m.isLeader),
    skills: skills.slice(0, 4),
    bio,
    isActive: Boolean(m.isCurrentUser),
    status: m.isCurrentUser ? "Active in Workspace" : "Ready for Review",
    headshotUrl: m.headshotUrl || "",
  };
}

// Material Icon Component
function Icon({ name, filled = false, size = 24, style = {} }) {
  return (
    <span className="material-symbols-outlined" style={{
      fontVariationSettings: filled ? "'FILL' 1" : "'FILL' 0",
      fontSize: size,
      ...style
    }}>
      {name}
    </span>
  );
}

// Glass Card with 3D effects
function GlassCard({ children, style = {}, className = "" }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`rounded-2xl p-6 ${className}`}
      style={{
        background: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255, 255, 255, 0.6)",
        boxShadow: isHovered
          ? "0 25px 50px -12px rgba(0, 106, 97, 0.25), 0 0 40px rgba(0, 106, 97, 0.1)"
          : "0 8px 32px rgba(13, 148, 136, 0.08), inset 0 1px 0 rgba(255,255,255,0.6)",
        transform: isHovered ? "translateY(-4px)" : "translateY(0)",
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        ...style
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -8, scale: 1.01 }}
    >
      {children}
    </motion.div>
  );
}

// Profile Card Component
function ProfileCard({ member, index, onUploadHeadshot, uploadState, onRemoveMember, removeBusy }) {
  const [isHovered, setIsHovered] = useState(false);
  const fileInputRef = useRef(null);
  const isUploading = uploadState?.memberId === member.id && uploadState?.status === "uploading";
  const canRemove = Boolean(onRemoveMember && !member.isCaptain);
  const isRemoving = removeBusy?.memberId === member.id;

  const handlePick = () => {
    if (!member.isActive || isUploading) return;
    fileInputRef.current?.click();
  };

  const handleFileSelected = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      await onUploadHeadshot?.(member.id, file);
    } finally {
      event.target.value = "";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
    >
      <GlassCard>
        <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
          {/* Avatar / Headshot */}
          <motion.div
            className="w-32 h-32 md:w-40 md:h-40 shrink-0 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer bg-white/50 transition-all"
            style={{
              borderColor: isHovered ? "rgba(0, 104, 95, 0.6)" : "rgba(0, 104, 95, 0.3)",
            }}
            whileHover={{ scale: 1.05 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handlePick}
          >
            {member.headshotUrl ? (
              <img
                src={member.headshotUrl}
                alt={`${member.name} headshot`}
                className="h-full w-full rounded-2xl object-cover"
                loading="lazy"
              />
            ) : (
              <>
                <Icon name="add_a_photo" size={48} style={{ color: "rgba(0, 104, 95, 0.4)" }} />
                <p className="text-sm mt-2" style={{ color: "rgba(0, 104, 95, 0.6)" }}>
                  {member.isActive ? "Upload Headshot" : "No headshot yet"}
                </p>
              </>
            )}
            {member.isActive && (
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp"
                className="hidden"
                onChange={handleFileSelected}
              />
            )}
          </motion.div>

          {/* Member Info */}
          <div className="flex-1 space-y-4 w-full">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h3 className="text-xl font-bold" style={{ fontFamily: "'Hanken Grotesk', sans-serif", color: "#002B36" }}>
                {member.name}
              </h3>
              <span
                className="px-3 py-1 rounded-full text-sm font-medium"
                style={{
                  background: member.isCaptain
                    ? "rgba(57, 184, 253, 0.2)"
                    : "rgba(224, 227, 229, 1)",
                  color: member.isCaptain ? "#004666" : "#3d4947"
                }}
              >
                {member.role}
              </span>
            </div>

            {/* Skills */}
            <div className="flex flex-wrap gap-2">
              {member.skills.map((skill, i) => (
                <motion.span
                  key={i}
                  className="px-3 py-1.5 rounded-lg text-sm"
                  style={{
                    background: "#eceef0",
                    color: "#3d4947"
                  }}
                  whileHover={{ scale: 1.05 }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>

            {/* Bio */}
            <p className="text-sm leading-relaxed line-clamp-2" style={{ color: "#6d7a77" }}>
              {member.bio}
            </p>
            {member.isActive && (
              <p className="text-xs" style={{ color: "#6d7a77" }}>
                Allowed: JPG, PNG, WEBP up to 5MB.
              </p>
            )}
            {isUploading && (
              <p className="text-xs font-medium" style={{ color: "#00685f" }}>
                Uploading headshot...
              </p>
            )}
            {uploadState?.memberId === member.id && uploadState?.status === "error" && (
              <p className="text-xs font-medium" style={{ color: "#ba1a1a" }}>
                {uploadState.message}
              </p>
            )}

            {/* Status */}
            <div className="flex items-center gap-2">
              <motion.div
                className="w-2 h-2 rounded-full"
                style={{ background: member.isActive ? "#00685f" : "#bcc9c6" }}
                animate={member.isActive ? { scale: [1, 1.2, 1] } : {}}
                transition={{ repeat: member.isActive ? Infinity : 0, duration: 2 }}
              />
              <span className="text-sm font-medium" style={{ color: "#00685f" }}>
                {member.status}
              </span>
            </div>

            {canRemove && (
              <div className="pt-2">
                <motion.button
                  type="button"
                  disabled={isRemoving}
                  className="rounded-lg px-4 py-2 text-sm font-semibold disabled:opacity-50"
                  style={{
                    background: "rgba(186, 26, 26, 0.08)",
                    color: "#ba1a1a",
                    border: "1px solid rgba(186, 26, 26, 0.25)",
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onRemoveMember(member.id, member.name)}
                >
                  <Icon name="person_remove" size={18} style={{ marginRight: 6, verticalAlign: "middle" }} />
                  {isRemoving ? "Removing…" : "Remove from team"}
                </motion.button>
                {removeBusy?.memberId === member.id && removeBusy?.status === "error" && (
                  <p className="mt-2 text-xs font-medium" style={{ color: "#ba1a1a" }}>
                    {removeBusy.message}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}

// Meet The Competitors Section
function MeetCompetitorsSection({
  members = [],
  onUploadHeadshot,
  uploadState,
  onRemoveMember,
  removeBusy,
}) {
  const cards = members.map(memberToCard);

  return (
    <motion.section
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.5 }}
    >
      <h2 className="text-xl font-bold" style={{ fontFamily: "'Hanken Grotesk', sans-serif", color: "#002B36" }}>
        Meet the Team Members
      </h2>
      {cards.length === 0 ? (
        <GlassCard>
          <p style={{ color: "#6d7a77" }}>
            Create or join a team to see your teammates here.
          </p>
        </GlassCard>
      ) : (
        <div className="space-y-6">
          {cards.map((member, i) => (
            <ProfileCard
              key={members[i]?.id ?? i}
              member={member}
              index={i}
              onUploadHeadshot={onUploadHeadshot}
              uploadState={uploadState}
              onRemoveMember={onRemoveMember}
              removeBusy={removeBusy}
            />
          ))}
        </div>
      )}
    </motion.section>
  );
}

function SocialProofStatusCard({ platform, proof }) {
  const label = platform === "instagram" ? "Instagram" : "LinkedIn";
  if (!proof) {
    return (
      <div className="team-proof-card">
        <div className="team-proof-card__row">
          <strong style={{ color: "#002B36", fontSize: 14 }}>{label}</strong>
          <span className="team-proof-card__badge team-proof-card__badge--pending">Not submitted</span>
        </div>
        <p className="team-proof-card__meta">Create a poster and submit proof to earn 25 team points.</p>
      </div>
    );
  }

  const submitter = proof.submittedBy
    ? [proof.submittedBy.firstName, proof.submittedBy.lastName].filter(Boolean).join(" ") ||
      proof.submittedBy.email
    : "Team member";

  const badgeClass =
    proof.status === "verified"
      ? "team-proof-card__badge--verified"
      : proof.status === "rejected"
        ? "team-proof-card__badge--rejected"
        : "team-proof-card__badge--pending";

  const badgeLabel =
    proof.status === "verified"
      ? "Verified"
      : proof.status === "rejected"
        ? "Rejected"
        : "Under review";

  return (
    <div className="team-proof-card">
      <div className="team-proof-card__row">
        <strong style={{ color: "#002B36", fontSize: 14 }}>{label}</strong>
        <span className={`team-proof-card__badge ${badgeClass}`}>{badgeLabel}</span>
      </div>
      <p className="team-proof-card__meta">
        Submitted by {submitter}
        {proof.postUrl && (
          <>
            {" · "}
            <a href={proof.postUrl} target="_blank" rel="noreferrer" className="team-proof-card__link">
              View post
            </a>
          </>
        )}
      </p>
      {proof.screenshotUrl && (
        <img src={proof.screenshotUrl} alt={`${label} proof screenshot`} className="team-proof-card__thumb" loading="lazy" />
      )}
    </div>
  );
}

function PosterSlot({ label, variant, children }) {
  return (
    <div className="team-poster-slot">
      <p className="team-poster-slot__label">{label}</p>
      <div className={`team-poster-slot__frame team-poster-slot__frame--${variant}`}>{children}</div>
    </div>
  );
}

function TeamExplainerSection() {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const controlsTimeoutRef = useRef(null);

  const videoUrl = import.meta.env.VITE_TEAM_INFO_VIDEO_URL || "https://www.w3schools.com/html/mov_bbb.mp4";

  const handlePlayPause = () => {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) {
      el.play().catch(() => {});
    } else {
      el.pause();
    }
  };

  const handleMuteToggle = () => {
    const el = videoRef.current;
    if (!el) return;
    el.muted = !el.muted;
    setIsMuted(el.muted);
  };

  const handleTimeUpdate = () => {
    const el = videoRef.current;
    if (!el || !el.duration) return;
    setProgress((el.currentTime / el.duration) * 100);
  };

  const handleProgressClick = (e) => {
    const el = videoRef.current;
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    if (el && el.duration) {
      el.currentTime = percent * el.duration;
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => setShowControls(false), 2500);
    }
  };

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const onPlay = () => setIsPlaying(true);
    const onPause = () => { setIsPlaying(false); setShowControls(true); };
    const onEnded = () => { setIsPlaying(false); setShowControls(true); };
    el.addEventListener("play", onPlay);
    el.addEventListener("pause", onPause);
    el.addEventListener("ended", onEnded);
    el.addEventListener("timeupdate", handleTimeUpdate);

    // Reel-style: ensure autoplay kicks off, then fade controls out
    el.play().catch(() => {});
    const hideTimer = setTimeout(() => {
      if (!el.paused) setShowControls(false);
    }, 2500);

    return () => {
      clearTimeout(hideTimer);
      el.removeEventListener("play", onPlay);
      el.removeEventListener("pause", onPause);
      el.removeEventListener("ended", onEnded);
      el.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.35, duration: 0.5 }}
      style={{ display: "flex", justifyContent: "center", width: "100%" }}
    >
      <div
        ref={containerRef}
        style={{
          position: "relative",
          borderRadius: "24px",
          overflow: "hidden",
          background: "radial-gradient(circle at 50% 0%, #1a2530 0%, #0f1419 70%)",
          boxShadow: "0 24px 48px -12px rgba(0, 104, 95, 0.25), 0 0 40px rgba(0, 106, 97, 0.1)",
          border: "1px solid rgba(255, 255, 255, 0.6)",
          aspectRatio: "9 / 16",
          width: "100%",
          maxWidth: "340px",
          maxHeight: "600px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => isPlaying && setShowControls(false)}
      >
        {/* Context Badge */}
        <div style={{
          position: "absolute",
          top: "16px",
          left: "16px",
          zIndex: 10,
          background: "rgba(0, 0, 0, 0.4)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          borderRadius: "9999px",
          padding: "6px 12px",
          display: "flex",
          alignItems: "center",
          gap: "6px",
          color: "#ffffff",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "11px",
          fontWeight: "600",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          pointerEvents: "none"
        }}>
          <Icon name="info" size={14} style={{ color: "#89f5e7" }} />
          How it works
        </div>

        <video
            ref={videoRef}
            style={{
              display: "block",
              width: "100%",
              height: "100%",
              objectFit: "cover",
              background: "#0f1419",
              cursor: "pointer",
            }}
            autoPlay
            muted={isMuted}
            loop
            playsInline
            onClick={handlePlayPause}
          >
            <source src={videoUrl} type="video/mp4" />
          </video>

          {/* Play/Pause overlay — shown when paused or on hover */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
              opacity: showControls || !isPlaying ? 1 : 0,
              transition: "opacity 0.25s ease",
              background: !isPlaying
                ? "linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.4) 100%)"
                : "transparent",
            }}
          >
            <motion.div
              initial={false}
              animate={{ scale: isPlaying ? 0.8 : 1, opacity: isPlaying ? 0 : 1 }}
              transition={{ duration: 0.2 }}
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.15)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "2px solid rgba(255,255,255,0.3)",
                pointerEvents: "none",
              }}
            >
              <Icon name="play_arrow" filled size={36} style={{ color: "#ffffff", marginLeft: "4px" }} />
            </motion.div>
          </div>

          {/* Bottom controls bar */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              padding: "12px 16px",
              background: "linear-gradient(0deg, rgba(0,0,0,0.7) 0%, transparent 100%)",
              opacity: showControls || !isPlaying ? 1 : 0,
              transition: "opacity 0.25s ease",
              pointerEvents: showControls || !isPlaying ? "auto" : "none",
            }}
          >
            {/* Progress bar */}
            <div
              onClick={handleProgressClick}
              style={{
                height: "4px",
                background: "rgba(255,255,255,0.2)",
                borderRadius: "2px",
                marginBottom: "10px",
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${progress}%`,
                  background: "#2a8e9e",
                  borderRadius: "2px",
                  transition: "width 0.1s linear",
                }}
              />
            </div>

            {/* Control buttons row */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <button
                onClick={(e) => { e.stopPropagation(); handlePlayPause(); }}
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  color: "#ffffff",
                  padding: "4px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "4px",
                  transition: "background 0.15s",
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
                onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
              >
                <Icon name={isPlaying ? "pause" : "play_arrow"} filled size={24} />
              </button>

              <button
                onClick={(e) => { e.stopPropagation(); handleMuteToggle(); }}
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  color: "#ffffff",
                  padding: "4px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "4px",
                  transition: "background 0.15s",
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
                onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
              >
                <Icon name={isMuted ? "volume_off" : "volume_up"} size={22} />
              </button>

              <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "12px", fontFamily: "'JetBrains Mono', monospace", marginLeft: "4px" }}>
                {isPlaying ? "Playing" : "Paused"}
              </span>

              <div style={{ flex: 1 }} />

              <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "11px" }}>
                Platform Reel
              </span>
            </div>
          </div>
        </div>
    </motion.div>
  );
}

function TemplateGallerySection({ teamTitle, memberNames, members, onOpenModal }) {
  const [hashtag, setHashtag] = useState("#ShipIn100Hrs");

  useEffect(() => {
    fetchSocialConfig()
      .then((res) => setHashtag(res.data?.hashtag || "#ShipIn100Hrs"))
      .catch(() => {});
  }, []);

  const posterMembers = members.map((m) => ({
    ...m,
    displayName: memberDisplayName(m),
  }));

  const posterProps = { teamTitle, memberNames, members: posterMembers, hashtag };

  return (
    <div className="mt-16">
      <div className="mb-8 flex items-center gap-3">
        <Icon name="auto_fix_high" size={28} style={{ color: "#00685f" }} />
        <h2 className="text-2xl font-bold" style={{ fontFamily: "'Hanken Grotesk', sans-serif", color: "#002B36" }}>
          Shareable Team Posters
        </h2>
      </div>
      <p style={{ color: "#6d7a77", lineHeight: 1.7, marginBottom: "40px", maxWidth: "680px" }}>
        Select a template below to download your team poster. Share it on social media and submit the link to earn points.
      </p>

      {/* Instagram Templates */}
      <div className="mb-12">
        <h3 className="text-lg font-semibold mb-6 flex items-center gap-2" style={{ color: "#002B36" }}>
          <Icon name="photo_camera" size={20} style={{ color: "#E1306C" }} />
          Instagram Templates
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {INSTAGRAM_TEMPLATES.map((t) => {
            const Preview = t.component;
            return (
              <GlassCard key={t.id} className="flex flex-col h-full" style={{ padding: "24px" }}>
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold" style={{ background: "rgba(225,48,108,0.1)", color: "#E1306C" }}>
                    {t.label}
                  </span>
                </div>
                <PosterSlot label="Story format" variant="story">
                  <Preview {...posterProps} />
                </PosterSlot>
                <div className="mt-auto pt-5">
                  <button
                    type="button"
                    className="w-full py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 text-sm transition-all"
                    style={{
                      background: "rgba(0, 104, 95, 0.1)",
                      color: "#00685f",
                      border: "1px solid rgba(0, 104, 95, 0.2)",
                    }}
                    onClick={() => onOpenModal("instagram", t.id)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#00685f";
                      e.currentTarget.style.color = "#ffffff";
                      e.currentTarget.style.borderColor = "#00685f";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(0, 104, 95, 0.1)";
                      e.currentTarget.style.color = "#00685f";
                      e.currentTarget.style.borderColor = "rgba(0, 104, 95, 0.2)";
                    }}
                  >
                    <Icon name="download" size={18} /> Select & Share
                  </button>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </div>

      {/* LinkedIn Templates */}
      <div>
        <h3 className="text-lg font-semibold mb-6 flex items-center gap-2" style={{ color: "#002B36" }}>
          <Icon name="work" size={20} style={{ color: "#0A66C2" }} />
          LinkedIn Templates
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {LINKEDIN_TEMPLATES.map((t) => {
            const Preview = t.component;
            return (
              <GlassCard key={t.id} className="flex flex-col h-full" style={{ padding: "24px" }}>
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold" style={{ background: "rgba(10,102,194,0.1)", color: "#0A66C2" }}>
                    {t.label}
                  </span>
                </div>
                <PosterSlot label="Landscape format" variant="square">
                  <Preview {...posterProps} />
                </PosterSlot>
                <div className="mt-auto pt-5">
                  <button
                    type="button"
                    className="w-full py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 text-sm transition-all"
                    style={{
                      background: "rgba(0, 104, 95, 0.1)",
                      color: "#00685f",
                      border: "1px solid rgba(0, 104, 95, 0.2)",
                    }}
                    onClick={() => onOpenModal("linkedin", t.id)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#00685f";
                      e.currentTarget.style.color = "#ffffff";
                      e.currentTarget.style.borderColor = "#00685f";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(0, 104, 95, 0.1)";
                      e.currentTarget.style.color = "#00685f";
                      e.currentTarget.style.borderColor = "rgba(0, 104, 95, 0.2)";
                    }}
                  >
                    <Icon name="share" size={18} /> Select & Share
                  </button>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Main Team Component
export default function TeamContent() {
  const { team, refreshSession, getAccessToken, user, canWrite } = useHackathonAuth();
  const { proofByPlatform, submitProof, reload: reloadProofs } = useTeamSocialProof(team?.id);
  const [uploadState, setUploadState] = useState({ status: "idle", memberId: null, message: "" });
  const [removeBusy, setRemoveBusy] = useState({ status: "idle", memberId: null, message: "" });
  const [modalPlatform, setModalPlatform] = useState(null);
  const [modalTemplateId, setModalTemplateId] = useState(null);
  const displayTitle = team?.title || "Your team";
  const displayCode = team?.inviteCode || "—";
  const members = team?.members ?? [];
  const isCaptain = Boolean(members.find((m) => m.isCurrentUser && m.isLeader));
  const posterTeamTitle = (team?.title || "Your team").toUpperCase();
  const posterMemberNames =
    members.length > 0
      ? members.map(memberDisplayName).join(" & ")
      : "Your team";

  const handleRemoveMember = async (memberId, memberName) => {
    if (!team?.id || !isCaptain || !canWrite) return;
    const label = memberName || "this teammate";
    if (!window.confirm(`Remove ${label} from the team? They can rejoin with the Team ID if there is an open slot.`)) {
      return;
    }

    setRemoveBusy({ status: "loading", memberId, message: "" });
    try {
      const token = await getAccessToken();
      await apiFetch(`/api/teams/${team.id}/members/${memberId}`, {
        token,
        method: "DELETE",
      });
      await refreshSession();
      setRemoveBusy({ status: "idle", memberId: null, message: "" });
    } catch (err) {
      setRemoveBusy({
        status: "error",
        memberId,
        message: err?.message || "Could not remove team member.",
      });
    }
  };

  const handleUploadHeadshot = async (memberId, file) => {
    if (!user || memberId !== user.id) return;

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setUploadState({
        status: "error",
        memberId,
        message: "Invalid file type. Use JPG, PNG, or WEBP.",
      });
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setUploadState({
        status: "error",
        memberId,
        message: "Image is too large. Max allowed size is 5MB.",
      });
      return;
    }

    setUploadState({ status: "uploading", memberId, message: "" });
    try {
      const token = await getAccessToken();
      const formData = new FormData();
      formData.append("headshot", file);
      await apiFetch("/api/hackathon/me/headshot", {
        token,
        method: "POST",
        formData,
      });
      await refreshSession();
      setUploadState({ status: "success", memberId, message: "Headshot uploaded." });
    } catch (err) {
      setUploadState({
        status: "error",
        memberId,
        message: err?.message || "Headshot upload failed. Please try again.",
      });
    }
  };

  return (
    <div className="relative min-h-screen" style={{ background: "linear-gradient(180deg, #f7f9fb 0%, #f0f4f4 100%)" }}>
      {/* Background decorations */}
      <div className="fixed top-0 right-0 w-[600px] h-[600px] rounded-full opacity-20 pointer-events-none" style={{
        background: "radial-gradient(circle, rgba(0, 104, 95, 0.15) 0%, transparent 70%)",
        filter: "blur(60px)"
      }} />

      <div className="team-page relative max-w-[1440px] mx-auto px-8 py-8">
        <TeamSetupPanel />
        {/* Top Identity Banner */}
        <motion.header
          className="mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="inline-flex items-center px-4 py-1.5 rounded-full mb-4"
            style={{
              background: "rgba(0, 104, 95, 0.1)",
              color: "#00685f"
            }}
            whileHover={{ scale: 1.05 }}
          >
            <Icon name="fingerprint" size={16} style={{ marginRight: "8px" }} />
            <span className="text-sm font-medium">TEAM ID: {displayCode}</span>
          </motion.div>

          <h1
            className="text-4xl md:text-5xl font-bold mb-3"
            style={{
              fontFamily: "'Hanken Grotesk', sans-serif",
              color: "#002B36",
              letterSpacing: "-0.02em"
            }}
          >
            {displayTitle}
          </h1>

          <p className="text-lg max-w-3xl" style={{ color: "#6d7a77", lineHeight: 1.7 }}>
            View your teammates and download shareable placement media for social platforms.
          </p>
        </motion.header>

        {/* Main Split Layout — columns share the same top edge */}
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
          <div className="flex flex-col gap-8 lg:col-span-7">
            <MeetCompetitorsSection
              members={members}
              onUploadHeadshot={handleUploadHeadshot}
              uploadState={uploadState}
              onRemoveMember={isCaptain && canWrite ? handleRemoveMember : undefined}
              removeBusy={removeBusy}
            />
          </div>

          <div className="w-full lg:col-span-5">
            <TeamExplainerSection />
          </div>
        </div>

        {team?.id && (
          <TemplateGallerySection
            teamTitle={posterTeamTitle}
            memberNames={posterMemberNames}
            members={members}
            onOpenModal={(platform, templateId) => {
              setModalPlatform(platform);
              setModalTemplateId(templateId);
            }}
          />
        )}
      </div>

      <PosterShareModal
        open={Boolean(modalPlatform)}
        platform={modalPlatform || "instagram"}
        initialTemplateId={modalTemplateId}
        onClose={() => {
          setModalPlatform(null);
          setModalTemplateId(null);
        }}
        teamTitle={posterTeamTitle}
        memberNames={posterMemberNames}
        members={members}
        teamId={team?.id}
        canWrite={canWrite}
        existingProof={modalPlatform ? proofByPlatform[modalPlatform] : null}
        onSubmitProof={async (payload) => {
          await submitProof(payload);
          await reloadProofs();
        }}
      />

      <WhatsAppButton />
    </div>
  );
}
