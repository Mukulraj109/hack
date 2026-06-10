const LOGO_SRC = "/firststep-logo.png";

const HASHTAGS = ["#ShipIn100Hrs", "#CodeToCareer", "#FirstStepHackathon"];

// Illustrated fallbacks (public/*.png) used when a member has no headshot.
// People-first ordering so solo cards get a character-style doodle.
const PLACEHOLDERS = [
  "/p8.png",
  "/p1.png",
  "/p2.png",
  "/p4.png",
  "/p6.png",
  "/p7.png",
  "/p9.png",
  "/p3.png",
  "/p5.png",
];

function cx(...parts) {
  return parts.filter(Boolean).join(" ");
}

function stableIndex(key, mod) {
  const str = String(key || "");
  let hash = 0;
  for (let i = 0; i < str.length; i += 1) {
    hash = (hash * 31 + str.charCodeAt(i)) >>> 0;
  }
  return hash % mod;
}

function placeholderFor(member, index) {
  if (member.headshotUrl) return null;
  const key = member.id ?? member.displayName ?? index;
  return PLACEHOLDERS[stableIndex(`${key}-${index}`, PLACEHOLDERS.length)];
}

function resolveName(member) {
  if (member.displayName) return member.displayName;
  const joined = [member.firstName, member.lastName].filter(Boolean).join(" ").trim();
  return joined || member.email || "Teammate";
}

function prepareMembers(members) {
  const list = (members || [])
    .filter(Boolean)
    .slice(0, 2)
    .map((m, i) => ({
      id: m.id ?? `member-${i}`,
      displayName: resolveName(m),
      headshotUrl: m.headshotUrl || "",
      role: m.role || (m.isLeader ? "Team Captain" : "Builder"),
    }));

  if (!list.length) {
    list.push({ id: "captain", displayName: "Team Captain", headshotUrl: "", role: "Team Captain" });
  }
  return list;
}

function formatShortName(teamTitle) {
  return (teamTitle || "YOUR TEAM").replace(/^team\s+/i, "").toUpperCase();
}

/* ---------- Shared primitives ---------- */

function PosterLogo({ tone = "light", className = "" }) {
  if (tone === "dark") {
    return (
      <span className={cx("tpl-logo-chip", className)}>
        <img src={LOGO_SRC} alt="FirstStep" className="tpl-logo-chip__img" />
      </span>
    );
  }
  return <img src={LOGO_SRC} alt="FirstStep" className={cx("tpl-logo", className)} />;
}

export function PosterAvatar({ member, index = 0, shape = "circle", className = "" }) {
  const placeholder = placeholderFor(member, index);
  const src = member.headshotUrl || placeholder;
  return (
    <div
      className={cx(
        "tpl-avatar",
        `tpl-avatar--${shape}`,
        placeholder && "tpl-avatar--illustration",
        className
      )}
    >
      {src ? (
        <img
          src={src}
          alt={member.displayName}
          className="tpl-avatar__img"
          loading="eager"
          referrerPolicy="no-referrer"
        />
      ) : (
        <span className="tpl-avatar__initial">{(member.displayName || "?").charAt(0)}</span>
      )}
    </div>
  );
}

function PosterHashtags({ variant = "stack" }) {
  return (
    <div className={cx("tpl-tags", `tpl-tags--${variant}`)}>
      {HASHTAGS.map((tag) => (
        <span key={tag} className="tpl-tags__item">
          {tag}
        </span>
      ))}
    </div>
  );
}

function FooterLinks({ tone = "light" }) {
  return (
    <div className={cx("tpl-links", `tpl-links--${tone}`)}>
      <span>@firststepjob</span>
      <span>firststepjob.com</span>
    </div>
  );
}

function TealFooterLinks() {
  return (
    <div className="tpl-teal__footer-brand">
      <span className="tpl-teal__footer-label">Follow us</span>
      <span className="tpl-teal__footer-handle">@firststepjob</span>
      <span className="tpl-teal__footer-url">firststepjob.com</span>
    </div>
  );
}

/* ---------- Member building blocks ---------- */

function SoftCard({ member, index, variant }) {
  return (
    <div className={cx("tpl-soft-card", `tpl-soft-card--${variant}`)}>
      <PosterAvatar member={member} index={index} shape="rounded" className="tpl-soft-card__avatar" />
      <div className="tpl-soft-card__info">
        <p className="tpl-soft-card__name">{member.displayName}</p>
        <p className="tpl-soft-card__role">{member.role}</p>
        <span className="tpl-soft-card__handle">@firststepjob</span>
      </div>
    </div>
  );
}

