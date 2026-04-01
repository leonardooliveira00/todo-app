import { CreateTaskDTO } from "@/interfaces/create-task";
import { EditTaskDto } from "@/interfaces/edit-task";

export async function getTasks() {
  const res = await fetch("http://localhost:3333/tasks", {
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) return { error: "Erro ao editar tarefa." };

  console.log(data);

  return data;
}

export async function createTask(task: CreateTaskDTO) {
  const res = await fetch("http://localhost:3333/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(task),
  });

  const data = await res.json();

  if (!res.ok) {
    return { error: data };
  }

  console.log(data);

  return data;
}

export async function editTask({ id, ...data }: EditTaskDto) {
  const res = await fetch(`http://localhost:3333/tasks/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!res.ok) return { error: "Erro ao editar tarefa." };

  return res.json();
}

export async function deleteTask(id: number) {
  const res = await fetch(`http://localhost:3333/tasks/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!res.ok) return { error: "Erro ao editar tarefa." };
}
