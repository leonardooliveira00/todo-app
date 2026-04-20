import { z } from "zod";

const requiredEmailSchema = z.email({
  error: (issue) =>
    issue.input === ""
      ? "Campo 'Email' é obrigatório"
      : "Formato de email inválido.",
});

export const loginSchema = z.object({
  email: requiredEmailSchema,
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres."),
});
