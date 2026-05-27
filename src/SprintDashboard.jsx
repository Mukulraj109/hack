import { useState, useEffect, useRef } from "react";

// Countdown Timer Component
function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 20,
    hours: 23,
    minutes: 18,
    seconds: 11
  });

  useEffect(() => {
    const targetDate = new Date("2026-06-15T00:00:00").getTime();

    const calculateTimeLeft = () => {
      const difference = targetDate - new Date().getTime();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{
      fontFamily: "'Hanken Grotesk', sans-serif",
      fontSize: "32px",
      fontWeight: "600",
      color: "#00685f",
      letterSpacing: "-0.01em",
      lineHeight: "40px"
    }}>
      {String(timeLeft.days).padStart(2, "0")}d : {String(timeLeft.hours).padStart(2, "0")}h : {String(timeLeft.minutes).padStart(2, "0")}m : {String(timeLeft.seconds).padStart(2, "0")}s
    </div>
  );
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

// Sidebar Navigation
function Sidebar({ onNavigate }) {
  const navItems = [
    { icon: "dashboard", label: "Dashboard", active: true, href: "/sprint" },
    { icon: "upload_file", label: "Submission", active: false, href: "/submission" },
    { icon: "map", label: "Roadmap", active: false, href: "#" },
    { icon: "group", label: "Team", active: false, href: "#" },
    { icon: "event", label: "Event Site", active: false, href: "#" },
  ];

  return (
    <aside style={{
      position: "fixed",
      left: 0,
      top: 0,
      height: "100%",
      width: "256px",
      background: "rgba(255, 255, 255, 0.85)",
      backdropFilter: "blur(12px)",
      borderRight: "1px solid rgba(255, 255, 255, 0.4)",
      boxShadow: "0 4px 20px rgba(13, 148, 136, 0.08), 0 0 1px rgba(2, 51, 69, 0.08)",
      display: "flex",
      flexDirection: "column",
      paddingTop: "32px",
      paddingBottom: "32px",
      paddingLeft: "16px",
      paddingRight: "16px",
      gap: "16px",
      zIndex: 60
    }}>
      {/* Logo and Branding */}
      <div style={{ marginBottom: "24px", paddingLeft: "16px" }}>
        <img
          src="/firststep-logo.png"
          alt="FirstStep Logo"
          style={{
            width: "180px",
            height: "auto",
            display: "block",
            marginBottom: "0px"
          }}
        />
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "14px",
          fontWeight: "600",
          color: "#3d4947",
          margin: 0,
          paddingLeft: "24px"
        }}>Hackathon Portal</p>
      </div>

      <nav style={{ flex: 1, display: "flex", flexDirection: "column", gap: "4px" }}>
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href === "#" ? "#" : undefined}
            onClick={(e) => {
              e.preventDefault();
              if (item.href !== "#" && onNavigate) {
                onNavigate(item.href);
              }
            }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              paddingLeft: "16px",
              paddingRight: "16px",
              paddingTop: "12px",
              paddingBottom: "12px",
              borderRadius: "8px",
              borderRight: item.active ? "4px solid #00685f" : "4px solid transparent",
              background: item.active ? "rgba(0, 104, 95, 0.1)" : "transparent",
              color: item.active ? "#00685f" : "#3d4947",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "14px",
              fontWeight: item.active ? "700" : "500",
              textDecoration: "none",
              transition: "all 0.2s ease",
              transform: "translateX(0)",
              cursor: "pointer"
            }}
            onMouseEnter={(e) => {
              if (!item.active) {
                e.currentTarget.style.background = "#eceef0";
                e.currentTarget.style.transform = "translateX(4px)";
              }
            }}
            onMouseLeave={(e) => {
              if (!item.active) {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.transform = "translateX(0)";
              }
            }}
          >
            <Icon name={item.icon} filled={item.active} />
            {item.label}
          </a>
        ))}
      </nav>

      <div style={{ marginTop: "auto", borderTop: "1px solid #eceef0", paddingTop: "16px" }}>
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            paddingLeft: "16px",
            paddingRight: "16px",
            paddingTop: "12px",
            paddingBottom: "12px",
            borderRadius: "8px",
            color: "#3d4947",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "14px",
            fontWeight: "500",
            textDecoration: "none",
            transition: "all 0.2s ease",
            cursor: "pointer"
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "#eceef0"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
        >
          <Icon name="help" />
          Support
        </a>
      </div>
    </aside>
  );
}

