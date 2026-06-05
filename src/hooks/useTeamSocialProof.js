import { useCallback, useEffect, useState } from "react";
import { apiFetch } from "../lib/api";
import { useHackathonAuth } from "../auth/HackathonAuthContext";

export function useTeamSocialProof(teamId) {
  const { getAccessToken } = useHackathonAuth();
  const [proofs, setProofs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    if (!teamId) {
      setProofs([]);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const token = await getAccessToken();
      const res = await apiFetch(`/api/teams/${teamId}/social-proof`, { token });
      setProofs(res.data ?? []);
    } catch (err) {
      setError(err?.message || "Failed to load social proof");
      setProofs([]);
    } finally {
      setLoading(false);
    }
  }, [teamId, getAccessToken]);

  useEffect(() => {
    load();
  }, [load]);

  const proofByPlatform = {
    instagram: proofs.find((p) => p.platform === "instagram") ?? null,
    linkedin: proofs.find((p) => p.platform === "linkedin") ?? null,
  };

  return {
    proofs,
    proofByPlatform,
    loading,
    error,
    reload: load,
  };
}
