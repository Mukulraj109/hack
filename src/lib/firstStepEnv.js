/**
 * FirstStep frontend URLs for cross-app navigation (hackathon → FirstStep login).
 * Values come from Vite env files:
 *   .env.development  → localhost:5174
 *   .env.production   → firststepjob.com
 *   .env.local        → optional overrides
 */

function requireEnv(name) {
  const value = import.meta.env[name];
  if (!value) {
    console.error(`[hackathon] Missing required env var: ${name}`);
  }
  return value ?? "";
}

export const FIRSTSTEP_CALLBACK_URL = requireEnv("VITE_FIRSTSTEP_CALLBACK_URL");
export const FIRSTSTEP_DASHBOARD_URL = requireEnv("VITE_FIRSTSTEP_DASHBOARD_URL");
export const FIRSTSTEP_ORIGIN = requireEnv("VITE_FIRSTSTEP_ORIGIN");

/** FirstStep dashboard with hackathon entry context (Option A return target). */
export function getFirstStepDashboardWithHackathonContext() {
  const base = FIRSTSTEP_DASHBOARD_URL || `${FIRSTSTEP_ORIGIN}/dashboard`;
  return `${base}?from=hackathon`;
}
