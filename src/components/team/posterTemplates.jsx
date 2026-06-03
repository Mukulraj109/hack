function PosterGlyph({ name, className = "poster-glyph" }) {
  const paths = {
    rocket:
      "M12 2.5l1.8 5.4L19 9.3l-5.2 1.4L12 16l-1.8-5.3L5 9.3l5.2-1.4L12 2.5zM12 14.5v5.5M9 18h6",
    bolt: "M13 2L4 14h7l-1 8 9-12h-7l1-8z",
    person:
      "M12 12a4 4 0 100-8 4 4 0 000 8zm-7 9a7 7 0 0114 0H5z",
    groups:
      "M9 11a3 3 0 100-6 3 3 0 000 6zm8 2a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM3 20a5 5 0 0110 0H3zm11 0a4 4 0 018 0h-8z",
    code: "M8 8l-4 4 4 4M16 8l4 4-4 4M14 6l-4 12",
    fire: "M12 3s3 3.5 3 7a3 3 0 11-6 0c0-3.5 3-7 3-7zm0 14a4 4 0 004-4c0-2.5-2-4.5-2-4.5S12 10.5 12 13a4 4 0 004 4z",
  };

  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d={paths[name] || paths.person} />
    </svg>
  );
}

export function PosterAvatar({ url, alt, className = "team-poster-avatar", dark = true }) {
  return (
    <div
      className={className}
      style={{
        border: dark ? "1px solid rgba(255, 255, 255, 0.35)" : "2px solid #000",
        background: dark ? "rgba(255, 255, 255, 0.1)" : "#fff",
      }}
    >
      {url ? (
        <img
          src={url}
          alt={alt}
          className="team-poster-avatar__img"
          loading="eager"
          referrerPolicy="no-referrer"
        />
      ) : (
        <PosterGlyph name="person" className="poster-glyph poster-glyph--avatar" />
      )}
    </div>
  );
}

function MemberAvatars({ members, memberNames, dark = true, max = 4 }) {
  const preview = members.slice(0, max);
  return (
    <>
      <div className="team-poster-avatars">
        {preview.map((member) => (
          <PosterAvatar
            key={member.id}
            url={member.headshotUrl}
            alt={`${member.displayName || "Member"} headshot`}
            dark={dark}
          />
        ))}
      </div>
      {memberNames ? (
        <p className={`team-poster-member-names ${dark ? "is-dark" : "is-light"}`}>{memberNames}</p>
      ) : null}
    </>
  );
}

