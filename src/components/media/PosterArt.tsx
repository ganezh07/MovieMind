import { cn } from "@/lib/cn";
import { posterUrl } from "@/lib/tmdb";
import type { CatalogItem } from "@/types/content";

type PosterArtProps = {
  item: CatalogItem;
  className?: string;
};

function initials(title: string): string {
  return title
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("");
}

export function PosterArt({ item, className }: PosterArtProps) {
  const imgSrc = posterUrl(item.posterPath);

  return (
    <div
      className={cn(
        "relative isolate overflow-hidden bg-surface-2",
        className,
      )}
      aria-hidden
    >
      {imgSrc ? (
        <img
          src={imgSrc}
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:transition-none"
        />
      ) : (
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(160deg, #1e1e24 0%, #0a0a0c 78%)",
          }}
        />
      )}
      {!imgSrc ? (
        <span className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-white/20">
          {initials(item.title)}
        </span>
      ) : null}
    </div>
  );
}
