import { DeleteTaskModalProps } from "@/interfaces/delete-task-modal-props";

import { Modal } from "./Modal";

export default function DeleteTaskModal({
  task,
  onClose,
  onConfirm,
}: DeleteTaskModalProps) {
  return (
    <Modal onClose={onClose} isLoading>
      <h2>Confirmar exclusão</h2>

      <p>
        Tem certeza que deseja excluir <strong>"{task.title}"</strong>?
      </p>

      <div>
        <button onClick={onClose}>Cancelar</button>
      </div>

      <button onClick={() => onConfirm(task)}>Excluir</button>
    </Modal>
  );
}
