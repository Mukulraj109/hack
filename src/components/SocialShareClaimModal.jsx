import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { apiFetch, getApiBaseUrl } from "../lib/api";
import "../styles/hackathon-registration-form.css";

const PLATFORM_LABELS = {
  instagram: "Instagram Share",
  linkedin: "LinkedIn Share",
};

function LoadingState() {
  return (
    <div className="hackathon-reg-modal__loading" role="status" aria-live="polite">
      <span className="hackathon-reg-modal__spinner" aria-hidden />
      <p>Loading verification form…</p>
    </div>
  );
}

function SocialShareClaimModalView({
  onClose,
  embedUrl,
  loading,
  error,
  onRetry,
  onIframeLoad,
  submitted,
  platformLabel,
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
      aria-labelledby="hackathon-social-share-modal-title"
      onClick={onClose}
    >
      <div
        className="hackathon-reg-modal hackathon-reg-modal--social-share"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="hackathon-reg-modal__header">
          <div className="hackathon-reg-modal__header-copy">
            <p className="hackathon-reg-modal__eyebrow">Social verification</p>
            <h2 id="hackathon-social-share-modal-title" className="hackathon-reg-modal__title">
              {platformLabel}
            </h2>
          </div>
          <button
            type="button"
            className="hackathon-reg-modal__close"
            onClick={onClose}
            aria-label="Close social share verification form"
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
              title={`${platformLabel} — submit proof`}
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
              ? "Proof submitted! It will appear as In review on your Points Tracker shortly."
              : "Use the same email as your hackathon login. Include your post URL and a screenshot of your share."}
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

export default function SocialShareClaimModal({ open, platform, onClose, onSubmitted }) {
  const [embedUrl, setEmbedUrl] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const platformLabel = PLATFORM_LABELS[platform] ?? "Social Share";

  const loadEmbed = useCallback(async () => {
    setLoading(true);
    setError(null);
    setEmbedUrl(null);
    setSubmitted(false);

    try {
      const res = await apiFetch("/api/hackathon/social-share-form/access");
      const path = res.data?.embedPath;
      if (!path) {
        throw new Error("Could not start social share verification form");
      }
      setEmbedUrl(`${getApiBaseUrl()}${path}`);
    } catch (err) {
      setError(
        err.message ||
          "Unable to load verification form. Ensure the backend has ZOHO_SOCIAL_SHARE_FORM_URL set."
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
      if (event.data?.type === "firststep-hackathon-social-share-submitted") {
        setSubmitted(true);
        onSubmitted?.();
      }
    }

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [open, onSubmitted]);

  if (!open) {
    return null;
  }

  return (
    <SocialShareClaimModalView
      onClose={onClose}
      embedUrl={embedUrl}
      loading={loading}
      error={error}
      onRetry={loadEmbed}
      onIframeLoad={handleIframeLoad}
      submitted={submitted}
      platformLabel={platformLabel}
    />
  );
}