function DarkFrame({ member, index, align }) {
  return (
    <div className={cx("tpl-dark-frame", `tpl-dark-frame--${align}`)}>
      <div className="tpl-dark-frame__stack">
        <span className="tpl-dark-frame__shadow" aria-hidden />
        <PosterAvatar member={member} index={index} shape="frame" className="tpl-dark-frame__photo" />
      </div>
      <div className="tpl-dark-frame__meta">
        <p className="tpl-dark-frame__name">{member.displayName}</p>
        <p className="tpl-dark-frame__role">{member.role}</p>
      </div>
    </div>
  );
}

function MemberTile({ member, index, tone = "glass" }) {
  return (
    <div className={cx("tpl-tile", `tpl-tile--${tone}`)}>
      <PosterAvatar member={member} index={index} shape="circle" className="tpl-tile__avatar" />
      <p className="tpl-tile__name">{member.displayName}</p>
      <p className="tpl-tile__role">{member.role}</p>
    </div>
  );
}

function EditorialRow({ member, index, tone }) {
  return (
    <div className={cx("tpl-ed-row", `tpl-ed-row--${tone}`)}>
      <PosterAvatar member={member} index={index} shape="rounded" className="tpl-ed-row__avatar" />
      <div className="tpl-ed-row__info">
        <p className="tpl-ed-row__name">{member.displayName}</p>
        <p className="tpl-ed-row__role">{member.role} · Hackathon 2026</p>
      </div>
    </div>
  );
}

/* ---------- Templates ---------- */

function SoftPastel({ teamTitle, members, layout = "story" }) {
  const list = prepareMembers(members);
  const solo = list.length === 1;
  return (
    <div className={cx("tpl tpl-soft poster-tpl", layout === "square" && "tpl--square", solo && "is-solo")}>
      <span className="tpl-soft__blob tpl-soft__blob--a" aria-hidden />
      <span className="tpl-soft__blob tpl-soft__blob--b" aria-hidden />

      <header className="tpl-soft__head">
        <PosterLogo tone="light" className="tpl-soft__logo" />
        <p className="tpl-soft__event">Annual Hackathon 2026</p>
      </header>

      <div className="tpl-soft__title-wrap">
        <p className="tpl-soft__eyebrow">MEET</p>
        <h3 className="tpl-soft__title">{teamTitle}</h3>
      </div>

      <div className="tpl-soft__members">
        {solo ? (
          <SoftCard member={list[0]} index={0} variant="solo" />
        ) : (
          <>
            <SoftCard member={list[0]} index={0} variant="a" />
            <SoftCard member={list[1]} index={1} variant="b" />
          </>
        )}
      </div>

      <footer className="tpl-soft__footer">
        <FooterLinks tone="light" />
        <PosterHashtags variant="stack" />
      </footer>
    </div>
  );
}

function BoldDark({ teamTitle, members, layout = "story" }) {
  const list = prepareMembers(members);
  const solo = list.length === 1;
  const shortName = formatShortName(teamTitle);
  return (
    <div className={cx("tpl tpl-dark poster-tpl", layout === "square" && "tpl--square", solo && "is-solo")}>
      <span className="tpl-dark__grad tpl-dark__grad--top" aria-hidden />
      <span className="tpl-dark__grad tpl-dark__grad--bottom" aria-hidden />

      <header className="tpl-dark__head">
        <p className="tpl-dark__eyebrow">MEET TEAM</p>
        <div className="tpl-dark__title-row">
          <span className="tpl-dark__slashes" aria-hidden>////</span>
          <h3 className="tpl-dark__title">{shortName}</h3>
          <span className="tpl-dark__slashes" aria-hidden>////</span>
        </div>
      </header>

      <div className="tpl-dark__stage">
        {solo ? (
          <>
            <DarkFrame member={list[0]} index={0} align="center" />
            <div className="tpl-dark__bubble tpl-dark__bubble--solo">
              <PosterHashtags variant="bubble" />
            </div>
          </>
        ) : (
          <>
            <DarkFrame member={list[0]} index={0} align="left" />
            <div className="tpl-dark__bubble">
              <PosterHashtags variant="bubble" />
            </div>
            <DarkFrame member={list[1]} index={1} align="right" />
          </>
        )}
      </div>

      <footer className="tpl-dark__footer">
        <span className="tpl-dark__rule" aria-hidden />
        <span className="tpl-dark__site">FIRSTSTEPJOB.COM</span>
        <span className="tpl-dark__rule" aria-hidden />
        <PosterLogo tone="dark" className="tpl-dark__logo" />
      </footer>
    </div>
  );
}

