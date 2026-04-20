import { useEffect, useState } from "react";

import { createTask, getTasks } from "@/services/task-service";
import { TaskList } from "./TaskList";
import { CreateTaskDTO } from "@/interfaces/create-task";
import { Task } from "@/interfaces/task";
import { ToolBar } from "./Toolbar";

import { Card, CardContent } from "@/components/ui/card";
import { BaseModal } from "./modals/BaseModal";
import { TaskForm } from "./modals/TaskForm";

import { toast } from "sonner";

export function TaskPanel() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [onNewTask, setOnNewTask] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(true);

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

  async function handleCreateTask(task: CreateTaskDTO) {
    try {
      const newTask = await createTask(task);
      setTasks((prev) => [...prev, newTask]);
      toast.success("Tarefa criada!", {
        description: `A tarefa ${newTask.title} foi salva com sucesso.`,
        position: "top-center",
      });
      setOnNewTask(false);
    } catch (error) {
      console.log("Erro ao criar tarefa", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section>
      <Card className="p-6">
        <CardContent>
          <ToolBar onNewTask={() => setOnNewTask(true)} />
          <TaskList tasks={tasks} isLoading={isLoading} />
        </CardContent>
      </Card>

      <BaseModal
        open={onNewTask}
        onOpenChange={setOnNewTask}
        title="Nova Tarefa"
      >
        <TaskForm onSubmit={handleCreateTask} />
      </BaseModal>
    </section>
  );
}
