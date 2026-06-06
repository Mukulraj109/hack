import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Building2, X } from "lucide-react";
import { RECRUITER_LINEUP, RECRUITER_LINEUP_NOTE } from "../config/recruiterLineup";
import "../styles/hackathon-registration-form.css";
import "../styles/recruiter-lineup.css";

function RecruiterLineupModal({ onClose }) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.body.classList.add("hackathon-form-modal-open");

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.classList.remove("hackathon-form-modal-open");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return createPortal(
    <div
      className="hackathon-reg-modal__backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="recruiter-lineup-modal-title"
      onClick={onClose}
    >
      <div
        className="hackathon-reg-modal hackathon-reg-modal--recruiter-lineup"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="hackathon-reg-modal__header">
          <div className="hackathon-reg-modal__header-copy">
            <p className="hackathon-reg-modal__eyebrow">Recruiter program</p>
            <h2 id="recruiter-lineup-modal-title" className="hackathon-reg-modal__title">
              Meet the Recruiter Lineup
            </h2>
            <p className="recruiter-lineup-modal__subtitle">
              Companies actively hiring from the FirstStep hackathon talent pool.
            </p>
          </div>
          <button
            type="button"
            className="hackathon-reg-modal__close"
            onClick={onClose}
            aria-label="Close recruiter lineup"
          >
            <X aria-hidden="true" />
          </button>
        </header>

        <div className="hackathon-reg-modal__body recruiter-lineup-modal__body">
          <ul className="recruiter-lineup-grid" role="list">
            {RECRUITER_LINEUP.map(({ company, roles }) => (
              <li key={company} className="recruiter-lineup-card">
                <div className="recruiter-lineup-card__head">
                  <span className="recruiter-lineup-card__icon" aria-hidden>
                    <Building2 />
                  </span>
                  <h3 className="recruiter-lineup-card__company">{company}</h3>
                </div>
                <p className="recruiter-lineup-card__label">Hiring for</p>
                <ul className="recruiter-lineup-card__roles" role="list">
                  {roles.map((role) => (
                    <li key={role} className="recruiter-lineup-card__role">
                      {role}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          <p className="recruiter-lineup-modal__note">{RECRUITER_LINEUP_NOTE}</p>
        </div>

        <footer className="hackathon-reg-modal__footer">
          <p className="hackathon-reg-modal__hint">
            Top 10 teams get direct introductions to this recruiter lineup after judging.
          </p>
          <div className="hackathon-reg-modal__footer-actions">
            <button
              type="button"
              className="hackathon-reg-form__btn hackathon-reg-form__btn--primary"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </footer>
      </div>
    </div>,
    document.body
  );
}

export default function RecruiterLineupButton({
  className = "career-cta career-cta--primary",
  children,
  ariaLabel = "Meet the Recruiter Lineup",
}) {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = useCallback(() => {
    setModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
  }, []);

  return (
    <>
      <button type="button" className={className} aria-label={ariaLabel} onClick={openModal}>
        {children}
      </button>

      {modalOpen && <RecruiterLineupModal onClose={closeModal} />}
    </>
  );
}
