import { INSTAGRAM_URL, LINKEDIN_URL } from "../config/socialLinks";
import { InstagramIcon, LinkedinIcon } from "./SocialIcons";
import "../styles/social-follow.css";

function FollowPill({ href, platform, icon: Icon, className = "", iconSize = 16, label }) {
  const platformLabel = platform === "instagram" ? "Instagram" : "LinkedIn";
  const text = label ?? platformLabel;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`social-follow-pill social-follow-pill--${platform} ${className}`.trim()}
      aria-label={`Follow FirstStep on ${platformLabel} (opens in new tab)`}
    >
      <Icon size={iconSize} />
      <span>{text}</span>
    </a>
  );
}

export default function SocialFollowLinks({
  variant = "hero-compact",
  instagramUrl = INSTAGRAM_URL,
  linkedinUrl = LINKEDIN_URL,
  showDisclaimer = false,
  className = "",
}) {
  const pills = (
    <div className="social-follow-pills">
      <FollowPill href={instagramUrl} platform="instagram" icon={InstagramIcon} />
      <FollowPill href={linkedinUrl} platform="linkedin" icon={LinkedinIcon} />
    </div>
  );

  if (variant === "sprint-card") {
    return (
      <div className={`social-follow social-follow--sprint-card ${className}`.trim()}>
        <div className="social-follow--sprint-card__header">
          <div className="social-follow--sprint-card__icon-wrap">
            <span className="material-symbols-outlined social-follow--sprint-card__icon" aria-hidden>
              campaign
            </span>
          </div>
          <h4 className="social-follow--sprint-card__title">Join the community</h4>
        </div>
        <p className="social-follow--sprint-card__body">
          Get sprint updates, hiring stories &amp; career tips from FirstStep.
        </p>
        <div className="social-follow-pills social-follow-pills--sprint">
          <FollowPill
            href={instagramUrl}
            platform="instagram"
            icon={InstagramIcon}
            iconSize={18}
            label="Instagram"
          />
          <FollowPill
            href={linkedinUrl}
            platform="linkedin"
            icon={LinkedinIcon}
            iconSize={18}
            label="LinkedIn"
          />
        </div>
        {showDisclaimer && (
          <div className="social-follow--sprint-card__disclaimer">
            <span className="material-symbols-outlined" aria-hidden>info</span>
            <span>Not related to points.</span>
          </div>
        )}
      </div>
    );
  }

  if (variant === "inline-row") {
    return (
      <section
        className={`social-follow social-follow--inline-row ${className}`.trim()}
        aria-label="Follow FirstStep on social media"
      >
        <div className="social-follow--inline-row__content">
          <div className="social-follow--inline-row__text">
            <p className="social-follow--inline-row__eyebrow">
              <span className="material-symbols-outlined" aria-hidden>campaign</span>
              Stay connected
            </p>
            <h3 className="social-follow--inline-row__title">Join the FirstStep Community</h3>
            <p className="social-follow--inline-row__copy">
              Get daily sprint highlights, career tips, and behind-the-scenes access.
            </p>
          </div>
          <div className="social-follow-pills social-follow-pills--prominent">
            <FollowPill
              href={instagramUrl}
              platform="instagram"
              icon={InstagramIcon}
              iconSize={24}
              label="Instagram"
            />
            <FollowPill
              href={linkedinUrl}
              platform="linkedin"
              icon={LinkedinIcon}
              iconSize={24}
              label="LinkedIn"
            />
          </div>
        </div>
      </section>
    );
  }

  return (
    <div
      className={`social-follow social-follow--hero-compact ${className}`.trim()}
      aria-label="Follow FirstStep on social media"
    >
      <p className="social-follow--hero-compact__copy">
        Follow us for updates &amp; hiring stories
      </p>
      {pills}
    </div>
  );
}
