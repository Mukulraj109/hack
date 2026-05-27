import { useState } from "react";
import { motion } from "framer-motion";
import "./styles/sprint-portal.css";
import TeamSetupPanel from "./components/TeamSetupPanel";
import { useHackathonAuth } from "./auth/HackathonAuthContext";

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
    name: memberDisplayName(m),
    role: m.isLeader ? "Team Captain" : "Core Member",
    isCaptain: Boolean(m.isLeader),
    skills: skills.slice(0, 4),
    bio,
    isActive: Boolean(m.isCurrentUser),
    status: m.isCurrentUser ? "Active in Workspace" : "Ready for Review",
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
function ProfileCard({ member, index }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
    >
      <GlassCard>
        <div className="flex flex-col md:flex-row gap-6 items-center">
          {/* Avatar Placeholder */}
          <motion.div
            className="w-48 h-48 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer bg-white/50 transition-all"
            style={{
              borderColor: isHovered ? "rgba(0, 104, 95, 0.6)" : "rgba(0, 104, 95, 0.3)",
            }}
            whileHover={{ scale: 1.05 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <Icon name="add_a_photo" size={48} style={{ color: "rgba(0, 104, 95, 0.4)" }} />
            <p className="text-sm mt-2" style={{ color: "rgba(0, 104, 95, 0.6)" }}>Upload Headshot</p>
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
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}

// Meet The Competitors Section
function MeetCompetitorsSection({ members = [] }) {
  const cards = members.map(memberToCard);

  return (
    <motion.section
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.5 }}
    >
      <h2 className="text-xl font-bold" style={{ fontFamily: "'Hanken Grotesk', sans-serif", color: "#002B36" }}>
        Meet the Competitors
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
            <ProfileCard key={members[i]?.id ?? i} member={member} index={i} />
          ))}
        </div>
      )}
    </motion.section>
  );
}

// Instagram poster — fills shared-width frame (9:16)
function InstagramPoster({ teamTitle = "YOUR TEAM", memberNames = "Your team" }) {
  return (
    <div className="team-instagram-poster">
      <div className="team-instagram-poster__grid" aria-hidden />
      <div className="team-instagram-poster__body">
        <div>
          <div
            className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg"
            style={{
              background: "rgba(255, 255, 255, 0.12)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            <Icon name="rocket_launch" size={20} style={{ color: "#ffffff" }} />
          </div>
          <p className="team-instagram-poster__eyebrow">FirstStep Annual Hackathon</p>
          <h4 className="team-instagram-poster__headline">
            THE NEXT GEN
            <br />
            <span>BUILDERS.</span>
          </h4>
          <div className="mt-3 flex gap-2">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                style={{
                  border: "1px solid rgba(255, 255, 255, 0.35)",
                  background: "rgba(255, 255, 255, 0.1)",
                }}
              >
                <Icon name="person" size={14} style={{ color: "rgba(255,255,255,0.5)" }} />
              </div>
            ))}
          </div>
          <p className="team-instagram-poster__names">{memberNames}</p>
        </div>
        <div>
          <div className="mb-2 h-px w-full" style={{ background: "rgba(255, 255, 255, 0.25)" }} />
          <p className="team-instagram-poster__team-line">TEAM: {teamTitle}</p>
          <p className="team-instagram-poster__tag">#ShipIn100Hrs</p>
        </div>
      </div>
      <div className="team-poster-hover">
        <Icon name="zoom_in" size={18} /> Preview 9:16
      </div>
    </div>
  );
}

