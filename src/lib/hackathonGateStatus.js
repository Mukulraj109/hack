const FIRSTSTEP_API =
  import.meta.env.VITE_FIRSTSTEP_API_URL ||
  import.meta.env.VITE_FIRSTSTEP_ORIGIN ||
  "http://localhost:5000";

/** Load gate fields from FirstStep when hackathon /me is unavailable. */
export async function fetchHackathonGateStatus(email) {
  const res = await fetch(`${FIRSTSTEP_API}/firstStep/hackathon/status/get`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  if (!res.ok) {
    throw new Error(`Status lookup failed (${res.status})`);
  }

  const json = await res.json();
  const payload = json?.data ?? json;

  return {
    email,
    hasRegistration: Boolean(payload?.hasRegistration ?? payload?.registered),
    canWrite: Boolean(payload?.canWrite),
    accountStatus: payload?.accountStatus ?? "pending",
    registrationStatus: payload?.status ?? "NOT_STARTED",
  };
}

/** Mark that the user has submitted the Zoho form (local dev when webhook cannot reach localhost). */
export async function markHackathonRegistrationInProgress(email) {
  const res = await fetch(`${FIRSTSTEP_API}/firstStep/hackathon/status/update`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, status: "IN_PROGRESS" }),
  });

  if (!res.ok) {
    throw new Error(`Status update failed (${res.status})`);
  }

  return fetchHackathonGateStatus(email);
}

export function buildGateSessionFromStatus(status) {
  return {
    user: {
      email: status.email,
      hasRegistration: status.hasRegistration,
      canWrite: status.canWrite,
      accountStatus: status.accountStatus,
      registrationStatus: status.registrationStatus ?? "NOT_STARTED",
    },
    team: null,
  };
}

/** User submitted the form — waiting on admin (webhook and/or manual refresh). */
export function isRegistrationPendingReview(user) {
  if (!user) return false;
  if (user.hasRegistration) return true;
  const status = user.registrationStatus;
  return status === "IN_PROGRESS" || status === "COMPLETED";
}
