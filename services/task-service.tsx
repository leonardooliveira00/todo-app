import { API_URL } from "@/config";
import { CreateTaskDTO } from "@/interfaces/create-task";
import { EditTaskDto } from "@/interfaces/edit-task";

export async function getTasks() {
  const res = await fetch(`${API_URL}/tasks`, {
    credentials: "include",
  });

  if (!res.ok) return { error: "Erro ao buscar tarefas." };

  return await res.json();
}

export async function createTask(task: CreateTaskDTO) {
  const res = await fetch(`${API_URL}/tasks`, {
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

  return data;
}

export async function editTask({ id, ...data }: EditTaskDto) {
  const res = await fetch(`${API_URL}/tasks/${id}`, {
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
  const res = await fetch(`${API_URL}/tasks/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!res.ok) return { error: "Erro ao deletar tarefa." };
}
