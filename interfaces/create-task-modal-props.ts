import { CreateTaskDTO } from "./create-task";

export interface CreateTaskModalProps {
  onClose: () => void;
  onCreateTask: (task: CreateTaskDTO) => Promise<void>;
  isSubmitting: boolean;
}
