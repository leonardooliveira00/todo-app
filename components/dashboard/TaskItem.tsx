import { Button } from "../ui/button";
import { Pencil, Trash2 } from "lucide-react";

export function TaskItem({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="p-4 border rounded-lg bg-background hover:shadow-sm transition-all group">
      {/* LINHA DO TOPO: Título e Botões */}
      <div className="flex items-center justify-between gap-4">
        <h4 className="font-semibold text-foreground truncate">{title}</h4>

        {/* GRUPO DE BOTÕES (Sempre à direita) */}
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 cursor-pointer text-muted-foreground hover:text-blue-500"
          >
            <Pencil className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 cursor-pointer text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      </div>

      {/* LINHA DE BAIXO: Descrição (Opcional) */}
      {description && (
        <p className="mt-1 text-sm text-muted-foreground leading-relaxed line-clamp-2">
          {description}
        </p>
      )}
    </div>
  );
}
