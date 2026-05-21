import { useEffect } from "react";
import { TiltCard } from "./components/TiltCard";
import { handleSectionLinkClick, scrollToSection } from "./lib/scrollToSection";
import { CountdownTimer } from "./components/CountdownTimer";
import {
  HeroBackgroundVideo,
  HERO_VIDEO_POSTER,
  REGISTER_VIDEO_SRC,
  REGISTER_VIDEO_POSTER,
} from "./components/HeroBackgroundVideo";
import { MarqueeBanner } from "./components/MarqueeBanner";
import { HowItWorksSticky } from "./components/HowItWorksSticky";
import { ReelsShowcase } from "./components/ReelsShowcase";
import { TracksStack } from "./components/TracksStack";
import { JudgesStack } from "./components/JudgesStack";
import { FloatingLabels } from "./components/FloatingLabels";
import { HeroPromoCaption } from "./components/HeroPromoCaption";
import { HeroCenterCards } from "./components/HeroCenterCards";
import Footer from "./components/Footer";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Users, Timer, Wrench, ArrowRight, Bell, Share2, Briefcase, Bot, Network, Sparkles, Lock, ChevronRight, Star, MessageSquare, Cpu, HelpCircle, Mail, Building2, UserCircle2, Medal, GraduationCap } from "lucide-react";

const HACKATHON_START = new Date("2026-06-10T20:00:00-04:00");

