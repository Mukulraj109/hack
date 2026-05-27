/** Display name / avatar from Auth0 user + hackathon session (FirstStep-style fallbacks). */
export function getDisplayProfile(auth0User, sessionUser) {
  const first = sessionUser?.firstName?.trim();
  const last = sessionUser?.lastName?.trim();
  const sessionName = [first, last].filter(Boolean).join(" ");

  const displayName =
    auth0User?.name?.trim() ||
    sessionName ||
    (auth0User?.given_name && auth0User?.family_name
      ? `${auth0User.given_name} ${auth0User.family_name}`.trim()
      : "") ||
    auth0User?.given_name?.trim() ||
    auth0User?.nickname?.trim() ||
    sessionUser?.email ||
    auth0User?.email ||
    "Account";

  const picture = auth0User?.picture || null;
  const email = sessionUser?.email || auth0User?.email || "";

  return {
    displayName,
    initials: getInitials(displayName),
    picture,
    email,
  };
}

export function getInitials(name) {
  const trimmed = (name || "").trim();
  if (!trimmed) return "?";
  const parts = trimmed.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  }
  return trimmed.slice(0, 2).toUpperCase();
}
