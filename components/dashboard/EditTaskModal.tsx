import { useState } from "react";

import { Modal } from "./Modal";
import { EditTaskModalProps } from "@/interfaces/edit-task-modal-props";

export default function EditTaskModal({
  task,
  onClose,
  onEditTask,
}: EditTaskModalProps) {
  const [title, setTitle] = useState<string>(task.title);
  const [description, setDescription] = useState<string>(
    task.description || "",
  );
  const [completed, setCompleted] = useState<boolean>(task.completed);

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!title.trim()) return;

    await onEditTask({
      id: task.id,
      title,
      description,
      completed,
    });

    console.log("Submit disparou!");
  }

  return (
    <Modal onClose={onClose} isLoading>
      <h2>Editar tarefa</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Título</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Digite o título da tarefa..."
          />
        </div>

        <div>
          <label>Descrição</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Digite a descrição da tarefa..."
          />
        </div>

        <div>
          <input
            type="checkbox"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
          />
          Concluída
        </div>

        <button type="submit">Editar</button>
      </form>
    </Modal>
  );
}
