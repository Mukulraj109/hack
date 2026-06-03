import { useCallback, useEffect, useState } from "react";
import { useAdminVerification } from "../../hooks/useAdminVerification";

const ACCOUNT_STATUSES = ["pending", "active", "rejected", "suspended"];

function formatDate(value) {
  if (!value) return "—";
  return new Date(value).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function formatName(user) {
  const name = [user.firstName, user.lastName].filter(Boolean).join(" ");
  return name || user.email || "—";
}

function eligibilitySummary(eligibility = {}) {
  const flags = [
    eligibility.usGraduateWindow && "Grad window",
    eligibility.usWorkAuthorization && "Work auth",
    eligibility.usImmigrationStatus && "Immigration",
    eligibility.age18Plus && "18+",
  ].filter(Boolean);
  return flags.length ? flags.join(", ") : "—";
}

export default function AccountsReviewTab({ searchQuery = "" }) {
  const { fetchUsers, updateAccountStatus } = useAdminVerification();
  const [users, setUsers] = useState([]);
  const [statusFilter, setStatusFilter] = useState("pending");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionId, setActionId] = useState(null);

  const loadUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchUsers({
        accountStatus: statusFilter,
        hasRegistration: true,
        search: searchQuery,
      });
      setUsers(res.data ?? []);
    } catch (err) {
      setError(err.message || "Failed to load users");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }, [fetchUsers, statusFilter, searchQuery]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const handleStatusChange = async (userId, accountStatus) => {
    setActionId(userId);
    setError(null);
    try {
      await updateAccountStatus(userId, accountStatus);
      await loadUsers();
    } catch (err) {
      setError(err.message || "Failed to update account");
    } finally {
      setActionId(null);
    }
  };

  return (
    <div className="admin-tab">
      <div className="admin-tab__toolbar">
        <label className="admin-tab__filter">
          <span>Account status</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            {ACCOUNT_STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>
        <button type="button" className="admin-tab__refresh" onClick={loadUsers}>
          Refresh
        </button>
      </div>

      {error && <p className="admin-tab__error">{error}</p>}

      {loading ? (
        <p className="admin-tab__loading">Loading accounts…</p>
      ) : users.length === 0 ? (
        <p className="admin-tab__empty">No registered users match this filter.</p>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>University</th>
                <th>Registered</th>
                <th>Eligibility</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id || user._id}>
                  <td>{formatName(user)}</td>
                  <td>{user.email}</td>
                  <td>{user.universityName || "—"}</td>
                  <td>{formatDate(user.registrationCompletedAt || user.createdAt)}</td>
                  <td>{eligibilitySummary(user.eligibility)}</td>
                  <td>
                    <span className={`admin-badge admin-badge--${user.accountStatus}`}>
                      {user.accountStatus}
                    </span>
                  </td>
                  <td className="admin-table__actions">
                    {user.accountStatus !== "active" && (
                      <button
                        type="button"
                        className="admin-btn admin-btn--approve"
                        disabled={actionId === (user.id || user._id)}
                        onClick={() => handleStatusChange(user.id || user._id, "active")}
                      >
                        Approve
                      </button>
                    )}
                    {user.accountStatus !== "rejected" && (
                      <button
                        type="button"
                        className="admin-btn admin-btn--reject"
                        disabled={actionId === (user.id || user._id)}
                        onClick={() => handleStatusChange(user.id || user._id, "rejected")}
                      >
                        Reject
                      </button>
                    )}
                    {user.accountStatus !== "suspended" && (
                      <button
                        type="button"
                        className="admin-btn admin-btn--neutral"
                        disabled={actionId === (user.id || user._id)}
                        onClick={() => handleStatusChange(user.id || user._id, "suspended")}
                      >
                        Suspend
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
