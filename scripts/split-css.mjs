import fs from "fs";

const css = fs.readFileSync("src/styles/_full-inline.css", "utf8");

// Remove legacy unused hero float/glass panel CSS (lines ~395-1047 in extracted)
const legacyStart = css.indexOf(".hero-accent-panel.hero-float-left");
const legacyEnd = css.indexOf("@media (max-width: 991px)", css.indexOf(".hero-link-cta"));
let cleaned = css;
if (legacyStart !== -1 && legacyEnd !== -1) {
  cleaned =
    css.slice(0, legacyStart) +
    css.slice(legacyEnd);
}

// Split at career section
const careerStart = cleaned.indexOf(".stats-row {");
const heroPart = cleaned.slice(0, careerStart);
const careerPart = cleaned.slice(careerStart);

// Extract nav overrides from hero part
const navStart = heroPart.indexOf(".sticky-nav .nav-logo-link");
const navEnd = heroPart.indexOf("@media (max-width: 991px)");
const navOverrides = heroPart.slice(navStart, navEnd);
const heroOnly = heroPart.slice(0, navStart) + heroPart.slice(navEnd);

function normalizeBreakpoints(text) {
  return text
    .replace(/max-width:\s*991px/g, "max-width: 1023px")
    .replace(/max-width:\s*700px/g, "max-width: 767px")
    .replace(/max-width:\s*768px/g, "max-width: 767px")
    .replace(/min-width:\s*768px/g, "min-width: 768px")
    .replace(/max-width:\s*600px/g, "max-width: 767px")
    .replace(/max-width:\s*899px/g, "max-width: 1023px");
}

const heroResponsive = `
/* Unified hero layout — tablet and below */
@media (max-width: 1023px) {
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

  .hero-center-area {
    position: relative;
    left: auto;
    top: auto;
    transform: none;
    width: 100%;
    max-width: 100%;
    order: 2;
  }

  .hero-bottom-cta {
    position: relative;
    left: auto;
    bottom: auto;
    transform: none;
    margin-top: 8px;
    order: 3;
  }

  .hero-promo-mint__title {
    white-space: normal;
    font-size: clamp(40px, 6vw, 56px);
    line-height: 1.1;
  }
}

@media (max-width: 767px) {
  .hero-center-area {
    width: 100%;
    top: 0;
  }

  .hero-timer-inline,
  .hero-hackathon-expanded {
    max-width: 100%;
  }

  .hero-hackathon-expanded {
    margin-top: clamp(8px, 1.5vh, 14px);
  }

  .hero-bottom-cta {
    width: min(92vw, 360px);
    margin-left: auto;
    margin-right: auto;
  }

  .hero-cta-group {
    flex-direction: column;
    width: 100%;
    gap: 12px;
  }

  .btn-follow,
  .btn-claim {
    width: 100%;
    border-radius: 14px;
  }

  .btn-claim {
    order: -1;
  }

  .hero-promo-mint__inner {
    padding: 16px 20px;
    gap: 14px;
  }

  .hero-promo-mint__title {
    font-size: clamp(28px, 8vw, 40px);
  }

  .hero-promo-mint__eyebrow::before,
  .hero-promo-mint__eyebrow::after {
    width: 24px;
  }

  .hero-promo-mint__caption-wrap {
    min-height: 80px;
  }

  .hero-promo-mint__caption {
    font-size: clamp(18px, 4.5vw, 24px);
  }
}

@media (min-width: 768px) and (max-width: 1023px) {
  .hero-cta-group {
    --cta-h: 52px;
    gap: 14px;
  }

  .hero-promo-mint__title {
    font-size: clamp(40px, 6vw, 56px);
  }
}

@media (min-width: 768px) {
  .hero-bottom-cta {
    bottom: clamp(18px, 4vh, 40px);
  }
}
`;

let heroCss = normalizeBreakpoints(heroOnly);
// Remove duplicate old media blocks that we've replaced
heroCss = heroCss.replace(/@media \(max-width: 480px\) \{[\s\S]*?\}\n\n/g, "");
heroCss = heroCss.replace(/@media \(max-width: 767px\) \{[\s\S]*?\.hero-promo-mint__caption \{[\s\S]*?\}\n\}/, "");
heroCss = heroCss.replace(/@media \(max-width: 1023px\) \{[\s\S]*?\.hero-proof-grid \{[\s\S]*?\}\n\}/, "");

heroCss = heroCss.trim() + "\n" + heroResponsive;

// Career fixes
let careerCss = normalizeBreakpoints(careerPart);
careerCss = careerCss.replace(
  /white-space: nowrap;/,
  "white-space: normal;"
);
careerCss += `

/* FAQ section responsive */
@media (max-width: 767px) {
  #faq-section.have-a-question .flex-container {
    flex-direction: column !important;
    gap: 24px;
    padding: 0 20px;
  }

  #faq-section .hero-image-mask-2,
  #faq-section .motion-image {
    width: 100% !important;
    max-width: 100% !important;
  }

  #faq-section .div-block-7 {
    text-align: center;
    align-items: center;
  }
}

/* Sponsors grid responsive */
@media (max-width: 767px) {
  #gallery.sponsors .cards-grid-container {
    grid-template-columns: 1fr !important;
    gap: 16px !important;
  }

  .sponsor-name-card {
    padding: 20px;
  }
}

@media (min-width: 768px) and (max-width: 1023px) {
  #gallery.sponsors .cards-grid-container {
    grid-template-columns: repeat(2, 1fr) !important;
  }
}
`;

fs.writeFileSync("src/styles/hero.css", heroCss);
fs.writeFileSync("src/styles/career.css", careerCss.trim());
console.log("Wrote hero.css and career.css");