// Hoverable Card Component
function GlassCard({ children, style = {}, className = "" }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        background: "rgba(255, 255, 255, 0.85)",
        backdropFilter: isHovered ? "blur(16px)" : "blur(12px)",
        border: isHovered ? "1px solid rgba(255, 255, 255, 0.8)" : "1px solid rgba(255, 255, 255, 0.4)",
        boxShadow: isHovered ? "0 8px 30px rgba(13, 148, 136, 0.12)" : "0 4px 20px rgba(13, 148, 136, 0.08)",
        borderRadius: "12px",
        transform: isHovered ? "translateY(-4px) scale(1.01)" : "translateY(0) scale(1)",
        transition: "all 0.3s ease",
        ...style
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </div>
  );
}

// Track Card Component
function TrackCard({ status, title, description }) {
  const statusConfig = {
    completed: { bg: "#00685f", badge: "#008378", icon: "check_circle", filled: true },
    active: { bg: "#006591", badge: "#006591", icon: "play_circle", filled: true },
    locked: { bg: "#e0e3e5", badge: "#3d4947", icon: "lock", filled: false },
  };
  const config = statusConfig[status];

  return (
    <GlassCard style={{
      padding: "24px",
      display: "flex",
      flexDirection: "column",
      height: "100%",
      opacity: status === "locked" ? 0.75 : 1,
      filter: status === "locked" ? "grayscale(50%)" : "none"
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
        <div style={{
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          background: `${config.bg}20`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: config.bg
        }}>
          <Icon name={config.icon} filled={config.filled} size={20} />
        </div>
        <span style={{
          padding: "2px 8px",
          borderRadius: "4px",
          fontSize: "10px",
          fontWeight: "700",
          textTransform: "uppercase",
          background: `${config.badge}20`,
          color: config.badge
        }}>
          {status}
        </span>
      </div>

      <h4 style={{
        fontFamily: "'Hanken Grotesk', sans-serif",
        fontSize: "18px",
        lineHeight: "24px",
        fontWeight: "600",
        color: "#191c1e",
        marginBottom: "8px"
      }}>{title}</h4>

      <p style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: "14px",
        lineHeight: "20px",
        color: "#3d4947",
        flex: 1
      }}>{description}</p>

      <div style={{ paddingTop: "16px", borderTop: "1px solid #eceef0", marginTop: "auto" }}>
        <button style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          background: "none",
          border: "none",
          padding: 0,
          cursor: status === "locked" ? "not-allowed" : "pointer",
          color: status === "locked" ? "rgba(61, 73, 71, 0.4)" : "#00685f",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "12px",
          fontWeight: "500"
        }}>
          <Icon name="download" size={16} />
          Asset Pack
        </button>
      </div>
    </GlassCard>
  );
}

// Points Item Component
function PointsItem({ completed, icon, label, points }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: "16px", position: "relative", zIndex: 1 }}>
      <div style={{
        width: "32px",
        height: "32px",
        borderRadius: "50%",
        background: completed ? "#00685f" : "#eceef0",
        color: completed ? "#ffffff" : "#3d4947",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0
      }}>
        <Icon name={icon} size={16} />
      </div>
      <div style={{ flex: 1, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "14px",
          color: completed ? "#191c1e" : "#3d4947"
        }}>{label}</span>
        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "12px",
          fontWeight: "700",
          color: completed ? "#00685f" : "#3d4947"
        }}>{points}</span>
      </div>
    </div>
  );
}

// Judge Card Component
function JudgeCard({ name, role, expertise, initials }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
      <div style={{
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        background: "#89f5e7",
        color: "#00685f",
        border: "2px solid rgba(0, 104, 95, 0.2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Hanken Grotesk', sans-serif",
        fontSize: "14px",
        fontWeight: "700"
      }}>{initials}</div>
      <div>
        <p style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "14px",
          color: "#191c1e"
        }}>{name}</p>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "10px", color: "#3d4947" }}>{role}</span>
          <span style={{
            fontSize: "8px",
            fontWeight: "700",
            padding: "2px 6px",
            borderRadius: "4px",
            background: "rgba(0, 101, 145, 0.1)",
            color: "#006591",
            textTransform: "uppercase"
          }}>{expertise}</span>
        </div>
      </div>
    </div>
  );
}

