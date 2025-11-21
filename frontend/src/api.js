// src/api.js

// Change this to your Render backend URL
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3000";

// ---------- API CALLS ----------

// List all links
export async function listLinks() {
  const res = await fetch(`${API_BASE}/api/links`);
  if (!res.ok) throw new Error("Failed to load links");
  return res.json();
}

// Create link
export async function createLink(data) {
  const res = await fetch(`${API_BASE}/api/links`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const body = await res.json();
  if (!res.ok) throw new Error(body.error || "Create failed");

  return body;
}

// Get stats of a link
export async function getLinkStats(code) {
  const res = await fetch(`${API_BASE}/api/links/${code}`);
  if (!res.ok) throw new Error("Not found");
  return res.json();
}

// Delete link
export async function deleteLink(code) {
  const res = await fetch(`${API_BASE}/api/links/${code}`, {
    method: "DELETE",
  });

  const body = await res.json();
  if (!res.ok) throw new Error(body.error || "Delete failed");

  return body; // {ok: true}
}
