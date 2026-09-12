import { MovieCard } from "@/components/media/MovieCard";
import { MovieCardSkeleton } from "@/components/media/MovieCardSkeleton";
import { cn } from "@/lib/cn";
import type { CatalogItem } from "@/types/content";

type MovieGridProps = {
  items: CatalogItem[];
  isLoading?: boolean;
  skeletonCount?: number;
  className?: string;
};

export function MovieGrid({
  items,
  isLoading = false,
  skeletonCount = 8,
  className,
}: MovieGridProps) {
  return (
    <ul
      className={cn(
        "grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6",
        className,
      )}
    >
      {isLoading
        ? Array.from({ length: skeletonCount }, (_, index) => (
            <li key={`skeleton-${index}`}>
              <MovieCardSkeleton />
            </li>
          ))
        : items.map((item) => (
            <li key={item.id}>
              <MovieCard item={item} />
            </li>
          ))}
    </ul>
  );
}
