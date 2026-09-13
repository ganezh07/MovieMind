export const dynamic = "force-dynamic";

import { ContentSection } from "@/components/media/ContentSection";
import { PageHeader } from "@/components/layout/PageHeader";
import { getPopularMovies, getTopRatedMovies } from "@/lib/tmdb";

export default async function MoviesPage() {
  const [popular, topRated] = await Promise.all([
    getPopularMovies(),
    getTopRatedMovies(),
  ]);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <PageHeader
        title="Movies"
        description="Popular and top-rated films from The Movie Database."
      />
      <div className="flex flex-col gap-14">
        <ContentSection title="Popular Movies" items={popular} />
        <ContentSection title="Top Rated Movies" items={topRated} />
      </div>
    </div>
  );
}
