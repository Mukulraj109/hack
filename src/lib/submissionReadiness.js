/** Normalize URL for validation (prepend https if missing). */
export function normalizeUrl(value) {
  const trimmed = (value || "").trim();
  if (!trimmed) return "";
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

export function isValidUrl(value) {
  const normalized = normalizeUrl(value);
  if (!normalized) return false;
  try {
    new URL(normalized);
    return true;
  } catch {
    return false;
  }
}

export function isGithubUrl(value) {
  const normalized = normalizeUrl(value);
  if (!isValidUrl(normalized)) return false;
  try {
    const host = new URL(normalized).hostname.replace(/^www\./, "");
    return host === "github.com";
  } catch {
    return false;
  }
}

const CHECKLIST_KEYS = [
  "recruiterProfile",
  "resumeUploaded",
  "githubLink",
  "demoVideo",
  "onePager",
  "questionnaire",
  "supplementaryZipConfirmed",
];

const CHECKLIST_LABELS = {
  recruiterProfile: "Recruiter Profile Filled",
  resumeUploaded: "Resume Uploaded",
  githubLink: "Public GitHub Link Provided",
  demoVideo: "Shareable Video Demo Linked",
  onePager: "Solution One-Pager Written",
  questionnaire: "Questionnaire Completed",
  supplementaryZipConfirmed: "Supplementary ZIP Emailed",
};

export function computeReadiness(career, submission) {
  const linkedinUrl = career?.linkedinUrl || "";
  const hiringStatus = career?.hiringStatus || "";
  const availabilityTimeline = career?.availabilityTimeline || "";
  const resumeUrl = career?.resumeUrl || "";

  const repoUrl = submission?.repoUrl || "";
  const demoUrl = submission?.demoUrl || "";
  const description = submission?.description || "";
  const technicalRoadblock = submission?.technicalRoadblock || "";
  const sponsorApis = submission?.sponsorApis || "";

  const checks = {
    recruiterProfile:
      isValidUrl(linkedinUrl) && Boolean(hiringStatus) && Boolean(availabilityTimeline),
    resumeUploaded: Boolean(resumeUrl),
    githubLink: isGithubUrl(repoUrl),
    demoVideo: isValidUrl(demoUrl),
    onePager: description.trim().length >= 50,
    questionnaire: technicalRoadblock.trim().length > 0 && sponsorApis.trim().length > 0,
    supplementaryZipConfirmed: Boolean(submission?.supplementaryZipConfirmed),
  };

  const checklist = CHECKLIST_KEYS.map((key) => ({
    key,
    label: CHECKLIST_LABELS[key],
    complete: checks[key],
  }));

  const requiredKeys = [...CHECKLIST_KEYS];
  const completed = requiredKeys.filter((k) => checks[k]).length;
  const progressPercent = Math.round((completed / requiredKeys.length) * 100);
  const canFinalize = completed === requiredKeys.length;

  return { checklist, progressPercent, canFinalize, checks };
}

export const HIRING_STATUS_OPTIONS = [
  { value: "actively_looking", label: "Actively looking for immediate roles" },
  { value: "open_to_offers", label: "Open to offers" },
  { value: "not_looking", label: "Not looking right now" },
];

export const AVAILABILITY_OPTIONS = [
  { value: "immediate", label: "Immediate / Within 1 month" },
  { value: "one_to_three_months", label: "1-3 months" },
  { value: "three_plus_months", label: "3+ months" },
];
