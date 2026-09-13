import type { ReactNode } from "react";
import { MovieGrid } from "@/components/media/MovieGrid";
import { EmptyState } from "@/components/ui/EmptyState";
import type { CatalogItem } from "@/types/content";

type ContentSectionProps = {
  id?: string;
  title: string;
  description?: string;
  items: CatalogItem[];
  isLoading?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
  action?: ReactNode;
};

export function ContentSection({
  id,
  title,
  description,
  items,
  isLoading = false,
  emptyTitle = "Nothing here yet",
  emptyDescription = "This shelf will fill once live catalog data is connected.",
  action,
}: ContentSectionProps) {
  const isEmpty = !isLoading && items.length === 0;

  return (
    <section id={id} className="scroll-mt-24" style={{ animation: "section-fade-in 0.5s ease-out both" }}>
      <div className="mb-5 flex items-end justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="h-6 w-1 rounded-full bg-accent" />
          <div>
            <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              {title}
            </h2>
            {description ? (
              <p className="mt-0.5 text-sm text-muted">{description}</p>
            ) : null}
          </div>
        </div>
        {action}
      </div>
      {isEmpty ? (
        <EmptyState title={emptyTitle} description={emptyDescription} />
      ) : (
        <MovieGrid items={items} isLoading={isLoading} />
      )}
    </section>
  );
}
