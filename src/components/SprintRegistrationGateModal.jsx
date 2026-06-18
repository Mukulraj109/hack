import { useEffect } from "react";
import { createPortal } from "react-dom";

export default function SprintRegistrationGateModal({ user, onClaimSpot, onRefresh }) {
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
      aria-labelledby="sprint-gate-title"
    >
      <div className="hackathon-reg-modal hackathon-reg-modal--gate" onClick={(e) => e.stopPropagation()}>
        <header className="hackathon-reg-modal__header">
          <div className="hackathon-reg-modal__header-copy">
            <p className="hackathon-reg-modal__eyebrow">Hackathon 2026</p>
            <h2 id="sprint-gate-title" className="hackathon-reg-modal__title">
              Registration
            </h2>
            <p className="hackathon-reg-modal__email">
              Complete registration to access the Hackathon Portal.
            </p>
            {user?.email && (
              <p className="hackathon-reg-modal__email">
                Sign in email: <strong>{user.email}</strong>
              </p>
            )}
          </div>
        </header>

        <div className="hackathon-reg-modal__body hackathon-reg-modal__body--gate">
          <p className="hackathon-reg-banner__text">
            Claim your spot in the FirstStep Hackathon 2026. Fill out the registration form with the same email you use for FirstStep.
          </p>
          <div className="hackathon-reg-banner__actions" style={{ justifyContent: "center", marginTop: "1.5rem" }}>
            <button
              type="button"
              onClick={onClaimSpot}
              className="hackathon-reg-banner__btn hackathon-reg-banner__btn--primary"
            >
              Claim Your Spot
            </button>
          </div>
        </div>

        {onRefresh && (
          <footer className="hackathon-reg-modal__footer">
            <p className="hackathon-reg-modal__hint">
              Already submitted the form? Click refresh to update your status.
            </p>
            <div className="hackathon-reg-modal__footer-actions">
              <button
                type="button"
                className="hackathon-reg-form__btn hackathon-reg-form__btn--secondary"
                onClick={onRefresh}
              >
                Refresh status
              </button>
            </div>
          </footer>
        )}
      </div>
    </div>,
    document.body
  );
}
