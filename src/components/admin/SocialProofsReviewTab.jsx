import { useCallback, useEffect, useState } from "react";
import { useAdminVerification } from "../../hooks/useAdminVerification";
import { AdminTableSkeleton } from "../sprint/SprintPageSkeleton";
import SprintLoadError from "../sprint/SprintLoadError";

const PROOF_STATUSES = ["pending", "verified", "rejected"];

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

function DetailField({ label, children }) {
  return (
    <div className="admin-detail__field">
      <dt>{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}

function ScreenshotPreview({ url, platform }) {
  if (!url) {
    return <span className="admin-proof-screenshot-missing">No image uploaded</span>;
  }

  if (/^https?:\/\//i.test(url)) {
    return (
      <a href={url} target="_blank" rel="noreferrer" className="admin-proof-screenshot">
        <img src={url} alt={`${platform} share screenshot`} loading="lazy" />
        <span>View full image</span>
      </a>
    );
  }

  return (
    <span className="admin-proof-screenshot-text" title={url}>
      {url}
    </span>
  );
}

export default function SocialProofsReviewTab({ searchQuery = "" }) {
  const { fetchSocialProofs, verifySocialProof } = useAdminVerification();
  const [proofs, setProofs] = useState([]);
  const [statusFilter, setStatusFilter] = useState("pending");
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

  const selected = proofs.find((proof) => (proof.id || proof._id) === selectedId) ?? null;

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

  return (
    <div className="admin-tab">
      <div className="admin-tab__toolbar">
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
        <button type="button" className="admin-tab__refresh" onClick={loadProofs}>
          Refresh
        </button>
      </div>

      {error && !loading && (
        <SprintLoadError message={error} onRetry={loadProofs} style={{ marginBottom: "16px" }} />
      )}

      {loading ? (
        <AdminTableSkeleton />
      ) : proofs.length === 0 ? (
        <p className="admin-tab__empty">No social proofs match this filter.</p>
      ) : (
        <div className="admin-split">
          <div className="admin-table-wrap admin-table-wrap--proofs">
            <table className="admin-table admin-table--proofs">
              <thead>
                <tr>
                  <th>Team</th>
                  <th>Platform</th>
                  <th>Submitter</th>
                  <th>Status</th>
                  <th>Submitted</th>
                </tr>
              </thead>
              <tbody>
                {proofs.map((proof) => {
                  const id = proof.id || proof._id;
                  const isSelected = selectedId === id;
                  const zoho = proof.zohoFormData ?? {};
                  const submitterLabel =
                    [zoho.firstName, zoho.lastName].filter(Boolean).join(" ") ||
                    formatName(proof.submittedBy);
                  return (
                    <tr
                      key={id}
                      className={isSelected ? "admin-table__row--selected" : undefined}
                      onClick={() => setSelectedId(id)}
                    >
                      <td>{zoho.teamName || proof.team?.title || "—"}</td>
                      <td>{proof.platform}</td>
                      <td>{submitterLabel}</td>
                      <td>
                        <span className={`admin-badge admin-badge--${proof.status}`}>
                          {proof.status}
                        </span>
                      </td>
                      <td>{formatDate(proof.createdAt)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {selected && (
            <aside className="admin-detail admin-detail--proof">
              <h3 className="admin-detail__title">
                {selected.platform} proof — {pickZohoField(selected, "teamName", null, selected.team)}
              </h3>

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
                <DetailField label="Submitted">
                  {formatDate(selected.createdAt)}
                </DetailField>
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
                <DetailField label="Team name (form)">
                  {pickZohoField(selected, "teamName", selected.submittedBy, selected.team)}
                </DetailField>
                <DetailField label="Team ID (form)">
                  {pickZohoField(selected, "teamId", selected.submittedBy, selected.team)}
                </DetailField>
                <DetailField label="Team name (portal)">
                  {selected.team?.title || "—"}
                </DetailField>
                <DetailField label="Team ID (portal)">
                  {selected.team?.inviteCode || "—"}
                </DetailField>
              </dl>

              <h4 className="admin-detail__section-title">
                {selected.platform === "linkedin" ? "LinkedIn" : "Instagram"} proof
              </h4>
              <dl className="admin-detail__list">
                <DetailField label={selected.platform === "linkedin" ? "LinkedIn post" : "Instagram link"}>
                  <a href={selected.postUrl} target="_blank" rel="noreferrer">
                    {selected.postUrl}
                  </a>
                </DetailField>
                <DetailField label="Screenshot / image">
                  <ScreenshotPreview url={selected.screenshotUrl} platform={selected.platform} />
                </DetailField>
                {selected.hashtag && (
                  <DetailField label="Hashtag">{selected.hashtag}</DetailField>
                )}
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
          )}
        </div>
      )}
    </div>
  );
}
