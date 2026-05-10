import { TiltCard } from "./components/TiltCard";
import { CountdownTimer } from "./components/CountdownTimer";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Trophy, Users, Timer, Wrench, ArrowRight, Bell, Share2, Briefcase, Bot, Network, Sparkles, Lock, ChevronRight, Star, MessageSquare, Cpu, HelpCircle, Mail, Building2, UserCircle2 } from "lucide-react";

const HACKATHON_START = new Date("2026-06-10T20:00:00-04:00");

export default function PageContent({ onNavigate = () => {} }) {
  return (
    <>
      <header
        id="nav"
        data-w-id="8bef9f4b-d3ae-2689-7a83-804b6f6d6df7"
        className="sticky-nav"
      >
        <nav className="w-container">
          <ul
            role="list"
            className="nav-grid w-list-unstyled"
            style={{ gridTemplateColumns: "minmax(320px, 1.6fr) repeat(4, auto)", columnGap: "24px", alignItems: "center" }}
          >
            <li
              id="w-node-_8bef9f4b-d3ae-2689-7a83-804b6f6d6dfa-8e5a2867"
              style={{ minWidth: "320px" }}
            >
              <a
                href="/"
                aria-current="page"
                className="nav-logo-link w-inline-block w--current"
                style={{ display: "inline-flex", alignItems: "center", minHeight: "92px" }}
              >
                <img
                  src="/firststep-logo.png"
                  alt="FirstStep"
                  className="nav-logo"
                  width={278}
                  height={156}
                  style={{ width: "320px", maxWidth: "none", height: "auto", display: "block" }}
                  decoding="async"
                />
              </a>
            </li>
            <li>
              <a href="#career-accelerator-section" className="nav-link">
                About
              </a>
            </li>
            <li>
              <a href="#tracks-section" className="nav-link">
                Track
              </a>
            </li>
            <li>
              <a href="#judges-section" className="nav-link">
                Judges
              </a>
            </li>
            <li>
              <a
                href="/register"
                className="yellow-button w-button"
                onClick={(event) => {
                  event.preventDefault();
                  onNavigate("/register");
                }}
              >
                REGISTER NOW
              </a>
            </li>
          </ul>
        </nav>
      </header>
      <header id="hero" className="welcome">
        <div className="flex-container w-container">
          <motion.div
            data-w-id="ebe32fdf-61fc-e82a-e6a2-ad8b25947dae"
            className="hero-image-mask hero-video-mask"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <video
              className="hero-video"
              autoPlay
              muted
              loop
              playsInline
              poster="/Gemini_Generated_Image_oxc8kaoxc8kaoxc8.png"
              aria-label="Hackers coding and collaborating"
            >
              <source
                src="https://videos.pexels.com/video-files/7653214/7653214-hd_1920_1080_25fps.mp4"
                type="video/mp4"
              />
            </video>
            <div className="hero-video-badge">$5,000 cash prize pool</div>
          </motion.div>
          <motion.div
            data-w-id="ebe32fdf-61fc-e82a-e6a2-ad8b25947d9a"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ maxWidth: "100%" }}
            className="div-block"
          >
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 mb-5 px-4 py-2 rounded-full border border-[#2a8e9e3d] bg-[#2a8e9e14] text-[#023345] text-sm font-extrabold tracking-wider uppercase"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2a8e9e] opacity-70"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2a8e9e]"></span>
              </span>
              Applications Open • Cohort 2026
            </motion.div>

            <h1 className="heading" style={{ marginBottom: "18px" }}>
              <strong
                style={{
                  display: "inline-block",
                  maxWidth: "100%",
                  width: "max-content",
                  lineHeight: 1.04,
                  letterSpacing: "-0.025em",
                  marginBottom: "10px",
                  fontSize: "clamp(34px, 5.2vw, 72px)",
                  whiteSpace: "normal",
                  color: "#023345",
                }}
              >
                <span style={{ display: "flex", flexDirection: "column", gap: "0.08em", alignItems: "flex-start" }}>
                  <span style={{ whiteSpace: "nowrap" }}>Build for 100 hours.</span>
                  <span
                    style={{
                      whiteSpace: "nowrap",
                      backgroundImage: "linear-gradient(90deg, #2a8e9e 0%, #0891b2 60%, #67e8f9 100%)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      color: "transparent",
                    }}
                  >
                    Get seen by 25 recruiters.
                  </span>
                </span>
              </strong>
            </h1>
            <p
              className="text-slate-600 leading-relaxed font-medium"
              style={{ fontSize: "clamp(18px, 1.5vw, 22px)", lineHeight: 1.55, maxWidth: "640px", marginBottom: "28px" }}
            >
              $5,000 in cash. Top 10 teams sent to recruiters. Remote, tool-agnostic, and built to get you hired.
            </p>

            <div className="hero-proof-grid">
              <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 280 }}>
                <div className="proof-icon" style={{ background: "rgba(34, 197, 94, 0.12)", color: "#16a34a" }}>
                  <Trophy className="w-5 h-5" />
                </div>
                <strong>$5,000</strong>
                <span>Total cash prizes</span>
              </motion.div>
              <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 280 }}>
                <div className="proof-icon" style={{ background: "rgba(42, 142, 158, 0.14)", color: "#2a8e9e" }}>
                  <Users className="w-5 h-5" />
                </div>
                <strong>Top 10</strong>
                <span>Recruiter finalists</span>
              </motion.div>
              <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 280 }}>
                <div className="proof-icon" style={{ background: "rgba(8, 145, 178, 0.14)", color: "#0891b2" }}>
                  <Timer className="w-5 h-5" />
                </div>
                <strong>100 hrs</strong>
                <span>Remote build sprint</span>
              </motion.div>
              <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 280 }}>
                <div className="proof-icon" style={{ background: "rgba(99, 102, 241, 0.12)", color: "#6366f1" }}>
                  <Wrench className="w-5 h-5" />
                </div>
                <strong>Any stack</strong>
                <span>Use whatever tools you want</span>
              </motion.div>
            </div>

            <CountdownTimer targetDate={HACKATHON_START} />

            <div
              className="flex flex-row flex-nowrap items-center gap-8"
              style={{ paddingTop: "32px", display: "flex", alignItems: "center", columnGap: "18px", rowGap: "14px", flexWrap: "wrap" }}
            >
              <a
                href="/register"
                className="yellow-button w-button group"
                onClick={(event) => {
                  event.preventDefault();
                  onNavigate("/register");
                }}
                style={{
                  minHeight: "64px",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "9999px",
                  gap: "10px",
                }}
              >
                Log In to Claim Your Spot
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#schedule-section"
                className="rounded-2xl px-10 py-5 hero-secondary-cta inline-flex items-center gap-2"
                style={{
                  minHeight: "64px",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  backgroundColor: "#ffffff",
                  color: "#023345",
                  fontWeight: 700,
                  border: "1px solid #cbd5e1",
                  borderRadius: "9999px",
                  gap: "8px",
                }}
              >
                <Bell className="w-4 h-4" />
                Follow Updates
              </a>
              <a href="#footer" className="hero-link-cta inline-flex items-center gap-1.5">
                <Briefcase className="w-4 h-4" />
                Recruiter Access
              </a>
              <a href="#gallery" className="hero-link-cta inline-flex items-center gap-1.5">
                <Share2 className="w-4 h-4" />
                Share Hackathon
              </a>
            </div>
          </motion.div>
        </div>
      </header>
