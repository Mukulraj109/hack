import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { useHackathonAuth } from "../auth/HackathonAuthContext";
import { apiFetch, getApiBaseUrl } from "../lib/api";
import "../styles/hackathon-registration-banner.css";
import "../styles/hackathon-registration-form.css";

function LoadingState() {
  return (
    <div className="hackathon-reg-modal__loading" role="status" aria-live="polite">
      <span className="hackathon-reg-modal__spinner" aria-hidden />
      <p>Loading registration form…</p>
    </div>
  );
}

function RegistrationFormModal({
  user,
  onRefresh,
  onClose,
  embedUrl,
  loading,
  error,
  onRetry,
  onIframeLoad,
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
      aria-labelledby="hackathon-reg-modal-title"
      onClick={onClose}
    >
      <div
        className="hackathon-reg-modal hackathon-reg-modal--registration"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="hackathon-reg-modal__header">
          <div className="hackathon-reg-modal__header-copy">
            <p className="hackathon-reg-modal__eyebrow">Hackathon registration</p>
            <h2 id="hackathon-reg-modal-title" className="hackathon-reg-modal__title">
              Complete your registration
            </h2>
            {user?.email && (
              <p className="hackathon-reg-modal__email">
                Use <strong>{user.email}</strong> in the form
              </p>
            )}
          </div>
          <button
            type="button"
            className="hackathon-reg-modal__close"
            onClick={onClose}
            aria-label="Close registration form"
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
              title="Hackathon registration form"
              className={`hackathon-reg-modal__iframe${loading ? " hackathon-reg-modal__iframe--hidden" : ""}`}
              loading="eager"
              onLoad={onIframeLoad}
              referrerPolicy="no-referrer"
            />
          )}
        </div>

        <footer className="hackathon-reg-modal__footer">
          <p className="hackathon-reg-modal__hint">
            After submitting, close this window and refresh your status.
          </p>
          <div className="hackathon-reg-modal__footer-actions">
            <button type="button" className="hackathon-reg-form__btn hackathon-reg-form__btn--secondary" onClick={onClose}>
              Close
            </button>
            {onRefresh && (
              <button
                type="button"
                className="hackathon-reg-form__btn hackathon-reg-form__btn--primary"
                onClick={() => {
                  onClose();
                  onRefresh();
                }}
              >
                I&apos;ve submitted — refresh status
              </button>
            )}
          </div>
        </footer>
      </div>
    </div>,
    document.body
  );
}

export default function RegistrationFormEmbed({ user, onRefresh }) {
  const { getAccessToken } = useHackathonAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const [embedUrl, setEmbedUrl] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const closeModal = useCallback(() => {
    setModalOpen(false);
  }, []);

  const loadEmbed = useCallback(async () => {
    setLoading(true);
    setError(null);
    setEmbedUrl(null);

    try {
      const token = await getAccessToken();
      const res = await apiFetch("/api/hackathon/me/registration-form/access", { token });
      const path = res.data?.embedPath;
      if (!path) {
        throw new Error("Could not start registration session");
      }
      setEmbedUrl(`${getApiBaseUrl()}${path}`);
    } catch (err) {
      setError(
        err.message ||
          "Unable to load registration form. Ensure the backend has ZOHO_REGISTRATION_FORM_URL set."
      );
    } finally {
      setLoading(false);
    }
  }, [getAccessToken]);

  const openModal = useCallback(async () => {
    setModalOpen(true);
    await loadEmbed();
  }, [loadEmbed]);

  const handleIframeLoad = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <>
      <section className="hackathon-reg-banner" aria-labelledby="hackathon-reg-title">
        <div className="hackathon-reg-banner__accent" aria-hidden />
        <div className="hackathon-reg-banner__body">
          <div className="hackathon-reg-banner__copy">
            <p className="hackathon-reg-banner__eyebrow">Action required</p>
            <h3 id="hackathon-reg-title" className="hackathon-reg-banner__title">
              Complete hackathon registration
            </h3>
            <p className="hackathon-reg-banner__text">
              Open the registration form in a popup and submit it with the same email as your FirstStep login.
            </p>
            {user?.email && (
              <p className="hackathon-reg-banner__email" title={user.email}>
                <span className="hackathon-reg-banner__email-label">Your email</span>
                <span className="hackathon-reg-banner__email-value">{user.email}</span>
              </p>
            )}
          </div>

          <div className="hackathon-reg-banner__actions">
            <button
              type="button"
              onClick={openModal}
              className="hackathon-reg-banner__btn hackathon-reg-banner__btn--primary"
            >
              Complete registration
            </button>
            {onRefresh && (
              <button
                type="button"
                onClick={onRefresh}
                className="hackathon-reg-banner__btn hackathon-reg-banner__btn--secondary"
              >
                I&apos;ve submitted — refresh status
              </button>
            )}
          </div>
        </div>

        <p className="hackathon-reg-banner__hint">
          The form opens in a popup. When you&apos;re done, return here and refresh your status.
        </p>
      </section>

      {modalOpen && (
        <RegistrationFormModal
          user={user}
          onRefresh={onRefresh}
          onClose={closeModal}
          embedUrl={embedUrl}
          loading={loading}
          error={error}
          onRetry={loadEmbed}
          onIframeLoad={handleIframeLoad}
        />
      )}
    </>
  );
}
