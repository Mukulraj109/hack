const MIN_DURATION_MS = 400;
const MAX_DURATION_MS = 650;
const MS_PER_PX = 0.35;

let activeAnimation: number | null = null;

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function easeOutCubic(t: number): number {
  return 1 - (1 - t) ** 3;
}

export function getNavOffset(): number {
  const nav = document.getElementById("nav");
  if (nav) {
    return Math.ceil(nav.getBoundingClientRect().height);
  }
  return 104;
}

function cancelActiveScroll(): void {
  if (activeAnimation !== null) {
    cancelAnimationFrame(activeAnimation);
    activeAnimation = null;
  }
}

function updateHash(id: string): void {
  const hash = `#${id}`;
  if (window.location.hash === hash) return;
  history.replaceState(null, "", hash);
}

export function scrollToSection(id: string): void {
  const element = document.getElementById(id);
  if (!element) return;

  cancelActiveScroll();

  const startTop = window.scrollY;
  const targetTop = Math.max(
    0,
    element.getBoundingClientRect().top + startTop - getNavOffset(),
  );
  const distance = Math.abs(targetTop - startTop);

  updateHash(id);

  if (distance < 2 || prefersReducedMotion()) {
    window.scrollTo(0, targetTop);
    return;
  }

  const duration = Math.min(
    MAX_DURATION_MS,
    Math.max(MIN_DURATION_MS, distance * MS_PER_PX),
  );
  const startTime = performance.now();

  const step = (now: number) => {
    const elapsed = now - startTime;
    const progress = Math.min(1, elapsed / duration);
    const eased = easeOutCubic(progress);
    window.scrollTo(0, startTop + (targetTop - startTop) * eased);

    if (progress < 1) {
      activeAnimation = requestAnimationFrame(step);
    } else {
      activeAnimation = null;
      window.scrollTo(0, targetTop);
    }
  };

  activeAnimation = requestAnimationFrame(step);
}

export function handleSectionLinkClick(
  event: MouseEvent,
  id: string,
): void {
  if (
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  ) {
    return;
  }
  event.preventDefault();
  scrollToSection(id);
}