function TealMemberCard({ member, index, variant = "a" }) {
  return (
    <div className={cx("tpl-teal-card", `tpl-teal-card--${variant}`)}>
      <span className="tpl-teal-card__glow" aria-hidden />
      <span className="tpl-teal-card__corner tpl-teal-card__corner--tl" aria-hidden />
      <span className="tpl-teal-card__corner tpl-teal-card__corner--tr" aria-hidden />
      <span className="tpl-teal-card__corner tpl-teal-card__corner--bl" aria-hidden />
      <span className="tpl-teal-card__corner tpl-teal-card__corner--br" aria-hidden />
      <div className="tpl-teal-card__avatar-wrap">
        <span className="tpl-teal-card__ring" aria-hidden />
        <PosterAvatar member={member} index={index} shape="circle" className="tpl-teal-card__avatar" />
      </div>
      <div className="tpl-teal-card__meta">
        <p className="tpl-teal-card__name">{member.displayName}</p>
        <span className="tpl-teal-card__role">{member.role}</span>
      </div>
    </div>
  );
}

function TealBrand({ teamTitle, members, layout = "story" }) {
  const list = prepareMembers(members);
  const solo = list.length === 1;
  const shortName = formatShortName(teamTitle);
  return (
    <div className={cx("tpl tpl-teal poster-tpl", layout === "square" && "tpl--square", solo && "is-solo")}>
      <span className="tpl-teal__vignette" aria-hidden />
      <span className="tpl-teal__mesh" aria-hidden />
      <span className="tpl-teal__stripes" aria-hidden />
      <span className="tpl-teal__glow tpl-teal__glow--tl" aria-hidden />
      <span className="tpl-teal__glow tpl-teal__glow--br" aria-hidden />
      <span className="tpl-teal__glow tpl-teal__glow--center" aria-hidden />
      <span className="tpl-teal__dots" aria-hidden />
      <span className="tpl-teal__shine" aria-hidden />
      <span className="tpl-teal__frame" aria-hidden />

      <div className="tpl-teal__ribbon">
        <span className="tpl-teal__ribbon-dot" aria-hidden />
        FIRSTSTEP HACKATHON 2026
        <span className="tpl-teal__ribbon-dot" aria-hidden />
      </div>

      <header className="tpl-teal__head">
        <PosterLogo tone="dark" className="tpl-teal__logo" />
        <span className="tpl-teal__badge">WE ARE TEAM</span>
        <div className="tpl-teal__title-row">
          <span className="tpl-teal__glyph" aria-hidden>///</span>
          <h3 className="tpl-teal__title">{shortName}</h3>
          <span className="tpl-teal__glyph" aria-hidden>///</span>
        </div>
        <p className="tpl-teal__sub">100-Hour Remote Sprint · Ship in 100 Hrs</p>
      </header>

      <div className={cx("tpl-teal__members", solo && "is-solo")}>
        {solo ? (
          <TealMemberCard member={list[0]} index={0} variant="hero" />
        ) : (
          <>
            <TealMemberCard member={list[0]} index={0} variant="a" />
            <TealMemberCard member={list[1]} index={1} variant="b" />
          </>
        )}
      </div>

      <footer className="tpl-teal__footer">
        <div className="tpl-teal__footer-bar">
          <TealFooterLinks />
          <div className="tpl-teal__footer-tags">
            <PosterHashtags variant="bubble" />
          </div>
        </div>
      </footer>
    </div>
  );
}

function GradProfile({ member, index, variant = "a" }) {
  return (
    <article className={cx("tpl-grad-profile", `tpl-grad-profile--${variant}`)}>
      <span className="tpl-grad-profile__accent" aria-hidden />
      <div className="tpl-grad-profile__media">
        <PosterAvatar member={member} index={index} shape="frame" className="tpl-grad-profile__photo" />
      </div>
      <div className="tpl-grad-profile__copy">
        <span className="tpl-grad-profile__num">0{index + 1}</span>
        <p className="tpl-grad-profile__name">{member.displayName}</p>
        <p className="tpl-grad-profile__role">{member.role}</p>
      </div>
    </article>
  );
}

