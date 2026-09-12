import { Hero } from "@/components/home/Hero";
import { ContentSection } from "@/components/media/ContentSection";
import { Button } from "@/components/ui/Button";
import {
  popularMovies,
  popularTvShows,
  recommendedForYou,
  trending,
} from "@/data/placeholder-catalog";

export default function HomePage() {
  return (
    <>
      <Hero />
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-14 px-4 py-12 sm:px-6 lg:px-8">
        <ContentSection
          id="discover"
          title="Recommended For You"
          description="A stand-in shelf. Personalized ranking arrives with the recommendation engine."
          items={recommendedForYou}
        />
        <ContentSection
          title="Trending"
          description="What the UI treats as currently buzzing — still placeholder titles."
          items={trending}
        />
        <ContentSection
          title="Popular Movies"
          description="Sample films used to prove out the grid, cards, and hover states."
          items={popularMovies}
          action={
            <Button href="/movies" variant="ghost" className="self-start">
              View all
            </Button>
          }
        />
        <ContentSection
          title="Popular TV Shows"
          description="Sample series for the same layout patterns as movies."
          items={popularTvShows}
          action={
            <Button href="/tv" variant="ghost" className="self-start">
              View all
            </Button>
          }
        />
      </div>
    </>
  );
}
