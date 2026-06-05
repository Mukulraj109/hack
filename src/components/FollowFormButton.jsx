import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { apiFetch, getApiBaseUrl } from "../lib/api";
import "../styles/hackathon-registration-form.css";

function LoadingState() {
  return (
    <div className="hackathon-reg-modal__loading" role="status" aria-live="polite">
      <span className="hackathon-reg-modal__spinner" aria-hidden />
      <p>Loading follow form…</p>
    </div>
  );
}

function FollowFormModal({ onClose, embedUrl, loading, error, onRetry, onIframeLoad, submitted }) {
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
      aria-labelledby="hackathon-follow-modal-title"
      onClick={onClose}
    >
      <div
        className="hackathon-reg-modal hackathon-reg-modal--follow"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="hackathon-reg-modal__header">
          <div className="hackathon-reg-modal__header-copy">
            <p className="hackathon-reg-modal__eyebrow">Stay in the loop</p>
            <h2 id="hackathon-follow-modal-title" className="hackathon-reg-modal__title">
              Follow this hackathon
            </h2>
          </div>
          <button
            type="button"
            className="hackathon-reg-modal__close"
            onClick={onClose}
            aria-label="Close follow form"
          >
            <X aria-hidden="true" />
          </button>
        </header>

        <div className="hackathon-reg-modal__body">
          {loading && <LoadingState />}
          {error && !loading && (
            <div className="hackathon-reg-modal__error" role="alert">
              <p>{error}</p>
              <button type="button" className="hackathon-reg-form__btn hackathon-reg-form__btn--primary" onClick={onRetry}>
                Retry loading form
              </button>
            </div>
          )}
          {embedUrl && !error && (
            <iframe
              src={embedUrl}
              title="Hackathon follow form"
              className={`hackathon-reg-modal__iframe${loading ? " hackathon-reg-modal__iframe--hidden" : ""}`}
              loading="eager"
              onLoad={onIframeLoad}
              referrerPolicy="no-referrer"
            />
          )}
        </div>

        <footer className="hackathon-reg-modal__footer">
          <p
            className={`hackathon-reg-modal__hint${submitted ? " hackathon-reg-modal__hint--success" : ""}`}
            role="status"
            aria-live="polite"
          >
            {submitted
              ? "You're subscribed! You'll receive hackathon updates by email."
              : "Fill in the form above. After submitting, you'll see a confirmation message."}
          </p>
          <div className="hackathon-reg-modal__footer-actions">
            {submitted ? (
              <button type="button" className="hackathon-reg-form__btn hackathon-reg-form__btn--primary" onClick={onClose}>
                Done
              </button>
            ) : (
              <button type="button" className="hackathon-reg-form__btn hackathon-reg-form__btn--secondary" onClick={onClose}>
                Close
              </button>
            )}
          </div>
        </footer>
      </div>
    </div>,
    document.body
  );
}

export default function FollowFormButton() {
  const [modalOpen, setModalOpen] = useState(false);
  const [embedUrl, setEmbedUrl] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const closeModal = useCallback(() => {
    setModalOpen(false);
    setSubmitted(false);
  }, []);

  const loadEmbed = useCallback(async () => {
    setLoading(true);
    setError(null);
    setEmbedUrl(null);
    setSubmitted(false);

    try {
      const res = await apiFetch("/api/hackathon/follow-form/access");
      const path = res.data?.embedPath;
      if (!path) {
        throw new Error("Could not start follow form session");
      }
      setEmbedUrl(`${getApiBaseUrl()}${path}`);
    } catch (err) {
      setError(
        err.message ||
          "Unable to load follow form. Ensure the backend has ZOHO_FOLLOW_FORM_URL set."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const openModal = useCallback(async () => {
    setModalOpen(true);
    await loadEmbed();
  }, [loadEmbed]);

  const handleIframeLoad = useCallback(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!modalOpen) return undefined;

    function onMessage(event) {
      if (event.data?.type === "firststep-hackathon-follow-submitted") {
        setSubmitted(true);
      }
    }

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [modalOpen]);

  return (
    <>
      <button type="button" className="btn-follow" aria-label="Follow this hackathon" onClick={openModal}>
        <svg className="btn-follow__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
          <polyline points="16 6 12 2 8 6"/>
          <line x1="12" y1="2" x2="12" y2="15"/>
        </svg>
        <span className="btn-follow__label">Follow</span>
      </button>

      {modalOpen && (
        <FollowFormModal
          onClose={closeModal}
          embedUrl={embedUrl}
          loading={loading}
          error={error}
          onRetry={loadEmbed}
          onIframeLoad={handleIframeLoad}
          submitted={submitted}
        />
      )}
    </>
  );
}
