import { ModalProps } from "@/interfaces/modal-props";

export function Modal({ onClose, children }: ModalProps) {
  return (
    <div onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  );
}