export function IgDarkBuilders({ teamTitle, memberNames, members, hashtag }) {
  return (
    <div className="ig-cyber-mesh poster-tpl">
      <div className="poster-noise-overlay" aria-hidden />
      <div className="ig-cyber-mesh__bg" aria-hidden />
      <div className="ig-cyber-mesh__content">
        <div className="ig-cyber-mesh__badge-row">
          <PosterGlyph name="rocket" className="poster-glyph poster-glyph--teal" />
          <p className="poster-eyebrow">100 HR SPRINT · FIRSTSTEP</p>
        </div>
        <div className="ig-cyber-mesh__glass">
          <h4 className="ig-cyber-mesh__headline">
            THE NEXT
            <br />
            BUILDERS.
          </h4>
          <MemberAvatars members={members} memberNames={memberNames} max={4} />
          <div className="poster-divider" />
          <div className="poster-footer-row">
            <p className="poster-team-name">{teamTitle}</p>
            <p className="poster-tag poster-tag--teal">{hashtag}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function IgNeonGrid({ teamTitle, memberNames, members, hashtag }) {
  return (
    <div className="ig-neon-grid poster-tpl">
      <div className="ig-neon-grid__sun" aria-hidden />
      <div className="ig-neon-grid__perspective" aria-hidden />
      <div className="poster-noise-overlay" aria-hidden />
      <div className="ig-neon-grid__content">
        <div className="ig-neon-grid__top">
          <span className="ig-neon-grid__chip">FIRSTSTEP HACKATHON</span>
          <span className="ig-neon-grid__chip ig-neon-grid__chip--alt">100 HRS</span>
        </div>
        <div className="ig-neon-grid__center">
          <p className="ig-neon-grid__eyebrow">WE ARE</p>
          <h4 className="ig-neon-grid__title">{teamTitle}</h4>
          <MemberAvatars members={members} memberNames={memberNames} max={4} />
        </div>
        <p className="poster-tag poster-tag--neon">{hashtag}</p>
      </div>
    </div>
  );
}

export function IgLightMinimal({ teamTitle, memberNames, members, hashtag }) {
  const count = members.length;
  return (
    <div className="ig-bento poster-tpl">
      <div className="ig-bento__hero">
        <span className="ig-bento__watermark" aria-hidden>100</span>
        <div className="ig-bento__hero-top">
          <div className="ig-bento__brand">
            <PosterGlyph name="bolt" className="poster-glyph" />
            <span className="ig-bento__brand-text">FIRSTSTEP HACKATHON</span>
          </div>
          <span className="ig-bento__live">
            <span className="ig-bento__live-dot" aria-hidden />
            LIVE
          </span>
        </div>
        <div className="ig-bento__hero-main">
          <p className="ig-bento__eyebrow">WE ARE TEAM</p>
          <h4 className="ig-bento__title">{teamTitle}</h4>
          <p className="ig-bento__sub">Shipping the future in 100 hours at FirstStep.</p>
        </div>
      </div>
      <div className="ig-bento__row">
        <div className="ig-bento__cell ig-bento__cell--avatars">
          <p className="ig-bento__cell-label">THE SQUAD</p>
          <MemberAvatars members={members} memberNames="" max={4} />
          <p className="ig-bento__names">{memberNames}</p>
        </div>
        <div className="ig-bento__cell ig-bento__cell--stat">
          <span className="ig-bento__stat-num">{count}</span>
          <span className="ig-bento__stat-label">{count === 1 ? "BUILDER" : "BUILDERS"}</span>
        </div>
      </div>
      <div className="ig-bento__cell ig-bento__tagbar">
        <PosterGlyph name="code" className="poster-glyph" />
        <p className="poster-tag poster-tag--teal">{hashtag}</p>
      </div>
    </div>
  );
}

export function IgPhotoStrip({ teamTitle, memberNames, members, hashtag }) {
  const marquee = "SHIP IN 100 HOURS  ✦  FIRSTSTEP HACKATHON  ✦  ";
  return (
    <div className="ig-brutal poster-tpl">
      <div className="ig-brutal__marquee">
        <div className="ig-brutal__marquee-inner">
          <span>{marquee}{marquee}</span>
          <span>{marquee}{marquee}</span>
        </div>
      </div>
      <div className="ig-brutal__body">
        <div className="ig-brutal__head">
          <span className="ig-brutal__kicker">★ TEAM</span>
          <h4 className="ig-brutal__title">{teamTitle}</h4>
          <div className="ig-brutal__tags">
            <span className="ig-brutal__sticker">HACKATHON</span>
            <span className="ig-brutal__sticker ig-brutal__sticker--pink">BUILDERS</span>
          </div>
        </div>

        <div className="ig-brutal__statement">
          <span className="ig-brutal__statement-top">SHIP IN</span>
          <span className="ig-brutal__statement-num">
            100<small>HRS</small>
          </span>
        </div>

        <div className="ig-brutal__crew">
          <MemberAvatars members={members} memberNames="" dark={false} max={4} />
          <p className="ig-brutal__names">{memberNames}</p>
        </div>
      </div>
      <div className="ig-brutal__footer">
        <span className="ig-brutal__hash">{hashtag}</span>
        <PosterGlyph name="rocket" className="poster-glyph poster-glyph--dark poster-glyph--lg" />
      </div>
    </div>
  );
}

export function LiCorporate({ teamTitle, memberNames, members, hashtag }) {
  return (
    <div className="li-fluid poster-tpl">
      <div className="poster-noise-overlay" aria-hidden />
      <div className="li-fluid__blob1" aria-hidden />
      <div className="li-fluid__blob2" aria-hidden />
      <div className="li-fluid__content">
        <div className="li-fluid__top">
          <div className="li-fluid__brand">
            <div className="li-fluid__brand-bar" />
            <p className="poster-eyebrow poster-eyebrow--brand">FIRSTSTEP HACKATHON</p>
          </div>
          <p className="poster-tag poster-tag--brand">{hashtag}</p>
        </div>
        <h4 className="li-fluid__title">{teamTitle}</h4>
        <div className="li-fluid__bottom">
          <div>
            <p className="poster-eyebrow poster-eyebrow--muted">TEAM MEMBERS</p>
            <MemberAvatars members={members} memberNames={memberNames} dark={false} max={4} />
          </div>
          <PosterGlyph name="code" className="poster-glyph poster-glyph--brand poster-glyph--watermark" />
        </div>
      </div>
    </div>
  );
}

export function LiGradientHero({ teamTitle, memberNames, members, hashtag }) {
  return (
    <div className="li-aura poster-tpl">
      <div className="poster-noise-overlay" aria-hidden />
      <div className="li-aura__glow" aria-hidden />
      <div className="li-aura__card">
        <p className="poster-eyebrow poster-eyebrow--teal">WE ARE BUILDING</p>
        <h4 className="li-aura__title">{teamTitle}</h4>
        <MemberAvatars members={members} memberNames={memberNames} max={4} />
        <div className="li-aura__tag-pill">
          <p className="poster-tag poster-tag--teal">{hashtag}</p>
        </div>
      </div>
    </div>
  );
}

export function LiSplit({ teamTitle, memberNames, members, hashtag }) {
  return (
    <div className="li-split-neo poster-tpl">
      <div className="poster-noise-overlay" aria-hidden />
      <div className="li-split-neo__left">
        <PosterGlyph name="fire" className="poster-glyph poster-glyph--teal poster-glyph--xl" />
        <div className="li-split-neo__badge">100 HR SPRINT</div>
      </div>
      <div className="li-split-neo__right">
        <div>
          <p className="poster-eyebrow poster-eyebrow--muted">TEAM SPOTLIGHT</p>
          <h4 className="li-split-neo__title">{teamTitle}</h4>
        </div>
        <div>
          <MemberAvatars members={members} memberNames={memberNames} dark={false} max={4} />
          <div className="poster-divider poster-divider--dark" />
          <p className="poster-tag poster-tag--brand">{hashtag}</p>
        </div>
      </div>
    </div>
  );
}

export function LiMono({ teamTitle, memberNames, members, hashtag }) {
  return (
    <div className="li-matrix poster-tpl">
      <div className="poster-noise-overlay" aria-hidden />
      <div className="li-matrix__dots" aria-hidden />
      <div className="li-matrix__body">
        <p className="poster-eyebrow poster-eyebrow--dim">SYSTEM.INIT()</p>
        <h4 className="li-matrix__title">{teamTitle}</h4>
        <p className="li-matrix__subtitle">We&apos;re hacking the future at FirstStep.</p>
      </div>
      <div className="li-matrix__glass-footer">
        <div>
          <p className="poster-eyebrow poster-eyebrow--dim">EXECUTING THREADS</p>
          <MemberAvatars members={members} memberNames={memberNames} max={4} />
        </div>
        <div className="li-matrix__tag-col">
          <p className="poster-tag poster-tag--teal">{hashtag}</p>
        </div>
      </div>
    </div>
  );
}

export const INSTAGRAM_TEMPLATES = [
  { id: "ig-dark-builders", label: "Cyber Mesh", component: IgDarkBuilders },
  { id: "ig-neon-grid", label: "Neon Grid", component: IgNeonGrid },
  { id: "ig-light-minimal", label: "Bento Clean", component: IgLightMinimal },
  { id: "ig-photo-strip", label: "Brutal Marquee", component: IgPhotoStrip },
];

export const LINKEDIN_TEMPLATES = [
  { id: "li-corporate", label: "Fluid Gradient", component: LiCorporate },
  { id: "li-gradient-hero", label: "Aura Glass", component: LiGradientHero },
  { id: "li-split", label: "Neo Brutal", component: LiSplit },
  { id: "li-mono", label: "Matrix Core", component: LiMono },
];

export function getTemplatesForPlatform(platform) {
  return platform === "linkedin" ? LINKEDIN_TEMPLATES : INSTAGRAM_TEMPLATES;
}

export function getTemplateById(platform, templateId) {
  const list = getTemplatesForPlatform(platform);
  return list.find((t) => t.id === templateId) ?? list[0];
}

export function defaultTemplateId(platform) {
  return platform === "linkedin" ? "li-corporate" : "ig-dark-builders";
}
