import type { CatalogItem } from "@/types/content";

/**
 * Local UI placeholders only. Not a real catalog, not TMDB, not an API.
 * Replace this module in a later phase with live data.
 */
export const PLACEHOLDER_CATALOG: CatalogItem[] = [
  {
    id: "ui-m-01",
    title: "Ember Harbor",
    year: 2024,
    rating: 8.1,
    mediaType: "movie",
    genres: ["Drama", "Mystery"],
    overview: "A coastal town hides a decade-old disappearance.",
    accent: "#7a3b2e",
  },
  {
    id: "ui-m-02",
    title: "Quiet Voltage",
    year: 2023,
    rating: 7.6,
    mediaType: "movie",
    genres: ["Thriller"],
    overview: "An engineer uncovers a signal that should not exist.",
    accent: "#2e4a7a",
  },
  {
    id: "ui-m-03",
    title: "Glass Orchard",
    year: 2022,
    rating: 7.9,
    mediaType: "movie",
    genres: ["Romance", "Drama"],
    overview: "Two archivists restore a forgotten film reel.",
    accent: "#3d5c3a",
  },
  {
    id: "ui-m-04",
    title: "North of Static",
    year: 2025,
    rating: 8.4,
    mediaType: "movie",
    genres: ["Sci-Fi"],
    overview: "A radio operator maps storms that rewrite memory.",
    accent: "#1f3d4d",
  },
  {
    id: "ui-m-05",
    title: "Paper Kingdom",
    year: 2021,
    rating: 7.2,
    mediaType: "movie",
    genres: ["Adventure"],
    overview: "A cartographer is hired to invent a country.",
    accent: "#6b4a2b",
  },
  {
    id: "ui-m-06",
    title: "Last Matinee",
    year: 2020,
    rating: 8.0,
    mediaType: "movie",
    genres: ["Crime"],
    overview: "A projectionist becomes the only witness.",
    accent: "#4a2d4d",
  },
  {
    id: "ui-m-07",
    title: "Iron Hymn",
    year: 2024,
    rating: 7.4,
    mediaType: "movie",
    genres: ["Action"],
    overview: "A courier races a city that never sleeps.",
    accent: "#5c2a2a",
  },
  {
    id: "ui-m-08",
    title: "Soft Eclipse",
    year: 2023,
    rating: 8.6,
    mediaType: "movie",
    genres: ["Fantasy"],
    overview: "Night lasts three days in a mountain village.",
    accent: "#2b335c",
  },
  {
    id: "ui-m-09",
    title: "Copper Hours",
    year: 2019,
    rating: 7.1,
    mediaType: "movie",
    genres: ["Comedy", "Drama"],
    overview: "A clockmaker tries to pawn the afternoon.",
    accent: "#8a5a28",
  },
  {
    id: "ui-m-10",
    title: "River Protocol",
    year: 2025,
    rating: 7.8,
    mediaType: "movie",
    genres: ["Thriller"],
    overview: "Flood data starts predicting people, not weather.",
    accent: "#1e4d45",
  },
  {
    id: "ui-m-11",
    title: "Velvet Circuit",
    year: 2022,
    rating: 7.5,
    mediaType: "movie",
    genres: ["Music", "Drama"],
    overview: "A pianist tours rooms that vanish after encore.",
    accent: "#4d2e5c",
  },
  {
    id: "ui-m-12",
    title: "Ash Envelope",
    year: 2024,
    rating: 8.2,
    mediaType: "movie",
    genres: ["Mystery"],
    overview: "Letters arrive from a sender who died in 1984.",
    accent: "#3a3a3a",
  },
  {
    id: "ui-tv-01",
    title: "Station Twelve Below",
    year: 2024,
    rating: 8.3,
    mediaType: "tv",
    genres: ["Drama"],
    overview: "Night-shift staff keep a frozen outpost online.",
    accent: "#2c4a62",
  },
  {
    id: "ui-tv-02",
    title: "The Indexers",
    year: 2023,
    rating: 7.7,
    mediaType: "tv",
    genres: ["Mystery"],
    overview: "A library catalogs objects that should not exist.",
    accent: "#4a3b2c",
  },
  {
    id: "ui-tv-03",
    title: "Low Orbit Kitchen",
    year: 2022,
    rating: 7.9,
    mediaType: "tv",
    genres: ["Comedy"],
    overview: "A catering crew services orbital construction.",
    accent: "#2f4d3b",
  },
  {
    id: "ui-tv-04",
    title: "Red Gallery",
    year: 2025,
    rating: 8.5,
    mediaType: "tv",
    genres: ["Thriller"],
    overview: "Each episode hangs a new painting with a cost.",
    accent: "#6b2430",
  },
  {
    id: "ui-tv-05",
    title: "Harbor Rules",
    year: 2021,
    rating: 7.3,
    mediaType: "tv",
    genres: ["Crime"],
    overview: "Dock inspectors learn the tide has a ledger.",
    accent: "#243a4d",
  },
  {
    id: "ui-tv-06",
    title: "Second Cast",
    year: 2020,
    rating: 8.0,
    mediaType: "tv",
    genres: ["Drama"],
    overview: "Understudies inherit roles and the lives attached.",
    accent: "#4d3a24",
  },
  {
    id: "ui-tv-07",
    title: "Null Bloom",
    year: 2024,
    rating: 7.6,
    mediaType: "tv",
    genres: ["Sci-Fi"],
    overview: "A greenhouse grows plants that remember owners.",
    accent: "#2a4d32",
  },
  {
    id: "ui-tv-08",
    title: "After Credits",
    year: 2023,
    rating: 7.4,
    mediaType: "tv",
    genres: ["Comedy"],
    overview: "Critics live inside the films they refuse to leave.",
    accent: "#3b2a4d",
  },
  {
    id: "ui-tv-09",
    title: "Westline",
    year: 2019,
    rating: 8.1,
    mediaType: "tv",
    genres: ["Western", "Drama"],
    overview: "A rail town bargains with the desert for water.",
    accent: "#6b4e2c",
  },
  {
    id: "ui-tv-10",
    title: "Mirror Shift",
    year: 2025,
    rating: 8.7,
    mediaType: "tv",
    genres: ["Fantasy"],
    overview: "A city swaps with its reflection every midnight.",
    accent: "#2a335c",
  },
  {
    id: "ui-tv-11",
    title: "Cold Open",
    year: 2022,
    rating: 7.2,
    mediaType: "tv",
    genres: ["Thriller"],
    overview: "News interns discover the teaser is the crime.",
    accent: "#4d2424",
  },
  {
    id: "ui-tv-12",
    title: "Lantern Hour",
    year: 2024,
    rating: 7.8,
    mediaType: "tv",
    genres: ["Family", "Adventure"],
    overview: "Siblings map festivals that move between towns.",
    accent: "#5c4a24",
  },
];

export const recommendedForYou = PLACEHOLDER_CATALOG.filter((item) =>
  ["ui-m-04", "ui-tv-04", "ui-m-08", "ui-tv-10", "ui-m-01", "ui-tv-01"].includes(
    item.id,
  ),
);

export const trending = PLACEHOLDER_CATALOG.filter((item) =>
  ["ui-m-07", "ui-tv-03", "ui-m-12", "ui-tv-07", "ui-m-02", "ui-tv-11"].includes(
    item.id,
  ),
);

export const popularMovies = PLACEHOLDER_CATALOG.filter(
  (item) => item.mediaType === "movie",
);

export const popularTvShows = PLACEHOLDER_CATALOG.filter(
  (item) => item.mediaType === "tv",
);

export function searchPlaceholderCatalog(query: string): CatalogItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  return PLACEHOLDER_CATALOG.filter((item) => {
    const haystack = [
      item.title,
      item.overview,
      item.mediaType,
      ...item.genres,
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });
}
