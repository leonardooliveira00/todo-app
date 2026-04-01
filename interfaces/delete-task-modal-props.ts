import { Task } from "./task";

export interface DeleteTaskModalProps {
  task: Task;
  onClose: () => void;
  onConfirm: (task: Task) => Promise<void>;
}
