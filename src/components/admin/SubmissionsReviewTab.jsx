import { useCallback, useEffect, useState } from "react";
import { useAdminVerification } from "../../hooks/useAdminVerification";
import { AdminTableSkeleton } from "../sprint/SprintPageSkeleton";
import SprintLoadError from "../sprint/SprintLoadError";
import {
  AVAILABILITY_OPTIONS,
  HIRING_STATUS_OPTIONS,
} from "../../lib/submissionReadiness";

const SUBMISSION_STATUSES = ["submitted", "under_review", "judged", "draft"];
const MAX_JUDGE_POINTS = 175;
const JUDGEABLE_STATUSES = new Set(["under_review", "judged"]);

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

function formatName(user) {
  if (!user) return "—";
  const name = [user.firstName, user.lastName].filter(Boolean).join(" ");
  return name || user.email || "—";
}

function labelForOption(options, value) {
  return options.find((o) => o.value === value)?.label ?? value ?? "—";
}

function DetailField({ label, children }) {
  return (
    <div className="admin-detail__field">
      <dt>{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}

export default function SubmissionsReviewTab({ searchQuery = "" }) {
  const { fetchSubmissions, updateSubmissionStatus, scoreSubmissionJudge } =
    useAdminVerification();
  const [submissions, setSubmissions] = useState([]);
  const [statusFilter, setStatusFilter] = useState("submitted");
  const [selectedId, setSelectedId] = useState(null);
  const [judgePoints, setJudgePoints] = useState("");
  const [judgeFeedback, setJudgeFeedback] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [actionId, setActionId] = useState(null);
  const [scoring, setScoring] = useState(false);

  const loadSubmissions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchSubmissions({ status: statusFilter, search: searchQuery });
      setSubmissions(res.data ?? []);
    } catch (err) {
      setError(err.message || "Failed to load submissions");
      setSubmissions([]);
    } finally {
      setLoading(false);
    }
  }, [fetchSubmissions, statusFilter, searchQuery]);

  useEffect(() => {
    loadSubmissions();
  }, [loadSubmissions]);

  const selected = submissions.find((s) => (s.id || s._id) === selectedId) ?? null;

  useEffect(() => {
    if (!selected) {
      setJudgePoints("");
      setJudgeFeedback("");
      return;
    }
    setJudgePoints(
      selected.judgePoints != null ? String(selected.judgePoints) : ""
    );
    setJudgeFeedback(selected.judgeFeedback || "");
  }, [selected]);

  const handleStatusChange = async (submissionId, status) => {
    setActionId(submissionId);
    setError(null);
    setSuccess(null);
    try {
      await updateSubmissionStatus(submissionId, status);
      await loadSubmissions();
    } catch (err) {
      setError(err.message || "Failed to update submission");
    } finally {
      setActionId(null);
    }
  };

  const handleSaveJudgeScore = async () => {
    if (!selected) return;

    const parsed = Number(judgePoints);
    if (!Number.isInteger(parsed) || parsed < 0 || parsed > MAX_JUDGE_POINTS) {
      setError(`Enter whole judge points between 0 and ${MAX_JUDGE_POINTS}.`);
      return;
    }

    setScoring(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await scoreSubmissionJudge(
        selected.id || selected._id,
        parsed,
        judgeFeedback.trim()
      );
      setSuccess(res.message || `Saved ${parsed} judge points.`);
      await loadSubmissions();
      setSelectedId(res.data?.id || res.data?._id || selected.id || selected._id);
    } catch (err) {
      setError(err.message || "Failed to save judge score");
    } finally {
      setScoring(false);
    }
  };

  const showJudgePanel =
    selected && JUDGEABLE_STATUSES.has(selected.status);

  return (
    <div className="admin-tab">
      <div className="admin-tab__toolbar">
        <label className="admin-tab__filter">
          <span>Submission status</span>
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setSelectedId(null);
            }}
          >
            {SUBMISSION_STATUSES.map((status) => (
              <option key={status} value={status}>
                {status.replace("_", " ")}
              </option>
            ))}
          </select>
        </label>
        <button type="button" className="admin-tab__refresh" onClick={loadSubmissions}>
          Refresh
        </button>
      </div>

      {error && !loading && (
        <SprintLoadError message={error} onRetry={loadSubmissions} style={{ marginBottom: "16px" }} />
      )}
      {success && <p className="admin-tab__success">{success}</p>}

      {loading ? (
        <AdminTableSkeleton />
      ) : submissions.length === 0 ? (
        <p className="admin-tab__empty">No submissions match this filter.</p>
      ) : (
        <div className="admin-split">
          <div className="admin-table-wrap admin-table-wrap--submissions">
            <table className="admin-table admin-table--submissions">
              <thead>
                <tr>
                  <th>Project</th>
                  <th>Track</th>
                  <th>Submitter</th>
                  <th>Status</th>
                  <th>Judge pts</th>
                  <th>Submitted</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((submission) => {
                  const id = submission.id || submission._id;
                  const isSelected = selectedId === id;
                  return (
                    <tr
                      key={id}
                      className={isSelected ? "admin-table__row--selected" : undefined}
                      onClick={() => setSelectedId(id)}
                    >
                      <td>{submission.title || submission.team?.title || "—"}</td>
                      <td>{submission.track || "—"}</td>
                      <td>{formatName(submission.submittedBy)}</td>
                      <td>
                        <span className={`admin-badge admin-badge--${submission.status}`}>
                          {submission.status}
                        </span>
                      </td>
                      <td>
                        {submission.judgePoints != null ? submission.judgePoints : "—"}
                      </td>
                      <td>{formatDate(submission.submittedAt)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {selected && (
            <aside className="admin-detail">
              <h3 className="admin-detail__title">
                {selected.title || selected.team?.title || "Submission detail"}
              </h3>

              <dl className="admin-detail__list">
                <DetailField label="Status">
                  <select
                    value={selected.status}
                    disabled={actionId === (selected.id || selected._id)}
                    onChange={(e) =>
                      handleStatusChange(selected.id || selected._id, e.target.value)
                    }
                  >
                    {SUBMISSION_STATUSES.map((status) => (
                      <option key={status} value={status}>
                        {status.replace("_", " ")}
                      </option>
                    ))}
                  </select>
                </DetailField>

                {showJudgePanel && (
                  <div className="admin-judge-panel">
                    <h4 className="admin-judge-panel__title">Judge evaluation</h4>
                    <p className="admin-judge-panel__hint">
                      Assign up to {MAX_JUDGE_POINTS} points. Saving marks the submission as{" "}
                      <strong>judged</strong> and updates the team leaderboard total.
                    </p>

                    {selected.judgePoints != null && (
                      <p className="admin-judge-panel__current">
                        Current score: <strong>{selected.judgePoints}</strong> pts
                        {selected.judgedAt
                          ? ` · Saved ${formatDate(selected.judgedAt)}`
                          : ""}
                      </p>
                    )}

                    <label className="admin-judge-panel__field">
                      <span>Judge points (0–{MAX_JUDGE_POINTS})</span>
                      <input
                        type="number"
                        min="0"
                        max={MAX_JUDGE_POINTS}
                        value={judgePoints}
                        onChange={(e) => setJudgePoints(e.target.value)}
                      />
                    </label>

                    <label className="admin-judge-panel__field">
                      <span>Feedback (optional)</span>
                      <textarea
                        rows={3}
                        value={judgeFeedback}
                        onChange={(e) => setJudgeFeedback(e.target.value)}
                        placeholder="Brief evaluation notes for internal reference"
                      />
                    </label>

                    <button
                      type="button"
                      className="admin-btn admin-btn--approve admin-judge-panel__submit"
                      disabled={scoring}
                      onClick={handleSaveJudgeScore}
                    >
                      {scoring ? "Saving…" : "Save judge score"}
                    </button>
                  </div>
                )}

                <DetailField label="LinkedIn">
                  {selected.submittedBy?.linkedinUrl ? (
                    <a href={selected.submittedBy.linkedinUrl} target="_blank" rel="noreferrer">
                      {selected.submittedBy.linkedinUrl}
                    </a>
                  ) : (
                    "—"
                  )}
                </DetailField>

                <DetailField label="Resume">
                  {selected.submittedBy?.resumeUrl ? (
                    <a href={selected.submittedBy.resumeUrl} target="_blank" rel="noreferrer">
                      {selected.submittedBy.resumeFileName || "View resume"}
                    </a>
                  ) : (
                    "—"
                  )}
                </DetailField>

                <DetailField label="Hiring status">
                  {labelForOption(HIRING_STATUS_OPTIONS, selected.submittedBy?.hiringStatus)}
                </DetailField>

                <DetailField label="Availability">
                  {labelForOption(
                    AVAILABILITY_OPTIONS,
                    selected.submittedBy?.availabilityTimeline
                  )}
                </DetailField>

                <DetailField label="GitHub">
                  {selected.repoUrl ? (
                    <a href={selected.repoUrl} target="_blank" rel="noreferrer">
                      {selected.repoUrl}
                    </a>
                  ) : (
                    "—"
                  )}
                </DetailField>

                <DetailField label="Demo video">
                  {selected.demoUrl ? (
                    <a href={selected.demoUrl} target="_blank" rel="noreferrer">
                      {selected.demoUrl}
                    </a>
                  ) : (
                    "—"
                  )}
                </DetailField>

                <DetailField label="Description">{selected.description || "—"}</DetailField>
                <DetailField label="Technical roadblock">
                  {selected.technicalRoadblock || "—"}
                </DetailField>
                <DetailField label="Sponsor APIs">{selected.sponsorApis || "—"}</DetailField>
                <DetailField label="Supplementary ZIP confirmed">
                  {selected.supplementaryZipConfirmed ? "Yes" : "No"}
                </DetailField>
              </dl>
            </aside>
          )}
        </div>
      )}
    </div>
  );
}
