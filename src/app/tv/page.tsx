import { ContentSection } from "@/components/media/ContentSection";
import { PageHeader } from "@/components/layout/PageHeader";
import { popularTvShows } from "@/data/placeholder-catalog";

export default function TvPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <PageHeader
        title="TV Shows"
        description="Placeholder series for layout only. Live TV data arrives in a later phase."
      />
      <ContentSection title="All sample series" items={popularTvShows} />
    </div>
  );
}
