"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { StarRating } from "@/components/ui/StarRating";
import { posterUrl } from "@/lib/tmdb";
import type { CatalogItem } from "@/types/content";

type Selection = {
  item: CatalogItem;
  rating: number;
};

const MIN_SELECTIONS = 5;

export function OnboardingView() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<CatalogItem[]>([]);
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState(false);
  const [selections, setSelections] = useState<Selection[]>([]);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");

  const hasQuery = query.trim().length > 0;

  useEffect(() => {
    if (!hasQuery) {
      setResults([]);
      setSearchError(false);
      return;
    }

    const controller = new AbortController();
    const debounce = setTimeout(async () => {
      setSearching(true);
      setSearchError(false);
      try {
        const res = await fetch(
          `/api/search?q=${encodeURIComponent(query.trim())}`,
          { signal: controller.signal },
        );
        if (!res.ok) throw new Error("Search failed");
        const data: { results: CatalogItem[] } = await res.json();
        setResults(data.results);
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;
        setSearchError(true);
        setResults([]);
      } finally {
        setSearching(false);
      }
    }, 350);

    return () => {
      clearTimeout(debounce);
      controller.abort();
    };
  }, [query, hasQuery]);

  const isAlreadySelected = useCallback(
    (item: CatalogItem) => selections.some((s) => s.item.id === item.id),
    [selections],
  );

  const addSelection = (item: CatalogItem) => {
    if (isAlreadySelected(item)) return;
    setSelections((prev) => [...prev, { item, rating: 0 }]);
  };

  const removeSelection = (id: string) => {
    setSelections((prev) => prev.filter((s) => s.item.id !== id));
  };

  const updateRating = (id: string, rating: number) => {
    setSelections((prev) =>
      prev.map((s) => (s.item.id === id ? { ...s, rating } : s)),
    );
  };

  const ratedCount = selections.filter((s) => s.rating >= 1).length;
  const canContinue = selections.length >= MIN_SELECTIONS && ratedCount === selections.length;

  const handleContinue = async () => {
    if (!canContinue) return;
    setSaving(true);
    setSaveError("");

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setSaveError("You must be signed in to continue.");
      setSaving(false);
      return;
    }

    try {
      for (const sel of selections) {
        const tmdbId = parseInt(sel.item.id, 10);
        const watchedEntry = {
          user_id: user.id,
          tmdb_id: tmdbId,
          media_type: sel.item.mediaType,
        };

        const { error: watchedError } = await supabase
          .from("watched_movies")
          .upsert(watchedEntry, { onConflict: "user_id,tmdb_id,media_type" });

        if (watchedError) throw watchedError;

        const ratingEntry = {
          user_id: user.id,
          tmdb_id: tmdbId,
          media_type: sel.item.mediaType,
          rating: sel.rating,
        };

        const { error: ratingError } = await supabase
          .from("ratings")
          .upsert(ratingEntry, { onConflict: "user_id,tmdb_id,media_type" });

        if (ratingError) throw ratingError;
      }

      const { error: profileError } = await supabase
        .from("profiles")
        .update({ onboarding_completed: true, updated_at: new Date().toISOString() })
        .eq("id", user.id);

      if (profileError) throw profileError;

      router.push("/");
      router.refresh();
    } catch {
      setSaveError("Something went wrong saving your selections. Please try again.");
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8" style={{ animation: "section-fade-in 0.5s ease-out both" }}>
        <div className="flex items-center gap-3">
          <span className="h-7 w-1 rounded-full bg-accent" />
          <h1 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
            Let&apos;s get to know your taste.
          </h1>
        </div>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
          Pick at least 5 movies or shows you&apos;ve watched and rate them. We&apos;ll use your choices to personalize MovieMind.
        </p>
      </div>

      <div className="mb-6">
        <label htmlFor="onboarding-search" className="sr-only">
          Search movies and shows
        </label>
        <div className="relative">
          <input
            id="onboarding-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search movies & shows..."
            className="w-full rounded-lg border border-line bg-surface px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted focus:border-accent"
          />
          {searching ? (
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-muted">
              Searching...
            </span>
          ) : null}
        </div>
      </div>

      {hasQuery && (searchError ? (
        <p className="mb-6 text-sm text-accent">Search failed. Please try again.</p>
      ) : !searching && results.length === 0 ? (
        <p className="mb-6 text-sm text-muted">No results found. Try a different search.</p>
      ) : (
        <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {searching
            ? Array.from({ length: 10 }, (_, i) => (
                <div key={`s-${i}`} className="aspect-[2/3] animate-pulse rounded-lg bg-white/10" />
              ))
            : results.map((item) => {
                const selected = isAlreadySelected(item);
                const poster = posterUrl(item.posterPath);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => addSelection(item)}
                    disabled={selected}
                    className={`group relative overflow-hidden rounded-lg border text-left transition duration-200 ${
                      selected
                        ? "border-accent opacity-40"
                        : "border-line hover:border-accent/40 hover:shadow-[0_8px_30px_-8px_rgba(229,9,20,0.35)]"
                    }`}
                  >
                    {poster ? (
                      <img
                        src={poster}
                        alt={item.title}
                        loading="lazy"
                        className="aspect-[2/3] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex aspect-[2/3] w-full items-center justify-center bg-surface-2 text-xs text-muted">
                        {item.title}
                      </div>
                    )}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent px-2 pb-2 pt-6">
                      <p className="truncate text-xs font-semibold text-foreground">{item.title}</p>
                      <p className="text-[10px] text-muted">
                        {item.year} · {item.mediaType === "tv" ? "TV" : "Film"}
                      </p>
                    </div>
                    {selected ? (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                        <span className="text-xs font-semibold text-accent">Added</span>
                      </div>
                    ) : null}
                  </button>
                );
              })}
        </div>
      ))}

      <div className="mt-8 border-t border-line pt-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-foreground">
            Your selections
          </h2>
          <span className={`text-sm font-semibold ${selections.length >= MIN_SELECTIONS ? "text-accent" : "text-muted"}`}>
            {selections.length} / {MIN_SELECTIONS} minimum
          </span>
        </div>

        {selections.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted">
            Search above and select titles you&apos;ve watched to get started.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {selections.map((sel) => {
              const poster = posterUrl(sel.item.posterPath);
              return (
                <div
                  key={sel.item.id}
                  className="flex gap-3 rounded-lg border border-line bg-surface p-3"
                  style={{ animation: "section-fade-in 0.3s ease-out both" }}
                >
                  {poster ? (
                    <img
                      src={poster}
                      alt={sel.item.title}
                      className="h-24 w-16 shrink-0 rounded-md object-cover"
                    />
                  ) : (
                    <div className="flex h-24 w-16 shrink-0 items-center justify-center rounded-md bg-surface-2 text-[10px] text-muted">
                      {sel.item.title}
                    </div>
                  )}
                  <div className="flex min-w-0 flex-1 flex-col justify-between">
                    <div>
                      <p className="truncate text-sm font-semibold text-foreground">
                        {sel.item.title}
                      </p>
                      <p className="text-xs text-muted">
                        {sel.item.year} · {sel.item.mediaType === "tv" ? "TV Show" : "Movie"}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <StarRating
                        value={sel.rating}
                        onChange={(r) => updateRating(sel.item.id, r)}
                        size={20}
                      />
                      <button
                        type="button"
                        onClick={() => removeSelection(sel.item.id)}
                        className="text-xs font-medium text-muted transition-colors hover:text-accent"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {saveError ? (
          <p className="mt-4 rounded-lg border border-accent/30 bg-accent/10 px-4 py-2.5 text-sm text-accent">
            {saveError}
          </p>
        ) : null}

        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={handleContinue}
            disabled={!canContinue || saving}
            className="rounded-lg bg-accent px-6 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-accent-strong disabled:cursor-not-allowed disabled:opacity-40"
            style={{
              boxShadow: canContinue && !saving
                ? "0 4px 20px -4px rgba(229,9,20,0.5)"
                : "none",
            }}
          >
            {saving ? "Saving..." : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
}