// Video Player Component
function VideoPlayer({ title }) {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef(null);

  const handlePlay = () => {
    // In a real app, this would open a video modal or play the video
    alert("Video player would open here!");
  };

  return (
    <GlassCard style={{
      overflow: "hidden",
      padding: 0,
      transform: isHovered ? "translateY(-4px) scale(1.02)" : "translateY(0) scale(1)"
    }}
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
    >
      <div
        style={{
          aspectRatio: "16/9",
          position: "relative",
          background: "#191c1e",
          cursor: "pointer"
        }}
        onClick={handlePlay}
      >
        {/* Video placeholder */}
        <video
          ref={videoRef}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: isHovered ? 0.8 : 0.6,
            transition: "opacity 0.3s ease"
          }}
          poster=""
          muted
          loop
          playsInline
        >
          <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
        </video>

        {/* Play button */}
        <div style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <button
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "50%",
              background: isHovered ? "#00685f" : "rgba(0, 104, 95, 0.9)",
              color: "#ffffff",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
              transform: isHovered ? "scale(1.1)" : "scale(1)",
              transition: "all 0.3s ease"
            }}
          >
            <Icon name="play_arrow" filled size={32} />
          </button>
        </div>

        {/* Title overlay */}
        <div style={{
          position: "absolute",
          bottom: "16px",
          left: "16px",
          right: "16px"
        }}>
          <p style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "14px",
            color: "#ffffff",
            textShadow: "0 2px 4px rgba(0,0,0,0.5)"
          }}>{title}</p>
        </div>
      </div>
    </GlassCard>
  );
}

