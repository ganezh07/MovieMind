import { cn } from "@/lib/cn";
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
  return (
    <div
      className={cn(
        "relative isolate overflow-hidden bg-surface-2",
        className,
      )}
      style={{
        background: `linear-gradient(160deg, ${item.accent} 0%, #09090d 78%)`,
      }}
      aria-hidden
    >
      <div className="absolute inset-0 opacity-40 [background-image:radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.18),transparent_42%),linear-gradient(to_bottom,transparent,rgba(0,0,0,0.55))]" />
      <div className="absolute left-3 top-3 rounded-full border border-white/15 bg-black/30 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.18em] text-foreground/90">
        {item.mediaType === "tv" ? "Series" : "Film"}
      </div>
      <span className="absolute inset-0 flex items-center justify-center font-display text-5xl text-white/25">
        {initials(item.title)}
      </span>
    </div>
  );
}
