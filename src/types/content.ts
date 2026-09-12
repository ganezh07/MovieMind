export type MediaType = "movie" | "tv";

export type CatalogItem = {
  id: string;
  title: string;
  year: number;
  rating: number;
  mediaType: MediaType;
  genres: string[];
  overview: string;
  posterPath: string | null;
  backdropPath: string | null;
};

export type HeroItem = {
  id: string;
  title: string;
  overview: string;
  rating: number;
  year: number;
  genres: string[];
  backdropPath: string | null;
};
