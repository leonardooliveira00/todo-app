import styles from "./TaskModal.module.css";

import { ModalProps } from "@/interfaces/modal-props";

export function Modal({ onClose, children }: ModalProps) {
  return (
    <div className={`${styles.modalOverlay}`} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}
