export const dynamic = "force-dynamic";

import { Hero } from "@/components/home/Hero";
import { ContentSection } from "@/components/media/ContentSection";
import {
  getHeroMovie,
  getPopularMovies,
  getPopularTv,
  getTopRatedMovies,
  getTrendingMovies,
  getTrendingTv,
} from "@/lib/tmdb";

export default async function HomePage() {
  const [heroMovie, trendingMovies, popularMovies, topRatedMovies, trendingTv, popularTv] =
    await Promise.all([
      getHeroMovie(),
      getTrendingMovies(),
      getPopularMovies(),
      getTopRatedMovies(),
      getTrendingTv(),
      getPopularTv(),
    ]);

  return (
    <>
      <Hero item={heroMovie} />
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-4 py-12 sm:px-6 lg:px-8">
        <ContentSection
          id="discover"
          title="Trending Movies"
          description="What people are watching this week."
          items={trendingMovies}
        />
        <ContentSection
          title="Popular Movies"
          description="The most-watched films right now."
          items={popularMovies}
          action={<SeeAllLink href="/movies" />}
        />
        <ContentSection
          title="Top Rated Movies"
          description="Critically acclaimed films of all time."
          items={topRatedMovies}
        />
        <ContentSection
          title="Trending TV Shows"
          description="Series gaining attention this week."
          items={trendingTv}
        />
        <ContentSection
          title="Popular TV Shows"
          description="The most-watched series right now."
          items={popularTv}
          action={<SeeAllLink href="/tv" />}
        />
      </div>
    </>
  );
}

function SeeAllLink({ href }: { href: string }) {
  return (
    <a
      href={href}
      className="shrink-0 text-sm font-semibold text-accent transition-colors hover:text-accent-strong"
    >
      See all
    </a>
  );
}
