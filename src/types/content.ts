export type MediaType = "movie" | "tv";

export type CatalogItem = {
  id: string;
  title: string;
  year: number;
  rating: number;
  mediaType: MediaType;
  genres: string[];
  overview: string;
  accent: string;
};
