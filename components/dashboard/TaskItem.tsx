import { Task } from "@/interfaces/task";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { Pencil, Trash2 } from "lucide-react";

interface TaskItemProps {
  task: Task;
  onEdit: () => void;
  onDelete: () => void;
  onToggle: () => void;
}

export function TaskItem({ task, onEdit, onDelete, onToggle }: TaskItemProps) {
  return (
    <div
      className={`flex items-center justify-between p-4 border rounded-lg transition-all duration-300 ${
        task.completed
          ? "bg-emerald-100 border-emerald-500 opacity-80 hover:bg-emerald-200"
          : "bg-card border-border hover:border-slate-300 shadow-sm"
      }`}
    >
      <div className="flex items-center gap-4">
        <Checkbox checked={task.completed} onCheckedChange={onToggle} />

        <div className="flex flex-col">
          <span
            className={`text-sm transition-all ${
              task.completed ? "text-emerald-700/60" : "text-muted-foreground"
            }`}
          >
            {task.title}
          </span>
          <span
            className={`text-sm transition-all ${
              task.completed ? "text-emerald-700/60" : "text-muted-foreground"
            }`}
          >
            {task.description}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <Button
          onClick={onEdit}
          variant="ghost"
          size="icon"
          className="h-8 w-8 cursor-pointer text-muted-foreground hover:text-blue-500"
        >
          <Pencil className="size-4" />
        </Button>
        <Button
          onClick={onDelete}
          variant="ghost"
          size="icon"
          className="h-8 w-8 cursor-pointer text-muted-foreground hover:text-destructive"
        >
          <Trash2 className="size-4" />
        </Button>
      </div>
    </div>
  );
}
