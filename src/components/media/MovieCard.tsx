import { PosterArt } from "@/components/media/PosterArt";
import type { CatalogItem } from "@/types/content";

type MovieCardProps = {
  item: CatalogItem;
};

export function MovieCard({ item }: MovieCardProps) {
  return (
    <article className="group relative">
      <div className="relative overflow-hidden rounded-lg border border-line bg-surface transition duration-300 ease-out group-hover:-translate-y-0.5 group-hover:border-accent/40 group-hover:shadow-[0_8px_30px_-8px_rgba(229,9,20,0.35)] motion-reduce:transition-none motion-reduce:group-hover:translate-y-0">
        <PosterArt item={item} className="aspect-[2/3] w-full" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/80 to-transparent px-3 pb-2.5 pt-8 opacity-0 transition-opacity duration-300 group-hover:opacity-100 motion-reduce:opacity-100">
          <span className="text-xs font-medium text-foreground/80">
            {item.year}
          </span>
          <span className="flex items-center gap-1 text-xs font-semibold text-accent">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8l-6.2 4.5 2.4-7.4L2 9.4h7.6z" />
            </svg>
            {item.rating.toFixed(1)}
          </span>
        </div>
      </div>
      <div className="mt-2.5 space-y-0.5 px-0.5">
        <h3 className="truncate text-sm font-semibold text-foreground">
          {item.title}
        </h3>
        <p className="truncate text-xs text-muted">
          {item.genres.slice(0, 2).join(" · ")}
        </p>
      </div>
    </article>
  );
}
