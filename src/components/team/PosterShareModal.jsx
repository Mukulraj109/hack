import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  getTemplateById,
  getTemplatesForPlatform,
  defaultTemplateId,
} from "./posterTemplates";
import {
  buildPosterFilename,
  buildShareCaption,
  downloadDataUrl,
  exportPosterElement,
} from "../../lib/posterExport";
import { fetchSocialConfig } from "../../lib/configCache";
import SocialShareClaimModal from "../SocialShareClaimModal";

function Icon({ name, size = 20, style = {} }) {
  return (
    <span className="material-symbols-outlined" style={{ fontSize: size, ...style }}>
      {name}
    </span>
  );
}

const STATUS_LABELS = {
  pending: "Under review",
  verified: "Verified",
  rejected: "Rejected",
};

export default function PosterShareModal({
  open,
  onClose,
  platform,
  initialTemplateId,
  teamTitle,
  memberNames,
  members,
  canWrite,
  existingProof,
  onProofSubmitted,
}) {
  const [step, setStep] = useState("template");
  const [templateId, setTemplateId] = useState(initialTemplateId || defaultTemplateId(platform));
  const [hashtag, setHashtag] = useState("#ShipIn100Hrs");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [claimModalOpen, setClaimModalOpen] = useState(false);
  const previewRef = useRef(null);

  const templates = getTemplatesForPlatform(platform);
  const selected = getTemplateById(platform, templateId);
  const PosterComponent = selected.component;
  const isVerified = existingProof?.status === "verified";
  const canSubmitProof = !isVerified && canWrite;

  useEffect(() => {
    if (!open) return;
    setStep("template");
    setTemplateId(initialTemplateId || defaultTemplateId(platform));
    setError("");
    setCopied(false);
    setClaimModalOpen(false);
  }, [open, platform, initialTemplateId]);

  useEffect(() => {
    fetchSocialConfig()
      .then((res) => setHashtag(res.data?.hashtag || "#ShipIn100Hrs"))
      .catch(() => setHashtag("#ShipIn100Hrs"));
  }, [open]);

  if (!open) return null;

  const posterProps = {
    teamTitle,
    memberNames,
    members: members.map((m) => ({
      ...m,
      displayName: [m.firstName, m.lastName].filter(Boolean).join(" ").trim() || m.email,
    })),
    hashtag,
  };

  const caption = buildShareCaption({ teamTitle, memberNames, hashtag });

  const handleDownload = async () => {
    if (!previewRef.current) return;
    setBusy(true);
    setError("");
    try {
      const dataUrl = await exportPosterElement(previewRef.current, platform);
      downloadDataUrl(
        dataUrl,
        buildPosterFilename(teamTitle, platform, templateId)
      );
    } catch (err) {
      setError(err?.message || "Could not export poster");
    } finally {
      setBusy(false);
    }
  };

  const handleCopyCaption = async () => {
    await navigator.clipboard.writeText(caption);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleProofSubmitted = () => {
    onProofSubmitted?.();
  };

  const platformLabel = platform === "linkedin" ? "LinkedIn" : "Instagram";

  return (
    <>
      <AnimatePresence>
        <motion.div
          className="team-poster-modal__backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="team-poster-modal"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="team-poster-modal__header">
              <div>
                <p className="team-poster-modal__eyebrow">{platformLabel} poster</p>
                <h3 className="team-poster-modal__title">Create & share</h3>
              </div>
              <button type="button" className="team-poster-modal__close" onClick={onClose} aria-label="Close">
                <Icon name="close" />
              </button>
            </div>

            <div className="team-poster-modal__steps">
              {["template", "preview", "submit"].map((s, i) => (
                <button
                  key={s}
                  type="button"
                  className={`team-poster-modal__step ${step === s ? "is-active" : ""}`}
                  onClick={() => setStep(s)}
                >
                  {i + 1}. {s === "template" ? "Template" : s === "preview" ? "Download" : "Submit proof"}
                </button>
              ))}
            </div>

            {existingProof && (
              <div className={`team-poster-modal__status team-poster-modal__status--${existingProof.status}`}>
                <Icon name="info" size={18} />
                Status: {STATUS_LABELS[existingProof.status] || existingProof.status}
                {existingProof.submittedBy && (
                  <span>
                    {" "}
                    · Submitted by{" "}
                    {[existingProof.submittedBy.firstName, existingProof.submittedBy.lastName]
                      .filter(Boolean)
                      .join(" ") || existingProof.submittedBy.email}
                  </span>
                )}
              </div>
            )}

            {step === "template" && (
              <div className="team-poster-modal__template-grid">
                {templates.map((tpl) => (
                  <button
                    key={tpl.id}
                    type="button"
                    className={`team-poster-modal__template-card ${templateId === tpl.id ? "is-selected" : ""}`}
                    onClick={() => setTemplateId(tpl.id)}
                  >
                    <span className="team-poster-modal__template-name">{tpl.label}</span>
                  </button>
                ))}
              </div>
            )}

            {(step === "preview" || step === "template") && (
              <div className="team-poster-modal__preview-wrap">
                <div
                  ref={previewRef}
                  className={`team-poster-modal__preview-frame team-poster-modal__preview-frame--${platform === "linkedin" ? "square" : "story"}`}
                >
                  <PosterComponent {...posterProps} />
                </div>
              </div>
            )}

            {step === "preview" && (
              <div className="team-poster-modal__actions">
                <motion.button
                  type="button"
                  className="team-poster-modal__btn team-poster-modal__btn--primary"
                  whileTap={{ scale: 0.98 }}
                  disabled={busy}
                  onClick={handleDownload}
                >
                  <Icon name="download" size={18} /> Download PNG
                </motion.button>
                <motion.button
                  type="button"
                  className="team-poster-modal__btn team-poster-modal__btn--secondary"
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCopyCaption}
                >
                  <Icon name="content_copy" size={18} /> {copied ? "Copied!" : "Copy caption"}
                </motion.button>
                {platform === "linkedin" && (
                  <a
                    className="team-poster-modal__btn team-poster-modal__btn--ghost"
                    href="https://www.linkedin.com/feed/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Icon name="open_in_new" size={18} /> Open LinkedIn
                  </a>
                )}
                {platform === "instagram" && (
                  <p className="team-poster-modal__hint">
                    Download the poster, then post it in the Instagram app with the copied caption and hashtag.
                  </p>
                )}
              </div>
            )}

            {step === "submit" && (
              <div className="team-poster-modal__submit-panel">
                {isVerified ? (
                  <p className="team-poster-modal__hint">
                    This platform is verified — no further submissions needed.
                  </p>
                ) : (
                  <>
                    <p className="team-poster-modal__hint">
                      After posting on {platformLabel}, submit your public post URL using the
                      verification form (screenshot optional). Use the same email as your hackathon login.
                    </p>
                    {canSubmitProof ? (
                      <motion.button
                        type="button"
                        className="team-poster-modal__btn team-poster-modal__btn--primary w-full"
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setClaimModalOpen(true)}
                      >
                        <Icon name="fact_check" size={18} /> Open verification form
                      </motion.button>
                    ) : (
                      <p className="team-poster-modal__hint">
                        Your account must be active to submit proof.
                      </p>
                    )}
                  </>
                )}
              </div>
            )}

            {error && <p className="team-poster-modal__error">{error}</p>}

            <div className="team-poster-modal__footer">
              {step !== "template" && (
                <button
                  type="button"
                  className="team-poster-modal__btn team-poster-modal__btn--ghost"
                  onClick={() => setStep(step === "submit" ? "preview" : "template")}
                >
                  Back
                </button>
              )}
              {step === "template" && (
                <button type="button" className="team-poster-modal__btn team-poster-modal__btn--primary" onClick={() => setStep("preview")}>
                  Continue
                </button>
              )}
              {step === "preview" && !isVerified && (
                <button type="button" className="team-poster-modal__btn team-poster-modal__btn--primary" onClick={() => setStep("submit")}>
                  Submit proof
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      <SocialShareClaimModal
        open={claimModalOpen}
        platform={platform}
        onClose={() => setClaimModalOpen(false)}
        onSubmitted={handleProofSubmitted}
      />
    </>
  );
}
