"use client";

import { useCallback, useEffect, useState } from "react";
import { MovieGrid } from "@/components/media/MovieGrid";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import type { CatalogItem } from "@/types/content";

export function SearchView() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<CatalogItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const hasQuery = query.trim().length > 0;

  useEffect(() => {
    if (!hasQuery) {
      setResults([]);
      setError(false);
      return;
    }

    const controller = new AbortController();
    const debounce = setTimeout(async () => {
      setIsLoading(true);
      setError(false);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query.trim())}`, {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error("Search request failed");
        const data: { results: CatalogItem[] } = await res.json();
        setResults(data.results);
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;
        setError(true);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 350);

    return () => {
      clearTimeout(debounce);
      controller.abort();
    };
  }, [query, hasQuery]);

  const clearSearch = useCallback(() => setQuery(""), []);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl text-foreground sm:text-4xl">Search</h1>
      <p className="mt-2 max-w-2xl text-sm text-muted">
        Search movies and TV shows from The Movie Database.
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
          placeholder="Search for a title..."
          className="w-full rounded-full border border-line bg-surface px-5 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted focus:border-accent"
        />
      </form>

      <div className="mt-8">
        {!hasQuery ? (
          <EmptyState
            title="Start typing to search"
            description="Find movies and TV shows from The Movie Database."
          />
        ) : error ? (
          <EmptyState
            title="Search failed"
            description="Something went wrong while searching. Please try again."
            action={
              <Button variant="secondary" onClick={clearSearch}>
                Clear search
              </Button>
            }
          />
        ) : isLoading ? (
          <MovieGrid items={[]} isLoading />
        ) : results.length === 0 ? (
          <EmptyState
            title="No matches"
            description={`Nothing matched "${query.trim()}". Try a different search.`}
            action={
              <Button variant="secondary" onClick={clearSearch}>
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
