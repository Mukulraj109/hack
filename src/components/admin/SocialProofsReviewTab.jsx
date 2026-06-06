import { useCallback, useEffect, useMemo, useState } from "react";
import { useAdminVerification } from "../../hooks/useAdminVerification";
import { AdminTableSkeleton } from "../sprint/SprintPageSkeleton";
import SprintLoadError from "../sprint/SprintLoadError";

const PROOF_STATUSES = ["pending", "verified", "rejected"];
const PLATFORM_FILTERS = [
  { value: "all", label: "All platforms" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "instagram", label: "Instagram" },
];

function formatName(user) {
  if (!user) return "—";
  const name = [user.firstName, user.lastName].filter(Boolean).join(" ");
  return name || user.email || "—";
}

function formatDate(value) {
  if (!value) return "—";
  return new Date(value).toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function truncateText(text, max = 48) {
  if (!text || text.length <= max) return text || "—";
  return `${text.slice(0, max)}…`;
}

function pickZohoField(proof, key, submitter, team) {
  const zoho = proof.zohoFormData ?? {};
  switch (key) {
    case "firstName":
      return zoho.firstName || submitter?.firstName || "—";
    case "lastName":
      return zoho.lastName || submitter?.lastName || "—";
    case "email":
      return zoho.email || submitter?.email || "—";
    case "phone":
      return zoho.phone || "—";
    case "teamId":
      return zoho.teamId || team?.inviteCode || "—";
    case "teamName":
      return zoho.teamName || team?.title || "—";
    default:
      return "—";
  }
}

function lacksZohoFormData(proof) {
  if (proof.source !== "zoho") return false;
  const zoho = proof.zohoFormData ?? {};
  return !zoho.phone && !zoho.teamId && !zoho.teamName;
}

function hasTeamMismatch(proof) {
  const zoho = proof.zohoFormData ?? {};
  const formTeam = zoho.teamName?.trim().toLowerCase();
  const portalTeam = proof.team?.title?.trim().toLowerCase();
  if (formTeam && portalTeam && formTeam !== portalTeam) return true;

  const formId = zoho.teamId?.trim().toLowerCase();
  const portalId = proof.team?.inviteCode?.trim().toLowerCase();
  if (formId && portalId && formId !== portalId) return true;

  return false;
}

function platformLabel(platform) {
  return platform === "linkedin" ? "LinkedIn" : "Instagram";
}

function DetailField({ label, children, warn }) {
  return (
    <div className={`admin-detail__field${warn ? " admin-detail__field--warn" : ""}`}>
      <dt>{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}

function ScreenshotPreview({ url, platform, compact = false }) {
  if (!url) {
    return <span className="admin-proof-screenshot-missing">No image uploaded</span>;
  }

  if (/^https?:\/\//i.test(url)) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className={`admin-proof-screenshot${compact ? " admin-proof-screenshot--compact" : ""}`}
        onClick={(event) => event.stopPropagation()}
      >
        <img src={url} alt={`${platform} share screenshot`} loading="lazy" />
        <span>View full image</span>
      </a>
    );
  }

  return (
    <span className="admin-proof-screenshot-text" title={url}>
      {url}
      <span className="admin-proof-screenshot-text__hint"> (filename only — open Zoho submission)</span>
    </span>
  );
}

function ProofCard({ proof, selected, onSelect, onVerify, actionId }) {
  const id = proof.id || proof._id;
  const zoho = proof.zohoFormData ?? {};
  const submitterLabel =
    [zoho.firstName, zoho.lastName].filter(Boolean).join(" ") || formatName(proof.submittedBy);
  const email = pickZohoField(proof, "email", proof.submittedBy, proof.team);
  const teamName = pickZohoField(proof, "teamName", proof.submittedBy, proof.team);

  return (
    <article
      className={`admin-proof-card${selected ? " admin-proof-card--selected" : ""}`}
      onClick={() => onSelect(id)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelect(id);
        }
      }}
      role="button"
      tabIndex={0}
      aria-pressed={selected}
      aria-label={`${platformLabel(proof.platform)} proof from ${submitterLabel}`}
    >
      <div className="admin-proof-card__header">
        <span className={`admin-proof-card__platform admin-proof-card__platform--${proof.platform}`}>
          {platformLabel(proof.platform)}
        </span>
        <span className={`admin-badge admin-badge--${proof.status}`}>{proof.status}</span>
      </div>

      <h4 className="admin-proof-card__name">{submitterLabel}</h4>
      <p className="admin-proof-card__meta">{email}</p>
      <p className="admin-proof-card__meta">
        <strong>Team:</strong> {teamName}
      </p>

      <div className="admin-proof-card__proof-row">
        <div className="admin-proof-card__link-block">
          <span className="admin-proof-card__label">Post</span>
          <a
            href={proof.postUrl}
            target="_blank"
            rel="noreferrer"
            className="admin-proof-card__link"
            onClick={(event) => event.stopPropagation()}
          >
            {truncateText(proof.postUrl, 40)}
          </a>
        </div>
        <div className="admin-proof-card__thumb">
          <ScreenshotPreview url={proof.screenshotUrl} platform={proof.platform} compact />
        </div>
      </div>

      <p className="admin-proof-card__date">{formatDate(proof.createdAt)}</p>

      {proof.status === "pending" && (
        <div className="admin-proof-card__actions">
          <button
            type="button"
            className="admin-btn admin-btn--approve"
            disabled={actionId === id}
            onClick={(event) => {
              event.stopPropagation();
              onVerify(id, "verified");
            }}
          >
            Verify
          </button>
          <button
            type="button"
            className="admin-btn admin-btn--reject"
            disabled={actionId === id}
            onClick={(event) => {
              event.stopPropagation();
              onVerify(id, "rejected");
            }}
          >
            Reject
          </button>
        </div>
      )}
    </article>
  );
}

