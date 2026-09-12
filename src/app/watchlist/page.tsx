import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";

export default function WatchlistPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <PageHeader
        title="Watchlist"
        description="Saved titles will live here once accounts and persistence are in place."
      />
      <EmptyState
        title="Your watchlist is empty"
        description="Nothing is stored yet. Watchlist saving is intentionally disabled until authentication and the database land."
        action={<Button href="/movies">Browse movies</Button>}
      />
    </div>
  );
}
