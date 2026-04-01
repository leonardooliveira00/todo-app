import { Modal } from "./Modal";
import { useState } from "react";

import { CreateTaskModalProps } from "@/interfaces/create-task-modal-props";

export default function CreateTaskModal({
  onClose,
  onCreateTask,
}: CreateTaskModalProps) {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [completed, setCompleted] = useState<boolean>(false);

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!title.trim()) return;

    await onCreateTask({
      title,
      description,
      completed,
    });

    setTitle("");
    setDescription("");
  }

  return (
    <Modal onClose={onClose} isLoading>
      <h2>Criar tarefa</h2>

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

        <button type="submit">Criar</button>
      </form>
    </Modal>
  );
}
