"use client";

import { useEffect } from "react";

import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskSchema } from "@/lib/validations/task-schema";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

interface TaskFormProps {
  initialData?: z.infer<typeof taskSchema> | null;
  onSubmit: (data: z.infer<typeof taskSchema>) => void;
}

export function TaskForm({ initialData, onSubmit }: TaskFormProps) {
  const form = useForm<z.infer<typeof taskSchema>>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      completed: initialData?.completed || false,
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset(initialData);
    } else {
      form.reset({ title: "", description: "" });
    }
  }, [initialData, form]);

  return (
    <form
      id="task-form"
      onSubmit={form.handleSubmit(
        (data) => {
          console.log("DADOS VÁLIDOS:", data);
          onSubmit(data);
        },
        (errors) => {
          console.log("ZOD BARROU O ENVIO! ERROS:", errors);
        },
      )}
      noValidate
    >
      <FieldGroup>
        <Controller
          name="title"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="title">Título</FieldLabel>
              <Input
                {...field}
                id="title"
                type="text"
                required
                aria-invalid={fieldState.invalid}
                placeholder=""
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="description"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="description">Descrição</FieldLabel>
              <Input
                {...field}
                id="description"
                type="text"
                aria-invalid={fieldState.invalid}
                placeholder=""
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="completed"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="completed">Concluída?</FieldLabel>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Button type="submit" className="w-full">
          {initialData ? "Salvar alterações" : "Criar Tarefa"}
        </Button>
      </FieldGroup>
    </form>
  );
}
