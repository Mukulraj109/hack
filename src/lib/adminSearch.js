export function formatAdminName(user) {
  if (!user) return "—";
  const name = [user.firstName, user.lastName].filter(Boolean).join(" ");
  return name || user.email || "—";
}

export function matchesAdminSearch(query, ...values) {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  const haystack = values
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  return haystack.includes(q);
}
