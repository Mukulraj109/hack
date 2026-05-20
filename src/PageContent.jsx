import { TiltCard } from "./components/TiltCard";
import { CountdownTimer } from "./components/CountdownTimer";
import { HeroBackgroundVideo, HERO_VIDEO_POSTER } from "./components/HeroBackgroundVideo";
import { MarqueeBanner } from "./components/MarqueeBanner";
import { HowItWorksSticky } from "./components/HowItWorksSticky";
import { TracksStack } from "./components/TracksStack";
import { JudgesStack } from "./components/JudgesStack";
import { FloatingLabels } from "./components/FloatingLabels";
import { HeroCenterCards } from "./components/HeroCenterCards";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Users, Timer, Wrench, ArrowRight, Bell, Share2, Briefcase, Bot, Network, Sparkles, Lock, ChevronRight, Star, MessageSquare, Cpu, HelpCircle, Mail, Building2, UserCircle2 } from "lucide-react";

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
          <ul role="list" className="nav-grid w-list-unstyled">
            <li id="w-node-_8bef9f4b-d3ae-2689-7a83-804b6f6d6dfa-8e5a2867">
              <a
                href="/"
                aria-current="page"
                className="nav-logo-link w-inline-block w--current"
              >
                <img
                  src="/firststep-logo.png"
                  alt="FirstStep"
                  className="nav-logo"
                  width={278}
                  height={156}
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
      <header id="hero" className="welcome hero-fullbleed">
        <HeroBackgroundVideo variant="hero" />
        <div className="hero-foreground">
          <motion.div
            className="hero-stage"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
          <FloatingLabels />

          {/* Center Cards Container */}
          <div className="hero-center-area">
            {/* Timer at top */}
            <div className="hero-timer-inline">
              <CountdownTimer targetDate={HACKATHON_START} variant="glass" />
            </div>

            {/* Expanded Hackathon Card - wider and shorter */}
            <div className="hero-hackathon-expanded">
              <motion.div
                className="glass-card-expanded"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.15, ease: "easeOut" }}
              >
                <motion.div className="hackathon-expanded-rail" aria-hidden="true" />
                <motion.div className="hackathon-expanded-content">
                  <h2 className="hackathon-expanded-title">FirstStep&apos;s Annual US Tech Hackathon</h2>
                  <p className="hackathon-expanded-subtitle">
                    Help job seekers get on recruiters&apos; radar — ship a real project in 100 remote hours.
                  </p>
                  <div className="hackathon-expanded-bullets">
                    <span className="exp-pill">100-hour remote sprint</span>
                    <span className="exp-pill">Recruiter visibility</span>
                    <span className="exp-pill">$5,000+ prize pool</span>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* CTA buttons pinned to the bottom of the hero (per sketch placement) */}
          <div className="hero-bottom-cta">
            <button type="button" className="hero-cta-follow">
              <Share2 className="hero-cta-follow__icon" />
              <span>Follow</span>
            </button>
            <a
              href="/register"
              className="hero-cta-claim"
              onClick={(event) => {
                event.preventDefault();
                onNavigate("/register");
              }}
            >
              <span>Claim Your Spot for Free</span>
              <ArrowRight className="hero-cta-claim__icon" />
            </a>
          </div>

          </motion.div>
        </div>
      </header>
      <MarqueeBanner />
