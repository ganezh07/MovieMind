import type { CatalogItem, HeroItem, MediaType } from "@/types/content";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE = "https://image.tmdb.org";

const REVALIDATE_SECONDS = 3600;

function getApiKey(): string {
  const key = process.env.TMDB_API_KEY;
  if (!key) {
    throw new Error("TMDB_API_KEY environment variable is not set");
  }
  return key;
}

type TmdbGenre = { id: number; name: string };

let movieGenresCache: TmdbGenre[] | null = null;
let tvGenresCache: TmdbGenre[] | null = null;

async function fetchGenres(type: MediaType): Promise<TmdbGenre[]> {
  if (type === "movie" && movieGenresCache) return movieGenresCache;
  if (type === "tv" && tvGenresCache) return tvGenresCache;

  const res = await fetch(
    `${TMDB_BASE_URL}/genre/${type}/list?language=en`,
    {
      headers: { Authorization: `Bearer ${getApiKey()}` },
      next: { revalidate: REVALIDATE_SECONDS * 24 },
    },
  );
  if (!res.ok) throw new Error(`Failed to fetch ${type} genres`);
  const data: { genres: TmdbGenre[] } = await res.json();

  if (type === "movie") movieGenresCache = data.genres;
  else tvGenresCache = data.genres;
  return data.genres;
}

type TmdbMovieResult = {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  release_date: string;
  genre_ids: number[];
  overview: string;
};

type TmdbTvResult = {
  id: number;
  name: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  first_air_date: string;
  genre_ids: number[];
  overview: string;
};

type TmdbMovieDetail = TmdbMovieResult & {
  genres: TmdbGenre[];
};

type TmdbPagedResponse<T> = {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
};

function yearFromDate(dateStr: string): number {
  if (!dateStr) return 0;
  return new Date(dateStr).getFullYear();
}

function movieToCatalog(
  movie: TmdbMovieResult,
  genres: string[],
): CatalogItem {
  return {
    id: `movie-${movie.id}`,
    title: movie.title,
    year: yearFromDate(movie.release_date),
    rating: Math.round(movie.vote_average * 10) / 10,
    mediaType: "movie",
    genres,
    overview: movie.overview,
    posterPath: movie.poster_path,
    backdropPath: movie.backdrop_path,
  };
}

function tvToCatalog(
  show: TmdbTvResult,
  genres: string[],
): CatalogItem {
  return {
    id: `tv-${show.id}`,
    title: show.name,
    year: yearFromDate(show.first_air_date),
    rating: Math.round(show.vote_average * 10) / 10,
    mediaType: "tv",
    genres,
    overview: show.overview,
    posterPath: show.poster_path,
    backdropPath: show.backdrop_path,
  };
}

async function fetchMovies(
  endpoint: string,
): Promise<CatalogItem[]> {
  const res = await fetch(`${TMDB_BASE_URL}${endpoint}`, {
    headers: { Authorization: `Bearer ${getApiKey()}` },
    next: { revalidate: REVALIDATE_SECONDS },
  });
  if (!res.ok) throw new Error(`TMDB request failed: ${endpoint}`);
  const data: TmdbPagedResponse<TmdbMovieResult> = await res.json();

  const genres = await fetchGenres("movie");
  const genreMap = new Map(genres.map((g) => [g.id, g.name]));

  return data.results
    .filter((m) => m.poster_path)
    .map((m) =>
      movieToCatalog(
        m,
        m.genre_ids
          .map((id) => genreMap.get(id))
          .filter((n): n is string => Boolean(n)),
      ),
    );
}

async function fetchTvShows(
  endpoint: string,
): Promise<CatalogItem[]> {
  const res = await fetch(`${TMDB_BASE_URL}${endpoint}`, {
    headers: { Authorization: `Bearer ${getApiKey()}` },
    next: { revalidate: REVALIDATE_SECONDS },
  });
  if (!res.ok) throw new Error(`TMDB request failed: ${endpoint}`);
  const data: TmdbPagedResponse<TmdbTvResult> = await res.json();

  const genres = await fetchGenres("tv");
  const genreMap = new Map(genres.map((g) => [g.id, g.name]));

  return data.results
    .filter((s) => s.poster_path)
    .map((s) =>
      tvToCatalog(
        s,
        s.genre_ids
          .map((id) => genreMap.get(id))
          .filter((n): n is string => Boolean(n)),
      ),
    );
}

