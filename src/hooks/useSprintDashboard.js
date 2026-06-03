import { useCallback, useEffect, useMemo, useState } from "react";
import { apiFetch } from "../lib/api";
import { fetchCountdownConfig, fetchTracksConfig } from "../lib/configCache";
import { useHackathonAuth } from "../auth/HackathonAuthContext";
import { resolveHackathonStartDate, resolveSprintEndDate } from "../lib/hackathonDates";

function mapTrackStatus(trackId, teamTrack) {
  if (!teamTrack) return "active";
  if (teamTrack === trackId) return "completed";
  return "locked";
}

function isPointsItemDone(item) {
  return Boolean(item.completed || item.earned > 0);
}

function breakdownIcon(item) {
  const done = isPointsItemDone(item);
  if (item.id === "registration") return done ? "check" : "radio_button_unchecked";
  if (item.id === "judge") return done ? "check" : "hourglass_empty";
  if (done || item.status === "completed") return "check";
  if (item.status === "rejected") return "close";
  if (item.status === "submitted") return "schedule";
  if (item.status === "locked") return "lock";
  return "link";
}

export function pointsTrackerRailProgress(items) {
  if (!items?.length) return 0;

  let lastDoneIndex = -1;
  items.forEach((item, index) => {
    if (isPointsItemDone(item)) lastDoneIndex = index;
  });

  if (lastDoneIndex < 0) return 0;
  if (items.length === 1) return 100;

  const centerPercent = (lastDoneIndex / (items.length - 1)) * 100;
  return Math.min(100, Math.max(lastDoneIndex === 0 ? 10 : 0, centerPercent));
}

export function useSprintDashboard() {
  const { user, team, canWrite, isAuthenticated, auth0Loading, getAccessToken, refreshSession } =
    useHackathonAuth();
  const [countdown, setCountdown] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [breakdown, setBreakdown] = useState(null);
  const [rank, setRank] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [countdownRes, tracksRes] = await Promise.all([
        fetchCountdownConfig(),
        fetchTracksConfig(),
      ]);

      setCountdown(countdownRes.data ?? null);
      setTracks(tracksRes.data ?? []);
      setLoading(false);

      const token = await getAccessToken();
      const [breakdownRes, rankRes] = await Promise.all([
        apiFetch("/api/hackathon/me/points-breakdown", { token }),
        apiFetch("/api/leaderboard/me", { token }).catch(() => ({ data: null })),
      ]);

      setBreakdown(breakdownRes.data ?? null);
      setRank(rankRes.data ?? null);
    } catch (err) {
      setError(err?.message || "Failed to load dashboard");
      setLoading(false);
    }
  }, [getAccessToken]);

  useEffect(() => {
    if (auth0Loading || !isAuthenticated) return;
    load();
  }, [auth0Loading, isAuthenticated, load]);

  const teamTrack = team?.track ?? null;
  const teamLabel = team?.title ?? "Solo builder";
  const teamStatusLabel = canWrite ? "Active" : "Pending";

  const trackCards = useMemo(
    () =>
      tracks.map((t) => ({
        id: t.id,
        title: t.title,
        description: t.description,
        status: mapTrackStatus(t.id, teamTrack),
        tags: t.tags,
      })),
    [tracks, teamTrack]
  );

  const pointsItems = useMemo(() => {
    if (!breakdown?.items) return [];
    return breakdown.items.map((item) => {
      const done = isPointsItemDone(item);
      return {
        id: item.id,
        label: item.label,
        points:
          item.id === "judge" && item.earned > 0
            ? `${item.earned} / ${item.points}pts`
            : item.earned > 0 && item.id !== "registration"
              ? `${item.earned}pts`
              : `${item.points}pts`,
        earned: item.earned,
        completed: done,
        status: item.status,
        icon: breakdownIcon(item),
      };
    });
  }, [breakdown]);

  const pointsRailProgress = useMemo(
    () => pointsTrackerRailProgress(pointsItems),
    [pointsItems]
  );

  const pointsCurrent = breakdown?.totalEarned ?? team?.totalPoints ?? 0;
  const pointsMax = breakdown?.maxPoints ?? 250;

  const sprintEndDate = useMemo(() => resolveSprintEndDate(countdown), [countdown]);

  const countdownProgress = useMemo(() => {
    const start = resolveHackathonStartDate(countdown).getTime();
    const end = sprintEndDate.getTime();
    const now = Date.now();
    if (end <= start) return 0;
    const elapsed = Math.min(Math.max(now - start, 0), end - start);
    return Math.round((elapsed / (end - start)) * 100);
  }, [countdown, sprintEndDate]);

  return {
    loading,
    error,
    reload: load,
    refreshSession,
    canWrite,
    user,
    team,
    teamLabel,
    teamStatusLabel,
    teamTrack,
    trackCards,
    pointsItems,
    pointsRailProgress,
    pointsCurrent,
    pointsMax,
    pointsProgressPercent: pointsMax > 0 ? Math.round((pointsCurrent / pointsMax) * 100) : 0,
    countdown,
    sprintEndDate,
    countdownProgress,
    rank: rank?.rank ?? null,
    rankPoints: rank?.points ?? null,
    isCaptain: Boolean(
      team?.members?.find((m) => m.isCurrentUser && m.isLeader)
    ),
    configTracks: tracks,
  };
}
