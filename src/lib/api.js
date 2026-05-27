const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export async function apiFetch(path, { token, method = "GET", body } = {}) {
  const headers = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const message = data.error || data.message || res.statusText || "Request failed";
    const err = new Error(message);
    err.status = res.status;
    err.data = data;
    throw err;
  }

  return data;
}

export function getApiBaseUrl() {
  return API_BASE;
}
