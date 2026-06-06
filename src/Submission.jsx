import { motion } from "framer-motion";
import { useHackathonAuth } from "./auth/HackathonAuthContext";
import { useSubmissionForm } from "./hooks/useSubmissionForm";
import {
  AVAILABILITY_OPTIONS,
  HIRING_STATUS_OPTIONS,
} from "./lib/submissionReadiness";
import ResumeUploadField from "./components/submission/ResumeUploadField";
import SupplementaryZipEmailStep from "./components/submission/SupplementaryZipEmailStep";
import { SubmissionSkeleton } from "./components/sprint/SprintPageSkeleton";
import SprintLoadError from "./components/sprint/SprintLoadError";
import SprintShimmerBlock from "./components/sprint/SprintShimmerBlock";
import "./styles/sprint-portal.css";

const CARD_SPRING = { type: "spring", stiffness: 380, damping: 28 };

const PARTNER_AVATARS = [
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=96&h=96&fit=crop&crop=faces",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=96&h=96&fit=crop&crop=faces",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=96&h=96&fit=crop&crop=faces",
];

function Icon({ name, filled = false, size = 24, style = {} }) {
  return (
    <span
      className="material-symbols-outlined"
      style={{
        fontVariationSettings: filled ? "'FILL' 1" : "'FILL' 0",
        fontSize: size,
        ...style,
      }}
    >
      {name}
    </span>
  );
}

function GlassCard({ children, style = {}, className = "" }) {
  return (
    <motion.div
      className={`submission-glass-card rounded-xl p-6 ${className}`}
      style={{
        background: "rgba(255, 255, 255, 0.88)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid rgba(255, 255, 255, 0.55)",
        boxShadow: "0 4px 24px rgba(13, 148, 136, 0.08)",
        ...style,
      }}
      initial={false}
      whileHover={{
        y: -6,
        scale: 1.012,
        boxShadow: "0 16px 48px rgba(13, 148, 136, 0.14)",
        background: "rgba(255, 255, 255, 0.96)",
      }}
      transition={CARD_SPRING}
    >
      {children}
    </motion.div>
  );
}

function HiringPartnersCard() {
  return (
    <motion.div
      className="submission-hiring-partners"
      initial={false}
      whileHover={{
        y: -6,
        scale: 1.012,
        boxShadow: "0 14px 40px rgba(0, 101, 145, 0.12)",
      }}
      transition={CARD_SPRING}
    >
      <h4 className="submission-hiring-partners__title">Hiring Partners Active Now</h4>
      <div className="submission-hiring-partners__avatars" aria-hidden>
        {PARTNER_AVATARS.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={`Active hiring partner ${i + 1}`}
            className="submission-hiring-partners__avatar"
            style={{ zIndex: 3 - i }}
          />
        ))}
        <span className="submission-hiring-partners__more">+27</span>
      </div>
      <p className="submission-hiring-partners__copy">
        Your profile is currently visible to companies{" "}
        <strong>hiring for tech roles</strong>.
      </p>
    </motion.div>
  );
}

function SectionIcon({ bgColor, icon, iconColor, children }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
      <div
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "8px",
          background: bgColor,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: iconColor,
        }}
      >
        {icon}
      </div>
      {children}
    </div>
  );
}

const inputClass =
  "w-full bg-[#f2f4f6] border-none rounded-lg py-3 focus:outline-none focus:ring-2 focus:ring-[#00685f] transition-all";

const labelStyle = {
  display: "block",
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: "12px",
  color: "#6d7a77",
  marginBottom: "4px",
  textTransform: "uppercase",
  letterSpacing: "0.04em",
};

