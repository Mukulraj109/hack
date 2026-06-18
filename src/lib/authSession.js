export function isSessionExpiredError(err) {
  if (!err) return false;

  const message = String(
    err.message || err.data?.error || err.data?.message || ""
  ).toLowerCase();

  const auth0Code = String(err.error || err.code || "").toLowerCase();

  return (
    auth0Code === "login_required" ||
    auth0Code === "consent_required" ||
    auth0Code === "invalid_grant" ||
    message.includes("session expired") ||
    message.includes("token expired") ||
    message.includes("timestamp check failed") ||
    message.includes("invalid token") ||
    message.includes("login required")
  );
}

export function isIdTokenExpired(claims, bufferMs = 30_000) {
  if (!claims?.exp) return false;
  return claims.exp * 1000 <= Date.now() + bufferMs;
}
