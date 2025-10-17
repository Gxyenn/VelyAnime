// Auto-generated helper to centralize API base URL and API key usage.
// Uses Vite environment variables: VITE_API_URL (default sankavollerei) and VITE_API_KEY (optional)
export const API_BASE = import.meta.env.VITE_API_URL || "https://www.sankavollerei.com/anime";
export const API_KEY = import.meta.env.VITE_API_KEY || "";

export async function apiFetch(path, options = {}) {
  const url = path.startsWith("http") ? path : `${API_BASE}${path.startsWith("/") ? "" : "/"}${path}`;
  const opts = Object.assign({}, options);
  opts.headers = Object.assign({}, opts.headers || {});
  if (API_KEY) {
    opts.headers["x-api-key"] = API_KEY;
  }
  const res = await fetch(url, opts);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API fetch error ${res.status}: ${text}`);
  }
  return res.json();
}
