import { useEffect } from "react";
import { createPortal } from "react-dom";

export default function SprintUnderReviewGateModal({ onRefresh }) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.body.classList.add("hackathon-form-modal-open");

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.classList.remove("hackathon-form-modal-open");
    };
  }, []);

  return createPortal(
    <div
      className="hackathon-reg-modal__backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="sprint-review-title"
    >
      <div
        className="hackathon-reg-modal hackathon-reg-modal--pending"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="hackathon-reg-modal__header">
          <div className="hackathon-reg-modal__header-copy">
            <p className="hackathon-reg-modal__eyebrow">Hackathon 2026</p>
            <h2 id="sprint-review-title" className="hackathon-reg-modal__title">
              Under Review
            </h2>
          </div>
        </header>

        <div className="hackathon-reg-modal__body hackathon-reg-modal__body--gate">
          <p className="hackathon-reg-banner__pending-title">Registration received</p>
          <p className="hackathon-reg-banner__pending-text">
            Your registration is under review. Our team typically reviews applications within{" "}
            <strong>24 hours</strong>. You&apos;ll get full access to the Hackathon Portal once approved.
          </p>
        </div>

        {onRefresh && (
          <footer className="hackathon-reg-modal__footer">
            <p className="hackathon-reg-modal__hint">We&apos;ll check for updates automatically.</p>
            <div className="hackathon-reg-modal__footer-actions">
              <button
                type="button"
                className="hackathon-reg-form__btn hackathon-reg-form__btn--primary"
                onClick={onRefresh}
              >
                Check status now
              </button>
            </div>
          </footer>
        )}
      </div>
    </div>,
    document.body
  );
}
