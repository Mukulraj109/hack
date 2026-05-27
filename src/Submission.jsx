import { useState } from "react";
import { motion } from "framer-motion";
import "./styles/sprint-portal.css";

const CARD_SPRING = { type: "spring", stiffness: 380, damping: 28 };

const PARTNER_AVATARS = [
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=96&h=96&fit=crop&crop=faces",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=96&h=96&fit=crop&crop=faces",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=96&h=96&fit=crop&crop=faces",
];

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

// Glass card with smooth lift on hover (Framer Motion)
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
        Your profile is currently visible to companies looking for{" "}
        <strong>Frontend</strong> and <strong>Full-Stack</strong> talent.
      </p>
    </motion.div>
  );
}

// Section Icon Wrapper
function SectionIcon({ bgColor, icon, iconColor, children }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
      <div style={{
        width: "40px",
        height: "40px",
        borderRadius: "8px",
        background: bgColor,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: iconColor
      }}>
        {icon}
      </div>
      {children}
    </div>
  );
}

// Submission Content - Only the middle section, no header/sidebar
export default function SubmissionContent() {
  const [formProgress, setFormProgress] = useState(40);
  const [isLocked, setIsLocked] = useState(true);

  const checkProgress = () => {
    const inputs = document.querySelectorAll('input, textarea, select');
    let filledCount = 0;
    inputs.forEach(input => {
      if (input.value && input.value.length > 5) filledCount++;
    });
    const progress = Math.min(Math.round((filledCount / inputs.length) * 100), 100);
    setFormProgress(progress);
    setIsLocked(progress < 80);
  };

  return (
    <>
        <header style={{ marginBottom: "32px" }}>
          <h1 style={{
            fontFamily: "'Hanken Grotesk', sans-serif",
            fontSize: "48px",
            lineHeight: "56px",
            fontWeight: "700",
            color: "#00201d",
            letterSpacing: "-0.02em",
            marginBottom: "8px"
          }}>Submissions & Career Profile</h1>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "18px",
            lineHeight: "28px",
            color: "#6d7a77"
          }}>Finalize your project and bridge the gap to your next career opportunity.</p>
        </header>

        <div style={{ display: "grid", gridTemplateColumns: "65fr 35fr", gap: "24px" }}>
          {/* LEFT COLUMN: FORM SECTIONS */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>

            {/* SECTION 1: RECRUITER MATCHING */}
            <GlassCard style={{ padding: "24px" }}>
              <SectionIcon bgColor="rgba(57,184,253,0.2)" iconColor="#006591" icon={<Icon name="work" />}>
                <div>
                  <h2 style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: "24px", lineHeight: "32px", fontWeight: "600", color: "#191c1e" }}>1. Recruiter Matching Profile</h2>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", lineHeight: "20px", color: "#6d7a77" }}>This information goes directly to the 30+ hiring partners.</p>
                </div>
              </SectionIcon>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
                <div>
                  <label style={{ display: "block", fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: "#6d7a77", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.04em" }}>LinkedIn Profile URL</label>
                  <div style={{ position: "relative" }}>
                    <Icon name="link" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#6d7a77" }} />
                    <input
                      className="w-full bg-[#f2f4f6] border-none rounded-lg py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-[#00685f] transition-all"
                      placeholder="linkedin.com/in/username"
                      type="url"
                      onChange={checkProgress}
                      style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px" }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: "#6d7a77", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.04em" }}>Resume Upload (PDF Only)</label>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", background: "#f2f4f6", borderRadius: "8px", padding: "12px", border: "2px dashed rgba(188,201,198,0.5)", cursor: "pointer" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <Icon name="description" />
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "#6d7a77" }}>Drop PDF here (Max 5MB)</span>
                    </div>
                    <button style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: "#00685f", padding: "4px 12px", background: "rgba(107, 216, 203, 0.3)", borderRadius: "9999px", border: "none", cursor: "pointer" }}>Select File</button>
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: "#6d7a77", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.04em" }}>Hiring Status</label>
                  <select
                    className="w-full bg-[#f2f4f6] border-none rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#00685f] transition-all"
                    onChange={checkProgress}
                    style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px" }}
                  >
                    <option>Actively looking for immediate roles</option>
                    <option>Open to offers</option>
                    <option>Not looking right now</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: "#6d7a77", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.04em" }}>Availability Timeline</label>
                  <select
                    className="w-full bg-[#f2f4f6] border-none rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#00685f] transition-all"
                    onChange={checkProgress}
                    style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px" }}
                  >
                    <option>Immediate / Within 1 month</option>
                    <option>1-3 months</option>
                    <option>3+ months</option>
                  </select>
                </div>
              </div>
            </GlassCard>

            {/* SECTION 2: PROJECT ARTIFACTS */}
            <GlassCard style={{ padding: "24px" }}>
              <SectionIcon bgColor="rgba(0,104,95,0.2)" iconColor="#00685f" icon={<Icon name="code" />}>
                <div>
                  <h2 style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: "24px", lineHeight: "32px", fontWeight: "600", color: "#191c1e" }}>2. Project Artifacts & Codebase</h2>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", lineHeight: "20px", color: "#6d7a77" }}>Showcase the technical core of your solution.</p>
                </div>
              </SectionIcon>

              <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                <div>
                  <label style={{ display: "block", fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: "#6d7a77", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.04em" }}>GitHub Repository URL</label>
                  <div style={{ position: "relative" }}>
                    <Icon name="terminal" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#6d7a77" }} />
                    <input
                      className="w-full bg-[#f2f4f6] border-none rounded-lg py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-[#00685f] transition-all"
                      placeholder="github.com/team-name/project"
                      type="url"
                      onChange={checkProgress}
                      style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px" }}
                    />
                  </div>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", lineHeight: "20px", color: "#bcc9c6", marginTop: "4px" }}>Ensure your repo is PUBLIC and includes a detailed README.md file.</p>
                </div>

                <div>
                  <label style={{ display: "block", fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: "#6d7a77", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.04em" }}>Demo Video Link</label>
                  <div style={{ position: "relative" }}>
                    <Icon name="play_circle" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#6d7a77" }} />
                    <input
                      className="w-full bg-[#f2f4f6] border-none rounded-lg py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-[#00685f] transition-all"
                      placeholder="Loom, YouTube, or Drive link"
                      type="url"
                      onChange={checkProgress}
                      style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px" }}
                    />
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 12px", background: "rgba(255,218,214,0.4)", borderRadius: "8px", marginTop: "8px" }}>
                    <Icon name="info" style={{ fontSize: "18px", color: "#ba1a1a" }} />
                    <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: "#ba1a1a", textTransform: "uppercase" }}>Critical: Set Google Drive permissions to 'Anyone with the link can view' before pasting.</p>
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: "#6d7a77", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.04em" }}>The Solution One-Pager</label>
                  <textarea
                    className="w-full bg-[#f2f4f6] border-none rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#00685f] transition-all resize-none"
                    placeholder="Summarize your Problem, Architecture, and Technical execution."
                    rows="5"
                    onChange={checkProgress}
                    style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px" }}
                  />
                </div>
              </div>
            </GlassCard>

            {/* SECTION 3: QUESTIONNAIRE */}
            <GlassCard style={{ padding: "24px" }}>
              <SectionIcon bgColor="rgba(82,94,92,0.2)" iconColor="#525e5c" icon={<Icon name="quiz" />}>
                <div>
                  <h2 style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: "24px", lineHeight: "32px", fontWeight: "600", color: "#191c1e" }}>3. FirstStep Questionnaire & Supplementary Files</h2>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", lineHeight: "20px", color: "#6d7a77" }}>Help judges understand your process.</p>
                </div>
              </SectionIcon>

              <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                <div>
                  <label style={{ display: "block", fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "#191c1e", marginBottom: "4px", lineHeight: "20px" }}>What was the biggest technical roadblock your team solved?</label>
                  <input
                    className="w-full bg-[#f2f4f6] border-none rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#00685f] transition-all"
                    type="text"
                    onChange={checkProgress}
                    style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "#191c1e", marginBottom: "4px", lineHeight: "20px" }}>Which sponsor APIs or frameworks did you leverage?</label>
                  <input
                    className="w-full bg-[#f2f4f6] border-none rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#00685f] transition-all"
                    placeholder="e.g., MongoDB, Stripe, Twilio"
                    type="text"
                    onChange={checkProgress}
                    style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px" }}
                  />
                </div>

                <div style={{ paddingTop: "16px" }}>
                  <label style={{ display: "block", fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: "#6d7a77", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.04em" }}>Supplementary Files</label>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", border: "2px dashed rgba(188,201,198,0.4)", borderRadius: "12px", padding: "32px 40px", background: "rgba(255,255,255,0.5)", cursor: "pointer" }}>
                    <Icon name="cloud_upload" style={{ fontSize: "48px", color: "#6d7a77", marginBottom: "16px" }} />
                    <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "14px", color: "#191c1e", textAlign: "center" }}>Any supplementary files (Decks, Architecture diagrams, backup ZIPs)</p>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "#bcc9c6", marginTop: "4px" }}>Drag and drop or click to browse</p>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* RIGHT COLUMN: STATUS & CTAs */}
          <div style={{ position: "sticky", top: "80px", display: "flex", flexDirection: "column", gap: "24px" }}>

            {/* DASHBOARD CARD */}
            <GlassCard style={{ padding: "24px", overflow: "hidden", position: "relative" }}>
              <div style={{ position: "absolute", top: "-40px", right: "-40px", width: "128px", height: "128px", background: "rgba(0,104,95,0.05)", borderRadius: "50%", filter: "blur(48px)" }}></div>

              <h3 style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: "24px", lineHeight: "32px", fontWeight: "600", color: "#191c1e", marginBottom: "16px" }}>Submission Readiness</h3>

              <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "24px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ width: "20px", height: "20px", borderRadius: "50%", border: "2px solid #00685f", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon name="check" filled style={{ fontSize: "14px", color: "#00685f" }} />
                  </div>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "#191c1e" }}>Recruiter Profile Filled</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ width: "20px", height: "20px", borderRadius: "50%", border: "2px solid #00685f", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon name="check" filled style={{ fontSize: "14px", color: "#00685f" }} />
                  </div>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "#191c1e" }}>Resume Uploaded</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", opacity: 0.6 }}>
                  <div style={{ width: "20px", height: "20px", borderRadius: "50%", border: "2px solid #bcc9c6" }}></div>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "#6d7a77" }}>Public GitHub Link Provided</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", opacity: 0.6 }}>
                  <div style={{ width: "20px", height: "20px", borderRadius: "50%", border: "2px solid #bcc9c6" }}></div>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "#6d7a77" }}>Shareable Video Demo Linked</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", opacity: 0.6 }}>
                  <div style={{ width: "20px", height: "20px", borderRadius: "50%", border: "2px solid #bcc9c6" }}></div>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "#6d7a77" }}>Solution One-Pager Written</span>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "24px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: "#6d7a77", textTransform: "uppercase" }}>Form Completeness</span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "14px", fontWeight: "700", color: "#00685f" }}>{formProgress}%</span>
                </div>
                <div style={{ width: "100%", height: "8px", background: "#e6e8ea", borderRadius: "9999px", overflow: "hidden" }}>
                  <div style={{ width: `${formProgress}%`, height: "100%", background: "#00685f", borderRadius: "9999px", boxShadow: "0 0 8px rgba(0,104,95,0.4)", transition: "all 0.3s ease" }}></div>
                </div>
              </div>

              <button
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
                  cursor: isLocked ? "not-allowed" : "pointer",
                  background: isLocked ? "#e6e8ea" : "#00685f",
                  color: isLocked ? "#6d7a77" : "#ffffff",
                  transition: "all 0.2s ease"
                }}
                disabled={isLocked}
              >
                Lock In Final Submission
              </button>
              <p style={{ textAlign: "center", fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "#bcc9c6", marginTop: "8px", padding: "0 16px" }}>
                Complete all required fields to enable final submission lock.
              </p>
            </GlassCard>

            <HiringPartnersCard />
          </div>
        </div>
    </>
  );
}
