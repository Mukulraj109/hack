import { useEffect } from "react";
import { createPortal } from "react-dom";
import "../styles/hackathon-registration-form.css";
import "../styles/judge-bio-modal.css";

export default function JudgeBioModal({ judge, onClose }) {
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

  if (!judge) return null;

  const titleId = `judge-bio-modal-title-${judge.id}`;

  const accentVars = {
    "--judge-accent": judge.accent,
    "--judge-accent-soft": judge.accentSoft,
    "--judge-accent-ring": judge.accentRing,
    "--judge-gradient": judge.gradient,
  };

  return createPortal(
    <div
      className="hackathon-reg-modal__backdrop judge-bio-modal__backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onClick={onClose}
    >
      <div
        className="hackathon-reg-modal hackathon-reg-modal--judge-bio"
        style={accentVars}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="judge-bio-modal__handle" aria-hidden="true" />

        <div className="judge-bio-modal__hero">
          {judge.imageUrl ? (
            <div className="judge-bio-modal__photo-wrap">
              <img
                src={judge.imageUrl}
                alt={judge.name}
                className="judge-bio-modal__photo"
              />
            </div>
          ) : (
            <div className="judge-bio-modal__initials" aria-hidden="true">
              {judge.initials}
            </div>
          )}

          <div className="judge-bio-modal__hero-copy">
            <p className="judge-bio-modal__eyebrow">Judging panel</p>
            <h2 id={titleId} className="judge-bio-modal__name">
              {judge.name}
            </h2>
            <p className="judge-bio-modal__role">{judge.role}</p>
          </div>
        </div>

        <div className="judge-bio-modal__body">
          <p className="judge-bio-modal__bio">{judge.bio}</p>

          {judge.tags?.length > 0 && (
            <div className="judge-bio-modal__tags">
              {judge.tags.map((tag) => (
                <span key={tag} className="judge-bio-modal__tag">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <footer className="judge-bio-modal__footer">
          <button
            type="button"
            className="judge-bio-modal__close-btn"
            onClick={onClose}
          >
            Close
          </button>
        </footer>
      </div>
    </div>,
    document.body
  );
}
