import { useCallback, useEffect, useState } from "react";
import { useAdminVerification } from "../../hooks/useAdminVerification";
import { formatAdminName } from "../../lib/adminSearch";
import { AdminTableSkeleton } from "../sprint/SprintPageSkeleton";
import SprintLoadError from "../sprint/SprintLoadError";

const POINT_PRESETS = [25, 50];

function getDisplayPoints(user) {
  if (!user) return 0;
  if (user.team) {
    return user.team.totalPoints ?? user.totalPoints ?? 0;
  }
  return user.totalPoints ?? user.manualPointsBonus ?? 0;
}

function getManualBonus(user) {
  if (!user) return 0;
  if (user.team) return user.team.manualPointsBonus ?? 0;
  return user.manualPointsBonus ?? 0;
}

export default function PointsAdjustmentTab({ searchQuery = "" }) {
  const { searchUsers, addUserPoints } = useAdminVerification();
  const [results, setResults] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [points, setPoints] = useState("25");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [searchError, setSearchError] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const runSearch = useCallback(async () => {
    const q = searchQuery.trim();
    if (q.length < 2) {
      setResults([]);
      setSelectedUser(null);
      return;
    }

    setLoading(true);
    setSearchError(null);
    try {
      const res = await searchUsers(q);
      const users = res.data ?? [];
      setResults(users);
      if (users.length === 1) {
        setSelectedUser(users[0]);
      } else {
        setSelectedUser((prev) => {
          if (!prev) return null;
          return users.some((u) => (u.id || u._id) === (prev.id || prev._id)) ? prev : null;
        });
      }
    } catch (err) {
      setSearchError(err.message || "Failed to search users");
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, searchUsers]);

  useEffect(() => {
    const timer = setTimeout(runSearch, 300);
    return () => clearTimeout(timer);
  }, [runSearch]);

  const handleAddPoints = async () => {
    if (!selectedUser) return;

    const parsed = Number(points);
    if (!Number.isInteger(parsed) || parsed < 1 || parsed > 50) {
      setError("Enter a whole number between 1 and 50.");
      return;
    }

    setSubmitting(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await addUserPoints(selectedUser.id || selectedUser._id, parsed, note.trim());
      setSuccess(res.message || `Added ${parsed} points.`);
      setSelectedUser(res.data?.user ?? selectedUser);
      await runSearch();
    } catch (err) {
      setError(err.message || "Failed to add points");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="admin-tab">
      <p className="admin-tab__hint">
        Use the search bar above to find a participant, then add manual bonus points (up to 50 per
        action, max 75 total manual sprint bonus per team/user). Useful when social proof points
        were missed.
      </p>

      {searchError && !loading && searchQuery.trim().length >= 2 && (
        <SprintLoadError message={searchError} onRetry={runSearch} style={{ marginBottom: "16px" }} />
      )}
      {error && <p className="admin-tab__error">{error}</p>}
      {success && <p className="admin-tab__success">{success}</p>}

      {searchQuery.trim().length < 2 ? (
        <p className="admin-tab__empty">Type at least 2 characters in the search bar to find a user.</p>
      ) : loading ? (
        <AdminTableSkeleton rows={4} />
      ) : searchError ? null : results.length === 0 ? (
        <p className="admin-tab__empty">No users found for &ldquo;{searchQuery}&rdquo;.</p>
      ) : (
        <div className="admin-points">
          <div className="admin-points__results">
            <h3 className="admin-points__heading">Search results</h3>
            <ul className="admin-points__list">
              {results.map((user) => {
                const id = user.id || user._id;
                const isSelected =
                  (selectedUser?.id || selectedUser?._id) === id;
                return (
                  <li key={id}>
                    <button
                      type="button"
                      className={`admin-points__user${isSelected ? " admin-points__user--selected" : ""}`}
                      onClick={() => setSelectedUser(user)}
                    >
                      <span className="admin-points__user-name">{formatAdminName(user)}</span>
                      <span className="admin-points__user-email">{user.email}</span>
                      <span className="admin-points__user-meta">
                        Total: {getDisplayPoints(user)} pts · Manual bonus: {getManualBonus(user)} pts
                        {user.team?.title ? ` · Team: ${user.team.title}` : " · Solo"}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {selectedUser && (
            <div className="admin-points__form">
              <h3 className="admin-points__heading">Add points for {formatAdminName(selectedUser)}</h3>
              <p className="admin-points__summary">
                Current total: <strong>{getDisplayPoints(selectedUser)}</strong> · Manual bonus:{" "}
                <strong>{getManualBonus(selectedUser)}</strong>
              </p>

              <div className="admin-points__presets">
                {POINT_PRESETS.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    className={`admin-btn admin-btn--neutral${points === String(preset) ? " admin-btn--selected" : ""}`}
                    onClick={() => setPoints(String(preset))}
                  >
                    +{preset}
                  </button>
                ))}
              </div>

              <label className="admin-points__field">
                <span>Points to add (1–50)</span>
                <input
                  type="number"
                  min="1"
                  max="50"
                  value={points}
                  onChange={(e) => setPoints(e.target.value)}
                />
              </label>

              <label className="admin-points__field">
                <span>Note (optional)</span>
                <input
                  type="text"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="e.g. LinkedIn share verified manually"
                />
              </label>

              <button
                type="button"
                className="admin-btn admin-btn--approve admin-points__submit"
                disabled={submitting}
                onClick={handleAddPoints}
              >
                {submitting ? "Adding…" : "Add points"}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
