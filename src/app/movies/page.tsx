import { ContentSection } from "@/components/media/ContentSection";
import { PageHeader } from "@/components/layout/PageHeader";
import { popularMovies } from "@/data/placeholder-catalog";

export default function MoviesPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <PageHeader
        title="Movies"
        description="Placeholder films for layout only. The live movie catalog is not connected yet."
      />
      <ContentSection title="All sample films" items={popularMovies} />
    </div>
  );
}
