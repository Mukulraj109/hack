import { useEffect, useState, useCallback } from "react";
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
import { MobileNav } from "./components/MobileNav";
import HiringPartnerButton from "./components/HiringPartnerButton";
import RecruiterLineupButton from "./components/RecruiterLineupButton";
import HackathonFaqButton from "./components/HackathonFaqButton";
import FollowFormButton from "./components/FollowFormButton";
import SocialFollowLinks from "./components/SocialFollowLinks";
import Footer from "./components/Footer";
import { ShimmerCard } from "./components/ui/shimmer-card";
import WhatsAppButton from "./components/WhatsAppButton";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Users, Timer, Wrench, ArrowRight, Bell, Share2, Briefcase, Bot, Network, Sparkles, Lock, ChevronRight, Star, MessageSquare, Cpu, HelpCircle, Mail, Building2, UserCircle2, Medal, GraduationCap, DollarSign, Key } from "lucide-react";

import { HACKATHON_START } from "./lib/hackathonDates";

const NAV_LINKS = [
  { href: "https://firststepjob.com/", label: "Home", isActive: true, external: true },
  { href: "https://firststepjob.com/products-services", label: "Products & Services", external: true },
  { href: "#career-accelerator-section", label: "About", sectionId: "career-accelerator-section" },
  { href: "#tracks-section", label: "Track", sectionId: "tracks-section" },
  { href: "#judges-section", label: "Judges", sectionId: "judges-section" },
];

