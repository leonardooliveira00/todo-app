"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// services
import { login } from "@/services/auth-service";

// components
import Input from "../ui/Input";

// Validations
import z from "zod";
import { loginSchema } from "@/libs/validations/auth";

// icons
import { Mail, Lock } from "lucide-react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [error, setError] = useState<string | null>("");

  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFieldErrors({});
    setError(null);

    if (isLoading) return;
    setIsLoading(true);

    try {
      const validation = loginSchema.safeParse({ email, password });

      if (!validation.success) {
        const flattenedErrors = z.flattenError(validation.error);
        setFieldErrors(flattenedErrors.fieldErrors);
        setIsLoading(false);
        console.log("Erro da validação na camada frontend: ", validation.error);
        return;
      }

      const res = await login(email, password);

      if (res.error) {
        console.log(res.error);
        setIsLoading(false);
        return;
      }

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
        <h1>Acesse sua conta</h1>
      </div>

      <div className="flex flex-col gap-1">
        <Input
          icon={<Mail />}
          type="email"
          id="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (fieldErrors.email) {
              setFieldErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors.email;
                return newErrors;
              });
            }
          }}
          label="Email"
        />
        {fieldErrors.email && <span>{fieldErrors.email[0]}</span>}
      </div>

      <div className="flex flex-col gap-1">
        <Input
          icon={<Lock />}
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="Senha"
        />
        {fieldErrors.password && <span>{fieldErrors.password}</span>}
      </div>

      <button disabled={isLoading}>Entrar</button>
    </form>
  );
}
