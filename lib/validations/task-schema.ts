import z from "zod";

export const taskSchema = z.object({
  title: z.string().min(3).max(24),
  description: z.string().optional(),
  completed: z.boolean(),
});