export async function getTrendingMovies(): Promise<CatalogItem[]> {
  return fetchMovies("/trending/movie/week?language=en-US");
}

export async function getTrendingTv(): Promise<CatalogItem[]> {
  return fetchTvShows("/trending/tv/week?language=en-US");
}

export async function getPopularMovies(): Promise<CatalogItem[]> {
  return fetchMovies("/movie/popular?language=en-US&page=1");
}

export async function getTopRatedMovies(): Promise<CatalogItem[]> {
  return fetchMovies("/movie/top_rated?language=en-US&page=1");
}

export async function getPopularTv(): Promise<CatalogItem[]> {
  return fetchTvShows("/tv/popular?language=en-US&page=1");
}

export async function getHeroMovie(): Promise<HeroItem> {
  const trending = await getTrendingMovies();
  const pick = trending[0];
  if (!pick) throw new Error("No trending movie available for hero");

  const res = await fetch(
    `${TMDB_BASE_URL}/movie/${pick.id.replace("movie-", "")}?language=en-US`,
    {
      headers: { Authorization: `Bearer ${getApiKey()}` },
      next: { revalidate: REVALIDATE_SECONDS },
    },
  );
  if (!res.ok) throw new Error("Failed to fetch hero movie details");
  const detail: TmdbMovieDetail = await res.json();

  return {
    id: pick.id,
    title: detail.title,
    overview: detail.overview,
    rating: Math.round(detail.vote_average * 10) / 10,
    year: yearFromDate(detail.release_date),
    genres: detail.genres.map((g) => g.name),
    backdropPath: detail.backdrop_path,
    posterPath: detail.poster_path,
  };
}

export async function searchMulti(query: string): Promise<CatalogItem[]> {
  const trimmed = query.trim();
  if (!trimmed) return [];

  const params = new URLSearchParams({
    query: trimmed,
    language: "en-US",
    page: "1",
    include_adult: "false",
  });

  const res = await fetch(
    `${TMDB_BASE_URL}/search/multi?${params.toString()}`,
    {
      headers: { Authorization: `Bearer ${getApiKey()}` },
      next: { revalidate: 300 },
    },
  );
  if (!res.ok) throw new Error("TMDB search request failed");
  const data: TmdbPagedResponse<
    (TmdbMovieResult | TmdbTvResult) & { media_type: string }
  > = await res.json();

  const movieGenreMap = new Map(
    (await fetchGenres("movie")).map((g) => [g.id, g.name]),
  );
  const tvGenreMap = new Map(
    (await fetchGenres("tv")).map((g) => [g.id, g.name]),
  );

  return data.results
    .filter(
      (r): r is TmdbMovieResult & { media_type: "movie" } =>
        r.media_type === "movie" && "poster_path" in r && r.poster_path !== null,
    )
    .map((m) =>
      movieToCatalog(
        m,
        m.genre_ids
          .map((id) => movieGenreMap.get(id))
          .filter((n): n is string => Boolean(n)),
      ),
    )
    .concat(
      data.results
        .filter(
          (r): r is TmdbTvResult & { media_type: "tv" } =>
            r.media_type === "tv" && "poster_path" in r && r.poster_path !== null,
        )
        .map((s) =>
          tvToCatalog(
            s,
            s.genre_ids
              .map((id) => tvGenreMap.get(id))
              .filter((n): n is string => Boolean(n)),
          ),
        ),
    );
}

export function posterUrl(
  path: string | null,
  size: "w185" | "w342" | "w500" = "w342",
): string | null {
  if (!path) return null;
  return `${TMDB_IMAGE_BASE}/t/p/${size}${path}`;
}

export function backdropUrl(
  path: string | null,
  size: "w780" | "w1280" | "original" = "w1280",
): string | null {
  if (!path) return null;
  return `${TMDB_IMAGE_BASE}/t/p/${size}${path}`;
}