// LinkedIn poster — same column width as Instagram frame
function LinkedInPoster({ teamTitle = "YOUR TEAM", memberNames = "Your team" }) {
  return (
    <div className="team-linkedin-poster">
      <div className="absolute top-0 right-0 h-20 w-20 rounded-bl-full" style={{ background: "rgba(0, 104, 95, 0.1)" }} />
      <div className="absolute bottom-0 left-0 h-14 w-14 rounded-tr-full" style={{ background: "rgba(57, 184, 253, 0.12)" }} />
      <div className="team-linkedin-poster__body">
        <div>
          <div className="mb-3 flex items-center gap-2">
            <div className="h-7 w-1 shrink-0 rounded-full" style={{ background: "#00685f" }} />
            <span
              className="text-xs font-bold"
              style={{ color: "#191c1e", fontFamily: "'Hanken Grotesk', sans-serif" }}
            >
              FirstStep Annual Hackathon &apos;24
            </span>
          </div>
          <h4
            className="mb-2 text-xl font-bold"
            style={{ color: "#00685f", fontFamily: "'Hanken Grotesk', sans-serif" }}
          >
            {teamTitle}
          </h4>
          <p className="text-sm leading-relaxed" style={{ color: "#6d7a77" }}>
            {memberNames}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            {[
              { bg: "#008378", iconColor: "#f4fffc" },
              { bg: "#39b8fd", iconColor: "#004666" },
            ].map((item, i) => (
              <div
                key={i}
                className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white shadow-sm"
                style={{ background: item.bg }}
              >
                <Icon name="person" size={14} style={{ color: item.iconColor }} />
              </div>
            ))}
          </div>
          <span className="text-xs" style={{ color: "#6d7a77", fontFamily: "'JetBrains Mono', monospace" }}>
            {memberNames}
          </span>
        </div>
      </div>
      <div className="team-poster-hover">
        <Icon name="zoom_in" size={18} /> Preview 1:1
      </div>
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

// Shareable posters — same width grid, top-aligned with narrative column
function ShareablePostersSection({ teamTitle, memberNames }) {
  return (
    <motion.div
      className="team-posters-card"
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.35, duration: 0.5 }}
    >
      <GlassCard className="team-posters-glass">
        <div className="mb-6 flex items-center gap-2">
          <Icon name="auto_fix_high" size={24} style={{ color: "#00685f" }} />
          <h2 className="text-xl font-bold" style={{ fontFamily: "'Hanken Grotesk', sans-serif", color: "#002B36" }}>
            Shareable Team Hype Posters
          </h2>
        </div>

        <div className="team-posters-stack">
          <PosterSlot label="Instagram (9:16)" variant="story">
            <InstagramPoster teamTitle={teamTitle} memberNames={memberNames} />
          </PosterSlot>
          <PosterSlot label="LinkedIn (1:1)" variant="square">
            <LinkedInPoster teamTitle={teamTitle} memberNames={memberNames} />
          </PosterSlot>
        </div>

        <div className="team-posters-actions">
          <motion.button
            className="w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 text-sm"
            style={{
              background: "#ffffff",
              border: "2px solid #00685f",
              color: "#00685f"
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Icon name="photo_library" size={18} /> Download Instagram Poster
          </motion.button>
          <motion.button
            className="w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 text-sm"
            style={{
              background: "linear-gradient(135deg, #00685f 0%, #007a6f 100%)",
              color: "#ffffff",
              boxShadow: "0 4px 12px rgba(0, 104, 95, 0.3)"
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Icon name="download" size={18} /> Download LinkedIn Poster
          </motion.button>
        </div>
      </GlassCard>
    </motion.div>
  );
}

// FAB Button
function FABButton() {
  return (
    <motion.button
      className="fixed bottom-6 right-6 w-14 h-14 rounded-full flex items-center justify-center z-50"
      style={{
        background: "linear-gradient(135deg, #00685f 0%, #007a6f 100%)",
        color: "#ffffff",
        boxShadow: "0 10px 40px rgba(0, 104, 95, 0.4)"
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      animate={{ boxShadow: [
        "0 10px 40px rgba(0, 104, 95, 0.4)",
        "0 15px 50px rgba(0, 104, 95, 0.5)",
        "0 10px 40px rgba(0, 104, 95, 0.4)"
      ]}}
      transition={{ duration: 2, repeat: Infinity }}
    >
      <Icon name="add" size={32} />
    </motion.button>
  );
}

// Main Team Component
export default function TeamContent() {
  const { team } = useHackathonAuth();
  const displayTitle = team?.title || "Your team";
  const displayCode = team?.inviteCode || "—";
  const members = team?.members ?? [];
  const posterTeamTitle = (team?.title || "Your team").toUpperCase();
  const posterMemberNames =
    members.length > 0
      ? members.map(memberDisplayName).join(" & ")
      : "Your team";

  return (
    <div className="relative min-h-screen" style={{ background: "linear-gradient(180deg, #f7f9fb 0%, #f0f4f4 100%)" }}>
      {/* Background decorations */}
      <div className="fixed top-0 right-0 w-[600px] h-[600px] rounded-full opacity-20 pointer-events-none" style={{
        background: "radial-gradient(circle, rgba(0, 104, 95, 0.15) 0%, transparent 70%)",
        filter: "blur(60px)"
      }} />

      <div className="relative max-w-[1440px] mx-auto px-8 py-8">
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
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-10">
          <div className="flex flex-col gap-8 lg:col-span-6">
            <MeetCompetitorsSection members={members} />
          </div>

          <div className="w-full lg:col-span-4">
            <ShareablePostersSection
              teamTitle={posterTeamTitle}
              memberNames={posterMemberNames}
            />
          </div>
        </div>
      </div>

      {/* FAB Button */}
      <FABButton />
    </div>
  );
}
