import { MovieGrid } from "@/components/media/MovieGrid";

export function CatalogLoading() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 space-y-3">
        <div className="h-8 w-48 animate-pulse rounded-lg bg-white/10" />
        <div className="h-4 w-80 max-w-full animate-pulse rounded-lg bg-white/10" />
      </div>
      <MovieGrid items={[]} isLoading skeletonCount={12} />
    </div>
  );
}
