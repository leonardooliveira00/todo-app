import { useEffect, useState } from "react";

import {
  createTask,
  deleteTask,
  editTask,
  getTasks,
} from "@/services/task-service";
import { TaskList } from "./TaskList";
import { CreateTaskDTO } from "@/interfaces/create-task";
import { Task } from "@/interfaces/task";
import { ToolBar } from "./Toolbar";

import { Card, CardContent } from "@/components/ui/card";
import { BaseModal } from "./modals/BaseModal";
import { TaskForm } from "./modals/TaskForm";

import { toast } from "sonner";
import { EditTaskDto } from "@/interfaces/edit-task";

import * as z from "zod";
import { taskSchema } from "@/lib/validations/task-schema";
import { ConfirmModal } from "./modals/ConfirmModal";

export function TaskPanel() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const [taskToDelete, setTaskToDelete] = useState<Task | null>();
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [searchTask, setSearchTask] = useState<string>("");

  const searchedTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchTask.toLowerCase()) ||
      task.description?.toLowerCase().includes(searchTask.toLowerCase()),
  );

  useEffect(() => {
    async function loadTasks() {
      setIsLoading(true);
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    loadTasks();
  }, []);

  function handleOpenCreate() {
    setEditingTask(null);
    setIsModalOpen(true);
  }

  function handleOpenEdit(task: Task) {
    setEditingTask(task);
    setIsModalOpen(true);
  }

  function handleOpenDelete(task: Task) {
    setTaskToDelete(task);
  }

  async function handleFormSubmit(data: z.infer<typeof taskSchema>) {
    if (editingTask) {
      await handleEditTask({ id: editingTask.id, ...data } as EditTaskDto);
    } else {
      await handleCreateTask(data as CreateTaskDTO);
    }
  }

  async function handleCreateTask(task: CreateTaskDTO) {
    setIsLoading(true);

    try {
      const newTask = await createTask(task);

      if (newTask.error) {
        toast.error(newTask.error);
        return;
      }

      setTasks((prev) => [...prev, newTask]);
      toast.success("Tarefa criada!", {
        description: `A tarefa ${newTask.title} foi salva com sucesso.`,
        position: "top-center",
      });

      setIsModalOpen(false);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Erro ao criar tarefa", error);
      }
    } finally {
      setIsLoading(false);
      setIsModalOpen(false);
    }
  }

  async function handleEditTask(data: EditTaskDto) {
    setIsLoading(true);

    try {
      const editedTask = await editTask(data);

      if (editedTask.error) {
        toast.error(editedTask.error);
        return;
      }

      setTasks((prev) => prev.map((t) => (t.id === data.id ? editedTask : t)));
      toast.success("Tarefa editada!", {
        description: `A tarefa ${editedTask.title} foi atualizada com sucesso.`,
        position: "top-center",
      });

      setIsModalOpen(false);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Erro ao editar tarefa.", error);
      }
    } finally {
      setIsLoading(false);
      setIsModalOpen(false);
    }
  }

  async function handleDeleteTask(id: number) {
    setIsLoading(true);

    try {
      const res = await deleteTask(id);

      if (res?.error) {
        toast.error(res.error);
        return;
      }

      setTasks((prev) => prev.filter((t) => t.id !== id));

      toast.success("Tarefa removida!", {
        description: `A tarefa foi deletada com sucesso.`,
        position: "top-center",
      });
      setTaskToDelete(null);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Erro ao deletar tarefa.", error);
      }
    } finally {
      setIsLoading(false);
      setTaskToDelete(null);
    }
  }

  async function handleToggleTaskStatus(task: Task) {
    try {
      const updatedStatus = await editTask({
        ...task,
        completed: !task.completed,
      });

      if (updatedStatus.error) {
        toast.error("Erro ao atualizar status");
        return;
      }

      setTasks((prev) =>
        prev.map((t) => (t.id === task.id ? updatedStatus : t)),
      );
    } catch (error) {
      if (error instanceof Error) {
        console.error("Erro de conexão");
      }
    }
  }

  return (
    <section>
      <Card className="p-6">
        <CardContent>
          <ToolBar
            onCreate={handleOpenCreate}
            searchTask={searchTask}
            onSearchChange={setSearchTask}
          />
          <TaskList
            tasks={searchedTasks}
            onEdit={handleOpenEdit}
            onDelete={handleOpenDelete}
            onToggle={handleToggleTaskStatus}
            isLoading={isLoading}
          />
        </CardContent>
      </Card>

      <BaseModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        title={editingTask ? "Editar Tarefa" : "Nova Tarefa"}
      >
        <TaskForm initialData={editingTask} onSubmit={handleFormSubmit} />
      </BaseModal>

      <ConfirmModal
        isOpen={!!taskToDelete}
        onOpenChange={(open) => !open && setTaskToDelete(null)}
        onConfirm={() => taskToDelete && handleDeleteTask(taskToDelete.id)}
        title="Excluir tarefa"
        description={`Tem certeza que deseja excluir ${taskToDelete?.title}? Essa ação não poderá ser desfeita`}
        cancelText="Cancelar"
        confirmText="Excluir"
        variant="destructive"
      />
    </section>
  );
}
