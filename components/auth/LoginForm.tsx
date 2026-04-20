"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";

// services
import { login } from "@/services/auth-service";

// components
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";

import { Button } from "@/components/ui/button";

// Validations
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/validations/auth";

// icons
import { Mail, Lock } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function LoginForm() {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>("");

  const router = useRouter();

  async function onSubmit(data: z.infer<typeof loginSchema>) {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const res = await login(data.email, data.password);

      if (res.error) {
        form.setError("root", { message: res.error });
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
    <form id="login-form" onSubmit={form.handleSubmit(onSubmit)} noValidate>
      <FieldGroup>
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                {...field}
                id="email"
                type="email"
                required
                aria-invalid={fieldState.invalid}
                placeholder="example@email.com"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="password">Senha</FieldLabel>
              <Input
                {...field}
                id="password"
                type="password"
                required
                aria-invalid={fieldState.invalid}
                placeholder="Digite sua senha..."
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Button type="submit" className="w-full">
          Entrar
        </Button>
      </FieldGroup>
    </form>
  );
}
