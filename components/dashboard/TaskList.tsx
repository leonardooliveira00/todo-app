import { Pencil, Trash } from "lucide-react";

import { TaskListProps } from "@/interfaces/task-list-props";

import styles from "./TaskList.module.css";

export default function TaskList({
  tasks,
  onDeleteTask,
  onEditTask,
}: TaskListProps) {
  if (tasks.length === 0) return <p>Sua lista de tarefas está vazia.</p>;

  return (
    <div className={styles.tasksContainer}>
      {tasks.map((task) => (
        <div key={task.id} className={styles.taskItem}>
          <div className={styles.taskWrapper}>
            <span>{task.title}</span>

            {task.description && (
              <p className={styles.description}>{task.description}</p>
            )}
          </div>

          <div className={styles.actions}>
            <button
              className={styles.buttonIcon}
              onClick={() => onEditTask(task)}
            >
              <Pencil />
            </button>

            <button
              className={styles.buttonIcon}
              onClick={() => onDeleteTask(task)}
            >
              <Trash />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
