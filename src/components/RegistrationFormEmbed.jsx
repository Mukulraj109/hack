import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { useHackathonAuth } from "../auth/HackathonAuthContext";
import { apiFetch, getApiBaseUrl } from "../lib/api";
import "../styles/hackathon-registration-banner.css";
import "../styles/hackathon-registration-form.css";

const DIRECT_ZOHO_FORM_URL = import.meta.env.VITE_ZOHO_FORM_URL?.trim() || "";

function buildDirectZohoEmbedUrl(email) {
  if (!DIRECT_ZOHO_FORM_URL) return null;
  const url = new URL(DIRECT_ZOHO_FORM_URL);
  url.searchParams.set("zf_rszfm", "1");
  if (email) {
    url.searchParams.set("Email", email);
  }
  return url.toString();
}

async function waitForToken(getAccessToken, maxAttempts = 8) {
  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    const token = await getAccessToken();
    if (token) return token;
    await new Promise((resolve) => window.setTimeout(resolve, 250 * (attempt + 1)));
  }
  return null;
}

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
  dismissible = true,
}) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.body.classList.add("hackathon-form-modal-open");

    if (!dismissible) {
      return () => {
        document.body.style.overflow = previousOverflow;
        document.body.classList.remove("hackathon-form-modal-open");
      };
    }

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
  }, [onClose, dismissible]);

  return createPortal(
    <div
      className="hackathon-reg-modal__backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="hackathon-reg-modal-title"
      onClick={dismissible ? onClose : undefined}
    >
      <div
        className="hackathon-reg-modal hackathon-reg-modal--registration"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="hackathon-reg-modal__header">
          <div className="hackathon-reg-modal__header-copy">
            <p className="hackathon-reg-modal__eyebrow">Registration</p>
            <h2 id="hackathon-reg-modal-title" className="hackathon-reg-modal__title">
              Claim your spot
            </h2>
            {user?.email && (
              <p className="hackathon-reg-modal__email">
                Use <strong>{user.email}</strong> in the form
              </p>
            )}
          </div>
          {dismissible && (
            <button
              type="button"
              className="hackathon-reg-modal__close"
              onClick={onClose}
              aria-label="Close registration form"
            >
              <X aria-hidden="true" />
            </button>
          )}
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
            After submitting, your registration will be reviewed within 24 hours.
          </p>
          <div className="hackathon-reg-modal__footer-actions">
            {dismissible && (
              <button type="button" className="hackathon-reg-form__btn hackathon-reg-form__btn--secondary" onClick={onClose}>
                Close
              </button>
            )}
            {onRefresh && (
              <button
                type="button"
                className="hackathon-reg-form__btn hackathon-reg-form__btn--primary"
                onClick={() => {
                  if (dismissible) onClose();
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

export default function RegistrationFormEmbed({
  user,
  onRefresh,
  gateMode = false,
  dismissible = true,
  autoOpen = false,
}) {
  const { getAccessToken, hasPortalAccess, loading: authLoading } = useHackathonAuth();
  const [modalOpen, setModalOpen] = useState(autoOpen);
  const [embedUrl, setEmbedUrl] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const loadRequestedRef = useRef(false);

  const closeModal = useCallback(() => {
    setModalOpen(false);
  }, []);

  const useDirectZohoEmbed = useCallback(() => {
    const directUrl = buildDirectZohoEmbedUrl(user?.email);
    if (!directUrl) {
      setError("Registration form URL is not configured.");
      return false;
    }
    setEmbedUrl(directUrl);
    setError(null);
    return true;
  }, [user?.email]);

  const loadEmbed = useCallback(async () => {
    setLoading(true);
    setError(null);
    setEmbedUrl(null);

    try {
      const token = await waitForToken(getAccessToken);
      if (!token) {
        if (useDirectZohoEmbed()) return;
        throw new Error("Sign in is still loading. Please try again in a moment.");
      }

      try {
        const res = await apiFetch("/api/hackathon/me/registration-form/access", { token });
        const path = res.data?.embedPath;
        if (!path) {
          throw new Error("Could not start registration session");
        }
        setEmbedUrl(`${getApiBaseUrl()}${path}`);
      } catch (apiErr) {
        if (useDirectZohoEmbed()) return;
        throw apiErr;
      }
    } catch (err) {
      if (useDirectZohoEmbed()) return;
      setError(
        err.message ||
          "Unable to load registration form. Ensure the backend has ZOHO_REGISTRATION_FORM_URL set."
      );
    } finally {
      setLoading(false);
    }
  }, [getAccessToken, useDirectZohoEmbed]);

  const openModal = useCallback(async () => {
    setModalOpen(true);
    await loadEmbed();
  }, [loadEmbed]);

  useEffect(() => {
    if (!autoOpen || authLoading || !hasPortalAccess) return undefined;
    if (loadRequestedRef.current) return undefined;
    loadRequestedRef.current = true;
    loadEmbed();
    return undefined;
  }, [autoOpen, authLoading, hasPortalAccess, loadEmbed]);

  const handleIframeLoad = useCallback(() => {
    setLoading(false);
  }, []);

  if (gateMode) {
    return modalOpen ? (
      <RegistrationFormModal
        user={user}
        onRefresh={onRefresh}
        onClose={closeModal}
        embedUrl={embedUrl}
        loading={loading}
        error={error}
        onRetry={loadEmbed}
        onIframeLoad={handleIframeLoad}
        dismissible={dismissible}
      />
    ) : null;
  }

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
          dismissible={dismissible}
        />
      )}
    </>
  );
}
