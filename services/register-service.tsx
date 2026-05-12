import { API_URL } from "@/config";

export async function register(name: string, email: string, password: string) {
  const res = await fetch(`${API_URL}/users/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    return { error: data.message };
  }

  console.log(data);

  return data;
}
