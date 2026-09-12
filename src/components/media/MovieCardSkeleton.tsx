import { Skeleton } from "@/components/ui/Skeleton";

export function MovieCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border border-line bg-surface">
      <Skeleton className="aspect-[2/3] w-full rounded-none" />
      <div className="space-y-2 p-3">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    </div>
  );
}
