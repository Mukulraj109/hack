import { useCallback } from "react";
import { apiFetch } from "../lib/api";
import { useHackathonAuth } from "../auth/HackathonAuthContext";

export function useAdminVerification() {
  const { getAccessToken } = useHackathonAuth();

  const withToken = useCallback(
    async (fn) => {
      const token = await getAccessToken();
      if (!token) {
        throw new Error("Could not obtain access token");
      }
      return fn(token);
    },
    [getAccessToken]
  );

  const fetchUsers = useCallback(
    async ({ accountStatus = "pending", hasRegistration = true, search = "" } = {}) => {
      const params = new URLSearchParams();
      if (accountStatus) params.set("accountStatus", accountStatus);
      if (hasRegistration) params.set("hasRegistration", "true");
      if (search.trim()) params.set("search", search.trim());
      return withToken((token) =>
        apiFetch(`/api/hackathon/admin/users?${params.toString()}`, { token })
      );
    },
    [withToken]
  );

  const searchUsers = useCallback(
    async (q) => {
      const params = new URLSearchParams();
      if (q.trim()) params.set("q", q.trim());
      return withToken((token) =>
        apiFetch(`/api/hackathon/admin/users/search?${params.toString()}`, { token })
      );
    },
    [withToken]
  );

  const addUserPoints = useCallback(
    async (userId, points, note) =>
      withToken((token) =>
        apiFetch(`/api/hackathon/admin/users/${userId}/points`, {
          token,
          method: "POST",
          body: { points, ...(note ? { note } : {}) },
        })
      ),
    [withToken]
  );

  const updateAccountStatus = useCallback(
    async (userId, accountStatus) =>
      withToken((token) =>
        apiFetch(`/api/hackathon/admin/users/${userId}/account-status`, {
          token,
          method: "PATCH",
          body: { accountStatus },
        })
      ),
    [withToken]
  );

  const fetchSubmissions = useCallback(
    async ({ status = "submitted", track, search = "" } = {}) => {
      const params = new URLSearchParams();
      if (status) params.set("status", status);
      if (track) params.set("track", track);
      if (search.trim()) params.set("search", search.trim());
      return withToken((token) =>
        apiFetch(`/api/hackathon/admin/submissions?${params.toString()}`, { token })
      );
    },
    [withToken]
  );

  const fetchSubmission = useCallback(
    async (id) =>
      withToken((token) => apiFetch(`/api/hackathon/admin/submissions/${id}`, { token })),
    [withToken]
  );

  const updateSubmissionStatus = useCallback(
    async (id, status) =>
      withToken((token) =>
        apiFetch(`/api/hackathon/admin/submissions/${id}/status`, {
          token,
          method: "PUT",
          body: { status },
        })
      ),
    [withToken]
  );

  const scoreSubmissionJudge = useCallback(
    async (id, judgePoints, judgeFeedback) =>
      withToken((token) =>
        apiFetch(`/api/hackathon/admin/submissions/${id}/judge-score`, {
          token,
          method: "PUT",
          body: {
            judgePoints,
            ...(judgeFeedback ? { judgeFeedback } : {}),
          },
        })
      ),
    [withToken]
  );

  const fetchSocialProofs = useCallback(
    async ({ status = "pending", search = "" } = {}) => {
      const params = new URLSearchParams();
      if (status) params.set("status", status);
      if (search.trim()) params.set("search", search.trim());
      return withToken((token) =>
        apiFetch(`/api/hackathon/admin/social-proofs?${params.toString()}`, { token })
      );
    },
    [withToken]
  );

  const verifySocialProof = useCallback(
    async (id, status) =>
      withToken((token) =>
        apiFetch(`/api/hackathon/admin/social-proofs/${id}/verify`, {
          token,
          method: "PUT",
          body: { status },
        })
      ),
    [withToken]
  );

  return {
    fetchUsers,
    searchUsers,
    addUserPoints,
    updateAccountStatus,
    fetchSubmissions,
    fetchSubmission,
    updateSubmissionStatus,
    scoreSubmissionJudge,
    fetchSocialProofs,
    verifySocialProof,
  };
}
