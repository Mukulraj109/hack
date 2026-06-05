import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { apiFetch, getApiBaseUrl } from "../lib/api";
import "../styles/hackathon-registration-form.css";

function LoadingState() {
  return (
    <div className="hackathon-reg-modal__loading" role="status" aria-live="polite">
      <span className="hackathon-reg-modal__spinner" aria-hidden />
      <p>Loading information session form…</p>
    </div>
  );
}

function InfoSessionFormModalView({
  onClose,
  embedUrl,
  loading,
  error,
  onRetry,
  onIframeLoad,
  submitted,
  sessionLabel,
}) {
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
      aria-labelledby="hackathon-info-session-modal-title"
      onClick={onClose}
    >
      <div
        className="hackathon-reg-modal hackathon-reg-modal--info-session"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="hackathon-reg-modal__header">
          <div className="hackathon-reg-modal__header-copy">
            <p className="hackathon-reg-modal__eyebrow">Information session</p>
            <h2 id="hackathon-info-session-modal-title" className="hackathon-reg-modal__title">
              {sessionLabel}
            </h2>
          </div>
          <button
            type="button"
            className="hackathon-reg-modal__close"
            onClick={onClose}
            aria-label="Close information session form"
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
              title={`Information session sign-up: ${sessionLabel}`}
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
              ? "You're signed up! We'll send session details soon."
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

export default function InfoSessionFormModal({ open, sessionLabel, onClose }) {
  const [embedUrl, setEmbedUrl] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const loadEmbed = useCallback(async () => {
    setLoading(true);
    setError(null);
    setEmbedUrl(null);
    setSubmitted(false);

    try {
      const res = await apiFetch("/api/hackathon/info-session-form/access");
      const path = res.data?.embedPath;
      if (!path) {
        throw new Error("Could not start information session form");
      }
      setEmbedUrl(`${getApiBaseUrl()}${path}`);
    } catch (err) {
      setError(
        err.message ||
          "Unable to load information session form. Ensure the backend has ZOHO_INFO_SESSION_FORM_URL set."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!open) {
      setEmbedUrl(null);
      setError(null);
      setLoading(false);
      setSubmitted(false);
      return;
    }

    loadEmbed();
  }, [open, loadEmbed]);

  const handleIframeLoad = useCallback(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!open) return undefined;

    function onMessage(event) {
      if (event.data?.type === "firststep-hackathon-info-session-submitted") {
        setSubmitted(true);
      }
    }

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [open]);

  if (!open) {
    return null;
  }

  return (
    <InfoSessionFormModalView
      onClose={onClose}
      embedUrl={embedUrl}
      loading={loading}
      error={error}
      onRetry={loadEmbed}
      onIframeLoad={handleIframeLoad}
      submitted={submitted}
      sessionLabel={sessionLabel}
    />
  );
}
