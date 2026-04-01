export async function login(email: string, password: string) {
  const res = await fetch("http://localhost:3333/auth/login", {
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
  const res = await fetch("http://localhost:3333/auth/me", {
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) return null;

  return data;
}