// Main Sprint Dashboard Component - Content Only (layout provided by SprintLayout)
export default function SprintDashboard({ onNavigate }) {
  const tracks = [
    { status: "completed", title: "AI-Enhanced Career Pathing", description: "An engine mapping regional economic data to skill sets for automated upskilling." },
    { status: "active", title: "Economic Data Engine", description: "Integrate real-time job market APIs to visualize regional demand spikes." },
    { status: "locked", title: "Skill Mapping API", description: "Build a standard interface for connecting resumes to technical taxonomy." },
  ];

  const points = [
    { completed: true, icon: "check", label: "Registration", points: "25pts" },
    { completed: true, icon: "link", label: "Social Share", points: "50pts" },
    { completed: true, icon: "check", label: "Team Formation", points: "25pts" },
    { completed: false, icon: "hourglass_empty", label: "Judge Evaluation", points: "150pts" },
  ];

  const judges = [
    { name: "Dr. Aris Thorne", role: "CTO @ NexCore", expertise: "AI Ethics", initials: "AT" },
    { name: "Elena Rodriguez", role: "VP Prod @ Flow", expertise: "UX/UI", initials: "ER" },
  ];

  const rubrics = [
    { title: "Technical Clarity", points: "50pts", desc: "Assessment of system architecture, code cleanliness, and logic stability." },
    { title: "Creative Execution", points: "50pts", desc: "Visual appeal, UX flow, and novelty of the solution." },
    { title: "Hiring Signal", points: "50pts", desc: "Team collaboration and problem-solving maturity demonstrated." },
  ];

  return (
    <>
      {/* Hero Banner */}
      <section style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px", marginBottom: "32px" }}>
        {/* Main Hero */}
        <GlassCard style={{
          gridColumn: "span 2",
          padding: "32px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
          overflow: "hidden"
        }}>
          <div style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "128px",
            height: "128px",
            background: "rgba(0, 104, 95, 0.05)",
            borderRadius: "50%",
            marginRight: "-64px",
            marginTop: "-64px",
            filter: "blur(32px)"
          }}></div>
          <div>
            <h2 style={{
              fontFamily: "'Hanken Grotesk', sans-serif",
                  fontSize: "48px",
                  lineHeight: "56px",
                  fontWeight: "700",
                  color: "#191c1e",
                  letterSpacing: "-0.02em",
                  marginBottom: "16px"
                }}>Your build window is live.</h2>
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "18px",
                  lineHeight: "28px",
                  color: "#3d4947",
                  maxWidth: "576px"
                }}>Ship your demo, upload artifacts, and rack up pre-judge points before finals. Everything here is tuned for teams already checked in.</p>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", alignItems: "center", marginTop: "32px" }}>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "8px 16px",
                  background: "#eceef0",
                  borderRadius: "8px"
                }}>
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "14px",
                    color: "#191c1e"
                  }}>Team AI Career Agent</span>
                  <span style={{
                    padding: "4px 12px",
                    background: "#008378",
                    color: "#f4fffc",
                    borderRadius: "9999px",
                    fontSize: "10px",
                    fontWeight: "700",
                    textTransform: "uppercase"
                  }}>Active</span>
                </div>
                <div style={{
                  padding: "8px 16px",
                  background: "rgba(0, 104, 95, 0.1)",
                  color: "#00685f",
                  fontWeight: "700",
                  borderRadius: "8px",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "14px"
                }}>Points: 112 / 250</div>
                <div style={{ display: "flex", gap: "8px" }}>
                  <button style={{
                    padding: "10px 24px",
                    background: "#00685f",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "9999px",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "14px",
                    cursor: "pointer",
                    boxShadow: "0 4px 14px rgba(0, 104, 95, 0.2)",
                    transition: "all 0.2s ease"
                  }}>Upload submission</button>
                  <button style={{
                    padding: "10px 24px",
                    background: "transparent",
                    color: "#00685f",
                    border: "1px solid #00685f",
                    borderRadius: "9999px",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "14px",
                    cursor: "pointer"
                  }}>Score more points</button>
                </div>
              </div>
            </GlassCard>

            {/* Countdown */}
            <GlassCard style={{
              padding: "32px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              background: "linear-gradient(to bottom right, rgba(255,255,255,0.8), rgba(0, 104, 95, 0.05))"
            }}>
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "12px",
                color: "#3d4947",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: "16px"
              }}>Submission Countdown</span>
              <CountdownTimer />
              <p style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "12px",
                color: "#3d4947",
                opacity: 0.7,
                marginTop: "8px"
              }}>Ends 6/15/2026, 12:00:00 AM</p>
              <div style={{ width: "100%", height: "4px", background: "#eceef0", borderRadius: "9999px", marginTop: "24px", overflow: "hidden" }}>
                <div style={{ width: "33%", height: "100%", background: "#00685f", borderRadius: "9999px" }}></div>
              </div>
            </GlassCard>
          </section>

          {/* Two-Column Layout */}
          <div style={{ display: "flex", gap: "32px" }}>
            {/* Left Column */}
            <div style={{ flex: 1 }}>
              {/* Track Challenges */}
              <div style={{ marginBottom: "32px" }}>
                <h3 style={{
                  fontFamily: "'Hanken Grotesk', sans-serif",
                  fontSize: "24px",
                  lineHeight: "32px",
                  fontWeight: "600",
                  color: "#191c1e",
                  marginBottom: "24px",
                  paddingLeft: "4px"
                }}>Available Track Challenges</h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
                  {tracks.map((track, i) => (
                    <TrackCard key={i} {...track} />
                  ))}
                </div>
              </div>

              {/* Deliverables Portal */}
              <GlassCard style={{ padding: "24px" }}>
                <h3 style={{
                  fontFamily: "'Hanken Grotesk', sans-serif",
                  fontSize: "24px",
                  lineHeight: "32px",
                  fontWeight: "600",
                  color: "#191c1e",
                  marginBottom: "24px"
                }}>Deliverables Portal</h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "24px", marginBottom: "32px" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    {["GitHub Repository URL", "Live Demo Link", "Video Pitch URL"].map((label) => (
                      <div key={label}>
                        <label style={{
                          display: "block",
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: "12px",
                          color: "#3d4947",
                          marginBottom: "4px",
                          textTransform: "uppercase",
                          letterSpacing: "0.04em"
                        }}>{label}</label>
                        <input
                          type="url"
                          placeholder={label === "GitHub Repository URL" ? "https://github.com/..." : label === "Live Demo Link" ? "https://demo.vercel.app" : "Loom or YouTube link"}
                          style={{
                            width: "100%",
                            padding: "12px 16px",
                            background: "#f2f4f6",
                            border: "none",
                            borderRadius: "8px",
                            fontFamily: "'Inter', sans-serif",
                            fontSize: "14px"
                          }}
                        />
                      </div>
                    ))}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    <div>
                      <label style={{
                        display: "block",
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "12px",
                        color: "#3d4947",
                        marginBottom: "8px",
                        textTransform: "uppercase",
                        letterSpacing: "0.04em"
                      }}>Tech Stack</label>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                        {["React", "OpenAI API", "TailwindCSS", "Python"].map((tech) => (
                          <span key={tech} style={{
                            padding: "4px 12px",
                            background: "rgba(0, 104, 95, 0.05)",
                            color: "#00685f",
                            border: "1px solid rgba(0, 104, 95, 0.2)",
                            borderRadius: "9999px",
                            fontSize: "12px",
                            fontWeight: "700"
                          }}>{tech}</span>
                        ))}
                        <button style={{
                          padding: "4px 12px",
                          background: "#eceef0",
                          color: "#191c1e",
                          border: "none",
                          borderRadius: "9999px",
                          fontSize: "12px",
                          fontWeight: "700",
                          cursor: "pointer"
                        }}>+ Add</button>
                      </div>
                    </div>
                    <div style={{
                      border: "2px dashed rgba(0, 104, 95, 0.2)",
                      background: "rgba(0, 104, 95, 0.05)",
                      borderRadius: "12px",
                      padding: "32px",
                      textAlign: "center",
                      cursor: "pointer"
                    }}>
                      <Icon name="cloud_upload" size={48} style={{ color: "#00685f", marginBottom: "8px" }} />
                      <p style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "14px",
                        color: "#191c1e",
                        marginBottom: "4px"
                      }}>Drag & drop technical docs</p>
                      <p style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "14px",
                        color: "#3d4947",
                        marginBottom: "16px"
                      }}>PDF, MD, or PPTX up to 25MB</p>
                      <button style={{
                        padding: "8px 16px",
                        background: "#00685f",
                        color: "#ffffff",
                        border: "none",
                        borderRadius: "8px",
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "14px",
                        cursor: "pointer"
                      }}>Browse Files</button>
                      <p style={{
                        marginTop: "16px",
                        fontSize: "10px",
                        color: "#3d4947",
                        opacity: 0.6
                      }}>Tip: Uploading a clear architecture diagram earns +10 points.</p>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </div>

            {/* Right Sidebar */}
            <aside style={{ width: "30%", display: "flex", flexDirection: "column", gap: "32px" }}>
              {/* Points Tracker */}
              <GlassCard style={{ padding: "24px" }}>
                <h4 style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "14px",
                  color: "#191c1e",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  marginBottom: "24px"
                }}>Points Tracker</h4>
                <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: "24px" }}>
                  <div style={{
                    position: "absolute",
                    left: "16px",
                    top: "8px",
                    bottom: "8px",
                    width: "2px",
                    background: "#eceef0"
                  }}></div>
                  {points.map((item, i) => (
                    <PointsItem key={i} {...item} />
                  ))}
                </div>
                <div style={{ marginTop: "32px", paddingTop: "24px", borderTop: "1px solid #eceef0" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                    <span style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "12px",
                      color: "#3d4947"
                    }}>Total Progress</span>
                    <span style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "12px",
                      fontWeight: "700",
                      color: "#00685f"
                    }}>112 / 250</span>
                  </div>
                  <div style={{ width: "100%", height: "8px", background: "#eceef0", borderRadius: "9999px", overflow: "hidden" }}>
                    <div style={{ width: "45%", height: "100%", background: "#00685f" }}></div>
                  </div>
                </div>
              </GlassCard>

              {/* Briefing Video */}
              <VideoPlayer title="How to win the FirstStep Hackathon" />

              {/* Judging Panel */}
              <GlassCard style={{ padding: "24px" }}>
                <h4 style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "14px",
                  color: "#191c1e",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  marginBottom: "24px"
                }}>Judging Panel</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  {judges.map((judge) => (
                    <JudgeCard key={judge.name} {...judge} />
                  ))}
                </div>
                <div style={{ marginTop: "32px", paddingTop: "16px", borderTop: "1px solid #eceef0" }}>
                  <h5 style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "12px",
                    color: "#3d4947",
                    textTransform: "uppercase",
                    marginBottom: "16px"
                  }}>Scoring Rubric</h5>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {rubrics.map((rubric) => (
                      <details key={rubric.title}>
                        <summary style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "8px",
                          borderRadius: "4px",
                          cursor: "pointer",
                          listStyle: "none"
                        }}>
                          <span style={{
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: "14px",
                            color: "#191c1e"
                          }}>{rubric.title}</span>
                          <span style={{
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: "12px",
                            fontWeight: "700",
                            color: "#00685f"
                          }}>{rubric.points}</span>
                        </summary>
                        <p style={{
                          padding: "8px",
                          fontSize: "12px",
                          color: "#3d4947"
                        }}>{rubric.desc}</p>
                      </details>
                    ))}
                  </div>
                </div>
              </GlassCard>
            </aside>
          </div>
    </>
  );
}
