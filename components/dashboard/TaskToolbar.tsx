import { Plus } from "lucide-react";

export default function TaskToolbar({ onOpenModal }: any) {
  return (
    <button onClick={onOpenModal}>
      <Plus />
    </button>
  );
}