<style>{`      
        .welcome .flex-container {
          width: 100% !important;
          max-width: none !important;
          padding-left: clamp(22px, 3vw, 52px) !important;
          padding-right: clamp(22px, 3vw, 52px) !important;
          gap: clamp(34px, 4vw, 78px);
          align-items: center;
          justify-content: flex-start;
        }

        .sticky-nav .nav-logo-link {
          display: inline-flex;
          align-items: center;
          padding: 8px 0;
        }

        .sticky-nav .nav-grid > li:first-child {
          min-width: clamp(250px, 17vw, 340px);
        }

        .sticky-nav .nav-logo {
          width: clamp(250px, 16.8vw, 340px) !important;
          height: auto !important;
          max-width: none;
        }

        .sticky-nav .nav-grid {
          min-height: 88px;
          align-items: center;
          column-gap: 24px;
        }

        .sticky-nav .nav-link {
          font-size: 19px;
          font-weight: 800;
          letter-spacing: 0.015em;
          line-height: 1;
        }

        .sticky-nav .yellow-button {
          min-height: 56px;
          padding: 0 28px;
          border-radius: 9999px;
          font-size: 15px;
          font-weight: 900;
          letter-spacing: 0.025em;
          line-height: 1;
        }

        .hero-video-mask {
          position: relative;
          flex: 0 0 clamp(620px, 62vw, 1120px);
          width: clamp(620px, 62vw, 1120px) !important;
          max-width: 1120px !important;
          height: clamp(560px, 72vh, 820px);
          min-height: 560px;
          padding-top: 0 !important;
          border-radius: 34px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.82);
          box-shadow: 0 36px 110px rgba(2, 51, 69, 0.26);
          background: #023345;
          transform: translateZ(0);
          will-change: transform;
          isolation: isolate;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }

        .hero-video-mask::after {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 0;
          background: linear-gradient(180deg, rgba(2, 51, 69, 0.03), rgba(2, 51, 69, 0.28));
          pointer-events: none;
        }

        .hero-video-mask::before {
          content: "100-hour remote build sprint";
          position: absolute;
          top: 24px;
          left: 24px;
          z-index: 2;
          padding: 11px 16px;
          border-radius: 999px;
          background: rgba(2, 51, 69, 0.78);
          color: #ffffff;
          font-size: 15px;
          font-weight: 900;
          letter-spacing: 0.02em;
        }

        .hero-video {
          position: absolute;
          inset: 0;
          z-index: 1;
          width: 100%;
          height: 100%;
          min-height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
          transform: translateZ(0);
          will-change: transform;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          pointer-events: none;
          outline: none;
        }

        .hero-video-badge {
          position: absolute;
          left: 24px;
          bottom: 24px;
          z-index: 1;
          padding: 12px 18px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.92);
          color: #023345;
          font-size: 17px;
          font-weight: 800;
          box-shadow: 0 14px 35px rgba(0, 0, 0, 0.18);
        }

        .hero-video-badge::after {
          content: "Top 10 to recruiters";
          display: inline-flex;
          margin-left: 10px;
          padding-left: 10px;
          border-left: 1px solid rgba(2, 51, 69, 0.22);
          color: #2a8e9e;
        }

        .hero-proof-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 14px;
          margin-top: 8px;
          max-width: 640px;
        }

        .hero-proof-grid > div {
          position: relative;
          padding: 20px 22px;
          border-radius: 22px;
          background: #ffffff;
          border: 1px solid rgba(2, 51, 69, 0.08);
          box-shadow: 0 18px 40px rgba(2, 51, 69, 0.08);
          transition: border-color 220ms ease;
          cursor: default;
        }

        .hero-proof-grid > div:hover {
          border-color: rgba(42, 142, 158, 0.35);
        }

        .hero-proof-grid .proof-icon {
          width: 38px;
          height: 38px;
          border-radius: 12px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 12px;
        }

        .hero-proof-grid strong,
        .hero-proof-grid span {
          display: block;
        }

        .hero-proof-grid strong {
          color: #023345;
          font-size: clamp(22px, 2vw, 28px);
          line-height: 1;
          margin-bottom: 6px;
          letter-spacing: -0.01em;
        }

        .hero-proof-grid span {
          color: #475569;
          font-size: 13.5px;
          font-weight: 600;
        }

        .hero-link-cta {
          min-height: 48px;
          border: 0;
          background: transparent;
          color: #023345;
          font-weight: 800;
          cursor: pointer;
          padding: 0 6px;
        }

        .how-does-it-work {
          padding: 60px 0;
          background: linear-gradient(180deg, #ffffff 0%, #f5f9fa 100%);
        }

        .how-does-it-work .centered-container {
          text-align: center;
          margin-bottom: 50px;
        }

        .flex-container.left-image,
        .flex-container.right-image {
          gap: clamp(30px, 5vw, 60px) !important;
        }

        .flex-container.left-image .feature-image-mask:hover img,
        .flex-container.right-image .feature-image-mask:hover img {
          transform: scale(1.02);
        }

        .judges-roadmap {
          position: relative;
          padding: 20px 0 40px;
        }

        .roadmap-line {
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 3px;
          background: linear-gradient(180deg, #2a8e9e, #0891b2, #6366f1);
          transform: translateX(-50%);
          border-radius: 2px;
        }

        .roadmap-step {
          display: flex;
          align-items: center;
          margin-bottom: 40px;
          position: relative;
        }

        .roadmap-left {
          flex-direction: row;
          padding-right: calc(50% + 40px);
        }

        .roadmap-right {
          flex-direction: row-reverse;
          padding-left: calc(50% + 40px);
        }

        .roadmap-node {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          width: 56px;
          height: 56px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
          z-index: 2;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .roadmap-step:hover .roadmap-node {
          transform: translateX(-50%) scale(1.1);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
        }

        .roadmap-card {
          background: white;
          border-radius: 20px;
          padding: 24px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
          border: 1px solid rgba(42, 142, 158, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          width: 100%;
        }

        .roadmap-step:hover .roadmap-card {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(42, 142, 158, 0.12);
        }

        .roadmap-footer {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding-top: 20px;
          margin-top: 20px;
        }

        @media (max-width: 991px) {
          .sticky-nav .nav-grid > li:first-child {
            min-width: clamp(190px, 34vw, 250px);
          }

          .sticky-nav .nav-logo {
            width: clamp(190px, 36vw, 250px) !important;
          }

          .sticky-nav .nav-grid {
            min-height: 74px;
            column-gap: 14px;
          }

          .sticky-nav .nav-link {
            font-size: 16px;
          }

          .sticky-nav .yellow-button {
            min-height: 48px;
            padding: 0 18px;
            font-size: 13px;
          }

          .hero-video-mask {
            flex-basis: auto;
            width: 100% !important;
            transform: none;
            height: 420px;
            min-height: 420px;
          }

          .hero-video {
            min-height: 100%;
          }

          .hero-proof-grid {
            grid-template-columns: 1fr;
          }
        }

        .stats-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1.5rem;
          flex-wrap: nowrap;
          margin: 0 auto;
        }

        .stats-item {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: 1.25rem 1rem;
          border-left: 1px solid rgba(7, 9, 36, 0.12);
          height: 100%;
        }

        .stats-item:first-child {
          border-left: none;
        }

        .stats-icon {
          width: 44px;
          height: 44px;
          border-radius: 9999px;
          background-color: rgba(2, 51, 69, 0.06);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 0.75rem;
          font-size: 1.25rem;
        }

        .stats-label {
          color: rgba(100, 116, 139, 1);
          font-size: 0.95rem;
          margin-bottom: 0.35rem;
        }

        .stats-value {
          font-size: 1.5rem;
          font-weight: 700;
          color: #070924;
        }

        .brief-button {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 4px 8px;
          background: #ffffff;
          color: #0891b2;
          font-weight: 700;
          font-size: 15px;
          line-height: 1;
          cursor: pointer;
          text-decoration: none;
          border-radius: 8px;
          transition: transform 180ms ease, background-color 180ms ease, box-shadow 180ms ease;
        }

        .brief-button svg {
          transition: transform 180ms ease;
        }

        .brief-button:hover {
          transform: translateY(-2px);
          background-color: #e6f4f7;
          box-shadow: 0 6px 16px rgba(42, 142, 158, 0.14);
        }

        .brief-button:hover svg {
          transform: translateX(3px);
        }

        .career-section {
          position: relative;
          overflow: hidden;
          padding: 80px 0 100px;
          background: linear-gradient(180deg, #ffffff 0%, #f5f9fa 100%);
        }

        .career-bg-gradient {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(135deg, #023345 0%, #034a63 40%, #2a8e9e 70%, #0891b2 100%);
          opacity: 0.08;
          z-index: 0;
        }

        .career-bg-gradient::before {
          content: "";
          position: absolute;
          top: 10%;
          right: 5%;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(42, 142, 158, 0.4) 0%, transparent 70%);
          border-radius: 50%;
          filter: blur(60px);
          animation: float1 8s ease-in-out infinite;
        }

        .career-bg-gradient::after {
          content: "";
          position: absolute;
          bottom: 10%;
          left: 5%;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(8, 145, 178, 0.35) 0%, transparent 70%);
          border-radius: 50%;
          filter: blur(50px);
          animation: float2 10s ease-in-out infinite;
        }

        @keyframes float1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-30px, 30px) scale(1.1); }
        }

        @keyframes float2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, -20px) scale(1.05); }
        }

        .career-floating-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(40px);
          opacity: 0.3;
          pointer-events: none;
          z-index: 0;
        }

        .career-floating-orb-1 {
          width: 200px;
          height: 200px;
          background: linear-gradient(135deg, #2a8e9e, #0891b2);
          top: 20%;
          left: 10%;
          animation: orbFloat1 12s ease-in-out infinite;
        }

        .career-floating-orb-2 {
          width: 150px;
          height: 150px;
          background: linear-gradient(135deg, #0891b2, #2a8e9e);
          bottom: 25%;
          right: 15%;
          animation: orbFloat2 15s ease-in-out infinite;
        }

        .career-floating-orb-3 {
          width: 100px;
          height: 100px;
          background: #023345;
          top: 60%;
          left: 50%;
          animation: orbFloat3 10s ease-in-out infinite;
        }

        @keyframes orbFloat1 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(40px, -30px) rotate(120deg); }
          66% { transform: translate(-20px, 20px) rotate(240deg); }
        }

        @keyframes orbFloat2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-40px, 30px) scale(1.2); }
        }

        @keyframes orbFloat3 {
          0%, 100% { transform: translate(-50%, 0); }
          50% { transform: translate(-50%, -40px); }
        }

        .career-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 clamp(24px, 4vw, 48px);
          position: relative;
          z-index: 1;
        }

        .career-header {
          text-align: center;
          max-width: 800px;
          margin: 0 auto 56px;
        }

        .career-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          border-radius: 999px;
          background: linear-gradient(135deg, #2a8e9e, #0891b2);
          border: none;
          box-shadow: 0 4px 20px rgba(42, 142, 158, 0.3);
          color: #ffffff;
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 0.15em;
          margin-bottom: 24px;
          position: relative;
          overflow: hidden;
        }

        .career-badge::before {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 50%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          animation: badgeShimmer 3s ease-in-out infinite;
        }

        @keyframes badgeShimmer {
          0% { left: -100%; }
          50%, 100% { left: 150%; }
        }

        .career-badge svg {
          color: #ffffff;
          animation: iconBounce 2s ease-in-out infinite;
        }

        @keyframes iconBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-2px); }
        }

        .career-main-title {
          font-size: clamp(32px, 4.5vw, 56px);
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -0.025em;
          color: #023345;
          margin-bottom: 20px;
        }

        .career-highlight {
          background: linear-gradient(135deg, #2a8e9e 0%, #0891b2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .career-subtitle {
          font-size: clamp(16px, 1.5vw, 20px);
          line-height: 1.6;
          color: #64748b;
          max-width: 640px;
          margin: 0 auto;
        }

        .career-stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          max-width: 1000px;
          margin: 0 auto 56px;
        }

        .career-stat-card {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(42, 142, 158, 0.1);
          border-radius: 28px;
          padding: 36px 28px;
          text-align: center;
          box-shadow:
            0 4px 20px rgba(42, 142, 158, 0.06),
            0 1px 4px rgba(2, 51, 69, 0.02);
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
          position: relative;
        }

        .career-stat-card::after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 28px;
          padding: 1px;
          background: linear-gradient(135deg, transparent, rgba(42, 142, 158, 0.3), transparent);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .career-stat-card:hover::after {
          opacity: 1;
        }

        .career-stat-card:hover {
          background: rgba(255, 255, 255, 0.95);
          transform: translateY(-8px);
          box-shadow:
            0 16px 40px rgba(42, 142, 158, 0.12),
            0 8px 16px rgba(2, 51, 69, 0.06);
          border-color: rgba(42, 142, 158, 0.25);
        }

        .career-stat-icon {
          width: 64px;
          height: 64px;
          border-radius: 20px;
          background: linear-gradient(135deg, rgba(42, 142, 158, 0.15), rgba(8, 145, 178, 0.1));
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(42, 142, 158, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          color: #2a8e9e;
        }

        .career-stat-num {
          font-size: 48px;
          font-weight: 800;
          letter-spacing: -0.02em;
          background: linear-gradient(135deg, #2a8e9e, #0891b2);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1;
          margin-bottom: 10px;
        }

        .career-stat-label {
          font-size: 14px;
          font-weight: 600;
          color: #475569;
          line-height: 1.4;
        }

        .career-flow {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          max-width: 1100px;
          margin: 0 auto 56px;
          flex-wrap: wrap;
        }

        .career-flow-step {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(42, 142, 158, 0.12);
          border-radius: 24px;
          padding: 28px;
          box-shadow:
            0 8px 32px rgba(42, 142, 158, 0.06),
            0 2px 8px rgba(2, 51, 69, 0.03),
            inset 0 1px 0 rgba(255, 255, 255, 1);
          flex: 1;
          min-width: 260px;
          max-width: 340px;
          transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .career-flow-step::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #2a8e9e, #0891b2, #2a8e9e);
          background-size: 200% 100%;
          animation: gradientMove 3s linear infinite;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }

        .career-flow-step:hover::before {
          opacity: 1;
        }

        .career-flow-step:hover {
          background: rgba(255, 255, 255, 0.98);
          transform: translateY(-6px);
          border-color: rgba(42, 142, 158, 0.3);
          box-shadow:
            0 16px 48px rgba(42, 142, 158, 0.1),
            0 8px 16px rgba(2, 51, 69, 0.05);
        }

        .career-flow-step:hover {
          transform: translateY(-4px);
          border-color: rgba(42, 142, 158, 0.4);
          box-shadow:
            0 16px 40px rgba(42, 142, 158, 0.12),
            0 4px 12px rgba(2, 51, 69, 0.06),
            inset 0 1px 0 rgba(255, 255, 255, 1);
        }

        .career-flow-number {
          width: 48px;
          height: 48px;
          border-radius: 16px;
          background: linear-gradient(135deg, #2a8e9e, #0891b2);
          color: #ffffff;
          font-size: 22px;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 4px 16px rgba(42, 142, 158, 0.35);
        }

        .career-flow-content h3 {
          font-size: 19px;
          font-weight: 700;
          color: #023345;
          margin: 0 0 8px;
        }

        .career-flow-content p {
          font-size: 14px;
          color: #64748b;
          margin: 0;
          line-height: 1.5;
        }

        .career-flow-connector {
          color: #2a8e9e;
          flex-shrink: 0;
          opacity: 0.5;
        }

        .recruiter-showcase {
          display: flex;
          align-items: stretch;
          gap: 32px;
          max-width: 1000px;
          margin: 0 auto;
        }

        .recruiter-card {
          border-radius: 32px;
          padding: 40px;
          flex: 1;
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, #2a8e9e, #0891b2);
          box-shadow: 0 20px 60px rgba(42, 142, 158, 0.35);
          animation: cardPulse 4s ease-in-out infinite;
        }

        .recruiter-card::before {
          content: "";
          position: absolute;
          inset: -2px;
          background: linear-gradient(135deg, #2a8e9e, #0891b2, #2a8e9e);
          border-radius: 34px;
          z-index: -1;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .recruiter-card:hover::before {
          opacity: 1;
          animation: borderGlow 2s linear infinite;
        }

        @keyframes cardPulse {
          0%, 100% { box-shadow: 0 20px 60px rgba(42, 142, 158, 0.35); }
          50% { box-shadow: 0 24px 70px rgba(42, 142, 158, 0.45); }
        }

        @keyframes borderGlow {
          0% { filter: hue-rotate(0deg); }
          100% { filter: hue-rotate(20deg); }
        }

        .recruiter-card-main {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 28px;
          min-height: 220px;
        }

        .recruiter-avatars {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0;
        }

        .recruiter-avatar {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 3px solid rgba(255, 255, 255, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: -14px;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
          transition: transform 0.2s ease;
        }

        .recruiter-avatar:first-child {
          margin-left: 0;
        }

        .recruiter-avatar:hover {
          transform: translateY(-4px) scale(1.1);
          z-index: 10;
        }

        .recruiter-avatar svg {
          color: rgba(255, 255, 255, 0.95);
          width: 32px;
          height: 32px;
        }

        .recruiter-avatar-more {
          background: rgba(255, 255, 255, 0.95);
          border: 3px solid rgba(255, 255, 255, 1);
          font-size: 13px;
          font-weight: 800;
          color: #2a8e9e;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
        }

        .recruiter-avatar-more span {
          font-size: 13px;
          font-weight: 800;
          color: #2a8e9e;
        }

        .recruiter-count-badge {
          text-align: center;
        }

        .recruiter-count {
          display: block;
          font-size: 56px;
          font-weight: 800;
          color: #ffffff;
          line-height: 1;
          margin-bottom: 6px;
          text-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        .recruiter-label {
          display: block;
          font-size: 15px;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.9);
          text-transform: uppercase;
          letter-spacing: 0.12em;
        }

        .recruiter-features {
          flex: 1.3;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(42, 142, 158, 0.15);
          border-radius: 32px;
          padding: 32px 36px;
          box-shadow:
            0 12px 40px rgba(42, 142, 158, 0.08),
            0 4px 12px rgba(2, 51, 69, 0.03),
            inset 0 1px 0 rgba(255, 255, 255, 1);
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 20px;
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
        }

        .recruiter-features:hover {
          transform: translateY(-4px);
          border-color: rgba(42, 142, 158, 0.25);
          box-shadow:
            0 16px 48px rgba(42, 142, 158, 0.12),
            0 8px 16px rgba(2, 51, 69, 0.05);
        }

        .recruiter-features-title {
          font-size: 18px;
          font-weight: 700;
          color: #023345;
          margin-bottom: 8px;
        }

        .recruiter-feature {
          display: flex;
          align-items: center;
          gap: 14px;
          font-size: 15px;
          font-weight: 500;
          color: #334155;
        }

        .recruiter-feature svg {
          flex-shrink: 0;
          color: #2a8e9e;
        }

        .career-cta {
          text-align: center;
          margin-top: 48px;
        }

        .career-cta .yellow-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 18px 36px;
          font-size: 16px;
          font-weight: 700;
          border-radius: 999px;
          min-height: 60px;
          background: linear-gradient(135deg, #2a8e9e, #0891b2);
          box-shadow: 0 8px 28px rgba(42, 142, 158, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          border: none;
          color: #ffffff !important;
          position: relative;
          overflow: hidden;
        }

        .career-cta .yellow-button::before {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          transition: left 0.5s ease;
        }

        .career-cta .yellow-button:hover::before {
          left: 100%;
        }

        .career-cta .yellow-button:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 14px 40px rgba(42, 142, 158, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }

        .career-cta .yellow-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 14px 36px rgba(42, 142, 158, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }

        .value-strip {
          padding: 44px 0;
          background: linear-gradient(180deg, #f5f9fa 0%, #f5f9fa 100%);
          position: relative;
        }

        .value-strip::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 80% 60% at 50% 100%, rgba(42, 142, 158, 0.06) 0%, transparent 70%);
          pointer-events: none;
        }

        .value-strip-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 20px;
          position: relative;
          z-index: 1;
        }

        .value-strip-card {
          padding: 28px 24px;
          border-radius: 24px;
          background: #f5f9fa;
          border: none;
          text-align: center;
          position: relative;
          overflow: hidden;
          box-shadow:
            0 2px 12px rgba(42, 142, 158, 0.04),
            0 1px 2px rgba(2, 51, 69, 0.02);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .value-strip-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(42, 142, 158, 0.08), transparent);
          transition: left 0.5s ease;
        }

        .value-strip-card:hover {
          transform: translateY(-6px);
          background: #ffffff;
          box-shadow:
            0 12px 32px rgba(42, 142, 158, 0.12),
            0 4px 12px rgba(2, 51, 69, 0.06),
            0 0 0 1px rgba(42, 142, 158, 0.2);
        }

        .value-strip-card:hover::before {
          left: 100%;
        }

        .value-strip-icon {
          width: 52px;
          height: 52px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px;
          transition: transform 0.3s ease;
        }

        .value-strip-card:hover .value-strip-icon {
          transform: scale(1.1) rotate(5deg);
        }

        .value-strip-card strong {
          display: block;
          background: linear-gradient(135deg, #2a8e9e, #0891b2);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-size: 32px;
          line-height: 1;
          margin-bottom: 10px;
          font-weight: 800;
          transition: transform 0.3s ease;
        }

        .value-strip-card:hover strong {
          transform: scale(1.05);
        }

        .value-strip-card span {
          color: #475569;
          font-size: 14px;
          font-weight: 600;
        }

        .placeholder-card,
        .sponsor-name-card {
          padding: 28px;
          border-radius: 24px;
          background: #ffffff;
          border: 1px solid rgba(2, 51, 69, 0.12);
          box-shadow: 0 18px 45px rgba(2, 51, 69, 0.08);
        }

        .placeholder-card h3,
        .sponsor-name-card h3 {
          margin-top: 0;
          color: #023345;
        }

        .judge-learn-more {
          display: inline-flex;
          margin-top: 16px;
          color: #2a8e9e;
          font-weight: 900;
        }

        @media (max-width: 991px) {
          .value-strip-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .career-stats-grid {
            grid-template-columns: 1fr;
            max-width: 400px;
          }

          .career-flow {
            flex-direction: column;
          }

          .career-flow-connector {
            transform: rotate(90deg);
          }

          .career-flow-step {
            max-width: 100%;
          }

          .recruiter-showcase {
            flex-direction: column;
          }
        }

        @media (max-width: 640px) {
          .value-strip-grid {
            grid-template-columns: 1fr;
          }

          .career-section {
            padding: 60px 0 80px;
          }

          .career-stat-card {
            padding: 24px 20px;
          }

          .roadmap-line {
            left: 28px;
          }

          .roadmap-step {
            flex-direction: column !important;
            padding: 0 0 0 70px !important;
            align-items: flex-start !important;
          }

          .roadmap-node {
            left: 0;
            transform: translateX(0) !important;
            width: 48px;
            height: 48px;
          }

          .roadmap-step:hover .roadmap-node {
            transform: scale(1.1) !important;
          }

          .roadmap-card {
            padding: 20px;
          }

          .career-stat-num {
            font-size: 36px;
          }

          .recruiter-features {
            padding: 24px;
          }
        }

        @media (max-width: 1100px) {
          .career-wrap {
            padding: 0 28px;
            flex-direction: column;
            align-items: flex-start;
            gap: 36px;
          }

          .career-title {
            font-size: 48px;
          }

          .career-copy {
            font-size: 25px;
          }

          .career-point {
            font-size: 24px;
          }

          .career-chip {
            font-size: 18px;
          }

          .career-right {
            max-width: 100%;
          }

          .career-card {
            max-width: 100%;
            padding: 28px;
          }

          .career-card-title {
            font-size: 26px;
          }
        }

      `}</style>
      <section id="career-accelerator-section" className="career-section">
        <div className="career-bg-gradient"></div>
        <div className="career-floating-orb career-floating-orb-1"></div>
        <div className="career-floating-orb career-floating-orb-2"></div>
        <div className="career-floating-orb career-floating-orb-3"></div>
        <div className="career-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="career-header"
          >
            <div className="career-badge">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
              </svg>
              CAREER ACCELERATOR
            </div>
            <h2 className="career-main-title">Your Work Gets In Front of<br /><span className="career-highlight">+25 Real Recruiters</span></h2>
            <p className="career-subtitle">
              Top 10 teams get their projects sent directly to company recruiters with portfolio-ready work, team profiles, and proof of execution.
            </p>
          </motion.div>

          <div className="career-stats-grid">
            {[
              { num: "+10", label: "Finalist Teams Get Noticed", icon: <Users className="w-6 h-6" />, delay: 0 },
              { num: "+25", label: "Company Recruiters See Your Work", icon: <Building2 className="w-6 h-6" />, delay: 0.1 },
              { num: "100%", label: "OPT/H1B Friendly Companies", icon: <Star className="w-6 h-6" />, delay: 0.2 },
            ].map(({ num, label, icon, delay }) => (
              <motion.div
                key={label}
                className="career-stat-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay }}
                whileHover={{ y: -4 }}
              >
                <div className="career-stat-icon">{icon}</div>
                <div className="career-stat-num">{num}</div>
                <div className="career-stat-label">{label}</div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="career-flow"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="career-flow-step">
              <div className="career-flow-number">1</div>
              <div className="career-flow-content">
                <h3>Build Your Project</h3>
                <p>100 hours to create something that proves what you can ship</p>
              </div>
            </div>
            <div className="career-flow-connector">
              <svg width="40" height="24" viewBox="0 0 40 24" fill="none">
                <path d="M0 12H36M36 12L28 4M36 12L28 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="career-flow-step">
              <div className="career-flow-number" style={{background: 'linear-gradient(135deg, #0891b2, #2a8e9e)'}}>2</div>
              <div className="career-flow-content">
                <h3>Top +10 Selected</h3>
                <p>Judges pick standout teams with recruiter-ready deliverables</p>
              </div>
            </div>
            <div className="career-flow-connector">
              <svg width="40" height="24" viewBox="0 0 40 24" fill="none">
                <path d="M0 12H36M36 12L28 4M36 12L28 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="career-flow-step">
              <div className="career-flow-number" style={{background: 'linear-gradient(135deg, #2a8e9e, #023345)'}}>3</div>
              <div className="career-flow-content">
                <h3>Sent to +25 Recruiters</h3>
                <p>Your work goes directly to hiring teams at OPT-friendly companies</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="recruiter-showcase"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="recruiter-card recruiter-card-main">
              <div className="recruiter-avatars">
                {[1,2,3,4,5,6].map((i) => (
                  <motion.div
                    key={i}
                    className="recruiter-avatar"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.3 + (i * 0.05) }}
                    whileHover={{ y: -3, scale: 1.1 }}
                  >
                    <UserCircle2 className="w-full h-full text-white" />
                  </motion.div>
                ))}
                <motion.div
                  className="recruiter-avatar recruiter-avatar-more"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.6 }}
                >
                  <span>+19</span>
                </motion.div>
              </div>
              <div className="recruiter-count-badge">
                <span className="recruiter-count">+25</span>
                <span className="recruiter-label">Active Recruiters</span>
              </div>
            </div>
            <div className="recruiter-features">
              <div className="recruiter-feature">
                <CheckCircle2 className="w-5 h-5 text-[#2a8e9e]" />
                <span>Project showcase with live demo links</span>
              </div>
              <div className="recruiter-feature">
                <CheckCircle2 className="w-5 h-5 text-[#2a8e9e]" />
                <span>Team profiles with skills & GitHub</span>
              </div>
              <div className="recruiter-feature">
                <CheckCircle2 className="w-5 h-5 text-[#2a8e9e]" />
                <span>Verifiable participation certificate</span>
              </div>
              <div className="recruiter-feature">
                <CheckCircle2 className="w-5 h-5 text-[#2a8e9e]" />
                <span>OPT & H1B friendly company matches</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="career-cta"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <a
              href="/register"
              className="yellow-button w-button"
              onClick={(event) => {
                event.preventDefault();
                onNavigate("/register");
              }}
            >
              Start Building Your Portfolio
              <ArrowRight className="w-5 h-5 ml-2" />
            </a>
          </motion.div>
        </div>
      </section>
      <section className="value-strip">
        <div className="w-container">
          <motion.div
            className="value-strip-grid"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, staggerChildren: 0.15 }}
          >
            <motion.div whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 300 }}>
              <Card className="value-strip-card">
                <CardContent className="p-0">
                  <div className="value-strip-icon" style={{background: 'rgba(34, 197, 94, 0.12)', color: '#16a34a'}}>
                    <Trophy className="w-6 h-6" />
                  </div>
                  <strong>$5,000</strong>
                  <span>Total cash prizes</span>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 300 }}>
              <Card className="value-strip-card">
                <CardContent className="p-0">
                  <div className="value-strip-icon" style={{background: 'rgba(42, 142, 158, 0.12)', color: '#2a8e9e'}}>
                    <Building2 className="w-6 h-6" />
                  </div>
                  <strong>+25</strong>
                  <span>Company recruiters</span>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 300 }}>
              <Card className="value-strip-card">
                <CardContent className="p-0">
                  <div className="value-strip-icon" style={{background: 'rgba(8, 145, 178, 0.12)', color: '#0891b2'}}>
                    <Timer className="w-6 h-6" />
                  </div>
                  <strong>100 hrs</strong>
                  <span>Remote hackathon</span>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 300 }}>
              <Card className="value-strip-card">
                <CardContent className="p-0">
                  <div className="value-strip-icon" style={{background: 'rgba(99, 102, 241, 0.12)', color: '#6366f1'}}>
                    <Wrench className="w-6 h-6" />
                  </div>
                  <strong>Any tools</strong>
                  <span>Your stack, your way</span>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>
      <section id="feature-section" className="how-does-it-work">
        <motion.div
          data-w-id="dfb716ce-2c21-3a6e-eb0a-c5018a79e113"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="centered-container w-container"
        >
          <Badge className="bg-slate-100 text-slate-500 hover:bg-slate-200 border-none px-4 py-1.5 mb-4 text-sm font-bold uppercase tracking-widest shadow-sm">
            The Process
          </Badge>
          <h2 className="heading-3">How It Works</h2>
        </motion.div>
        <motion.div 
          className="flex-container left-image w-container"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div
            data-w-id="891ec4c5-950a-21a5-c43b-09b143489e60"
            className="div-block-2"
          >
            <h2 className="heading-2">1. Register &amp; Choose Your Track</h2>
            <p>
              Sign up for the hackathon and get access to 3 challenge tracks when the competition begins.
              Pick the track that best matches your skills, interests, and creativity.
              <br />
            </p>
          </div>
          <div className="feature-image-mask" style={{ background: 'transparent', boxShadow: 'none' }}>
            <TiltCard>
              <Card className="overflow-hidden rounded-[34px] shadow-[0_20px_40px_rgba(0,0,0,0.08)] border-slate-200/60 bg-white/50 backdrop-blur-md">
                <CardContent className="p-0">
                  <motion.img
                    className="w-full h-auto block"
                    src="/p1.png"
                    alt="Register and choose your challenge track"
                    sizes="(max-width: 479px) 93vw, (max-width: 767px) 95vw, (max-width: 991px) 303.96875px, 451.84375px"
                    data-w-id="891ec4c5-950a-21a5-c43b-09b143489e5f"
                    srcSet="/p1.png 1182w"
                  />
                </CardContent>
              </Card>
            </TiltCard>
          </div>
        </motion.div>
        <motion.div 
          className="flex-container right-image w-container"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div
            data-w-id="96ac62ba-6afa-2540-080c-8ce962f94e80"
            className="feature-image-mask"
            style={{ background: 'transparent', boxShadow: 'none' }}
          >
            <TiltCard>
              <Card className="overflow-hidden rounded-[34px] shadow-[0_20px_40px_rgba(0,0,0,0.08)] border-slate-200/60 bg-white/50 backdrop-blur-md">
                <CardContent className="p-0">
                  <motion.img
                    src="/p2.png"
                    alt="Build and submit your project within 100 hours"
                    sizes="(max-width: 479px) 93vw, (max-width: 767px) 95vw, (max-width: 991px) 282.9375px, 423.75px"
                    srcSet="/p2.png 1182w"
                    className="w-full h-auto block"
                  />
                </CardContent>
              </Card>
            </TiltCard>
          </div>
          <div
            data-w-id="96ac62ba-6afa-2540-080c-8ce962f94e7a"
            className="div-block-2"
          >
            <h2 className="heading-2">
              2. Build &amp; Submit Within 100 Hours
              <br />
            </h2>
            <p>
              You&apos;ll have 100 hours to design, build, and submit your project. Work solo or with your
              team to create a real-world solution that stands out.
              <br />
            </p>
          </div>
        </motion.div>
        <motion.div 
          className="flex-container left-image w-container"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div
            data-w-id="b839cd2d-130d-7c4b-59d3-5346fd686093"
            className="div-block-2"
          >
            <h2 className="heading-2">
              3. Get Evaluated by Industry Judges
              <br />
            </h2>
            <p>
              Projects will be reviewed based on innovation, execution, technical quality, user experience,
              and impact. Shortlisted teams move to the final evaluation round.
              <br />
            </p>
          </div>
          <div
            data-w-id="b839cd2d-130d-7c4b-59d3-5346fd686099"
            className="feature-image-mask"
            style={{ background: 'transparent', boxShadow: 'none' }}
          >
            <TiltCard>
              <Card className="overflow-hidden rounded-[34px] shadow-[0_20px_40px_rgba(0,0,0,0.08)] border-slate-200/60 bg-white/50 backdrop-blur-md">
                <CardContent className="p-0">
                  <motion.img
                    src="/p3.png"
                    alt="Industry judges evaluate projects"
                    sizes="(max-width: 991px) 278.296875px, 417.5px"
                    srcSet="/p3.png 1360w"
                    className="w-full h-auto block"
                  />
                </CardContent>
              </Card>
            </TiltCard>
          </div>
        </motion.div>
        <motion.div 
          className="flex-container right-image w-container"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div
            data-w-id="c7657fba-91d3-a188-ac77-2665fe0d99d9"
            className="feature-image-mask"
            style={{ background: 'transparent', boxShadow: 'none' }}
          >
            <TiltCard>
              <Card className="overflow-hidden rounded-[34px] shadow-[0_20px_40px_rgba(0,0,0,0.08)] border-slate-200/60 bg-white/50 backdrop-blur-md">
                <CardContent className="p-0">
                  <motion.img
                    src="/p4.png"
                    alt="Get discovered by recruiters"
                    sizes="(max-width: 479px) 402.34375px, 577.8125px"
                    srcSet="/p4.png 1287w"
                    className="w-full h-auto block"
                  />
                </CardContent>
              </Card>
            </TiltCard>
          </div>
          <div
            data-w-id="c7657fba-91d3-a188-ac77-2665fe0d99db"
            className="div-block-2"
          >
            <h2 className="heading-2">
              4. Get Discovered by Recruiters
              <br />
            </h2>
            <p>
              Top 10 teams will be shared with 50+ recruiter partners from OPT-friendly and H1B-friendly
              companies. All participants receive a verifiable participation certificate.
              <br />
            </p>
          </div>
        </motion.div>
      </section>
      <section id="tracks-section" className="tracks">
        <div className="centered-container-2 w-container">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <Badge className="bg-[#2a8e9e14] text-[#2a8e9e] border border-[#2a8e9e3d] hover:bg-[#2a8e9e1f] px-4 py-1.5 text-xs font-bold tracking-[0.2em] uppercase mb-5 rounded-full">
              Pick Your Path
            </Badge>
            <h2 className="heading-3" style={{ opacity: 1 }}>Three Tracks</h2>
            <p
              className="paragraph-2 how-does-it-work-paragraph"
              style={{ opacity: 1 }}
            >
              Details are coming soon. Pick the track that best shows recruiters what you can build in 100 remote hours.
            </p>
          </motion.div>
          <div className="cards-grid-container" style={{ opacity: 1 }}>
            {[
              {
                num: "01",
                title: "AI Career Agent",
                desc: "Build an AI workflow that helps candidates move faster from job search to recruiter conversations.",
                img: "/p5.png",
                imgSet: "/p5.png 1360w",
                Icon: Bot,
                accent: "#2a8e9e",
                bg: "rgba(42, 142, 158, 0.12)",
                tags: ["AI", "Automation", "LLMs"],
              },
              {
                num: "02",
                title: "Recruiter Bridge",
                desc: "Design a way to put great teams, proof of work, and hiring context in front of recruiters.",
                img: "/p6.png",
                imgSet: "/p6.png 1181w",
                Icon: Network,
                accent: "#0891b2",
                bg: "rgba(8, 145, 178, 0.12)",
                tags: ["UX", "Hiring", "Web"],
              },
              {
                num: "03",
                title: "Open Build",
                desc: "Use any stack and any tools to build a useful product that makes international hiring easier.",
                img: "/p7.png",
                imgSet: "/p7.png 1181w",
                Icon: Sparkles,
                accent: "#6366f1",
                bg: "rgba(99, 102, 241, 0.12)",
                tags: ["Any Stack", "Open"],
              },
            ].map(({ num, title, desc, img, imgSet, Icon, accent, bg, tags }, i) => (
              <motion.div
                key={num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.55, delay: i * 0.08 }}
                className="w-full h-full"
              >
                <TiltCard className="w-full h-full block">
                  <Card className="track-card group h-full overflow-hidden border border-[#02334514] hover:border-[#2a8e9e66] bg-white rounded-[26px] shadow-[0_20px_45px_rgba(2,51,69,0.08)] transition-colors">
                    <div className="cards-image-mask relative" style={{ background: bg }}>
                      <Badge
                        className="absolute top-4 left-4 z-10 bg-white/90 text-[#023345] border-0 shadow-md font-extrabold tracking-widest px-3 py-1 rounded-full text-xs"
                      >
                        TRACK {num}
                      </Badge>
                      <div
                        className="absolute top-4 right-4 z-10 w-10 h-10 rounded-xl flex items-center justify-center shadow-md"
                        style={{ background: accent, color: "#ffffff" }}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <img
                        src={img}
                        sizes="(max-width: 479px) 93vw, (max-width: 767px) 95vw, (max-width: 991px) 229.328125px, 286.65625px"
                        srcSet={imgSet}
                        alt={title}
                        className="cards-image-2"
                      />
                    </div>
                    <CardContent className="px-7 pt-6 pb-7">
                      <h3 className="font-extrabold text-[22px] leading-tight text-[#023345] mb-2">
                        {title}
                      </h3>
                      <p className="text-slate-600 text-[15px] leading-relaxed mb-4">
                        {desc}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {tags.map((t) => (
                          <span
                            key={t}
                            className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                            style={{ background: bg, color: accent }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                        <div className="brief-button !p-0 !bg-transparent">
                          Full brief coming soon
                          <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </div>
                        <Lock className="w-4 h-4 text-slate-400" />
                      </div>
                    </CardContent>
                  </Card>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section
        id="judges-section"
        className="the-judges scroll-mt-28 border-t border-slate-200/60 bg-gradient-to-b from-slate-50 via-white to-white py-16 md:py-24"
      >
        <div className="centered-container-2 w-container">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-2xl text-center"
          >
            <Badge className="mb-4 border border-[#2a8e9e3d] bg-[#2a8e9e14] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#2a8e9e] hover:bg-[#2a8e9e1f]">
              The Panel
            </Badge>
            <h2 className="heading-10 text-[#023345]">The Judges</h2>
            <p className="paragraph-2 mt-3 text-slate-600 md:text-lg">
              Final demos are scored across innovation, execution, and recruiter-ready polish — up to{" "}
              <span className="font-semibold text-[#023345]">150 judge points</span> on top of your pre-event
              milestones.
            </p>
          </motion.div>

          <div className="judges-roadmap mx-auto mt-16 max-w-5xl">
            <div className="roadmap-line"></div>
            {[
              {
                n: "01",
                role: "Product Leader",
                Icon: Star,
                accent: "#2a8e9e",
                bg: "rgba(42, 142, 158, 0.12)",
                summary: "Scores product clarity, technical execution, and hiring impact.",
                bio: "Evaluates UX, product strategy, and viability in a consumer market.",
                tags: ["Product", "UX"],
                align: "left",
              },
              {
                n: "02",
                role: "Engineering VP",
                Icon: Cpu,
                accent: "#0891b2",
                bg: "rgba(8, 145, 178, 0.12)",
                summary: "Reviews architecture, demo quality, and how well the team used 100 hours.",
                bio: "Reviews code structure, complexity, and architectural choices under time pressure.",
                tags: ["Engineering", "Architecture"],
                align: "right",
              },
              {
                n: "03",
                role: "Head of Talent",
                Icon: MessageSquare,
                accent: "#6366f1",
                bg: "rgba(99, 102, 241, 0.12)",
                summary: "Looks for work that makes a candidate easier to evaluate and contact.",
                bio: "Focuses on how clearly your project communicates skills to hiring managers.",
                tags: ["Hiring", "Recruiting"],
                align: "left",
              },
            ].map(({ n, role, Icon, accent, bg, summary, bio, tags, align }, i) => (
              <motion.div
                key={n}
                initial={{ opacity: 0, x: align === "left" ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`roadmap-step roadmap-${align}`}
              >
                <article className="group relative flex h-full min-h-[420px] flex-col overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-6 shadow-[0_14px_44px_rgba(2,51,69,0.07)] transition-all duration-300 hover:-translate-y-1 hover:border-[#2a8e9e]/40 hover:shadow-[0_22px_56px_rgba(2,51,69,0.11)] md:p-7">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-40 blur-2xl transition-opacity group-hover:opacity-55"
                    style={{ background: bg }}
                  />
                  <div className="relative flex items-start justify-between gap-3">
                    <div
                      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-white shadow-md ring-4 ring-white/80"
                      style={{ background: `linear-gradient(145deg, ${accent}, ${accent}dd)` }}
                    >
                      <Icon className="h-7 w-7" strokeWidth={2} />
                    </div>
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                      Judge {n}
                    </span>
                  </div>

                  <p className="relative mt-6 text-[13px] font-semibold uppercase tracking-wide text-slate-400">
                    Name reveal soon
                  </p>
                  <h3 className="relative mt-1 text-xl font-extrabold leading-snug text-[#023345] md:text-[22px]">
                    Industry judge · confidential until lineup drop
                  </h3>
                  <p className="relative mt-2 text-sm font-bold" style={{ color: accent }}>
                    {role}
                  </p>
                  <p className="relative mt-4 text-[15px] leading-relaxed text-slate-600">{summary}</p>

                  <div className="relative mt-4 rounded-2xl bg-slate-50/95 px-4 py-3 text-sm leading-snug text-slate-600 ring-1 ring-slate-100">
                    {bio}
                  </div>

                  <div className="relative mt-4 flex flex-wrap gap-2">
                    {tags.map((t) => (
                      <span
                        key={t}
                        className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1.5 rounded-full"
                        style={{ background: bg, color: accent }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                </article>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <header id="schedule-section" className="schedule scroll-mt-28 border-t border-slate-200/70 bg-white pt-14 md:pt-20">
        <div className="centered-container-2 w-container">
          <h2
            data-w-id="5e2f808b-0c2c-2e2e-9917-a7a621163c6b"
            style={{ opacity: 1 }}
            className="heading-12"
          >
            What&#x27;s Going Down
          </h2>
          <p
            data-w-id="f4302b91-14e5-1924-045c-06ac15933508"
            style={{ opacity: 1 }}
            className="paragraph-2"
          >
            We will be updating this schedule with workshops. Stay tuned for
            future announcements.<strong></strong>
            <br />
          </p>
          <div className="div-block-3">
            <div
              id="w-node-dbcd020b-8297-e543-eaa6-391bae3cb8dc-8e5a2867"
              data-w-id="dbcd020b-8297-e543-eaa6-391bae3cb8dc"
              style={{ opacity: 0 }}
              className="div-block-5"
            >
              <h3 className="heading---schedule"
               style={{ color: "rgb(42 142 158 / var(--tw-text-opacity, 1))" }}
               >Day 2</h3>
              <h4 className="heading-4">Sunday, February 14th (PST)</h4>
              <div className="div-block-4">
                <div className="text-block-2">Submit Designs</div>
                <div className="time">8:30 AM</div>
              </div>
              <div className="div-block-4">
                <div className="text-block-2">Judging Begins</div>
                <div className="time">9:00 AM</div>
              </div>
              <div className="div-block-4">
                <div className="text-block-2">
                  Q&amp;A and Networking with Adobe
                </div>
                <div className="time">11:00AM</div>
              </div>
              <div className="div-block-4">
                <div className="text-block-2">
                  Results + Awards + Closing Notes
                </div>
                <div className="time">12:00 PM</div>
              </div>
            </div>
            <div
              id="w-node-_92b3770f-d6a9-22eb-d348-3fbb3b74156c-8e5a2867"
              data-w-id="92b3770f-d6a9-22eb-d348-3fbb3b74156c"
              style={{ opacity: 0 }}
              className="div-block-5"
            >
              <h3
                className="heading---schedule"
                style={{ color: "rgb(42 142 158 / var(--tw-text-opacity, 1))" }}
              >
                Day 1
              </h3>
              <h4 className="heading-4">Saturday, February 13th (PST)</h4>
              <div className="div-block-4">
                <div className="text-block-2">Opening Ceremony</div>
                <div className="time">9:00 AM</div>
              </div>
              <div className="div-block-4">
                <div className="text-block-2">Breakout to Design!</div>
                <div className="time">9:30 AM</div>
              </div>
              <div className="div-block-4">
                <div className="text-block-2">Team Formation</div>
                <div className="time">9:30 AM</div>
              </div>
              <div className="div-block-4">
                <div className="text-block-2">
                  Ideating Good Design Solutions with{" "}
                  <a
                    href="https://www.linkedin.com/in/eric-j-lee-ba964b13b/"
                    className="workshop-instructor"
                  >
                    Eric
                  </a>
                </div>
                <div className="time">10:30 AM</div>
              </div>
              <div className="div-block-4">
                <div className="text-block-2">
                  Prototyping in Figma with{" "}
                  <a
                    href="https://www.linkedin.com/in/zoshuacolah/"
                    className="workshop-instructor"
                  >
                    Zosh
                  </a>
                </div>
                <div className="time">11:30 AM</div>
              </div>
              <div className="div-block-4">
                <div className="text-block-2">
                  Next Level Interactions with Adobe
                  <a
                    href="https://www.linkedin.com/in/zoshuacolah/"
                    className="workshop-instructor"
                  ></a>
                </div>
                <div className="time">1:00 PM</div>
              </div>
              <div className="div-block-4">
                <div className="text-block-2">
                  Personal Branding with{" "}
                  <a
                    href="https://www.linkedin.com/in/graceling/"
                    className="workshop-instructor"
                  >
                    Grace Ling
                  </a>
                </div>
                <div className="time">5:00 PM</div>
              </div>
              <div className="div-block-4">
                <div className="text-block-2">
                  Game Night
                  <a
                    href="https://www.linkedin.com/in/graceling/"
                    className="workshop-instructor"
                  ></a>
                </div>
                <div className="time">8:00 PM</div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <header id="register-section" className="register-now">
        <div className="flex-container w-container">
          <div
            data-w-id="8bc33048-db1c-80ac-0a05-360d5260dbdd"
            style={{ opacity: 0 }}
          >
            <h1>Register Now</h1>
            <p className="paragraph-4">
              Everything we do is free – spots are limited so we recommend you
              register soon!
              <br />
            </p>
            <a
              href="/register"
                className="yellow-button w-button"
              onClick={(event) => {
                event.preventDefault();
                onNavigate("/register");
              }}
            >
              REGISTER
            </a>
          </div>
          <div className="hero-image-mask-2">
            <img
              src="/p8.png"
              style={{ opacity: 0 }}
              data-w-id="8bc33048-db1c-80ac-0a05-360d5260dbf2"
              sizes="(max-width: 479px) 91vw, (max-width: 767px) 95vw, (max-width: 991px) 409.609375px, 586.765625px"
              srcSet="/p8.png 1360w"
              alt=""
              className="hero-image-2"
            />
          </div>
        </div>
      </header>
      <header id="faq-section" className="have-a-question">
        <div className="flex-container w-container">
          <motion.div
            className="hero-image-mask-2"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img
              src="/p9.png"
              data-w-id="1ec22671-716f-60f2-73d3-ad07fcfb5c2a"
              sizes="(max-width: 479px) 91vw, (max-width: 767px) 95vw, (max-width: 991px) 301.140625px, 449.578125px"
              srcSet="/p9.png 1466w"
              alt=""
              className="hero-image-2"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="div-block-7"
          >
            <Badge className="bg-[#2a8e9e14] text-[#2a8e9e] border border-[#2a8e9e3d] hover:bg-[#2a8e9e1f] px-4 py-1.5 text-xs font-bold tracking-[0.2em] uppercase mb-5 rounded-full inline-flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5" />
              FAQ
            </Badge>
            <h1>Have a Question?</h1>
            <p className="paragraph-4">
              We have put together the answers you have been looking for. If
              there is an answer you cannot find, please read FAQ
             
              <br />
            </p>
            <a href="#faq-section" className="yellow-button w-button">
              READ FAQ
            </a>
          </motion.div>
        </div>
      </header>
      <section id="gallery" className="sponsors">
        <div className="centered-container-2 w-container">
          <h2
            data-w-id="c43adb55-6556-074f-ce97-03d4460f2450"
            style={{ opacity: 0 }}
            className="heading-12"
          >
            Powered by
          </h2>
          <p
            data-w-id="c43adb55-6556-074f-ce97-03d4460f2452"
            style={{ opacity: 0 }}
            className="paragraph-2 how-does-it-work-paragraph"
          >
            Sponsor slots are opening now. These placeholders show the launch layout while partners are finalized.
          </p>
          <div
            data-w-id="c43adb55-6556-074f-ce97-03d4460f2454"
            style={{ opacity: 0 }}
            className="cards-grid-container"
          >
            <div className="sponsor-name-card"><h3>Vales</h3><p>Launch sponsor placeholder</p></div>
            <div className="sponsor-name-card"><h3>Sponsor 02</h3><p>Recruiting partner placeholder</p></div>
            <div className="sponsor-name-card"><h3>Sponsor 03</h3><p>Community partner placeholder</p></div>
            <div className="sponsor-name-card"><h3>Sponsor 04</h3><p>Tooling partner placeholder</p></div>
          </div>
          <p
            data-w-id="8da616b1-3508-2a59-8945-74eb4553c1a6"
            style={{ opacity: 0 }}
            className="paragraph-2 how-does-it-work-paragraph"
          >
            
          </p>
        </div>
      </section>
      <footer
        id="footer"
        data-w-id="c6eb07c7-c60d-b9f5-e76a-4e4fc9403843"
        style={{ opacity: 0 }}
        className="footer"
      >
        <div className="w-container">
          <div className="footer-flex-container">
            <a
              href="/"
              aria-current="page"
              className="footer-logo-link w-inline-block w--current"
            >
              <img
                height=""
                style={{ opacity: 0 }}
                data-w-id="c6eb07c7-c60d-b9f5-e76a-4e4fc9403847"
               sizes="(max-width: 479px) 87vw, (max-width: 767px) 243.6875px, 284.296875px"
                alt=""
                className="footer-image-2"
              />
            </a>
            <div
              data-w-id="c6eb07c7-c60d-b9f5-e76a-4e4fc9403848"
              style={{ opacity: 0 }}
            >
              <h2 className="footer-heading">Stay connected</h2>
              <ul role="list" className="w-list-unstyled">
                <li>
                  <a
                    href="https://www.facebook.com/FirstStepHack                                                                                                                         /"
                    className="footer-link"
                  >
                    Facebook
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/FirstStepHack                                                                                                                         uw/"
                    target="_blank"
                    className="footer-link"
                  >
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
            <div
              data-w-id="c9eba20d-29c7-c544-ef55-105183e902c2"
              style={{ opacity: 0 }}
            >
              <h2 className="footer-heading">Links</h2>
              <ul role="list" className="w-list-unstyled">
                <li>
                  <a
                    href="https://docs.google.com/forms/d/1J-m4nAXngTPy8BKMFAdNsNvB2JlHscp1rktFNQBQLXE"
                    target="_blank"
                    className="footer-link"
                  >
                    Register Now
                  </a>
                </li>
                <li>
                  <a
                    href="https://forms.gle/yYLvGoNvXbAAJgZw7"
                    target="_blank"
                    className="footer-link"
                  >
                    Become a Mentor
                  </a>
                </li>
              </ul>
              <a
                href="https://forms.gle/5tGoyntSoShFzWyA8"
                target="_blank"
                className="footer-link"
              >
                Sponsor Us
              </a>
            </div>
            <div
              data-w-id="ce1bc6a9-fd69-bb25-55cc-6d43b61fb118"
              style={{ opacity: 0 }}
            >
              <h2 className="footer-heading">Team</h2>
              <ul role="list" className="w-list-unstyled">
                <li className="list-item">
                  <a
                    href="https://www.linkedin.com/in/lauren-ng-272197145/"
                    target="_blank"
                    className="link-block w-inline-block"
                  >
                    <img
                      src="https://uploads-ssl.webflow.com/5e90237d28e5d0112e5a2866/5e91e137241fd827ee722123_lauren.jpeg"
                      sizes="32px"
                      srcSet="https://uploads-ssl.webflow.com/5e90237d28e5d0112e5a2866/5e91e137241fd827ee722123_lauren-p-500.jpeg 500w, https://uploads-ssl.webflow.com/5e90237d28e5d0112e5a2866/5e91e137241fd827ee722123_lauren.jpeg 800w"
                      alt=""
                      className="image-2"
                    />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/michelle-w-18a94b173/"
                    target="_blank"
                    className="link-block w-inline-block"
                  >
                    <img
                      src="https://uploads-ssl.webflow.com/5e90237d28e5d0112e5a2866/5e91e20e37cf8d47983d44f8_michelle.jpg"
                      sizes="32px"
                      srcSet="https://uploads-ssl.webflow.com/5e90237d28e5d0112e5a2866/5e91e20e37cf8d47983d44f8_michelle-p-500.jpeg 500w, https://uploads-ssl.webflow.com/5e90237d28e5d0112e5a2866/5e91e20e37cf8d47983d44f8_michelle-p-800.jpeg 800w, https://uploads-ssl.webflow.com/5e90237d28e5d0112e5a2866/5e91e20e37cf8d47983d44f8_michelle-p-1080.jpeg 1080w, https://uploads-ssl.webflow.com/5e90237d28e5d0112e5a2866/5e91e20e37cf8d47983d44f8_michelle-p-1600.jpeg 1600w, https://uploads-ssl.webflow.com/5e90237d28e5d0112e5a2866/5e91e20e37cf8d47983d44f8_michelle-p-2000.jpeg 2000w, https://uploads-ssl.webflow.com/5e90237d28e5d0112e5a2866/5e91e20e37cf8d47983d44f8_michelle-p-2600.jpeg 2600w, https://uploads-ssl.webflow.com/5e90237d28e5d0112e5a2866/5e91e20e37cf8d47983d44f8_michelle-p-3200.jpeg 3200w, https://uploads-ssl.webflow.com/5e90237d28e5d0112e5a2866/5e91e20e37cf8d47983d44f8_michelle.jpg 3795w"
                      alt=""
                      className="image-2"
                    />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/ranjithr99/"
                    target="_blank"
                    className="link-block w-inline-block"
                  >
                    <img
                      src="https://uploads-ssl.webflow.com/5e90237d28e5d0112e5a2866/5e9607377d05ac790f92f261_ranjith%20(2).jpg"
                      sizes="32px"
                      srcSet="https://uploads-ssl.webflow.com/5e90237d28e5d0112e5a2866/5e9607377d05ac790f92f261_ranjith%20(2)-p-500.jpeg 500w, https://uploads-ssl.webflow.com/5e90237d28e5d0112e5a2866/5e9607377d05ac790f92f261_ranjith%20(2).jpg 1472w"
                      alt=""
                      className="image-2"
                    />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/vishank-rughwani/"
                    target="_blank"
                    className="link-block w-inline-block"
                  >
                    <img
                      src="https://uploads-ssl.webflow.com/5e90237d28e5d0112e5a2866/5e936e4b73fd9d57fd86259f_vishank.jpg"
                      sizes="32px"
                      srcSet="https://uploads-ssl.webflow.com/5e90237d28e5d0112e5a2866/5e936e4b73fd9d57fd86259f_vishank-p-500.jpeg 500w, https://uploads-ssl.webflow.com/5e90237d28e5d0112e5a2866/5e936e4b73fd9d57fd86259f_vishank-p-800.jpeg 800w, https://uploads-ssl.webflow.com/5e90237d28e5d0112e5a2866/5e936e4b73fd9d57fd86259f_vishank.jpg 922w"
                      alt=""
                      className="image-2"
                    />
                  </a>
                </li>
                <li className="list-item">
                  <a
                    href="https://www.linkedin.com/in/anastasia-bequette-b9a425185/"
                    target="_blank"
                    className="link-block w-inline-block"
                  >
                    <img
                      src="https://uploads-ssl.webflow.com/5e90237d28e5d0112e5a2866/5e91e1374660cb21f8db0b1b_anastasia.jpeg"
                      alt=""
                      className="image-2"
                    />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/judy-nguyen-9b600914b/detail/photo/"
                    target="_blank"
                    className="link-block w-inline-block"
                  >
                    <img
                      src="https://uploads-ssl.webflow.com/5e90237d28e5d0112e5a2866/6001e281652c1dab677a3980_Judy.jpeg"
                      sizes="32px"
                      srcSet="https://uploads-ssl.webflow.com/5e90237d28e5d0112e5a2866/6001e281652c1dab677a3980_Judy-p-500.jpeg 500w, https://uploads-ssl.webflow.com/5e90237d28e5d0112e5a2866/6001e281652c1dab677a3980_Judy.jpeg 720w"
                      alt=""
                      className="image-2"
                    />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/zoshuacolah/"
                    target="_blank"
                    className="link-block w-inline-block"
                  >
                    <img
                      src="https://uploads-ssl.webflow.com/5e90237d28e5d0112e5a2866/5e91e18537cf8d426b3d3bdf_zosh.jpeg"
                      alt=""
                      className="image-2"
                    />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/ivan-brown-b190641a4/"
                    className="link-block-4 w-inline-block"
                  >
                    <img
                      src="https://uploads-ssl.webflow.com/5e90237d28e5d0112e5a2866/6003f3b95fc12853da31c71d_ivan.jpg"
                      alt=""
                      className="image-2"
                    />
                  </a>
                </li>
                <li className="list-item">
                  <a
                    href="https://www.linkedin.com/in/shreya-ramakrishnan-8808461a9/"
                    target="_blank"
                    className="link-block w-inline-block"
                  >
                    <img
                      src="https://uploads-ssl.webflow.com/5e90237d28e5d0112e5a2866/6003f3b949096a28c73ccdf3_shreya.jpg"
                      alt=""
                      className="image-2"
                    />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/ashmann/"
                    target="_blank"
                    className="link-block w-inline-block"
                  >
                    <img
                      src="https://uploads-ssl.webflow.com/5e90237d28e5d0112e5a2866/5e91e1365f86782bf25a0632_ashmann_syngle.jpeg"
                      alt=""
                      className="image-2"
                    />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/saketh-n/"
                    target="_blank"
                    className="link-block w-inline-block"
                  >
                    <img
                      src="https://uploads-ssl.webflow.com/5e90237d28e5d0112e5a2866/6001e2f377705c2e0cbe63a5_72474501_1177485192437445_3547657439060951040_o.jpg"
                      sizes="32px"
                      srcSet="https://uploads-ssl.webflow.com/5e90237d28e5d0112e5a2866/6001e2f377705c2e0cbe63a5_72474501_1177485192437445_3547657439060951040_o-p-500.jpeg 500w, https://uploads-ssl.webflow.com/5e90237d28e5d0112e5a2866/6001e2f377705c2e0cbe63a5_72474501_1177485192437445_3547657439060951040_o-p-800.jpeg 800w, https://uploads-ssl.webflow.com/5e90237d28e5d0112e5a2866/6001e2f377705c2e0cbe63a5_72474501_1177485192437445_3547657439060951040_o-p-1080.jpeg 1080w, https://uploads-ssl.webflow.com/5e90237d28e5d0112e5a2866/6001e2f377705c2e0cbe63a5_72474501_1177485192437445_3547657439060951040_o.jpg 1186w"
                      alt=""
                      className="image-2"
                    />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/shanemartin7631/"
                    className="link-block w-inline-block"
                  >
                    <img
                      src="https://uploads-ssl.webflow.com/5e90237d28e5d0112e5a2866/6005df4c7dc6575970a782ed_shane%20martin.jpeg"
                      sizes="32px"
                      srcSet="https://uploads-ssl.webflow.com/5e90237d28e5d0112e5a2866/6005df4c7dc6575970a782ed_shane%20martin-p-500.jpeg 500w, https://uploads-ssl.webflow.com/5e90237d28e5d0112e5a2866/6005df4c7dc6575970a782ed_shane%20martin.jpeg 800w"
                      alt=""
                      className="image-2"
                    />
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div>Copyright © 2021 FirstStepHack                                                                                                                         . All rights reserved.</div>
        </div>
      </footer>
    </>
  );
}




