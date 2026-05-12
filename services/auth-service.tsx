import { API_URL } from "@/config";

export async function login(email: string, password: string) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    return { error: data.message };
  }

  return data;
}

export async function getMe() {
  const res = await fetch(`${API_URL}/auth/me`, {
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) return null;

  return data;
}
