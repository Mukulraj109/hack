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

export default function SocialProofsReviewTab({ searchQuery = "" }) {
  const { fetchSocialProofs, verifySocialProof } = useAdminVerification();
  const [proofs, setProofs] = useState([]);
  const [statusFilter, setStatusFilter] = useState("pending");
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
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
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
        <div className="admin-table-wrap admin-table-wrap--proofs">
          <table className="admin-table admin-table--proofs">
            <thead>
              <tr>
                <th>Team</th>
                <th>Platform</th>
                <th>Source</th>
                <th>Post URL</th>
                <th>Screenshot</th>
                <th>Submitted by</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {proofs.map((proof) => {
                const id = proof.id || proof._id;
                return (
                  <tr key={id}>
                    <td>{proof.team?.title || "—"}</td>
                    <td>{proof.platform}</td>
                    <td>
                      <span className="admin-badge admin-badge--neutral">
                        {proof.source === "zoho" ? "zoho" : "app"}
                      </span>
                    </td>
                    <td>
                      <a href={proof.postUrl} target="_blank" rel="noreferrer">
                        View post
                      </a>
                    </td>
                    <td>
                      {proof.screenshotUrl ? (
                        /^https?:\/\//i.test(proof.screenshotUrl) ? (
                          <a
                            href={proof.screenshotUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="admin-proof-screenshot"
                          >
                            <img
                              src={proof.screenshotUrl}
                              alt={`${proof.platform} share screenshot`}
                              loading="lazy"
                            />
                            <span>View full</span>
                          </a>
                        ) : (
                          <span className="admin-proof-screenshot-text" title={proof.screenshotUrl}>
                            {proof.screenshotUrl}
                          </span>
                        )
                      ) : (
                        <span className="admin-proof-screenshot-missing">Post link only</span>
                      )}
                    </td>
                    <td>{formatName(proof.submittedBy)}</td>
                    <td>
                      <span className={`admin-badge admin-badge--${proof.status}`}>
                        {proof.status}
                      </span>
                    </td>
                    <td className="admin-table__actions">
                      {proof.status !== "verified" && (
                        <button
                          type="button"
                          className="admin-btn admin-btn--approve"
                          disabled={actionId === id}
                          onClick={() => handleVerify(id, "verified")}
                        >
                          Verify
                        </button>
                      )}
                      {proof.status !== "rejected" && (
                        <button
                          type="button"
                          className="admin-btn admin-btn--reject"
                          disabled={actionId === id}
                          onClick={() => handleVerify(id, "rejected")}
                        >
                          Reject
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