export default function PageContent({ onNavigate = () => {} }) {
  useEffect(() => {
    const id = window.location.hash.replace(/^#/, "");
    if (!id || !document.getElementById(id)) return;
    requestAnimationFrame(() => scrollToSection(id));
  }, []);

  return (
    <>
      <header
        id="nav"
        data-w-id="8bef9f4b-d3ae-2689-7a83-804b6f6d6df7"
        className="sticky-nav"
      >
        <nav className="w-container nav-bar">
          <div className="nav-bar__inner">
            <div className="nav-bar__logo">
              <a
                href="/"
                aria-current="page"
                className="nav-logo-link w-inline-block w--current"
                onClick={(event) => {
                  event.preventDefault();
                  onNavigate("/");
                }}
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
            </div>

            <ul role="list" className="nav-bar__links w-list-unstyled">
              <li>
                <a
                  href="https://firststepjob.com/"
                  className="nav-link is-active"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#career-accelerator-section"
                  className="nav-link"
                  onClick={(e) =>
                    handleSectionLinkClick(e.nativeEvent, "career-accelerator-section")
                  }
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#tracks-section"
                  className="nav-link"
                  onClick={(e) =>
                    handleSectionLinkClick(e.nativeEvent, "tracks-section")
                  }
                >
                  Track
                </a>
              </li>
              <li>
                <a
                  href="#judges-section"
                  className="nav-link"
                  onClick={(e) =>
                    handleSectionLinkClick(e.nativeEvent, "judges-section")
                  }
                >
                  Judges
                </a>
              </li>
            </ul>

            <div className="nav-bar__cta">
              <a
                href="/register"
                className="yellow-button w-button nav-cta-button"
                onClick={(event) => {
                  event.preventDefault();
                  onNavigate("/register");
                }}
              >
                Claim Your Spot
              </a>
            </div>
          </div>
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

            {/* Hero promo — Mint + Warm Sand (color opt-9) */}
            <div className="hero-hackathon-expanded hero-promo-mint">
              <motion.div
                className="hero-promo-mint__inner"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.15, ease: "easeOut" }}
              >
                <p className="hero-promo-mint__eyebrow">Build your way in.</p>
                <h2 className="hero-promo-mint__title">
                  FirstStep&apos;s <em>Annual</em> Hackathon
                </h2>
                <HeroPromoCaption />
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
              Claim Your Spot →
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

        /* Timer card: narrower layout; digit/label font sizes live in index.css */
        .hero-timer-inline {
          width: 100%;
          max-width: 580px;
          margin: 0 auto;
        }

        /* FirstStep hackathon card: wider — independent from the timer's width */
        .hero-hackathon-expanded {
          width: 100%;
          max-width: 1080px;
          margin: clamp(12px, 2vh, 24px) auto 0;
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
          color: #2a1a00 !important;
          background: #ffd9a8;
          border: none;
          box-shadow: 0 8px 28px rgba(255, 217, 168, 0.45);
        }

        .hero-cta-claim:hover {
          color: #2a1a00 !important;
          background: #ffd9a8;
          transform: translateY(-2px);
          box-shadow: 0 12px 36px rgba(255, 217, 168, 0.55);
        }

        .hero-cta-follow {
          color: #023345 !important;
          background: #00ff9d;
          border: 1px solid rgba(0, 255, 157, 0.85);
          box-shadow:
            0 0 20px rgba(0, 255, 157, 0.45),
            0 8px 24px rgba(0, 0, 0, 0.22);
        }

        .hero-cta-follow:hover {
          color: #012531 !important;
          background: #33ffb1;
          border-color: #66ffc4;
          transform: translateY(-2px);
          box-shadow:
            0 0 28px rgba(0, 255, 157, 0.6),
            0 12px 28px rgba(0, 0, 0, 0.25);
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

        /* Mint + Warm Sand hero promo (color-options opt-9) */
        .hero-promo-mint__inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          gap: clamp(14px, 2vh, 22px);
          padding: clamp(16px, 2.2vh, 32px) clamp(24px, 4vw, 56px);
          width: 100%;
        }

        .hero-promo-mint__eyebrow {
          font-family: "JetBrains Mono", "SF Mono", monospace;
          font-size: clamp(16px, 1.8vw, 22px);
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #ffe8c4 !important;
          text-shadow:
            0 1px 3px rgba(2, 40, 52, 0.55),
            0 0 18px rgba(255, 217, 168, 0.85),
            0 0 36px rgba(255, 190, 110, 0.55);
          display: inline-flex;
          align-items: center;
          gap: 12px;
          margin: 0;
        }

        .hero-promo-mint__eyebrow::before,
        .hero-promo-mint__eyebrow::after {
          content: "";
          width: 40px;
          height: 1px;
          background: #ffd9a8;
          box-shadow: 0 0 14px rgba(255, 217, 168, 0.7);
          flex-shrink: 0;
        }

        .hero-promo-mint__title {
          font-size: clamp(48px, 7vw, 88px);
          font-weight: 800;
          line-height: 1.05;
          letter-spacing: -0.03em;
          margin: 0;
          color: #a8f5d0 !important;
          text-shadow:
            0 0 20px rgba(168, 245, 208, 0.55),
            0 0 40px rgba(168, 245, 208, 0.35),
            0 4px 30px rgba(0, 0, 0, 0.55);
          white-space: nowrap;
        }

        .hero-promo-mint__title em {
          font-family: "Instrument Serif", Georgia, serif;
          font-style: italic;
          font-weight: 500;
          font-size: 1.12em;
          color: #ffe8c4 !important;
          text-shadow:
            0 1px 3px rgba(2, 40, 52, 0.5),
            0 0 28px rgba(255, 217, 168, 0.8),
            0 0 52px rgba(255, 190, 110, 0.45);
        }

        .hero-promo-mint__caption-wrap {
          margin-top: clamp(4px, 0.6vh, 8px);
          min-height: clamp(52px, 6vh, 64px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 12px;
          max-width: 900px;
        }

        .hero-promo-mint__caption {
          font-size: clamp(22px, 2.4vw, 32px);
          line-height: 1.5;
          font-weight: 600;
          color: #ffe8c4 !important;
          letter-spacing: -0.005em;
          text-shadow:
            0 1px 3px rgba(2, 51, 69, 0.55),
            0 2px 6px rgba(0, 0, 0, 0.35),
            0 0 26px rgba(255, 217, 168, 0.75),
            0 0 48px rgba(255, 190, 110, 0.48);
          white-space: pre-wrap;
        }

        .hero-promo-mint__caption-cursor {
          display: inline-block;
          width: 3px;
          height: 1.1em;
          background: #a8f5d0;
          margin-left: 4px;
          transform: translateY(0.2em);
          box-shadow: 0 0 18px rgba(168, 245, 208, 0.75);
          animation: hero-promo-caption-blink 1s steps(2) infinite;
        }

        @keyframes hero-promo-caption-blink {
          50% {
            opacity: 0;
          }
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

          .hero-promo-mint__inner {
            padding: 16px 20px;
            gap: 14px;
          }

          .hero-promo-mint__title {
            white-space: normal;
            font-size: clamp(36px, 9vw, 52px);
            line-height: 1.1;
          }

          .hero-promo-mint__caption-wrap {
            min-height: 80px;
          }

          .hero-promo-mint__caption {
            font-size: clamp(18px, 4.5vw, 24px);
          }
        }

        @media (min-width: 900px) and (max-width: 1180px) {
          .hero-promo-mint__title {
            font-size: clamp(52px, 5.5vw, 72px);
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
          padding: 0;
          transform: translateY(-10px);
        }

        .sticky-nav .nav-logo {
          width: clamp(440px, 32vw, 620px) !important;
          max-width: clamp(440px, 32vw, 620px) !important;
          height: auto !important;
          max-height: 110px !important;
        }

        /* Header nav — see index.html; logo size synced here for Vite overrides */
        .sticky-nav .nav-link::after {
          transform: scaleX(0.35);
          opacity: 0.45;
        }

        .sticky-nav .nav-link:hover::after,
        .sticky-nav .nav-link:focus-visible::after,
        .sticky-nav .nav-link.is-active::after {
          transform: scaleX(1);
          opacity: 1;
        }

        .sticky-nav a.yellow-button.w-button,
        .sticky-nav .nav-cta-button {
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          padding: 11px 26px !important;
          line-height: 1 !important;
          font-size: 18px !important;
          font-weight: 800 !important;
          min-height: 46px !important;
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
          .sticky-nav .nav-logo {
            width: clamp(320px, 44vw, 420px) !important;
            max-width: min(420px, 52vw) !important;
            max-height: 88px !important;
          }

          .sticky-nav .nav-logo-link {
            transform: translateY(-6px);
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

        /* Prize cards — flat panels (reference design) */
        .career-prizes-grid {
          --prize-card-bg: #112229;
          --prize-card-border: #2d4048;
          --prize-card-text: #ffffff;
          --prize-card-text-muted: #d1dde8;
          --prize-card-label: #94a3b8;
          --prize-card-gap: 1.5rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 1fr 1.1fr;
          gap: var(--prize-card-gap);
          align-items: stretch;
        }

        .career-prize-card {
          position: relative;
          display: flex;
          flex-direction: column;
          height: 100%;
          color: var(--prize-card-text);
          background: var(--prize-card-bg);
          border: 1px solid var(--prize-card-border);
          border-radius: 14px;
          padding: 1.55rem 1.8rem;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.24);
          transition: transform 200ms ease, border-color 200ms ease;
        }

        .career-prize-card--certificate {
          padding: 1.9rem 2rem 2.15rem;
          min-height: 15.5rem;
        }

        .career-prize-card:hover {
          transform: translateY(-2px);
          border-color: #3d5560;
        }

        .career-prize-card--wide {
          grid-column: 1 / -1;
        }

        .career-prize-card__head {
          display: flex;
          align-items: flex-start;
          gap: 0.85rem;
          margin-bottom: 0.85rem;
        }

        .career-prize-card__icon {
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 10px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .career-prize-card__icon svg {
          width: 1.25rem;
          height: 1.25rem;
        }

        .career-prize-card__value {
          display: block;
          font-size: clamp(1.75rem, 2.4vw, 2.15rem);
          font-weight: 800;
          letter-spacing: -0.02em;
          line-height: 1.15;
          color: var(--prize-card-text);
        }

        .career-prize-card__value--word {
          font-size: clamp(1.35rem, 2vw, 1.65rem);
          letter-spacing: -0.02em;
        }

        .career-prize-card__label {
          display: block;
          margin: 0 0 0.4rem;
          color: var(--prize-card-label);
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }

        .career-prize-card__head > div .career-prize-card__value {
          margin-top: 0;
        }

        .career-prize-card__title {
          margin: 0;
          color: var(--prize-card-text);
          font-size: clamp(1.1rem, 1.4vw, 1.28rem);
          font-weight: 700;
          letter-spacing: -0.01em;
          line-height: 1.35;
        }

        .career-prize-card--certificate .career-prize-card__title {
          font-size: clamp(1.2rem, 1.55vw, 1.42rem);
          line-height: 1.3;
        }

        .career-prize-card__desc {
          margin: 0;
          color: var(--prize-card-text-muted);
          font-size: clamp(0.95rem, 1.15vw, 1.05rem);
          line-height: 1.55;
          font-weight: 400;
        }

        .career-prize-card__value-suffix {
          font-size: 0.52em;
          font-weight: 700;
          letter-spacing: 0.02em;
          vertical-align: middle;
          white-space: nowrap;
          color: var(--prize-card-text);
        }

        .career-prize-card__list {
          margin: 0;
          padding-left: 1.2rem;
          flex: 1;
          font-size: clamp(0.95rem, 1.12vw, 1.06rem);
          line-height: 1.58;
          font-weight: 400;
        }

        .career-prize-card--certificate .career-prize-card__list {
          font-size: clamp(1.05rem, 1.25vw, 1.15rem);
          line-height: 1.62;
          padding-left: 1.25rem;
        }

        .career-prize-card__list li {
          color: var(--prize-card-text-muted) !important;
        }

        .career-prize-card__list li strong {
          color: var(--prize-card-text) !important;
          font-weight: 700;
        }

        .career-prize-card__list li + li {
          margin-top: 0.5rem;
        }

        .career-prize-card--certificate .career-prize-card__list li + li {
          margin-top: 0.65rem;
        }

        .career-prize-card--certificate .career-prize-card__head {
          margin-bottom: 1rem;
        }

        .career-prize-card--certificate .career-prize-card__icon {
          width: 2.65rem;
          height: 2.65rem;
        }

        .career-prize-card--certificate .career-prize-card__icon svg {
          width: 1.35rem;
          height: 1.35rem;
        }

        .career-prize-card__link {
          color: #7dd3e8;
          font-weight: 600;
          text-decoration: underline;
          text-underline-offset: 3px;
        }

        .career-prize-card__link:hover {
          color: #a5f3fc;
        }

        @media (max-width: 520px) {
          .career-prizes-grid {
            grid-template-columns: 1fr;
            grid-template-rows: auto;
          }

          .career-prize-card--certificate {
            min-height: 0;
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
      <section
        id="career-accelerator-section"
        className="career-accelerator-section scroll-mt-28"
      >
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
              Your work goes directly in front of{" "}
              <span className="career-title__accent">people who hire.</span>
            </h2>
            <p className="career-copy">
              We don&apos;t just bury your project in a portal. The top 10 teams are packaged as a premium
              talent bundle—including your live demo, GitHub repo, and resumes—and sent directly to{" "}
              <strong>30+ elite recruiters</strong>.
            </p>
            <ul className="career-points">
              <li className="career-point">
                <span className="career-point__icon" aria-hidden>
                  <Star className="w-[18px] h-[18px]" />
                </span>
                Recruiters see exactly what you shipped in a 100-hour sprint
              </li>
              <li className="career-point">
                <span className="career-point__icon" aria-hidden>
                  <Star className="w-[18px] h-[18px]" />
                </span>
                Open to international talent across all visa paths
              </li>
              <li className="career-point">
                <span className="career-point__icon" aria-hidden>
                  <Star className="w-[18px] h-[18px]" />
                </span>
                Every single finisher walks away with a verified credential
              </li>
            </ul>
            <div className="career-cta-row">
              <a
                href="#judges-section"
                className="career-cta career-cta--primary"
                onClick={(e) =>
                  handleSectionLinkClick(e.nativeEvent, "judges-section")
                }
              >
                Meet the Recruiter Lineup
                <ArrowRight className="w-[18px] h-[18px]" />
              </a>
              <a
                href="#footer"
                className="career-cta career-cta--ghost"
                onClick={(e) =>
                  handleSectionLinkClick(e.nativeEvent, "footer")
                }
              >
                <Briefcase className="w-[18px] h-[18px]" />
                Become a Hiring Partner
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
                    <span className="career-prize-card__label">First Prize</span>
                    <span className="career-prize-card__value">
                      $2,500 <span className="career-prize-card__value-suffix">Total Value</span>
                    </span>
                  </div>
                </div>
                <ul className="career-prize-card__list">
                  <li>$1,000 Cash to fund your build.</li>
                  <li>Premium Plus platform access.</li>
                  <li>Developer API Credits to scale.</li>
                </ul>
              </div>

              <div className="career-prize-card">
                <div className="career-prize-card__head">
                  <span
                    className="career-prize-card__icon"
                    style={{ background: "rgba(8, 145, 178, 0.28)", color: "#67e8f9" }}
                  >
                    <Briefcase className="w-5 h-5" />
                  </span>
                  <h3 className="career-prize-card__title">Top 10 Talent Pipeline</h3>
                </div>
                <ul className="career-prize-card__list">
                  <li>
                    <strong>Direct Fast-Track:</strong> Packaged portfolio sent straight to our network of
                    OPT/H1B-friendly recruiters.
                  </li>
                  <li>
                    <strong>Skip the HR Black Hole:</strong> Real hiring managers review your actual code and
                    demo.
                  </li>
                </ul>
              </div>

              <div className="career-prize-card">
                <div className="career-prize-card__head">
                  <span
                    className="career-prize-card__icon"
                    style={{ background: "rgba(42, 142, 158, 0.28)", color: "#7dd3e8" }}
                  >
                    <Medal className="w-5 h-5" />
                  </span>
                  <div>
                    <span className="career-prize-card__label">Second Prize</span>
                    <span className="career-prize-card__value">
                      $600+ <span className="career-prize-card__value-suffix">Total Value</span>
                    </span>
                  </div>
                </div>
                <ul className="career-prize-card__list">
                  <li>$500 Cash for the team.</li>
                  <li>Premium Plan platform access.</li>
                  <li>$100 API Credits to keep building.</li>
                </ul>
              </div>

              <div className="career-prize-card career-prize-card--certificate">
                <div className="career-prize-card__head">
                  <span
                    className="career-prize-card__icon"
                    style={{ background: "rgba(168, 85, 247, 0.22)", color: "#d8b4fe" }}
                  >
                    <GraduationCap className="w-5 h-5" />
                  </span>
                  <h3 className="career-prize-card__title">Certificate for Everyone</h3>
                </div>
                <ul className="career-prize-card__list">
                  <li>
                    <strong>Official FirstStep Credential:</strong> Awarded to every finisher who completes the
                    sprint.
                  </li>
                  <li>
                    <strong>Boost Your Profile:</strong> Fully shareable directly to LinkedIn and your resume.
                  </li>
                </ul>
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
                <span className="career-stats__label">Total Prize Pool</span>
              </span>
            </motion.div>
            <motion.div className="career-stats__item" whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 280 }}>
              <span className="career-stats__icon" style={{ background: "rgba(42, 142, 158, 0.28)", color: "#7dd3e8" }}>
                <Users className="w-5 h-5" />
              </span>
              <span className="career-stats__text">
                <span className="career-stats__value">30+</span>
                <span className="career-stats__label">Hiring Partners</span>
              </span>
            </motion.div>
            <motion.div className="career-stats__item" whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 280 }}>
              <span className="career-stats__icon" style={{ background: "rgba(8, 145, 178, 0.28)", color: "#67e8f9" }}>
                <Timer className="w-5 h-5" />
              </span>
              <span className="career-stats__text">
                <span className="career-stats__value">100 Hours</span>
                <span className="career-stats__label">Remote Sprint</span>
              </span>
            </motion.div>
            <motion.div className="career-stats__item" whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 280 }}>
              <span className="career-stats__icon" style={{ background: "rgba(99, 102, 241, 0.22)", color: "#c4b5fd" }}>
                <Wrench className="w-5 h-5" />
              </span>
              <span className="career-stats__text">
                <span className="career-stats__value">Any Stack</span>
                <span className="career-stats__label">Bring Your Own Tools</span>
              </span>
            </motion.div>
          </div>
        </motion.div>
      </section>
      <ReelsShowcase />
      <HowItWorksSticky />
      <TracksStack />
      <JudgesStack />
      <header id="register-section" className="register-now scroll-mt-28">
        <div className="flex-container w-container register-now__row">
          <motion.div
            className="register-now__copy"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <Badge className="register-now__badge">
              <Users className="w-3.5 h-3.5" />
              Free to join
            </Badge>
            <h2 className="register-now__title">Claim your spot</h2>
            <p className="register-now__lead">
              Join the 100-hour sprint, pick a track, and put proof of work in front of recruiters.
              Spots are limited — register before tracks fill up.
            </p>
            <ul className="register-now__points">
              <li>
                <span className="register-now__point-icon" aria-hidden>
                  <Timer className="w-4 h-4" />
                </span>
                100-hour remote build window
              </li>
              <li>
                <span className="register-now__point-icon" aria-hidden>
                  <Users className="w-4 h-4" />
                </span>
                Solo or team of up to four
              </li>
              <li>
                <span className="register-now__point-icon" aria-hidden>
                  <Trophy className="w-4 h-4" />
                </span>
                $5,000 prize pool + recruiter intros
              </li>
            </ul>
            <a
              href="/register"
              className="yellow-button w-button register-now__cta"
              onClick={(event) => {
                event.preventDefault();
                onNavigate("/register");
              }}
            >
              Register now
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
          <motion.div
            className="hero-image-mask-2 register-now__media register-video-mask"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, delay: 0.08, ease: "easeOut" }}
          >
            <HeroBackgroundVideo
              variant="section"
              src={REGISTER_VIDEO_SRC}
              poster={REGISTER_VIDEO_POSTER}
            />
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
            <a
              href="#faq-section"
              className="yellow-button w-button"
              onClick={(e) =>
                handleSectionLinkClick(e.nativeEvent, "faq-section")
              }
            >
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
      <Footer />
    </>
  );
}




