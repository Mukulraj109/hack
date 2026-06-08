export function isSessionExpiredError(err) {
  if (!err) return false;
  if (err.status === 401) return true;

  const message = String(
    err.message || err.data?.error || err.data?.message || ""
  ).toLowerCase();

  return (
    message.includes("session expired") ||
    message.includes("token expired") ||
    message.includes("timestamp check failed") ||
    message.includes("invalid token")
  );
}

export function isIdTokenExpired(claims, bufferMs = 30_000) {
  if (!claims?.exp) return false;
  return claims.exp * 1000 <= Date.now() + bufferMs;
}
