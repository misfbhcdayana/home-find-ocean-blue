const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export async function apiFetch(
  endpoint: string,
  options: RequestInit = {},
  authToken?: string
) {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
    ...options.headers,
  };
  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "API error");
  return data;
} 