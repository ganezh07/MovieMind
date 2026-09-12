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
    <section id={id} className="scroll-mt-24">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-display text-2xl tracking-wide text-foreground sm:text-3xl">
            {title}
          </h2>
          {description ? (
            <p className="mt-1 max-w-2xl text-sm text-muted">{description}</p>
          ) : null}
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
