import { Task } from "./task";

export interface TaskListProps {
  tasks: Task[];
  onDeleteTask: (task: Task) => void;
  onEditTask: (task: Task) => void;
}
