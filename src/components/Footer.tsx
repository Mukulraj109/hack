import type { ReactNode } from "react";

const BASE = "https://firststepjob.com";

const iconProps = {
  width: 22,
  height: 22,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function InstagramIcon() {
  return (
    <svg {...iconProps} aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg {...iconProps} aria-hidden>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-13h4v2" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg {...iconProps} aria-hidden>
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-2C18.88 4 12 4 12 4s-6.88 0-8.59.42a2.78 2.78 0 0 0-1.95 2 29 29 0 0 0-.46 5.58 29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 2C5.12 20 12 20 12 20s6.88 0 8.59-.42a2.78 2.78 0 0 0 1.95-2 29 29 0 0 0 .46-5.58 29 29 0 0 0-.46-5.58z" />
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
    </svg>
  );
}

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
                href="https://www.instagram.com/firststepjob/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white transition-colors duration-200"
              >
                <InstagramIcon />
              </a>
              <a
                href="https://www.linkedin.com/company/firststepjob/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white transition-colors duration-200"
              >
                <LinkedinIcon />
              </a>
              <a
                href="https://www.youtube.com/@FirstStepJob"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white transition-colors duration-200"
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
