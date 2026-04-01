export async function register(name: string, email: string, password: string) {
  const res = await fetch("http://localhost:3333/users/", {
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
