"use client";

import { useEffect, useState } from "react";

// Interfaces
import { Task } from "@/interfaces/task";
import { CreateTaskDTO } from "@/interfaces/create-task";
import { EditTaskDto } from "@/interfaces/edit-task";

// components
import TaskToolbar from "./TaskToolbar";
import TaskList from "./TaskList";

// Services
import {
  getTasks,
  createTask,
  editTask,
  deleteTask,
} from "@/services/task-service";

// styles
import styles from "./TaskPanel.module.css";
import CreateTaskModal from "./CreateTaskModal";
import DeleteTaskModal from "./DeleteTaskModal";
import EditTaskModal from "./EditTaskModal";

export default function TaskPanel() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [deletingTask, setDeletingTask] = useState<Task | null>(null);

  const [tasks, setTasks] = useState<Task[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFetchingTasks, setIsFetchingTasks] = useState<boolean>(false);
  const [isSubmittingTask, setIsSubmittingTask] = useState<boolean>(false);

  function handleOpenCreateModal() {
    setIsCreateModalOpen(true);
  }

  function handleCloseCreateModal() {
    setIsCreateModalOpen(false);
  }

  function handleOpenEditModal(task: Task) {
    setEditingTask(task);
  }

  function handleCloseEditModal() {
    setEditingTask(null);
  }

  function handleOpenDeleteModal(task: Task) {
    setDeletingTask(task);
  }

  function handleCloseDeleteModal() {
    setDeletingTask(null);
  }

  async function handleCreateTask(task: CreateTaskDTO) {
    setIsSubmittingTask(true);
    try {
      const newTask = await createTask(task);

      setTasks((prev) => [...prev, newTask]);

      handleCloseCreateModal();
    } catch (error) {
      console.log("Erro ao criar tarefa", error);
    } finally {
      setIsSubmittingTask(false);
    }
  }

  async function handleEditTask(task: EditTaskDto) {
    setIsSubmittingTask(true);
    try {
      const edited = await editTask(task);

      setTasks((prev) => prev.map((t) => (t.id === edited.id ? edited : t)));

      handleCloseEditModal();
    } catch (error) {
      console.log("Erro ao editar tarefa", error);
    } finally {
      setIsSubmittingTask(false);
    }
  }

  async function handleDeleteTask(task: Task) {
    setIsSubmittingTask(true);
    try {
      await deleteTask(task.id);

      setTasks((prev) => prev.filter((t) => t.id !== task.id));

      handleCloseDeleteModal();
    } catch (error) {
      console.log("Erro ao deletar tarefa.");
    } finally {
      setIsSubmittingTask(false);
    }
  }

  useEffect(() => {
    async function loadTasks() {
      setIsFetchingTasks(true);
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsFetchingTasks(false);
      }
    }
    loadTasks();
  }, []);

  return (
    <section>
      <TaskToolbar onOpenModal={handleOpenCreateModal} />
      <TaskList
        tasks={tasks}
        onDeleteTask={handleOpenDeleteModal}
        onEditTask={handleOpenEditModal}
      />

      {isCreateModalOpen && (
        <CreateTaskModal
          onClose={handleCloseCreateModal}
          onCreateTask={handleCreateTask}
          isSubmitting={isSubmittingTask}
        />
      )}

      {deletingTask && (
        <DeleteTaskModal
          task={deletingTask}
          onClose={handleCloseDeleteModal}
          onConfirm={handleDeleteTask}
          isSubmitting={isSubmittingTask}
        />
      )}

      {editingTask && (
        <EditTaskModal
          task={editingTask}
          onClose={handleCloseEditModal}
          onEditTask={handleEditTask}
          isSubmitting={isSubmittingTask}
        />
      )}
    </section>
  );
}
