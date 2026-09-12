import { PosterArt } from "@/components/media/PosterArt";
import type { CatalogItem } from "@/types/content";

type MovieCardProps = {
  item: CatalogItem;
};

export function MovieCard({ item }: MovieCardProps) {
  return (
    <article className="group relative">
      <div className="overflow-hidden rounded-xl border border-line bg-surface shadow-[0_12px_40px_-24px_rgba(0,0,0,0.85)] transition duration-300 ease-out group-hover:-translate-y-1 group-hover:border-accent/40 motion-reduce:transition-none motion-reduce:group-hover:translate-y-0">
        <PosterArt item={item} className="aspect-[2/3] w-full" />
        <div className="pointer-events-none absolute inset-x-0 bottom-[4.5rem] flex justify-between px-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100 motion-reduce:opacity-100">
          <span className="rounded-full bg-black/70 px-2 py-1 text-xs text-foreground">
            {item.year}
          </span>
          <span className="rounded-full bg-black/70 px-2 py-1 text-xs text-accent">
            {item.rating.toFixed(1)}
          </span>
        </div>
        <div className="space-y-1 p-3">
          <h3 className="truncate text-sm font-medium text-foreground">
            {item.title}
          </h3>
          <p className="truncate text-xs text-muted">
            {item.genres.slice(0, 2).join(" · ")}
          </p>
        </div>
      </div>
    </article>
  );
}