export default function SubmissionContent() {
  const { canWrite } = useHackathonAuth();
  const form = useSubmissionForm();

  const {
    loading,
    submissionHydrating,
    error,
    saveError,
    saving,
    career,
    submission,
    updateCareer,
    updateSubmissionField,
    uploadResume,
    readiness,
    finalize,
    finalizing,
    finalizeError,
    finalizeSuccess,
    isReadOnly,
    isFinalized,
    needsTeamTrack,
    reload,
  } = form;

  const lockDisabled = !readiness.canFinalize || isReadOnly || finalizing || needsTeamTrack;
  const artifactsDisabled = isReadOnly || needsTeamTrack || submissionHydrating;

  if (loading) {
    return <SubmissionSkeleton />;
  }

  if (error) {
    return <SprintLoadError message={error} onRetry={reload} />;
  }

  return (
    <>
      <header style={{ marginBottom: "32px" }}>
        <h1
          style={{
            fontFamily: "'Hanken Grotesk', sans-serif",
            fontSize: "48px",
            lineHeight: "56px",
            fontWeight: "700",
            color: "#00201d",
            letterSpacing: "-0.02em",
            marginBottom: "8px",
          }}
        >
          Submissions & Career Profile
        </h1>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "18px",
            lineHeight: "28px",
            color: "#6d7a77",
          }}
        >
          Finalize your project and bridge the gap to your next career opportunity.
        </p>
      </header>

      {needsTeamTrack && (
        <div
          style={{
            marginBottom: "24px",
            padding: "16px 20px",
            background: "rgba(255,218,214,0.5)",
            borderRadius: "12px",
            border: "1px solid rgba(186,26,26,0.2)",
          }}
        >
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "#ba1a1a" }}>
            Your team captain must pick a track on the Dashboard before you can create a submission.
          </p>
        </div>
      )}

      {isFinalized && (
        <div
          style={{
            marginBottom: "24px",
            padding: "16px 20px",
            background: "rgba(107, 216, 203, 0.2)",
            borderRadius: "12px",
            border: "1px solid rgba(0, 104, 95, 0.25)",
          }}
        >
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "#00685f" }}>
            {finalizeSuccess || submission.status === "submitted"
              ? "Your final submission is locked in and sent for review. This form is now read-only."
              : `Submission status: ${submission.status}. This form is read-only.`}
          </p>
        </div>
      )}

      {!canWrite && (
        <div
          style={{
            marginBottom: "24px",
            padding: "16px 20px",
            background: "#f2f4f6",
            borderRadius: "12px",
          }}
        >
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "#6d7a77" }}>
            Your account is read-only until registration is approved.
          </p>
        </div>
      )}

      {(saveError || finalizeError) && (
        <div
          style={{
            marginBottom: "16px",
            padding: "12px 16px",
            background: "rgba(255,218,214,0.4)",
            borderRadius: "8px",
          }}
        >
          <p style={{ fontSize: "14px", color: "#ba1a1a" }}>{finalizeError || saveError}</p>
        </div>
      )}

      {saving && (
        <p
          style={{
            marginBottom: "12px",
            fontSize: "12px",
            color: "#6d7a77",
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          Saving…
        </p>
      )}

      <div
        className={`submission-layout${submissionHydrating ? " sprint-submission-hydrating" : ""}`}
        style={{ display: "grid", gridTemplateColumns: "65fr 35fr", gap: "24px" }}
        aria-busy={submissionHydrating || undefined}
      >
        {submissionHydrating && (
          <div className="sprint-submission-hydrating__overlay" aria-hidden="true">
            <SprintShimmerBlock />
          </div>
        )}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <GlassCard style={{ padding: "24px" }}>
            <SectionIcon
              bgColor="rgba(57,184,253,0.2)"
              iconColor="#006591"
              icon={<Icon name="work" />}
            >
              <div>
                <h2
                  style={{
                    fontFamily: "'Hanken Grotesk', sans-serif",
                    fontSize: "24px",
                    lineHeight: "32px",
                    fontWeight: "600",
                    color: "#191c1e",
                  }}
                >
                  1. Recruiter Matching Profile
                </h2>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "14px",
                    lineHeight: "20px",
                    color: "#6d7a77",
                  }}
                >
                  This information goes directly to the 30+ hiring partners.
                </p>
              </div>
            </SectionIcon>

            <div className="submission-form-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
              <div>
                <label style={labelStyle}>LinkedIn Profile URL</label>
                <div style={{ position: "relative" }}>
                  <Icon
                    name="link"
                    style={{
                      position: "absolute",
                      left: "12px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "#6d7a77",
                    }}
                  />
                  <input
                    className={`${inputClass} pl-10`}
                    placeholder="linkedin.com/in/username"
                    type="url"
                    value={career.linkedinUrl}
                    disabled={isReadOnly || needsTeamTrack}
                    onChange={(e) => updateCareer({ linkedinUrl: e.target.value })}
                    style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px" }}
                  />
                </div>
              </div>

              <div>
                <label style={labelStyle}>Resume Upload (PDF Only)</label>
                <ResumeUploadField
                  resumeFileName={career.resumeFileName}
                  disabled={isReadOnly || needsTeamTrack}
                  onUpload={uploadResume}
                />
              </div>

              <div>
                <label style={labelStyle}>Hiring Status</label>
                <select
                  className={`${inputClass} px-4`}
                  value={career.hiringStatus}
                  disabled={isReadOnly || needsTeamTrack}
                  onChange={(e) => updateCareer({ hiringStatus: e.target.value })}
                  style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px" }}
                >
                  {HIRING_STATUS_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={labelStyle}>Availability Timeline</label>
                <select
                  className={`${inputClass} px-4`}
                  value={career.availabilityTimeline}
                  disabled={isReadOnly || needsTeamTrack}
                  onChange={(e) => updateCareer({ availabilityTimeline: e.target.value })}
                  style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px" }}
                >
                  {AVAILABILITY_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </GlassCard>

          <GlassCard style={{ padding: "24px" }}>
            <SectionIcon
              bgColor="rgba(0,104,95,0.2)"
              iconColor="#00685f"
              icon={<Icon name="code" />}
            >
              <div>
                <h2
                  style={{
                    fontFamily: "'Hanken Grotesk', sans-serif",
                    fontSize: "24px",
                    lineHeight: "32px",
                    fontWeight: "600",
                    color: "#191c1e",
                  }}
                >
                  2. Project Artifacts & Codebase
                </h2>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "14px",
                    lineHeight: "20px",
                    color: "#6d7a77",
                  }}
                >
                  Showcase the technical core of your solution.
                </p>
              </div>
            </SectionIcon>

            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <div>
                <label style={labelStyle}>GitHub Repository URL</label>
                <div style={{ position: "relative" }}>
                  <Icon
                    name="terminal"
                    style={{
                      position: "absolute",
                      left: "12px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "#6d7a77",
                    }}
                  />
                  <input
                    className={`${inputClass} pl-10`}
                    placeholder="github.com/team-name/project"
                    type="url"
                    value={submission.repoUrl}
                    disabled={artifactsDisabled}
                    onChange={(e) => updateSubmissionField({ repoUrl: e.target.value })}
                    style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px" }}
                  />
                </div>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "14px",
                    lineHeight: "20px",
                    color: "#bcc9c6",
                    marginTop: "4px",
                  }}
                >
                  Ensure your repo is PUBLIC and includes a detailed README.md file.
                </p>
              </div>

              <div>
                <label style={labelStyle}>Demo Video Link</label>
                <div style={{ position: "relative" }}>
                  <Icon
                    name="play_circle"
                    style={{
                      position: "absolute",
                      left: "12px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "#6d7a77",
                    }}
                  />
                  <input
                    className={`${inputClass} pl-10`}
                    placeholder="Loom, YouTube, or Drive link"
                    type="url"
                    value={submission.demoUrl}
                    disabled={artifactsDisabled}
                    onChange={(e) => updateSubmissionField({ demoUrl: e.target.value })}
                    style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px" }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "8px 12px",
                    background: "rgba(255,218,214,0.4)",
                    borderRadius: "8px",
                    marginTop: "8px",
                  }}
                >
                  <Icon name="info" style={{ fontSize: "18px", color: "#ba1a1a" }} />
                  <p
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "12px",
                      color: "#ba1a1a",
                      textTransform: "uppercase",
                    }}
                  >
                    Critical: Set Google Drive permissions to &apos;Anyone with the link can view&apos;
                    before pasting.
                  </p>
                </div>
              </div>

              <div>
                <label style={labelStyle}>The Solution One-Pager</label>
                <textarea
                  className={`${inputClass} px-4 resize-none`}
                  placeholder="Summarize your Problem, Architecture, and Technical execution."
                  rows={5}
                  value={submission.description}
                  disabled={artifactsDisabled}
                  onChange={(e) => updateSubmissionField({ description: e.target.value })}
                  style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px" }}
                />
              </div>
            </div>
          </GlassCard>

          <GlassCard style={{ padding: "24px" }}>
            <SectionIcon
              bgColor="rgba(82,94,92,0.2)"
              iconColor="#525e5c"
              icon={<Icon name="quiz" />}
            >
              <div>
                <h2
                  style={{
                    fontFamily: "'Hanken Grotesk', sans-serif",
                    fontSize: "24px",
                    lineHeight: "32px",
                    fontWeight: "600",
                    color: "#191c1e",
                  }}
                >
                  3. FirstStep Questionnaire & Project Package
                </h2>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "14px",
                    lineHeight: "20px",
                    color: "#6d7a77",
                  }}
                >
                  Help judges understand your process.
                </p>
              </div>
            </SectionIcon>

            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <div>
                <label
                  style={{
                    display: "block",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "14px",
                    color: "#191c1e",
                    marginBottom: "4px",
                    lineHeight: "20px",
                  }}
                >
                  What was the biggest technical roadblock your team solved?
                </label>
                <input
                  className={`${inputClass} px-4`}
                  type="text"
                  value={submission.technicalRoadblock}
                  disabled={artifactsDisabled}
                  onChange={(e) =>
                    updateSubmissionField({ technicalRoadblock: e.target.value })
                  }
                  style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px" }}
                />
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "14px",
                    color: "#191c1e",
                    marginBottom: "4px",
                    lineHeight: "20px",
                  }}
                >
                  Which sponsor APIs or frameworks did you leverage?
                </label>
                <input
                  className={`${inputClass} px-4`}
                  placeholder="e.g., MongoDB, Stripe, Twilio"
                  type="text"
                  value={submission.sponsorApis}
                  disabled={artifactsDisabled}
                  onChange={(e) => updateSubmissionField({ sponsorApis: e.target.value })}
                  style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px" }}
                />
              </div>

              <div style={{ paddingTop: "8px" }}>
                <label style={{ ...labelStyle, marginBottom: "12px" }}>
                  Supplementary project ZIP (email delivery)
                </label>
                <SupplementaryZipEmailStep
                  confirmed={submission.supplementaryZipConfirmed}
                  disabled={artifactsDisabled || !submission.id}
                  onChange={(checked) =>
                    updateSubmissionField({ supplementaryZipConfirmed: checked })
                  }
                />
              </div>
            </div>
          </GlassCard>
        </div>

        <div
          className="submission-sidebar"
          style={{
            position: "sticky",
            top: "80px",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          <GlassCard style={{ padding: "24px", overflow: "hidden", position: "relative" }}>
            <div
              style={{
                position: "absolute",
                top: "-40px",
                right: "-40px",
                width: "128px",
                height: "128px",
                background: "rgba(0,104,95,0.05)",
                borderRadius: "50%",
                filter: "blur(48px)",
              }}
            />

            <h3
              style={{
                fontFamily: "'Hanken Grotesk', sans-serif",
                fontSize: "24px",
                lineHeight: "32px",
                fontWeight: "600",
                color: "#191c1e",
                marginBottom: "16px",
              }}
            >
              Submission Readiness
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "24px" }}>
              {readiness.checklist.map((item) => (
                <div
                  key={item.key}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    opacity: item.complete ? 1 : 0.6,
                  }}
                >
                  <div
                    style={{
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                      border: `2px solid ${item.complete ? "#00685f" : "#bcc9c6"}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {item.complete && (
                      <Icon name="check" filled style={{ fontSize: "14px", color: "#00685f" }} />
                    )}
                  </div>
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "14px",
                      color: item.complete ? "#191c1e" : "#6d7a77",
                    }}
                  >
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "12px",
                    color: "#6d7a77",
                    textTransform: "uppercase",
                  }}
                >
                  Form Completeness
                </span>
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "14px",
                    fontWeight: "700",
                    color: "#00685f",
                  }}
                >
                  {readiness.progressPercent}%
                </span>
              </div>
              <div
                style={{
                  width: "100%",
                  height: "8px",
                  background: "#e6e8ea",
                  borderRadius: "9999px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${readiness.progressPercent}%`,
                    height: "100%",
                    background: "#00685f",
                    borderRadius: "9999px",
                    boxShadow: "0 0 8px rgba(0,104,95,0.4)",
                    transition: "width 0.3s ease",
                  }}
                />
              </div>
            </div>

            <button
              type="button"
              onClick={finalize}
              disabled={lockDisabled}
              style={{
                width: "100%",
                padding: "16px",
                borderRadius: "12px",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "14px",
                fontWeight: "700",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                border: "none",
                cursor: lockDisabled ? "not-allowed" : "pointer",
                background: lockDisabled ? "#e6e8ea" : "#00685f",
                color: lockDisabled ? "#6d7a77" : "#ffffff",
                transition: "all 0.2s ease",
              }}
            >
              {finalizing
                ? "Locking In…"
                : isFinalized
                  ? "Submission Locked"
                  : "Lock In Final Submission"}
            </button>
            <p
              style={{
                textAlign: "center",
                fontFamily: "'Inter', sans-serif",
                fontSize: "14px",
                color: "#bcc9c6",
                marginTop: "8px",
                padding: "0 16px",
              }}
            >
              {isFinalized
                ? "Your submission has been finalized."
                : "Complete all required fields to enable final submission lock."}
            </p>
          </GlassCard>

          <HiringPartnersCard />
        </div>
      </div>
    </>
  );
}
