import styles from "./TaskModal.module.css";

import { ModalProps } from "@/interfaces/modal-props";

export function Modal({ onClose, children, isLoading }: ModalProps) {
  function handleOverlayClick() {
    if (!isLoading) onClose();
  }

  return (
    <div className={`${styles.modalOverlay}`} onClick={handleOverlayClick}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}