function DarkGradient({ teamTitle, members, layout = "story" }) {
  const list = prepareMembers(members);
  const solo = list.length === 1;
  const shortName = formatShortName(teamTitle);
  return (
    <div className={cx("tpl tpl-grad poster-tpl", layout === "square" && "tpl--square", solo && "is-solo")}>
      <span className="tpl-grad__scanlines" aria-hidden />
      <span className="tpl-grad__orb tpl-grad__orb--mag" aria-hidden />
      <span className="tpl-grad__orb tpl-grad__orb--gold" aria-hidden />
      <span className="tpl-grad__slash" aria-hidden />
      <span className="tpl-grad__watermark" aria-hidden>26</span>
      <span className="tpl-grad__side-rail" aria-hidden>100HR SPRINT</span>

      <div className="tpl-grad__shell">
        <header className="tpl-grad__head">
          <div className="tpl-grad__head-top">
            <PosterLogo tone="dark" className="tpl-grad__logo" />
            <span className="tpl-grad__chip">Hackathon 2026</span>
          </div>
          <p className="tpl-grad__eyebrow">Shipping as</p>
          <h3 className="tpl-grad__title">{shortName}</h3>
          <p className="tpl-grad__tagline">Build fast · Ship loud · Share proof</p>
        </header>

        <div className={cx("tpl-grad__stage", solo && "is-solo")}>
          {solo ? (
            <GradProfile member={list[0]} index={0} variant="hero" />
          ) : (
            <>
              <GradProfile member={list[0]} index={0} variant="a" />
              <GradProfile member={list[1]} index={1} variant="b" />
            </>
          )}
        </div>

        <footer className="tpl-grad__foot">
          <PosterHashtags variant="inline" />
          <div className="tpl-grad__foot-meta">
            <span className="tpl-grad__foot-handle">@firststepjob</span>
            <span className="tpl-grad__foot-dot" aria-hidden>◆</span>
            <span className="tpl-grad__foot-url">firststepjob.com</span>
          </div>
        </footer>
      </div>
    </div>
  );
}

function EdMember({ member, index, variant = "a" }) {
  return (
    <article className={cx("tpl-ed-member", `tpl-ed-member--${variant}`)}>
      <span className="tpl-ed-member__index">0{index + 1}</span>
      <PosterAvatar member={member} index={index} shape="rounded" className="tpl-ed-member__photo" />
      <div className="tpl-ed-member__copy">
        <p className="tpl-ed-member__name">{member.displayName}</p>
        <p className="tpl-ed-member__role">{member.role}</p>
        <span className="tpl-ed-member__tag">Hackathon 2026</span>
      </div>
    </article>
  );
}

function EdFooterLinks() {
  return (
    <div className="tpl-ed__footer-brand">
      <span className="tpl-ed__footer-handle">@firststepjob</span>
      <span className="tpl-ed__footer-dot" aria-hidden>·</span>
      <span className="tpl-ed__footer-url">firststepjob.com</span>
    </div>
  );
}

function CleanEditorial({ teamTitle, members, layout = "story" }) {
  const list = prepareMembers(members);
  const solo = list.length === 1;
  const shortName = formatShortName(teamTitle);
  return (
    <div className={cx("tpl tpl-ed poster-tpl", layout === "square" && "tpl--square", solo && "is-solo")}>
      <span className="tpl-ed__paper" aria-hidden />
      <span className="tpl-ed__column" aria-hidden />

      <header className="tpl-ed__masthead">
        <PosterLogo tone="dark" className="tpl-ed__logo" />
        <div className="tpl-ed__masthead-meta">
          <span className="tpl-ed__issue">2026</span>
          <span className="tpl-ed__event">FirstStep Hackathon</span>
        </div>
      </header>

      <div className="tpl-ed__hero">
        <p className="tpl-ed__kicker">Meet the team</p>
        <h3 className="tpl-ed__title">{shortName}</h3>
        <p className="tpl-ed__deck">100-Hour Sprint · Build · Ship · Share</p>
      </div>

      <div className={cx("tpl-ed__grid", solo && "is-solo")}>
        {solo ? (
          <EdMember member={list[0]} index={0} variant="hero" />
        ) : (
          <>
            <EdMember member={list[0]} index={0} variant="a" />
            <EdMember member={list[1]} index={1} variant="b" />
          </>
        )}
      </div>

      <footer className="tpl-ed__foot">
        <EdFooterLinks />
        <PosterHashtags variant="inline" />
      </footer>
    </div>
  );
}

function SlateMember({ member, index, variant = "a" }) {
  return (
    <article className={cx("tpl-slate-card", `tpl-slate-card--${variant}`)}>
      <span className="tpl-slate-card__bar" aria-hidden />
      <PosterAvatar member={member} index={index} shape="rounded" className="tpl-slate-card__photo" />
      <div className="tpl-slate-card__copy">
        <span className="tpl-slate-card__label">0{index + 1}</span>
        <p className="tpl-slate-card__name">{member.displayName}</p>
        <p className="tpl-slate-card__role">{member.role}</p>
      </div>
    </article>
  );
}

