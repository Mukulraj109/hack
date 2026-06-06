import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { apiFetch } from "../lib/api";
import { useHackathonAuth } from "../auth/HackathonAuthContext";
import {
  computeReadiness,
  normalizeUrl,
} from "../lib/submissionReadiness";

const SAVE_DEBOUNCE_MS = 500;

function applyCareerFromUser(user) {
  return {
    linkedinUrl: user?.linkedinUrl || "",
    hiringStatus: user?.hiringStatus || "actively_looking",
    availabilityTimeline: user?.availabilityTimeline || "immediate",
    resumeUrl: user?.resumeUrl || "",
    resumeFileName: user?.resumeFileName || "",
  };
}

function mapSubmission(sub) {
  if (!sub) return emptySubmission();
  const subId = sub.id || (typeof sub._id === "string" ? sub._id : sub._id?.toString?.());
  return {
    id: subId,
    title: sub.title || "",
    repoUrl: sub.repoUrl || "",
    demoUrl: sub.demoUrl || "",
    description: sub.description || "",
    technicalRoadblock: sub.technicalRoadblock || "",
    sponsorApis: sub.sponsorApis || "",
    supplementaryZipConfirmed: Boolean(sub.supplementaryZipConfirmed),
    track: sub.track || "",
    status: sub.status || "draft",
  };
}

function emptyCareer() {
  return {
    linkedinUrl: "",
    hiringStatus: "actively_looking",
    availabilityTimeline: "immediate",
    resumeUrl: "",
    resumeFileName: "",
  };
}

function emptySubmission() {
  return {
    id: null,
    title: "",
    repoUrl: "",
    demoUrl: "",
    description: "",
    technicalRoadblock: "",
    sponsorApis: "",
    supplementaryZipConfirmed: false,
    track: "",
    status: "draft",
  };
}