export default function PageContent({ onNavigate = () => {}, ClaimSpotButton: ClaimBtn }) {
  const ClaimSpot =
    ClaimBtn ||
    function DefaultClaim({ className, children }) {
      return (
        <a
          href="/sprint"
          className={className}
          onClick={(e) => {
            e.preventDefault();
            onNavigate("/sprint");
          }}
        >
          {children}
        </a>
      );
    };

  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const closeMobileNav = useCallback(() => setMobileNavOpen(false), []);
  const toggleMobileNav = useCallback(
    () => setMobileNavOpen((open) => !open),
    []
  );
  useEffect(() => {
    const id = window.location.hash.replace(/^#/, "");
    if (!id || !document.getElementById(id)) return;
    requestAnimationFrame(() => scrollToSection(id));
  }, []);

  return (
    <>
      <header
        id="nav"
        className="sticky-nav"
        style={{ opacity: 1, visibility: "visible" }}
      >
        <nav className="w-container nav-bar" aria-label="Main">
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
                  href="https://firststepjob.com/products-services"
                  className="nav-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Products & Services
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

            <div className="nav-bar__cta nav-bar__cta--desktop">
              <ClaimSpot className="yellow-button w-button nav-cta-button" onNavigate={onNavigate}>
                Claim Your Spot
              </ClaimSpot>
              <HiringPartnerButton className="nav-partner-button w-button" />
            </div>

            <MobileNav
              isOpen={mobileNavOpen}
              onToggle={toggleMobileNav}
              onClose={closeMobileNav}
              links={NAV_LINKS}
              onNavigate={onNavigate}
            />
          </div>
        </nav>
      </header>
      <div className="site-nav-spacer" aria-hidden="true" />
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

          <div className="hero-center-area">
            <div className="hero-timer-inline hero-timer-inline--lead">
              <CountdownTimer targetDate={HACKATHON_START} variant="minimal" />
            </div>

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
            <div className="hero-bottom-cta__stack">
              <div className="hero-cta-group">
                <div className="hero-cta-split-row">
                  <FollowFormButton />
                  <HiringPartnerButton className="hero-cta-partner btn-hiring-partner-mobile" />
                </div>

                {/* Claim Your Spot Button - Primary CTA with Gradient */}
                <ClaimSpot className="btn-claim" onNavigate={onNavigate}>
                  <span className="btn-claim__label">Claim Your Spot</span>
                  <svg className="btn-claim__arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <line x1="5" y1="12" x2="19" y2="12"/>
                    <polyline points="12 5 19 12 12 19"/>
                  </svg>
                </ClaimSpot>
              </div>
            </div>
          </div>

          </motion.div>
        </div>
      </header>
      <MarqueeBanner />
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
              We don&apos;t bury your project in a portal. The top 10 teams get packaged as a premium talent
              bundle — live demo, GitHub repo, and resumes — sent directly to 30+ hiring partners who are
              actively looking to hire.
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
              <RecruiterLineupButton className="career-cta career-cta--primary">
                Meet the Recruiter Lineup
                <ArrowRight className="w-[18px] h-[18px]" />
              </RecruiterLineupButton>
              <HiringPartnerButton className="career-cta career-cta--ghost">
                <Briefcase className="w-[18px] h-[18px]" />
                Become a Hiring Partner
              </HiringPartnerButton>
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
              <ShimmerCard highlightColor="rgba(34, 197, 94, 0.3)" className="career-prize-card">
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
                <ul className="career-prize-card__list career-prize-card__list--icon">
                  <li className="career-prize-card__item">
                    <DollarSign className="career-prize-card__list-icon" aria-hidden />
                    $1,000 Cash to fuel your next build
                  </li>
                  <li className="career-prize-card__item">
                    <Star className="career-prize-card__list-icon" aria-hidden />
                    2 Premium Plus accounts
                  </li>
                  <li className="career-prize-card__item">
                    <Key className="career-prize-card__list-icon" aria-hidden />
                    Developer API Credits to scale your project
                  </li>
                </ul>
              </ShimmerCard>

              <ShimmerCard highlightColor="rgba(42, 142, 158, 0.3)" className="career-prize-card">
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
                      $1,500 <span className="career-prize-card__value-suffix">Total Value</span>
                    </span>
                  </div>
                </div>
                <ul className="career-prize-card__list career-prize-card__list--icon">
                  <li className="career-prize-card__item">
                    <DollarSign className="career-prize-card__list-icon" aria-hidden />
                    $500 Cash for the team
                  </li>
                  <li className="career-prize-card__item">
                    <Star className="career-prize-card__list-icon" aria-hidden />
                    2 Premium Plan accounts
                  </li>
                  <li className="career-prize-card__item">
                    <Key className="career-prize-card__list-icon" aria-hidden />
                    $100 API Credits to keep building
                  </li>
                </ul>
              </ShimmerCard>
              <ShimmerCard highlightColor="rgba(8, 145, 178, 0.3)" className="career-prize-card">
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
              </ShimmerCard>

              <ShimmerCard highlightColor="rgba(168, 85, 247, 0.3)" className="career-prize-card career-prize-card--certificate">
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
              </ShimmerCard>
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
      <SocialFollowLinks variant="inline-row" />
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
            <ClaimSpot className="yellow-button w-button register-now__cta" onNavigate={onNavigate}>
              Register now
              <ArrowRight className="w-4 h-4" />
            </ClaimSpot>
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
            <HackathonFaqButton className="yellow-button w-button">
              READ FAQ
            </HackathonFaqButton>
          </motion.div>
        </div>
      </header>
      <section id="gallery" className="sponsors">
        <motion.div
          className="sponsors__inner centered-container-2 w-container"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <h2 className="sponsors__title heading-12">Powered by</h2>
          <p className="sponsors__intro paragraph-2 how-does-it-work-paragraph">
            Sponsor slots are opening now. These placeholders show the launch layout while partners are finalized.
          </p>
          <div className="sponsors__grid cards-grid-container">
            <div className="sponsor-name-card">
              <h3>Vales</h3>
              <p>Launch sponsor placeholder</p>
            </div>
            <div className="sponsor-name-card">
              <h3>Sponsor 02</h3>
              <p>Recruiting partner placeholder</p>
            </div>
            <div className="sponsor-name-card">
              <h3>Sponsor 03</h3>
              <p>Community partner placeholder</p>
            </div>
            <div className="sponsor-name-card">
              <h3>Sponsor 04</h3>
              <p>Tooling partner placeholder</p>
            </div>
          </div>
        </motion.div>
      </section>
      <Footer />
      <WhatsAppButton />
    </>
  );
}




