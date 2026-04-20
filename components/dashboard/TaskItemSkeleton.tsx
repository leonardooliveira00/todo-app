import { Skeleton } from "../ui/skeleton";

export function TaskItemSkeleton() {
  return (
    <div className="p-4 border rounded-lg bg-background/50">
      <div className="flex items-center justify-between gap-4 mb-2">
        {/* Título Fake */}
        <Skeleton className="h-5 w-[40%] shadow-sm" />

        {/* Botões Fake */}
        <div className="flex gap-1">
          <Skeleton className="h-8 w-8 rounded-md" />
          <Skeleton className="h-8 w-8 rounded-md" />
        </div>
      </div>

      {/* Descrição Fake */}
      <Skeleton className="h-4 w-[70%]" />
    </div>
  );
}