export function useSubmissionForm() {
  const {
    user,
    team,
    canWrite,
    isAuthenticated,
    auth0Loading,
    getAccessToken,
    loading: authLoading,
    refreshSession,
  } = useHackathonAuth();

  const [loading, setLoading] = useState(true);
  const [submissionHydrating, setSubmissionHydrating] = useState(false);
  const [error, setError] = useState(null);
  const [saveError, setSaveError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [finalizing, setFinalizing] = useState(false);
  const [finalizeError, setFinalizeError] = useState(null);
  const [finalizeSuccess, setFinalizeSuccess] = useState(false);

  const [career, setCareer] = useState(emptyCareer);
  const [submission, setSubmission] = useState(emptySubmission);
  const [needsTeamTrack, setNeedsTeamTrack] = useState(false);

  const careerRef = useRef(career);
  const submissionRef = useRef(submission);
  careerRef.current = career;
  submissionRef.current = submission;

  const saveCareerTimer = useRef(null);
  const saveSubmissionTimer = useRef(null);
  const submissionSaveSeq = useRef(0);
  const persistSubmissionRef = useRef(async () => {});
  const loadSeqRef = useRef(0);
  const userRef = useRef(user);
  const teamRef = useRef(team);
  userRef.current = user;
  teamRef.current = team;

  const isReadOnly = !canWrite || submission.status !== "draft";
  const isFinalized = submission.status !== "draft";

  const readiness = useMemo(
    () => computeReadiness(career, submission),
    [career, submission]
  );

  const load = useCallback(async () => {
    const seq = ++loadSeqRef.current;
    const currentUser = userRef.current;
    const currentTeam = teamRef.current;

    setError(null);
    setNeedsTeamTrack(false);
    setCareer(applyCareerFromUser(currentUser));

    if (currentTeam && !currentTeam.track) {
      setNeedsTeamTrack(true);
      setSubmission(emptySubmission());
      setSubmissionHydrating(false);
      setLoading(false);
      return;
    }

    setLoading(false);
    setSubmissionHydrating(true);

    try {
      const token = await getAccessToken();
      if (!token) throw new Error("Not authenticated");
      if (seq !== loadSeqRef.current) return;

      const myRes = await apiFetch("/api/submissions/my", { token });
      if (seq !== loadSeqRef.current) return;

      let sub = myRes.data;

      if (!sub && canWrite) {
        const track = currentTeam.track;
        const title = currentTeam?.title
          ? `${currentTeam.title} Submission`
          : "Solo Submission";
        const createRes = await apiFetch("/api/submissions", {
          token,
          method: "POST",
          body: {
            title,
            track,
          },
        });
        if (seq !== loadSeqRef.current) return;
        sub = createRes.data;
      }

      if (sub) {
        setSubmission(mapSubmission(sub));
      }
    } catch (err) {
      if (seq !== loadSeqRef.current) return;
      setError(err?.message || "Failed to load submission");
    } finally {
      if (seq === loadSeqRef.current) {
        setSubmissionHydrating(false);
      }
    }
  }, [canWrite, getAccessToken]);

  useEffect(() => {
    if (authLoading || auth0Loading || !isAuthenticated || !user?.id) return;
    setLoading(true);
    load();
  }, [authLoading, auth0Loading, isAuthenticated, user?.id, load]);

  const persistCareer = useCallback(async () => {
    if (isReadOnly) return;
    const c = careerRef.current;
    const linkedin = normalizeUrl(c.linkedinUrl);
    if (!linkedin) return;

    setSaving(true);
    setSaveError(null);
    try {
      const token = await getAccessToken();
      await apiFetch("/api/hackathon/me/career-profile", {
        token,
        method: "PATCH",
        body: {
          linkedinUrl: linkedin,
          hiringStatus: c.hiringStatus,
          availabilityTimeline: c.availabilityTimeline,
        },
      });
    } catch (err) {
      setSaveError(err?.message || "Failed to save career profile");
    } finally {
      setSaving(false);
    }
  }, [getAccessToken, isReadOnly]);

  const persistSubmission = useCallback(async () => {
    const sub = submissionRef.current;
    if (isReadOnly || !sub.id) return;

    const saveSeq = ++submissionSaveSeq.current;
    const snapshot = {
      repoUrl: sub.repoUrl,
      demoUrl: sub.demoUrl,
      description: sub.description,
      technicalRoadblock: sub.technicalRoadblock,
      sponsorApis: sub.sponsorApis,
      supplementaryZipConfirmed: sub.supplementaryZipConfirmed,
    };

    setSaving(true);
    setSaveError(null);
    try {
      const token = await getAccessToken();
      const res = await apiFetch(`/api/submissions/${sub.id}`, {
        token,
        method: "PUT",
        body: {
          repoUrl: normalizeUrl(snapshot.repoUrl) || undefined,
          demoUrl: normalizeUrl(snapshot.demoUrl) || undefined,
          description: snapshot.description || undefined,
          technicalRoadblock: snapshot.technicalRoadblock || undefined,
          sponsorApis: snapshot.sponsorApis || undefined,
          supplementaryZipConfirmed: snapshot.supplementaryZipConfirmed,
        },
      });

      // Ignore responses from older saves when the user kept typing.
      if (saveSeq !== submissionSaveSeq.current) return;

      const current = submissionRef.current;
      const fieldsChangedWhileSaving =
        current.repoUrl !== snapshot.repoUrl ||
        current.demoUrl !== snapshot.demoUrl ||
        current.description !== snapshot.description ||
        current.technicalRoadblock !== snapshot.technicalRoadblock ||
        current.sponsorApis !== snapshot.sponsorApis ||
        current.supplementaryZipConfirmed !== snapshot.supplementaryZipConfirmed;

      if (fieldsChangedWhileSaving) {
        if (saveSubmissionTimer.current) clearTimeout(saveSubmissionTimer.current);
        saveSubmissionTimer.current = setTimeout(() => {
          persistSubmissionRef.current();
        }, SAVE_DEBOUNCE_MS);
        return;
      }

      const updated = res.data;
      setSubmission((prev) => ({
        ...prev,
        id: updated.id || updated._id || prev.id,
        status: updated.status ?? prev.status,
        track: updated.track ?? prev.track,
        supplementaryZipConfirmed:
          updated.supplementaryZipConfirmed ?? prev.supplementaryZipConfirmed,
      }));
    } catch (err) {
      setSaveError(err?.message || "Failed to save submission");
    } finally {
      setSaving(false);
    }
  }, [getAccessToken, isReadOnly]);

  persistSubmissionRef.current = persistSubmission;

  const scheduleCareerSave = useCallback(() => {
    if (saveCareerTimer.current) clearTimeout(saveCareerTimer.current);
    saveCareerTimer.current = setTimeout(() => {
      persistCareer();
    }, SAVE_DEBOUNCE_MS);
  }, [persistCareer]);

  const scheduleSubmissionSave = useCallback(() => {
    if (saveSubmissionTimer.current) clearTimeout(saveSubmissionTimer.current);
    saveSubmissionTimer.current = setTimeout(() => {
      persistSubmissionRef.current();
    }, SAVE_DEBOUNCE_MS);
  }, []);

  const updateCareer = useCallback(
    (patch) => {
      setCareer((prev) => ({ ...prev, ...patch }));
      scheduleCareerSave();
    },
    [scheduleCareerSave]
  );

  const updateSubmissionField = useCallback(
    (patch) => {
      setSubmission((prev) => ({ ...prev, ...patch }));
      scheduleSubmissionSave();
    },
    [scheduleSubmissionSave]
  );

  const uploadResume = useCallback(
    async (file) => {
      if (isReadOnly) return;
      if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
        throw new Error("Only PDF resumes are allowed.");
      }
      if (file.size > 5 * 1024 * 1024) {
        throw new Error("Resume is too large. Max allowed size is 5MB.");
      }

      const token = await getAccessToken();
      const formData = new FormData();
      formData.append("resume", file);
      const res = await apiFetch("/api/hackathon/me/resume", {
        token,
        method: "POST",
        formData,
      });
      setCareer((prev) => ({
        ...prev,
        resumeUrl: res.data?.resumeUrl || prev.resumeUrl,
        resumeFileName: res.data?.resumeFileName || file.name,
      }));
      refreshSession({ silent: true }).catch(() => {});
    },
    [getAccessToken, isReadOnly, refreshSession]
  );

  const finalize = useCallback(async () => {
    if (!submission.id || !readiness.canFinalize || isReadOnly) return;

    setFinalizing(true);
    setFinalizeError(null);
    try {
      await persistCareer();
      await persistSubmission();

      const token = await getAccessToken();
      const res = await apiFetch(`/api/submissions/${submission.id}/finalize`, {
        token,
        method: "POST",
      });
      const updated = res.data;
      setSubmission((prev) => ({
        ...prev,
        status: updated.status || "submitted",
        submittedAt: updated.submittedAt,
      }));
      setFinalizeSuccess(true);
    } catch (err) {
      setFinalizeError(err?.message || "Failed to lock in submission");
    } finally {
      setFinalizing(false);
    }
  }, [
    submission.id,
    readiness.canFinalize,
    isReadOnly,
    persistCareer,
    persistSubmission,
    getAccessToken,
  ]);

  useEffect(() => {
    return () => {
      if (saveCareerTimer.current) clearTimeout(saveCareerTimer.current);
      if (saveSubmissionTimer.current) clearTimeout(saveSubmissionTimer.current);
    };
  }, []);

  return {
    loading,
    submissionHydrating,
    error,
    saveError,
    saving,
    career,
    submission,
    updateCareer,
    updateSubmissionField,
    uploadResume,
    readiness,
    finalize,
    finalizing,
    finalizeError,
    finalizeSuccess,
    isReadOnly,
    isFinalized,
    needsTeamTrack,
    reload: load,
    team,
    user,
    canWrite,
  };
}
