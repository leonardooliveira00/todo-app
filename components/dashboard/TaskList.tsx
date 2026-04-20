import { TaskItem } from "./TaskItem";
import { TaskItemSkeleton } from "./TaskItemSkeleton";

interface Task {
  id: number;
  title: string;
  description?: string;
}

interface TaskListProps {
  tasks: Task[];
  isLoading: boolean;
}

export function TaskList({ tasks, isLoading }: TaskListProps) {
  if (isLoading) {
    return (
      <div className="flex flex-col gap-3">
        <TaskItemSkeleton />
        <TaskItemSkeleton />
        <TaskItemSkeleton />
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed rounded-lg">
        <p className="text-muted-foreground">
          Você ainda não tem tarefas cadastradas.
        </p>
        <p className="text-xs text-muted-foreground/60">
          Clique em "Nova Tarefa" para começar.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          title={task.title}
          description={task.description}
        />
      ))}
    </div>
  );
}
