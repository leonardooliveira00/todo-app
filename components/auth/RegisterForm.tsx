"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// services
import { register } from "@/services/register-service";
import { login } from "@/services/auth-service";

// validations
import { z } from "zod";
import { registerSchema } from "@/libs/validations/register";

// components
import Input from "../ui/Input";

// icons
import { User, Mail, Lock } from "lucide-react";

export default function RegisterForm() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [error, setError] = useState<string | null>("");

  const router = useRouter();

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (isLoading) return;
    setIsLoading(true);

    try {
      const validation = registerSchema.safeParse({ name, email, password });

      if (!validation.success) {
        const flattenedErrors = z.flattenError(validation.error);
        setFieldErrors(flattenedErrors.fieldErrors);
        console.log("Erro da validação na camada frontend: ", validation.error);
        return;
      }

      const res = await register(name, email, password);

      if (res.error) {
        console.log(res.error);
        return;
      }

      await login(email, password);

      setIsLoading(false);
      router.push("/dashboard");
    } catch (error) {
      if (error instanceof Error) {
        console.error("Erro capturado no Submit.", error);
        setError("Ocorreu um erro inesperado. Verifique o console.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8" noValidate>
      <div>
        <h1>Registre-se</h1>
      </div>

      <Input
        icon={<User />}
        type="text"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        label="Nome"
      />

      <Input
        icon={<Mail />}
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        label="Email"
      />

      <Input
        icon={<Lock />}
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        label="Senha"
      />

      <button disabled={isLoading}>Registrar</button>
    </form>
  );
}