<style>{`
        .welcome.hero-fullbleed {
          position: relative;
          isolation: isolate;
          overflow: hidden;
          min-height: min(100vh, 1120px);
          padding: clamp(48px, 7vh, 88px) 0 clamp(48px, 6vh, 72px);
        }

        .welcome .hero-foreground {
          position: absolute;
          inset: 0;
          z-index: 1;
          width: 100%;
          height: 100%;
          padding: clamp(6px, 1vh, 16px) clamp(16px, 2.5vw, 56px) clamp(20px, 3.5vh, 48px);
          box-sizing: border-box;
          pointer-events: none;
        }

        .hero-stage {
          position: relative;
          width: 100%;
          height: 100%;
          min-height: 100%;
          pointer-events: none;
        }

        /* Center area for timer and hackathon card */
        .hero-center-area {
          position: absolute;
          left: 50%;
          top: clamp(2px, 0.6vh, 10px);
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 94%;
          max-width: 1080px;
          pointer-events: auto;
        }

        /* Timer card: narrower — only the text inside got bigger, width is independent */
        .hero-timer-inline {
          width: 100%;
          max-width: 720px;
          margin: 0 auto;
        }

        /* FirstStep hackathon card: wider — independent from the timer's width */
        .hero-hackathon-expanded {
          width: 100%;
          max-width: 1080px;
          margin: clamp(8px, 1.2vh, 16px) auto 0;
        }

        /* Hero CTA buttons — pinned to the bottom, spread apart left/right */
        .hero-bottom-cta {
          position: absolute;
          left: 50%;
          bottom: clamp(28px, 5vh, 72px);
          transform: translateX(-50%);
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: center;
          gap: clamp(48px, 10vw, 160px);
          width: min(820px, 90%);
          z-index: 20;
          pointer-events: auto;
        }

        .hero-cta-claim,
        .hero-cta-follow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-weight: 700;
          letter-spacing: 0.01em;
          font-size: clamp(14px, 1.25vw, 16px);
          padding: clamp(11px, 1.4vh, 14px) clamp(20px, 2.4vw, 28px);
          border-radius: 999px;
          cursor: pointer;
          text-decoration: none;
          white-space: nowrap;
          transition: transform 240ms cubic-bezier(0.22, 1, 0.36, 1),
            box-shadow 240ms cubic-bezier(0.22, 1, 0.36, 1),
            background 240ms ease, border-color 240ms ease, color 240ms ease;
          line-height: 1;
        }

        .hero-cta-claim {
          color: #ffffff;
          background: linear-gradient(135deg, #2a8e9e 0%, #1eb3c4 100%);
          border: 1px solid rgba(255, 255, 255, 0.18);
          box-shadow:
            0 12px 28px rgba(30, 179, 196, 0.35),
            0 2px 6px rgba(0, 0, 0, 0.18),
            inset 0 1px 0 rgba(255, 255, 255, 0.25);
        }

        .hero-cta-claim:hover {
          transform: translateY(-1px);
          box-shadow:
            0 16px 36px rgba(30, 179, 196, 0.45),
            0 3px 8px rgba(0, 0, 0, 0.22),
            inset 0 1px 0 rgba(255, 255, 255, 0.3);
        }

        .hero-cta-claim__icon {
          width: 18px;
          height: 18px;
          transition: transform 240ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .hero-cta-claim:hover .hero-cta-claim__icon {
          transform: translateX(3px);
        }

        .hero-cta-follow {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.10);
          border: 1px solid rgba(255, 255, 255, 0.32);
          backdrop-filter: blur(14px) saturate(140%);
          -webkit-backdrop-filter: blur(14px) saturate(140%);
          box-shadow:
            0 10px 24px rgba(0, 0, 0, 0.20),
            inset 0 1px 0 rgba(255, 255, 255, 0.12);
        }

        .hero-cta-follow:hover {
          background: rgba(255, 255, 255, 0.18);
          border-color: rgba(255, 255, 255, 0.5);
          transform: translateY(-1px);
        }

        .hero-cta-follow__icon {
          width: 16px;
          height: 16px;
        }

        @media (max-width: 480px) {
          .hero-bottom-cta {
            width: 92%;
            flex-direction: column;
            gap: 10px;
          }

          .hero-cta-claim,
          .hero-cta-follow {
            width: 100%;
            justify-content: center;
          }
        }

        .glass-card-expanded {
          position: relative;
          width: 100%;
          overflow: hidden;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.14) 0%,
            rgba(255, 255, 255, 0.06) 100%
          );
          backdrop-filter: blur(16px) saturate(140%);
          -webkit-backdrop-filter: blur(16px) saturate(140%);
          border: 1px solid rgba(255, 255, 255, 0.24);
          box-shadow:
            0 16px 44px rgba(0, 0, 0, 0.22),
            0 2px 6px rgba(0, 0, 0, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.12);
          border-radius: 24px;
        }

        .hackathon-expanded-rail {
          height: 3px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            #7dd3e8 18%,
            #2a8e9e 50%,
            #7dd3e8 82%,
            transparent 100%
          );
          opacity: 0.95;
        }

        .hackathon-expanded-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: clamp(12px, 1.6vh, 18px);
          text-align: center;
          padding: clamp(20px, 2.4vh, 28px) clamp(32px, 4.5vw, 72px) clamp(22px, 2.6vh, 30px);
        }

        .hackathon-expanded-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          color: rgba(255, 255, 255, 0.9);
          font-size: clamp(12px, 1.1vw, 14px);
          font-weight: 800;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }

        .hackathon-expanded-eyebrow-dot {
          position: relative;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #7dd3e8;
          box-shadow: 0 0 12px rgba(125, 211, 232, 0.8);
          flex-shrink: 0;
        }

        .hackathon-expanded-eyebrow-dot::after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: #7dd3e8;
          animation: hero-eyebrow-ping 1.8s cubic-bezier(0, 0, 0.2, 1) infinite;
        }

        @keyframes hero-eyebrow-ping {
          0% {
            transform: scale(1);
            opacity: 0.75;
          }
          70%,
          100% {
            transform: scale(2.2);
            opacity: 0;
          }
        }

        .hackathon-expanded-title {
          color: #ffffff;
          font-size: clamp(30px, 3.35vw, 48px);
          font-weight: 800;
          letter-spacing: -0.022em;
          margin: 0;
          line-height: 1.1;
          white-space: nowrap;
          text-shadow: 0 2px 18px rgba(0, 0, 0, 0.4);
        }

        .hackathon-expanded-subtitle {
          color: rgba(255, 255, 255, 0.92);
          font-size: clamp(16px, 1.65vw, 21px);
          font-weight: 500;
          margin: 0;
          line-height: 1.45;
          max-width: 760px;
        }

        .hackathon-expanded-bullets {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 12px;
          margin-top: 4px;
        }

        .exp-pill {
          display: inline-flex;
          align-items: center;
          padding: 10px 20px;
          border-radius: 999px;
          font-size: clamp(14px, 1.35vw, 17px);
          font-weight: 600;
          letter-spacing: 0.02em;
          color: rgba(255, 255, 255, 0.95);
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.22);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }

        @media (max-width: 768px) {
          .hero-center-area {
            width: 94%;
            top: 6px;
          }

          .hero-timer-inline,
          .hero-hackathon-expanded {
            max-width: 100%;
          }

          .hero-hackathon-expanded {
            margin-top: clamp(8px, 1.5vh, 14px);
          }

          .hero-bottom-cta {
            bottom: clamp(18px, 4vh, 40px);
            z-index: 20;
          }

          .hackathon-expanded-content {
            padding: 18px 20px 20px;
            gap: 12px;
          }

          .hackathon-expanded-bullets {
            gap: 10px;
          }

          .hackathon-expanded-title {
            white-space: normal;
            font-size: clamp(24px, 6vw, 34px);
            line-height: 1.15;
          }

          .hackathon-expanded-subtitle {
            font-size: clamp(15px, 4vw, 18px);
          }

          .exp-pill {
            padding: 8px 16px;
            font-size: clamp(13px, 3.2vw, 15px);
          }
        }

        @media (min-width: 900px) and (max-width: 1180px) {
          .hackathon-expanded-title {
            font-size: clamp(28px, 3vw, 42px);
          }
        }

        .hero-accent-panel.hero-float-left {
          position: absolute;
          top: 0;
          left: 0;
          width: min(440px, 38vw);
          max-width: calc(100% - 24px);
          z-index: 2;
          pointer-events: auto;
          transform: rotate(-1.4deg);
          animation: hero-float-left 7.5s ease-in-out infinite;
        }

        .hero-content-panel.hero-float-right {
          position: absolute;
          top: 0;
          right: 0;
          width: min(920px, 72vw);
          max-width: calc(100% - 24px);
          z-index: 2;
          pointer-events: auto;
          transform: rotate(0.5deg);
          animation: hero-float-right 8.2s ease-in-out infinite;
        }

        .hero-float-left:hover {
          animation-play-state: paused;
          transform: rotate(-0.35deg) scale(1.012);
          transition: transform 520ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .hero-float-right:hover {
          animation-play-state: paused;
          transform: rotate(0deg) scale(1.005);
          transition: transform 520ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        @keyframes hero-float-left {
          0%, 100% { transform: translate(0, 0) rotate(-1.4deg); }
          50%      { transform: translate(6px, -10px) rotate(-0.9deg); }
        }

        @keyframes hero-float-right {
          0%, 100% { transform: translate(0, 0) rotate(0.5deg); }
          50%      { transform: translate(-6px, 8px) rotate(0.15deg); }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-float-left,
          .hero-float-right {
            animation: none;
          }
        }

        @media (min-width: 992px) and (max-width: 1280px) {
          .hero-accent-panel.hero-float-left {
            width: min(340px, 32vw);
          }

          .hero-content-panel.hero-float-right {
            width: min(780px, 68vw);
          }
        }

        @media (min-width: 1400px) {
          .hero-content-panel.hero-float-right {
            width: min(980px, 58vw);
          }
        }

        .hero-content-panel--glass {
          background:
            linear-gradient(
              160deg,
              rgba(2, 51, 69, 0.42) 0%,
              rgba(2, 51, 69, 0.32) 100%
            ) !important;
          border: 1px solid rgba(255, 255, 255, 0.32) !important;
          backdrop-filter: blur(26px) saturate(1.4);
          -webkit-backdrop-filter: blur(26px) saturate(1.4);
          box-shadow:
            0 28px 70px rgba(0, 0, 0, 0.28),
            inset 0 1px 0 rgba(255, 255, 255, 0.22) !important;
        }

        .hero-content-panel--glass .hero-content-panel__halo {
          opacity: 0.45;
        }

        .hero-content-compact {
          padding: clamp(22px, 2.6vw, 32px) clamp(24px, 2.8vw, 36px) !important;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .hero-content-top {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .hero-content-panel--glass .hero-status-pill {
          margin-bottom: 0;
          padding: 11px 20px;
          font-size: 13px;
          background: rgba(255, 255, 255, 0.14);
          border-color: rgba(255, 255, 255, 0.28);
          color: #ffffff;
        }

        .hero-content-panel--glass .hero-headline {
          margin-bottom: 0;
        }

        .hero-content-panel--glass .hero-headline__line {
          font-size: clamp(32px, 3.8vw, 54px);
          color: #ffffff;
          text-shadow:
            0 2px 24px rgba(2, 51, 69, 0.95),
            0 1px 4px rgba(2, 51, 69, 0.7);
        }

        .hero-content-panel--glass .hero-headline__accent {
          position: relative;
        }

        .hero-content-panel--glass .hero-headline__accent .hero-headline__inner {
          background-image: linear-gradient(
            90deg,
            #a5f3fc 0%,
            #67e8f9 35%,
            #22d3ee 70%,
            #06b6d4 100%
          );
          filter: drop-shadow(0 2px 16px rgba(2, 51, 69, 0.85))
            drop-shadow(0 1px 2px rgba(0, 0, 0, 0.4));
          font-weight: 900;
        }

        .hero-content-panel--glass .hero-lede {
          margin: 0;
          max-width: none;
          font-size: clamp(16px, 1.35vw, 19px);
          line-height: 1.5;
          color: rgba(255, 255, 255, 0.92);
          text-shadow: 0 1px 12px rgba(2, 51, 69, 0.6);
        }

        .hero-content-panel--glass .hero-proof-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 12px;
          margin-top: 0;
          max-width: none;
        }

        .hero-content-panel--glass .hero-proof-grid > div {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 16px;
          border-radius: 16px;
          background: rgba(255, 255, 255, 0.12);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: none;
        }

        .hero-content-panel--glass .hero-proof-grid .proof-icon {
          width: 40px;
          height: 40px;
          min-width: 40px;
          margin-bottom: 0;
          border-radius: 12px;
        }

        .hero-content-panel--glass .hero-proof-grid strong {
          font-size: clamp(17px, 1.5vw, 22px);
          color: #ffffff;
          margin-bottom: 3px;
        }

        .hero-content-panel--glass .hero-proof-grid span {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.78);
          line-height: 1.25;
        }

        .hero-content-bottom {
          display: flex;
          flex-direction: column;
          gap: 16px;
          width: 100%;
        }

        .hero-content-panel--glass .hero-content-bottom .countdown-glass {
          width: 100%;
        }

        .hero-content-panel--glass .hero-cta-row {
          padding-top: 0;
          gap: 12px;
        }

        .hero-content-panel--glass .hero-cta-primary {
          min-height: 58px;
          font-size: 16px;
        }

        .hero-content-panel--glass .hero-secondary-cta {
          min-height: 52px;
          font-size: 15px;
          background: rgba(255, 255, 255, 0.14);
          border-color: rgba(255, 255, 255, 0.35);
          color: #ffffff;
        }

        .hero-content-panel--glass .hero-link-cta {
          color: rgba(255, 255, 255, 0.92);
          font-size: 14px;
        }

        @media (min-width: 768px) {
          .hero-content-panel--glass .hero-cta-row {
            flex-direction: row;
            flex-wrap: wrap;
            align-items: center;
          }

          .hero-content-panel--glass .hero-cta-primary,
          .hero-content-panel--glass .hero-secondary-cta {
            width: auto;
          }

          .hero-content-panel--glass .hero-cta-links {
            flex: 1 1 100%;
          }
        }

        @media (max-width: 899px) {
          .hero-content-panel--glass .hero-proof-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        .sticky-nav .nav-logo-link {
          display: inline-flex;
          align-items: center;
          padding: 8px 0;
        }

        .sticky-nav .nav-grid > li:first-child {
          min-width: clamp(280px, 19vw, 400px);
        }

        .sticky-nav .nav-logo {
          width: clamp(280px, 19vw, 400px) !important;
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

        .hero-accent-panel {
          position: relative;
          min-height: clamp(300px, 38vh, 440px);
          border-radius: 36px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.28);
          box-shadow:
            0 38px 110px rgba(2, 51, 69, 0.55),
            0 2px 8px rgba(2, 51, 69, 0.35),
            inset 0 1px 0 rgba(255, 255, 255, 0.16);
          background: linear-gradient(160deg, rgba(2, 51, 69, 0.94) 0%, rgba(2, 51, 69, 0.74) 100%);
          will-change: transform;
        }

        .hero-accent-panel__halo {
          position: absolute;
          inset: -38% -18% -22% -28%;
          background:
            radial-gradient(closest-side, rgba(42, 142, 158, 0.55), transparent 70%),
            radial-gradient(closest-side, rgba(103, 232, 249, 0.28), transparent 75%);
          filter: blur(48px);
          pointer-events: none;
          z-index: -1;
          opacity: 0.85;
        }

        .hero-accent-panel__glow {
          position: absolute;
          inset: -20%;
          background:
            radial-gradient(circle at 26% 18%, rgba(42, 142, 158, 0.55), transparent 55%),
            radial-gradient(circle at 80% 90%, rgba(103, 232, 249, 0.18), transparent 60%);
          pointer-events: none;
          z-index: 0;
        }

        .hero-accent-poster {
          position: absolute;
          inset: 12% 8% 14%;
          width: auto;
          height: auto;
          max-width: 92%;
          max-height: 78%;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          object-fit: contain;
          object-position: center;
          opacity: 1;
          pointer-events: none;
          z-index: 1;
          filter: drop-shadow(0 18px 40px rgba(0, 0, 0, 0.35));
        }

        .hero-accent-badge {
          position: absolute;
          z-index: 2;
          border-radius: 999px;
          font-weight: 900;
          letter-spacing: 0.02em;
          line-height: 1.2;
        }

        .hero-accent-badge--top {
          top: 24px;
          left: 24px;
          right: 24px;
          width: fit-content;
          max-width: calc(100% - 48px);
          padding: 11px 16px;
          background: rgba(2, 51, 69, 0.82);
          color: #ffffff;
          font-size: clamp(13px, 1.4vw, 15px);
        }

        .hero-accent-badge--bottom {
          left: 24px;
          right: 24px;
          bottom: 24px;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 8px 10px;
          padding: 12px 18px;
          background: rgba(255, 255, 255, 0.94);
          color: #023345;
          font-size: clamp(14px, 1.5vw, 17px);
          box-shadow: 0 14px 35px rgba(0, 0, 0, 0.18);
        }

        .hero-accent-badge-sep {
          color: rgba(2, 51, 69, 0.35);
        }

        .hero-accent-badge-highlight {
          color: #2a8e9e;
        }

        .hero-content-panel {
          position: relative;
          width: 100%;
          border-radius: 28px;
          will-change: transform;
        }

        .hero-content-panel__halo {
          position: absolute;
          inset: -22% -18% -30% -10%;
          background:
            radial-gradient(closest-side, rgba(103, 232, 249, 0.35), transparent 70%),
            radial-gradient(closest-side, rgba(8, 145, 178, 0.22), transparent 75%);
          filter: blur(56px);
          pointer-events: none;
          z-index: -1;
          opacity: 0.75;
        }

        .hero-content-panel__inner {
          position: relative;
          z-index: 1;
          padding: clamp(28px, 3.4vw, 44px);
        }

        .hero-status-pill {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 22px;
          padding: 10px 18px;
          border-radius: 999px;
          border: 1px solid rgba(42, 142, 158, 0.24);
          background: rgba(42, 142, 158, 0.1);
          color: #023345;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }

        .hero-headline {
          margin: 0 0 18px;
          display: flex;
          flex-direction: column;
          gap: 0.1em;
          align-items: flex-start;
        }

        .hero-headline__line {
          font-size: clamp(34px, 5vw, 68px);
          font-weight: 800;
          line-height: 1.04;
          letter-spacing: -0.025em;
          color: #023345;
          display: inline-block;
          position: relative;
          cursor: default;
        }

        .hero-headline__inner {
          display: inline-block;
          transition: transform 520ms cubic-bezier(0.22, 1, 0.36, 1);
          will-change: transform;
        }

        .hero-headline__line:hover .hero-headline__inner {
          animation: hero-headline-shuffle 720ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        @keyframes hero-headline-shuffle {
          0%   { transform: translateX(0); }
          25%  { transform: translateX(-10px); }
          55%  { transform: translateX(8px); }
          80%  { transform: translateX(-4px); }
          100% { transform: translateX(0); }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-headline__line:hover .hero-headline__inner {
            animation: none;
          }
        }

        .hero-headline__accent .hero-headline__inner {
          background-image: linear-gradient(90deg, #2a8e9e 0%, #0891b2 55%, #67e8f9 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .hero-lede {
          margin: 0 0 26px;
          max-width: 36em;
          font-size: clamp(17px, 1.45vw, 21px);
          line-height: 1.55;
          font-weight: 500;
          color: #475569;
        }

        .hero-cta-row {
          display: flex;
          flex-direction: column;
          align-items: stretch;
          gap: 14px;
          padding-top: 32px;
        }

        .hero-cta-primary {
          min-height: 64px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 9999px;
          gap: 10px;
          width: 100%;
        }

        .hero-secondary-cta {
          min-height: 56px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          background-color: #ffffff;
          color: #023345;
          font-weight: 700;
          border: 1px solid #cbd5e1;
          border-radius: 9999px;
          gap: 8px;
          padding: 0 28px;
          width: 100%;
        }

        .hero-cta-links {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 12px 20px;
        }

        @media (min-width: 768px) {
          .hero-cta-row {
            flex-direction: row;
            flex-wrap: wrap;
            align-items: center;
          }

          .hero-cta-primary {
            width: auto;
            flex: 0 1 auto;
          }

          .hero-secondary-cta {
            width: auto;
            flex: 0 1 auto;
          }

          .hero-cta-links {
            flex: 1 1 100%;
          }
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
          padding: 18px 20px;
          border-radius: 20px;
          background: #ffffff;
          border: 1px solid rgba(2, 51, 69, 0.07);
          box-shadow: 0 8px 24px rgba(2, 51, 69, 0.06);
          transition: border-color 220ms ease, box-shadow 220ms ease, transform 220ms ease;
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

        @media (max-width: 991px) {
          .sticky-nav .nav-grid > li:first-child {
            min-width: clamp(210px, 38vw, 290px);
          }

          .sticky-nav .nav-logo {
            width: clamp(210px, 40vw, 290px) !important;
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

          .welcome.hero-fullbleed {
            min-height: auto;
            padding: 32px 0 48px;
          }

          .welcome .hero-foreground {
            position: relative;
            inset: auto;
            height: auto;
            padding: 0 clamp(16px, 4vw, 24px);
          }

          .hero-stage {
            display: flex;
            flex-direction: column;
            gap: 24px;
            min-height: 0;
          }

          .hero-accent-panel.hero-float-left,
          .hero-content-panel.hero-float-right {
            position: relative;
            top: auto;
            left: auto;
            right: auto;
            width: 100%;
            max-width: none;
            animation: none;
            transform: none;
          }

          .hero-float-left:hover,
          .hero-float-right:hover {
            transform: none;
          }

          .hero-accent-panel {
            min-height: 280px;
          }

          .hero-content-panel__inner {
            padding: 24px 20px;
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

        .career-accelerator-section {
          position: relative;
          overflow: hidden;
          padding: clamp(2.5rem, 5vw, 4.5rem) 0 0;
          background: linear-gradient(180deg, #012531 0%, #023345 70%, #023f57 100%);
        }

        .career-accelerator-section::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 70% 60% at 12% 18%, rgba(42, 142, 158, 0.28), transparent 55%),
            radial-gradient(ellipse 80% 60% at 100% 0%, rgba(8, 145, 178, 0.22), transparent 55%),
            radial-gradient(ellipse 60% 50% at 80% 90%, rgba(103, 232, 249, 0.10), transparent 60%);
          pointer-events: none;
        }

        .career-accelerator-section::after {
          content: "";
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255, 255, 255, 0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.025) 1px, transparent 1px);
          background-size: 64px 64px;
          mask-image: radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 80%);
          -webkit-mask-image: radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 80%);
          opacity: 0.4;
          pointer-events: none;
        }

        .career-wrap {
          position: relative;
          z-index: 1;
          max-width: none;
          width: 100%;
          margin: 0 auto;
          padding: 0 clamp(1rem, 2vw, 2.25rem);
          display: grid;
          grid-template-columns: 1.2fr 0.95fr;
          gap: clamp(1.5rem, 3vw, 3rem);
          align-items: center;
        }

        .career-left {
          max-width: none;
        }

        .career-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          margin: 0 0 1.1rem;
          padding: 0.5rem 1.05rem 0.5rem 0.85rem;
          font-size: 0.85rem;
          font-weight: 900;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #7dd3e8;
          background: rgba(42, 142, 158, 0.12);
          border: 1px solid rgba(42, 142, 158, 0.32);
          border-radius: 999px;
        }

        .career-eyebrow__dot {
          width: 0.5rem;
          height: 0.5rem;
          border-radius: 50%;
          background: #2a8e9e;
          box-shadow: 0 0 0 4px rgba(42, 142, 158, 0.22);
        }

        .career-title {
          margin: 0 0 1rem;
          color: #ffffff;
          font-size: clamp(2rem, 4vw, 3.5rem);
          line-height: 1.05;
          letter-spacing: -0.035em;
          font-weight: 800;
        }

        .career-title__accent {
          background-image: linear-gradient(95deg, #67e8f9 0%, #22d3ee 45%, #06b6d4 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          display: inline;
        }

        .career-copy {
          margin: 0 0 1.4rem;
          color: rgba(226, 236, 244, 0.94);
          font-size: clamp(1.1rem, 1.4vw, 1.3rem);
          line-height: 1.55;
          font-weight: 500;
          max-width: 48rem;
        }

        .career-copy strong {
          color: #ffffff;
          font-weight: 800;
        }

        .career-points {
          list-style: none;
          margin: 0 0 1.6rem;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 0.7rem;
        }

        .career-point {
          position: relative;
          display: flex;
          align-items: center;
          gap: 0.85rem;
          color: rgba(241, 245, 249, 0.96);
          font-size: clamp(1.05rem, 1.2vw, 1.2rem);
          font-weight: 600;
          line-height: 1.4;
          white-space: nowrap;
        }

        .career-point__icon {
          width: 2.1rem;
          height: 2.1rem;
          flex-shrink: 0;
          border-radius: 10px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, rgba(42, 142, 158, 0.28), rgba(8, 145, 178, 0.2));
          border: 1px solid rgba(103, 232, 249, 0.3);
          color: #7dd3e8;
        }

        .career-cta-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.8rem;
          align-items: center;
        }

        .career-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.95rem 1.55rem;
          border-radius: 9999px;
          font-size: clamp(0.98rem, 1.08vw, 1.1rem);
          font-weight: 800;
          letter-spacing: 0.01em;
          text-decoration: none;
          transition: transform 220ms ease, box-shadow 220ms ease, background 220ms ease;
        }

        .career-cta--primary {
          background: linear-gradient(95deg, #2a8e9e 0%, #0891b2 100%);
          color: #ffffff;
          box-shadow: 0 12px 28px rgba(8, 145, 178, 0.35);
        }

        .career-cta--primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 18px 36px rgba(8, 145, 178, 0.45);
        }

        .career-cta--ghost {
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.18);
          color: #e0f7fa;
        }

        .career-cta--ghost:hover {
          background: rgba(255, 255, 255, 0.12);
          transform: translateY(-2px);
        }

        .career-right {
          width: 100%;
        }

        /* New prize / outcome cards grid (replaces the recruiter shortlist card) */
        .career-prizes-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(0.7rem, 1vw, 1rem);
        }

        .career-prize-card {
          position: relative;
          isolation: isolate;
          background: linear-gradient(160deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%);
          border: 1px solid rgba(255, 255, 255, 0.16);
          border-radius: 1.25rem;
          padding: clamp(1.4rem, 2vw, 1.85rem) clamp(1.4rem, 2.1vw, 1.95rem);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          box-shadow:
            0 18px 40px rgba(2, 51, 69, 0.35),
            inset 0 1px 0 rgba(255, 255, 255, 0.10);
          transition: transform 240ms cubic-bezier(0.22, 1, 0.36, 1),
            border-color 240ms ease,
            box-shadow 240ms ease;
        }

        .career-prize-card::after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 1px;
          background: linear-gradient(140deg, rgba(125, 211, 232, 0.25), rgba(125, 211, 232, 0) 55%);
          -webkit-mask:
            linear-gradient(#000 0 0) content-box,
            linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
          opacity: 0.85;
        }

        .career-prize-card:hover {
          transform: translateY(-3px);
          border-color: rgba(103, 232, 249, 0.40);
          box-shadow:
            0 24px 50px rgba(8, 145, 178, 0.25),
            inset 0 1px 0 rgba(255, 255, 255, 0.14);
        }

        .career-prize-card--wide {
          grid-column: 1 / -1;
        }

        .career-prize-card__head {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 0.85rem;
        }

        .career-prize-card__icon {
          width: 2.85rem;
          height: 2.85rem;
          border-radius: 13px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.18);
        }

        .career-prize-card__icon svg {
          width: 1.4rem;
          height: 1.4rem;
        }

        .career-prize-card__value {
          display: block;
          font-size: clamp(1.95rem, 2.8vw, 2.5rem);
          font-weight: 900;
          letter-spacing: -0.03em;
          line-height: 1;
          background-image: linear-gradient(180deg, #ffffff 0%, #cbf2f8 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .career-prize-card__label {
          display: block;
          margin-top: 0.45rem;
          color: rgba(125, 211, 232, 0.95);
          font-size: 0.92rem;
          font-weight: 800;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }

        .career-prize-card__title {
          margin: 0;
          color: #ffffff;
          font-size: clamp(1.3rem, 1.6vw, 1.55rem);
          font-weight: 800;
          letter-spacing: -0.01em;
          line-height: 1.25;
        }

        .career-prize-card__desc {
          margin: 0;
          color: rgba(226, 236, 244, 0.94);
          font-size: clamp(1.1rem, 1.3vw, 1.25rem);
          line-height: 1.55;
          font-weight: 500;
        }

        @media (max-width: 520px) {
          .career-prizes-grid {
            grid-template-columns: 1fr;
          }
        }

        .career-package {
          position: relative;
          isolation: isolate;
          overflow: hidden;
          background:
            linear-gradient(160deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%);
          border: 1px solid rgba(255, 255, 255, 0.16);
          border-radius: 1.4rem;
          padding: clamp(1.1rem, 1.8vw, 1.6rem);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          box-shadow:
            0 24px 50px rgba(2, 51, 69, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.12);
        }

        .career-package__glow {
          position: absolute;
          inset: -40% -20% auto auto;
          width: 22rem;
          height: 22rem;
          background: radial-gradient(closest-side, rgba(103, 232, 249, 0.35), transparent 70%);
          filter: blur(20px);
          z-index: -1;
          pointer-events: none;
        }

        .career-package__head {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          margin-bottom: 1rem;
          padding-bottom: 0.85rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.14);
        }

        .career-package__num-wrap {
          position: relative;
          display: inline-flex;
          align-items: flex-start;
        }

        .career-package__num {
          font-size: clamp(2.6rem, 3.6vw, 3.4rem);
          font-weight: 900;
          line-height: 0.9;
          letter-spacing: -0.05em;
          background-image: linear-gradient(180deg, #ffffff 0%, #7dd3e8 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .career-package__badge {
          position: absolute;
          top: -0.2rem;
          right: -1.85rem;
          padding: 0.2rem 0.5rem;
          border-radius: 999px;
          background: linear-gradient(95deg, #2a8e9e, #0891b2);
          color: #ffffff;
          font-size: 0.6rem;
          font-weight: 900;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .career-package__label {
          font-size: clamp(0.88rem, 1vw, 0.98rem);
          font-weight: 700;
          color: rgba(226, 236, 244, 0.9);
          line-height: 1.3;
          flex: 1;
        }

        .career-package__list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: grid;
          gap: 0.55rem;
        }

        .career-package__item {
          display: grid;
          grid-template-columns: 2rem 1fr;
          gap: 0.75rem;
          align-items: center;
          padding: 0.55rem 0.75rem;
          border-radius: 0.7rem;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          transition: transform 220ms ease, background 220ms ease, border-color 220ms ease;
        }

        .career-package__item:hover {
          transform: translateX(4px);
          background: rgba(255, 255, 255, 0.07);
          border-color: rgba(103, 232, 249, 0.35);
        }

        .career-package__step {
          width: 2rem;
          height: 2rem;
          border-radius: 999px;
          background: linear-gradient(135deg, rgba(42, 142, 158, 0.5), rgba(8, 145, 178, 0.3));
          color: #ffffff;
          font-size: 0.8rem;
          font-weight: 900;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          border: 1px solid rgba(103, 232, 249, 0.35);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.18);
        }

        .career-package__item strong {
          display: block;
          color: #ffffff;
          font-size: 0.95rem;
          font-weight: 800;
          margin-bottom: 0.1rem;
        }

        .career-package__item span {
          color: rgba(203, 213, 225, 0.92);
          font-size: 0.82rem;
          font-weight: 600;
          line-height: 1.35;
        }

        .career-package__note {
          margin: 0.9rem 0 0;
          padding: 0.55rem 0.75rem;
          font-size: 0.76rem;
          font-weight: 600;
          color: rgba(186, 201, 214, 0.95);
          line-height: 1.4;
          background: rgba(255, 255, 255, 0.04);
          border-radius: 0.55rem;
          border: 1px dashed rgba(255, 255, 255, 0.14);
        }

        .career-stats {
          position: relative;
          z-index: 1;
          margin-top: clamp(1.75rem, 3.2vw, 2.75rem);
          padding: clamp(1.1rem, 1.8vw, 1.6rem) 0;
          border-top: 1px solid rgba(255, 255, 255, 0.12);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          background:
            linear-gradient(180deg, rgba(0, 0, 0, 0.18) 0%, rgba(0, 0, 0, 0.06) 100%);
        }

        .career-stats__grid {
          max-width: none;
          width: 100%;
          margin: 0 auto;
          padding: 0 clamp(1rem, 2vw, 2.25rem);
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: clamp(0.75rem, 1.3vw, 1.25rem);
        }

        .career-stats__item {
          position: relative;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          gap: 1.05rem;
          padding: 1.1rem 1.25rem;
          text-align: left;
          border-radius: 1rem;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.10);
          transition: border-color 220ms ease, background 220ms ease, transform 220ms ease;
        }

        .career-stats__item:hover {
          border-color: rgba(103, 232, 249, 0.36);
          background: rgba(255, 255, 255, 0.07);
        }

        .career-stats__icon {
          width: 2.85rem;
          height: 2.85rem;
          border-radius: 13px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 0;
          flex-shrink: 0;
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.16);
        }

        .career-stats__icon svg {
          width: 1.4rem;
          height: 1.4rem;
        }

        .career-stats__text {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .career-stats__value {
          display: block;
          color: #ffffff;
          font-size: clamp(1.55rem, 2.3vw, 2.15rem);
          font-weight: 900;
          line-height: 1;
          letter-spacing: -0.03em;
          background-image: linear-gradient(180deg, #ffffff 0%, #cbf2f8 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .career-stats__label {
          display: block;
          margin-top: 0.35rem;
          color: rgba(208, 222, 232, 0.95);
          font-size: clamp(0.88rem, 1vw, 0.98rem);
          font-weight: 700;
          line-height: 1.25;
          letter-spacing: 0.06em;
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

        @media (max-width: 1024px) {
          .career-wrap {
            grid-template-columns: 1fr;
            align-items: start;
          }
        }

        @media (max-width: 600px) {
          .career-point {
            white-space: normal;
          }
        }

        @media (max-width: 700px) {
          .career-stats__grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .career-package__badge {
            right: auto;
            left: 0;
            top: -1.6rem;
          }

          .career-package__head {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.6rem;
          }
        }

        @media (max-width: 520px) {
          .career-stats__grid {
            grid-template-columns: 1fr;
          }

          .career-stats__item {
            border-right: none;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          }

          .career-stats__item:last-child {
            border-bottom: none;
          }
        }

        .how-does-it-work {
          padding: clamp(3.5rem, 8vw, 6rem) 0;
          background: #f5f9fa;
        }

        .how-does-it-work__head {
          max-width: 40rem;
          margin: 0 auto clamp(2.75rem, 6vw, 4rem);
          padding: 0 clamp(1.25rem, 4vw, 3.25rem);
          text-align: center;
        }

        .how-does-it-work__label {
          margin: 0 0 0.75rem;
          font-size: 0.8125rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #2a8e9e;
        }

        .how-does-it-work__title.heading-3 {
          margin: 0 0 0.75rem;
          color: #023345;
        }

        .how-does-it-work__intro {
          margin: 0 auto;
          max-width: 32rem;
          font-size: 1.0625rem;
          line-height: 1.55;
          font-weight: 600;
          color: #475569;
        }

        .how-does-it-work__steps {
          max-width: 72rem;
          margin: 0 auto;
          padding: 0 clamp(1.25rem, 4vw, 3.25rem);
          display: flex;
          flex-direction: column;
          gap: clamp(3.5rem, 7vw, 5.5rem);
        }

        .how-step {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
          column-gap: clamp(2.75rem, 6vw, 5.5rem);
          row-gap: 2rem;
          align-items: center;
        }

        .how-step--reverse .how-step__media {
          order: 1;
        }

        .how-step--reverse .how-step__copy {
          order: 2;
        }

        .how-step__copy {
          max-width: 28rem;
        }

        .how-step--reverse .how-step__copy {
          justify-self: end;
          text-align: left;
        }

        .how-step:not(.how-step--reverse) .how-step__copy {
          justify-self: start;
        }

        .how-step__num {
          margin: 0 0 0.5rem;
          font-size: 0.8125rem;
          font-weight: 800;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #2a8e9e;
        }

        .how-step__title.heading-2 {
          margin: 0 0 1rem;
          font-size: clamp(1.35rem, 2.2vw, 1.75rem);
          line-height: 1.2;
          color: #023345;
        }

        .how-step__body {
          margin: 0;
          font-size: 1.0625rem;
          line-height: 1.6;
          font-weight: 600;
          color: #475569;
        }

        .how-step__body br {
          display: none;
        }

        .how-step__media {
          margin: 0;
          width: 100%;
          max-width: 34rem;
          justify-self: center;
        }

        .how-step--reverse .how-step__media {
          justify-self: start;
        }

        .how-step:not(.how-step--reverse) .how-step__media {
          justify-self: end;
        }

        .how-step__figure {
          margin: 0;
          border-radius: 1.25rem;
          overflow: hidden;
          background: #ffffff;
          border: 1px solid rgba(2, 51, 69, 0.1);
          box-shadow: 0 14px 44px rgba(2, 51, 69, 0.08);
        }

        .how-step__figure img {
          display: block;
          width: 100%;
          height: auto;
          vertical-align: middle;
        }

        .how-does-it-work .feature-image-mask {
          padding-top: 0 !important;
          background: transparent !important;
          box-shadow: none !important;
          height: auto !important;
        }

        @media (max-width: 991px) {
          .how-step,
          .how-step--reverse {
            grid-template-columns: 1fr;
          }

          .how-step--reverse .how-step__media,
          .how-step--reverse .how-step__copy,
          .how-step:not(.how-step--reverse) .how-step__media,
          .how-step:not(.how-step--reverse) .how-step__copy {
            order: unset;
            justify-self: stretch;
            max-width: none;
          }

          .how-step__media {
            max-width: 28rem;
            margin: 0 auto;
          }

          .how-step__copy {
            max-width: none;
          }
        }

      `}</style>
      <section id="career-accelerator-section" className="career-accelerator-section">
        <div className="career-wrap">
          <motion.div
            className="career-left"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <p className="career-eyebrow">
              <span className="career-eyebrow__dot" aria-hidden />
              Recruiter program
            </p>
            <h2 className="career-title">
              Your work goes in front of{" "}
              <span className="career-title__accent">people who hire.</span>
            </h2>
            <p className="career-copy">
              The top 10 teams are packaged for <strong>30+ recruiters</strong>—demo, repo, and context—not
              just another application in a portal.
            </p>
            <ul className="career-points">
              <li className="career-point">
                <span className="career-point__icon" aria-hidden>
                  <Sparkles className="w-[18px] h-[18px]" />
                </span>
                Recruiters see what you built in 100 hours
              </li>
              <li className="career-point">
                <span className="career-point__icon" aria-hidden>
                  <Building2 className="w-[18px] h-[18px]" />
                </span>
                Open to international students across every visa path
              </li>
              <li className="career-point">
                <span className="career-point__icon" aria-hidden>
                  <Star className="w-[18px] h-[18px]" />
                </span>
                Every finisher gets a participation certificate
              </li>
            </ul>
            <div className="career-cta-row">
              <a href="#judges-section" className="career-cta career-cta--primary">
                Meet the recruiter lineup
                <ArrowRight className="w-[18px] h-[18px]" />
              </a>
              <a href="#footer" className="career-cta career-cta--ghost">
                <Briefcase className="w-[18px] h-[18px]" />
                Become a hiring partner
              </a>
            </div>
          </motion.div>
          <motion.aside
            className="career-right"
            aria-label="Prizes and what every team gets"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          >
            <div className="career-prizes-grid">
              <div className="career-prize-card">
                <div className="career-prize-card__head">
                  <span
                    className="career-prize-card__icon"
                    style={{ background: "rgba(34, 197, 94, 0.18)", color: "#86efac" }}
                  >
                    <Trophy className="w-5 h-5" />
                  </span>
                  <div>
                    <span className="career-prize-card__value">$2,500</span>
                    <span className="career-prize-card__label">First Prize</span>
                  </div>
                </div>
                <p className="career-prize-card__desc">
                  Cash prize awarded to the winning team at the close of judging.
                </p>
              </div>

              <div className="career-prize-card">
                <div className="career-prize-card__head">
                  <span
                    className="career-prize-card__icon"
                    style={{ background: "rgba(42, 142, 158, 0.28)", color: "#7dd3e8" }}
                  >
                    <Sparkles className="w-5 h-5" />
                  </span>
                  <h3 className="career-prize-card__title">Cash&nbsp;+ Credits&nbsp;+ Subscription</h3>
                </div>
                <p className="career-prize-card__desc">
                  Winners walk away with the cash prize, API credits to keep building, and a free FirstStep premium subscription.
                </p>
              </div>

              <div className="career-prize-card career-prize-card--wide">
                <div className="career-prize-card__head">
                  <span
                    className="career-prize-card__icon"
                    style={{ background: "rgba(8, 145, 178, 0.28)", color: "#67e8f9" }}
                  >
                    <Briefcase className="w-5 h-5" />
                  </span>
                  <h3 className="career-prize-card__title">Top 10 teams sent to top recruiters</h3>
                </div>
                <p className="career-prize-card__desc">
                  Your build and team info are shared with our network of OPT/H1B-friendly recruiters so the right people see what you shipped.
                </p>
              </div>

              <div className="career-prize-card career-prize-card--wide">
                <div className="career-prize-card__head">
                  <span
                    className="career-prize-card__icon"
                    style={{ background: "rgba(168, 85, 247, 0.22)", color: "#d8b4fe" }}
                  >
                    <Star className="w-5 h-5" />
                  </span>
                  <h3 className="career-prize-card__title">Participation certificate for everyone</h3>
                </div>
                <p className="career-prize-card__desc">
                  Every finisher gets an official FirstStep participation certificate to add to their portfolio and LinkedIn.
                </p>
              </div>
            </div>
          </motion.aside>
        </div>
        <motion.div
          className="career-stats"
          aria-label="Event at a glance"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
        >
          <div className="career-stats__grid">
            <motion.div className="career-stats__item" whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 280 }}>
              <span className="career-stats__icon" style={{ background: "rgba(34, 197, 94, 0.18)", color: "#86efac" }}>
                <Trophy className="w-5 h-5" />
              </span>
              <span className="career-stats__text">
                <span className="career-stats__value">$5,000</span>
                <span className="career-stats__label">Worth prize pool</span>
              </span>
            </motion.div>
            <motion.div className="career-stats__item" whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 280 }}>
              <span className="career-stats__icon" style={{ background: "rgba(42, 142, 158, 0.28)", color: "#7dd3e8" }}>
                <Users className="w-5 h-5" />
              </span>
              <span className="career-stats__text">
                <span className="career-stats__value">30+</span>
                <span className="career-stats__label">Hiring partners</span>
              </span>
            </motion.div>
            <motion.div className="career-stats__item" whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 280 }}>
              <span className="career-stats__icon" style={{ background: "rgba(8, 145, 178, 0.28)", color: "#67e8f9" }}>
                <Timer className="w-5 h-5" />
              </span>
              <span className="career-stats__text">
                <span className="career-stats__value">100 hrs</span>
                <span className="career-stats__label">Remote sprint</span>
              </span>
            </motion.div>
            <motion.div className="career-stats__item" whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 280 }}>
              <span className="career-stats__icon" style={{ background: "rgba(99, 102, 241, 0.22)", color: "#c4b5fd" }}>
                <Wrench className="w-5 h-5" />
              </span>
              <span className="career-stats__text">
                <span className="career-stats__value">Any stack</span>
                <span className="career-stats__label">Your tools</span>
              </span>
            </motion.div>
          </div>
        </motion.div>
      </section>
      <HowItWorksSticky />
      <TracksStack />
      <JudgesStack />
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
          <motion.div className="hero-image-mask-2 register-video-mask">
            <HeroBackgroundVideo variant="section" />
          </motion.div>
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