function SlateFooterLinks() {
  return (
    <div className="tpl-slate__footer-brand">
      <span className="tpl-slate__footer-handle">@firststepjob</span>
      <span className="tpl-slate__footer-dot" aria-hidden>·</span>
      <span className="tpl-slate__footer-url">firststepjob.com</span>
    </div>
  );
}

function BoldSlate({ teamTitle, members, layout = "story" }) {
  const list = prepareMembers(members);
  const solo = list.length === 1;
  const shortName = formatShortName(teamTitle);
  return (
    <div className={cx("tpl tpl-slate poster-tpl", layout === "square" && "tpl--square", solo && "is-solo")}>
      <span className="tpl-slate__grid" aria-hidden />
      <span className="tpl-slate__glow" aria-hidden />
      <span className="tpl-slate__tape" aria-hidden />

      <header className="tpl-slate__head">
        <div className="tpl-slate__top">
          <PosterLogo tone="dark" className="tpl-slate__logo" />
          <span className="tpl-slate__tag">100HR SPRINT</span>
        </div>
        <p className="tpl-slate__eyebrow">We are</p>
        <h3 className="tpl-slate__title">{shortName}</h3>
        <p className="tpl-slate__sub">FirstStep Hackathon 2026 · Ship in 100 Hrs</p>
      </header>

      <div className={cx("tpl-slate__stage", solo && "is-solo")}>
        {solo ? (
          <SlateMember member={list[0]} index={0} variant="hero" />
        ) : (
          <>
            <SlateMember member={list[0]} index={0} variant="a" />
            <SlateMember member={list[1]} index={1} variant="b" />
          </>
        )}
      </div>

      <footer className="tpl-slate__foot">
        <SlateFooterLinks />
        <PosterHashtags variant="inline" />
      </footer>
    </div>
  );
}

/* ---------- Platform wrappers ---------- */

export function IgSoftPastel(props) {
  return <SoftPastel {...props} layout="story" />;
}
export function IgBoldDark(props) {
  return <BoldDark {...props} layout="story" />;
}
export function IgTealBrand(props) {
  return <TealBrand {...props} layout="story" />;
}
export function IgDarkGradient(props) {
  return <DarkGradient {...props} layout="story" />;
}
export function IgCleanEditorial(props) {
  return <CleanEditorial {...props} layout="story" />;
}
export function IgBoldSlate(props) {
  return <BoldSlate {...props} layout="story" />;
}

export function LiSoftPastel(props) {
  return <SoftPastel {...props} layout="square" />;
}
export function LiBoldDark(props) {
  return <BoldDark {...props} layout="square" />;
}
export function LiTealBrand(props) {
  return <TealBrand {...props} layout="square" />;
}
export function LiDarkGradient(props) {
  return <DarkGradient {...props} layout="square" />;
}
export function LiCleanEditorial(props) {
  return <CleanEditorial {...props} layout="square" />;
}
export function LiBoldSlate(props) {
  return <BoldSlate {...props} layout="square" />;
}

export const INSTAGRAM_TEMPLATES = [
  { id: "ig-soft-pastel", label: "Soft Pastel", component: IgSoftPastel },
  { id: "ig-bold-dark", label: "Bold Dark", component: IgBoldDark },
  { id: "ig-teal-brand", label: "Teal Brand", component: IgTealBrand },
  { id: "ig-dark-gradient", label: "Dark Gradient", component: IgDarkGradient },
  { id: "ig-clean-editorial", label: "Clean Editorial", component: IgCleanEditorial },
  { id: "ig-bold-slate", label: "Bold Slate", component: IgBoldSlate },
];

export const LINKEDIN_TEMPLATES = [
  { id: "li-soft-pastel", label: "Soft Pastel", component: LiSoftPastel },
  { id: "li-bold-dark", label: "Bold Dark", component: LiBoldDark },
  { id: "li-teal-brand", label: "Teal Brand", component: LiTealBrand },
  { id: "li-dark-gradient", label: "Dark Gradient", component: LiDarkGradient },
  { id: "li-clean-editorial", label: "Clean Editorial", component: LiCleanEditorial },
  { id: "li-bold-slate", label: "Bold Slate", component: LiBoldSlate },
];

export function getTemplatesForPlatform(platform) {
  return platform === "linkedin" ? LINKEDIN_TEMPLATES : INSTAGRAM_TEMPLATES;
}

export function getTemplateById(platform, templateId) {
  const list = getTemplatesForPlatform(platform);
  return list.find((t) => t.id === templateId) ?? list[0];
}

export function defaultTemplateId(platform) {
  return platform === "linkedin" ? "li-soft-pastel" : "ig-soft-pastel";
}
