/** Same schedule as sprint portal / landing — used when API config is missing. */
export const HACKATHON_START = new Date("2026-06-10T20:00:00-04:00");
export const SPRINT_HOURS = 100;

export function getDefaultSprintEndDate() {
  return new Date(HACKATHON_START.getTime() + SPRINT_HOURS * 60 * 60 * 1000);
}

export function getDefaultHackathonStartDate() {
  return new Date(HACKATHON_START.getTime());
}

/** Prefer API sprintEndDate; else compute from start + hours; else client default. */
export function resolveSprintEndDate(countdownData) {
  if (countdownData?.sprintEndDate) {
    const parsed = new Date(countdownData.sprintEndDate);
    if (!Number.isNaN(parsed.getTime())) return parsed;
  }

  if (countdownData?.startDate != null && countdownData?.sprintHours != null) {
    const start = new Date(countdownData.startDate);
    const hours = Number(countdownData.sprintHours);
    if (!Number.isNaN(start.getTime()) && hours > 0) {
      return new Date(start.getTime() + hours * 60 * 60 * 1000);
    }
  }

  return getDefaultSprintEndDate();
}

export function resolveHackathonStartDate(countdownData) {
  if (countdownData?.startDate) {
    const parsed = new Date(countdownData.startDate);
    if (!Number.isNaN(parsed.getTime())) return parsed;
  }
  return getDefaultHackathonStartDate();
}
