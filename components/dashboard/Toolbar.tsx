import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export interface ToolBarProps {
  onCreate: () => void;
  searchTask: string;
  onSearchChange: (value: string) => void;
}

export function ToolBar({
  onCreate,
  searchTask,
  onSearchChange,
}: ToolBarProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between p-4 border-b bg-muted/10">
      {/* Esquerda: Título ou Busca */}
      <div className="flex flex-1 items-center gap-2 max-w-sm">
        <div className="relative w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            value={searchTask}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar tarefas..."
            className="pl-8 bg-background"
          />
        </div>
      </div>

      {/* Direita: Ações principais */}
      <div className="flex items-center gap-2">
        <Button onClick={onCreate} size="sm" className="cursor-pointer gap-2">
          <Plus className="h-4 w-4" />
          Nova Tarefa
        </Button>
      </div>
    </div>
  );
}
