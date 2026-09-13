export const dynamic = "force-dynamic";

import { ContentSection } from "@/components/media/ContentSection";
import { PageHeader } from "@/components/layout/PageHeader";
import { getPopularTv, getTrendingTv } from "@/lib/tmdb";

export default async function TvPage() {
  const [popular, trending] = await Promise.all([
    getPopularTv(),
    getTrendingTv(),
  ]);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <PageHeader
        title="TV Shows"
        description="Popular and trending series from The Movie Database."
      />
      <div className="flex flex-col gap-14">
        <ContentSection title="Trending TV Shows" items={trending} />
        <ContentSection title="Popular TV Shows" items={popular} />
      </div>
    </div>
  );
}
