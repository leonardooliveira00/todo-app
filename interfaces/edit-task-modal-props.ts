import { Task } from "./task";
import { EditTaskDto } from "./edit-task";

export interface EditTaskModalProps {
  task: Task;
  onClose: () => void;
  onEditTask: (task: EditTaskDto) => Promise<void>;
}
