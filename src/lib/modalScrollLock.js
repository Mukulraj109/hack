/**
 * Locks page scroll while a modal is open — works on iOS/mobile where
 * overflow:hidden alone does not stop background scrolling.
 */

const SCROLL_LOCK_CLASS = "hackathon-form-modal-open";
const SCROLLABLE_SELECTOR =
  ".hackathon-faq__content, .hackathon-faq__nav, .hackathon-faq__chips, .hackathon-reg-modal__body, .recruiter-lineup-modal__body";

let lockCount = 0;
let savedScrollY = 0;
let touchMoveHandler = null;

function preventBackgroundTouchMove(event) {
  const target = event.target;
  if (!(target instanceof Element)) {
    event.preventDefault();
    return;
  }

  if (!target.closest(SCROLLABLE_SELECTOR)) {
    event.preventDefault();
  }
}

export function lockPageScroll() {
  if (lockCount === 0) {
    savedScrollY = window.scrollY || document.documentElement.scrollTop || 0;
    const { documentElement: html, body } = document;

    html.classList.add(SCROLL_LOCK_CLASS);
    body.classList.add(SCROLL_LOCK_CLASS);

    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${savedScrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";

    touchMoveHandler = preventBackgroundTouchMove;
    document.addEventListener("touchmove", touchMoveHandler, { passive: false });
  }

  lockCount += 1;
}

export function unlockPageScroll() {
  if (lockCount <= 0) return;

  lockCount -= 1;
  if (lockCount > 0) return;

  const { documentElement: html, body } = document;

  if (touchMoveHandler) {
    document.removeEventListener("touchmove", touchMoveHandler);
    touchMoveHandler = null;
  }

  html.classList.remove(SCROLL_LOCK_CLASS);
  body.classList.remove(SCROLL_LOCK_CLASS);

  html.style.overflow = "";
  body.style.overflow = "";
  body.style.position = "";
  body.style.top = "";
  body.style.left = "";
  body.style.right = "";
  body.style.width = "";

  window.scrollTo(0, savedScrollY);
}
