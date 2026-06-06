import type { ReactNode } from "react";
import { INSTAGRAM_URL, LINKEDIN_URL } from "../config/socialLinks";
import { InstagramIcon, LinkedinIcon, YoutubeIcon } from "./SocialIcons";

const BASE = "https://firststepjob.com";

const linkClass =
  "text-white/70 hover:text-white text-sm font-['Geologica'] transition-colors";
const bottomLinkClass = "hover:text-white transition-colors";

function FooterLink({
  href,
  children,
  className = linkClass,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  const url = href.startsWith("http") ? href : `${BASE}${href}`;
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  );
}

export default function Footer() {
  return (
    <footer
      id="footer"
      className="firststep-footer w-full !bg-[#023345] text-left"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          <div className="sm:col-span-2 lg:col-span-2">
            <div className="mb-4 inline-block bg-white rounded-lg p-2">
              <img
                src="https://raw.githubusercontent.com/adminfirststep/firststep_assets/main/FSTLOGOTB.png"
                alt="FirstStep Logo"
                className="h-12 w-auto"
              />
            </div>
            <p className="text-white/70 text-sm font-['Geologica'] leading-relaxed mb-6">
              Your dedicated career partner—we handle job applications, resume
              customization, and interview prep so you can focus on landing your
              dream job.
            </p>
            <div className="flex items-center gap-4">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white transition-colors duration-200"
                aria-label="Follow FirstStep on Instagram (opens in new tab)"
              >
                <InstagramIcon />
              </a>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white transition-colors duration-200"
                aria-label="Follow FirstStep on LinkedIn (opens in new tab)"
              >
                <LinkedinIcon />
              </a>
              <a
                href="https://www.youtube.com/@FirstStepJob"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white transition-colors duration-200"
                aria-label="Follow FirstStep on YouTube (opens in new tab)"
              >
                <YoutubeIcon />
              </a>
            </div>
          </div>

          <nav aria-label="Company navigation">
            <h4 className="text-white font-['Geologica'] font-semibold text-sm uppercase tracking-wider mb-4">
              Company
            </h4>
            <ul className="space-y-3">
              <li>
                <FooterLink href="/about">About Us</FooterLink>
              </li>
              <li>
                <FooterLink href="/#pricing">Pricing</FooterLink>
              </li>
              <li>
                <FooterLink href="/careers">Careers</FooterLink>
              </li>
              <li>
                <FooterLink href="/privacypolicy">Privacy Policy</FooterLink>
              </li>
            </ul>
          </nav>

          <nav aria-label="Services navigation">
            <h4 className="text-white font-['Geologica'] font-semibold text-sm uppercase tracking-wider mb-4">
              Services
            </h4>
            <ul className="space-y-3">
              <li>
                <FooterLink href="/products-services">
                  Products & Services
                </FooterLink>
              </li>
              <li>
                <FooterLink href="/products-services/resume-writing">
                  Resume Writing
                </FooterLink>
              </li>
              <li>
                <FooterLink href="/products-services/mock-interviews">
                  Mock Interviews
                </FooterLink>
              </li>
              <li>
                <FooterLink href="/products-services/interview-preparation-help">
                  Interview Preparation
                </FooterLink>
              </li>
              <li>
                <FooterLink href="/products-services/linkedin-optimization">
                  LinkedIn Optimization
                </FooterLink>
              </li>
              <li>
                <FooterLink href="/products-services/website-portfolio">
                  Website Portfolio
                </FooterLink>
              </li>
            </ul>
          </nav>

          <nav aria-label="Resources navigation">
            <h4 className="text-white font-['Geologica'] font-semibold text-sm uppercase tracking-wider mb-4">
              Resources
            </h4>
            <ul className="space-y-3">
              <li>
                <FooterLink href="/faq">FAQ</FooterLink>
              </li>
              <li>
                <FooterLink href="/blog">Blog</FooterLink>
              </li>
              <li>
                <FooterLink href="/community">Community</FooterLink>
              </li>
              <li>
                <FooterLink href="/interview-prep">Interview Prep</FooterLink>
              </li>
              <li>
                <FooterLink href="/learning-center">Learning Center</FooterLink>
              </li>
              <li>
                <FooterLink href="/#testimonials">Testimonials</FooterLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-4 sm:py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-sm text-white/70 font-['Geologica']">
              © {new Date().getFullYear()} FirstStep. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-white/70 font-['Geologica']">
              <FooterLink href="/privacypolicy" className={bottomLinkClass}>
                Privacy Policy
              </FooterLink>
              <FooterLink href="/faq" className={bottomLinkClass}>
                FAQs
              </FooterLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
