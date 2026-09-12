"use client";

import { useMemo, useState } from "react";
import { MovieGrid } from "@/components/media/MovieGrid";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { searchPlaceholderCatalog } from "@/data/placeholder-catalog";

export function SearchView() {
  const [query, setQuery] = useState("");
  const results = useMemo(() => searchPlaceholderCatalog(query), [query]);
  const hasQuery = query.trim().length > 0;

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl text-foreground sm:text-4xl">Search</h1>
      <p className="mt-2 max-w-2xl text-sm text-muted">
        Filters the local UI catalog. A later phase will search live titles.
      </p>
      <form
        className="mt-8"
        onSubmit={(event) => event.preventDefault()}
        role="search"
      >
        <label htmlFor="catalog-search" className="sr-only">
          Search movies and TV shows
        </label>
        <input
          id="catalog-search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Try a title, genre, or the word film"
          className="w-full rounded-full border border-line bg-surface px-5 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted focus:border-accent"
        />
      </form>

      <div className="mt-8">
        {!hasQuery ? (
          <EmptyState
            title="Start typing to search"
            description="Results stay on this device for now. No network catalog is connected yet."
          />
        ) : results.length === 0 ? (
          <EmptyState
            title="No matches"
            description={`Nothing in the placeholder catalog matched “${query.trim()}”.`}
            action={
              <Button variant="secondary" onClick={() => setQuery("")}>
                Clear search
              </Button>
            }
          />
        ) : (
          <MovieGrid items={results} />
        )}
      </div>
    </div>
  );
}