export default function SocialProofsReviewTab({ searchQuery = "" }) {
  const { fetchSocialProofs, verifySocialProof } = useAdminVerification();
  const [proofs, setProofs] = useState([]);
  const [statusFilter, setStatusFilter] = useState("pending");
  const [platformFilter, setPlatformFilter] = useState("all");
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionId, setActionId] = useState(null);

  const loadProofs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchSocialProofs({ status: statusFilter, search: searchQuery });
      setProofs(res.data ?? []);
    } catch (err) {
      setError(err.message || "Failed to load social proofs");
      setProofs([]);
    } finally {
      setLoading(false);
    }
  }, [fetchSocialProofs, statusFilter, searchQuery]);

  useEffect(() => {
    loadProofs();
  }, [loadProofs]);

  const filteredProofs = useMemo(() => {
    if (platformFilter === "all") return proofs;
    return proofs.filter((proof) => proof.platform === platformFilter);
  }, [proofs, platformFilter]);

  useEffect(() => {
    if (loading) return;

    setSelectedId((current) => {
      if (filteredProofs.length === 0) return null;
      const stillExists = filteredProofs.some((proof) => (proof.id || proof._id) === current);
      if (stillExists) return current;
      return filteredProofs[0].id || filteredProofs[0]._id;
    });
  }, [loading, filteredProofs]);

  const selected =
    filteredProofs.find((proof) => (proof.id || proof._id) === selectedId) ?? null;

  const handleVerify = async (proofId, status) => {
    setActionId(proofId);
    setError(null);
    try {
      await verifySocialProof(proofId, status);
      await loadProofs();
    } catch (err) {
      setError(err.message || "Failed to update social proof");
    } finally {
      setActionId(null);
    }
  };

  const pendingCount = statusFilter === "pending" ? filteredProofs.length : null;

  return (
    <div className="admin-tab admin-tab--proofs">
      <div className="admin-tab__toolbar admin-tab__toolbar--proofs">
        <label className="admin-tab__filter">
          <span>Proof status</span>
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setSelectedId(null);
            }}
          >
            {PROOF_STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>
        <label className="admin-tab__filter">
          <span>Platform</span>
          <select
            value={platformFilter}
            onChange={(e) => {
              setPlatformFilter(e.target.value);
              setSelectedId(null);
            }}
          >
            {PLATFORM_FILTERS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
        <button type="button" className="admin-tab__refresh" onClick={loadProofs}>
          Refresh
        </button>
      </div>

      {!loading && filteredProofs.length > 0 && (
        <p className="admin-proof-hint" role="status">
          {pendingCount != null ? (
            <>
              <strong>{pendingCount}</strong> pending proof{pendingCount === 1 ? "" : "s"} — select a
              card to review full details, or use Verify / Reject on each card.
            </>
          ) : (
            <>
              Showing <strong>{filteredProofs.length}</strong> proof
              {filteredProofs.length === 1 ? "" : "s"}. Select a card for full details.
            </>
          )}
        </p>
      )}

      {error && !loading && (
        <SprintLoadError message={error} onRetry={loadProofs} style={{ marginBottom: "16px" }} />
      )}

      {loading ? (
        <AdminTableSkeleton />
      ) : filteredProofs.length === 0 ? (
        <p className="admin-tab__empty">No social proofs match this filter.</p>
      ) : (
        <div className="admin-split admin-split--proofs">
          <div className="admin-proof-list" role="list">
            {filteredProofs.map((proof) => {
              const id = proof.id || proof._id;
              return (
                <ProofCard
                  key={id}
                  proof={proof}
                  selected={selectedId === id}
                  onSelect={setSelectedId}
                  onVerify={handleVerify}
                  actionId={actionId}
                />
              );
            })}
          </div>

          {selected ? (
            <aside className="admin-detail admin-detail--proof">
              <h3 className="admin-detail__title">
                <span
                  className={`admin-proof-card__platform admin-proof-card__platform--${selected.platform}`}
                >
                  {platformLabel(selected.platform)}
                </span>
                {pickZohoField(selected, "teamName", selected.submittedBy, selected.team)}
              </h3>

              {lacksZohoFormData(selected) && (
                <p className="admin-proof-notice">
                  This submission predates full form field storage. Phone and team fields from the
                  Zoho form may be missing — ask the participant to resubmit if you need them.
                </p>
              )}

              {hasTeamMismatch(selected) && (
                <p className="admin-proof-notice admin-proof-notice--warn">
                  Team name or Team ID from the Zoho form does not match the portal team. Review
                  before verifying.
                </p>
              )}

              <dl className="admin-detail__list">
                <DetailField label="Status">
                  <span className={`admin-badge admin-badge--${selected.status}`}>
                    {selected.status}
                  </span>
                </DetailField>
                <DetailField label="Source">
                  <span className="admin-badge admin-badge--neutral">
                    {selected.source === "zoho" ? "Zoho form" : "In-app"}
                  </span>
                </DetailField>
                <DetailField label="Submitted">{formatDate(selected.createdAt)}</DetailField>
              </dl>

              <h4 className="admin-detail__section-title">Participant (from Zoho form)</h4>
              <dl className="admin-detail__list">
                <DetailField label="First name">
                  {pickZohoField(selected, "firstName", selected.submittedBy, selected.team)}
                </DetailField>
                <DetailField label="Last name">
                  {pickZohoField(selected, "lastName", selected.submittedBy, selected.team)}
                </DetailField>
                <DetailField label="Email">
                  {pickZohoField(selected, "email", selected.submittedBy, selected.team)}
                </DetailField>
                <DetailField label="Phone">
                  {pickZohoField(selected, "phone", selected.submittedBy, selected.team)}
                </DetailField>
              </dl>

              <h4 className="admin-detail__section-title">Team</h4>
              <dl className="admin-detail__list">
                <DetailField
                  label="Team name (form)"
                  warn={
                    selected.zohoFormData?.teamName &&
                    selected.team?.title &&
                    selected.zohoFormData.teamName.trim().toLowerCase() !==
                      selected.team.title.trim().toLowerCase()
                  }
                >
                  {pickZohoField(selected, "teamName", selected.submittedBy, selected.team)}
                </DetailField>
                <DetailField
                  label="Team ID (form)"
                  warn={
                    selected.zohoFormData?.teamId &&
                    selected.team?.inviteCode &&
                    selected.zohoFormData.teamId.trim().toLowerCase() !==
                      selected.team.inviteCode.trim().toLowerCase()
                  }
                >
                  {pickZohoField(selected, "teamId", selected.submittedBy, selected.team)}
                </DetailField>
                <DetailField label="Team name (portal)">{selected.team?.title || "—"}</DetailField>
                <DetailField label="Team ID (portal)">{selected.team?.inviteCode || "—"}</DetailField>
              </dl>

              <h4 className="admin-detail__section-title">
                {selected.platform === "linkedin" ? "LinkedIn" : "Instagram"} proof
              </h4>
              <dl className="admin-detail__list">
                <DetailField
                  label={selected.platform === "linkedin" ? "LinkedIn post" : "Instagram link"}
                >
                  <a href={selected.postUrl} target="_blank" rel="noreferrer">
                    {selected.postUrl}
                  </a>
                </DetailField>
                <DetailField label="Screenshot / image">
                  <ScreenshotPreview url={selected.screenshotUrl} platform={selected.platform} />
                </DetailField>
                {selected.hashtag && <DetailField label="Hashtag">{selected.hashtag}</DetailField>}
              </dl>

              <div className="admin-detail__actions">
                {selected.status !== "verified" && (
                  <button
                    type="button"
                    className="admin-btn admin-btn--approve"
                    disabled={actionId === (selected.id || selected._id)}
                    onClick={() => handleVerify(selected.id || selected._id, "verified")}
                  >
                    Verify (+25 pts)
                  </button>
                )}
                {selected.status !== "rejected" && (
                  <button
                    type="button"
                    className="admin-btn admin-btn--reject"
                    disabled={actionId === (selected.id || selected._id)}
                    onClick={() => handleVerify(selected.id || selected._id, "rejected")}
                  >
                    Reject
                  </button>
                )}
              </div>
            </aside>
          ) : (
            <aside className="admin-detail admin-detail--proof admin-detail--empty">
              <p>Select a proof card to review full submission details.</p>
            </aside>
          )}
        </div>
      )}
    </div>
  );
}
