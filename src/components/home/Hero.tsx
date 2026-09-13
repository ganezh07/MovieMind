import { Button } from "@/components/ui/Button";
import { backdropUrl } from "@/lib/tmdb";
import type { HeroItem } from "@/types/content";

type HeroProps = {
  item: HeroItem;
};

export function Hero({ item }: HeroProps) {
  const bg = backdropUrl(item.backdropPath, "original");

  return (
    <section className="relative isolate overflow-hidden">
      {bg ? (
        <img
          src={bg}
          alt=""
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
      ) : null}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_rgba(232,184,109,0.18),_transparent_55%),linear-gradient(180deg,#0c0c12_0%,#07070b_70%)]" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-background via-background/60 to-transparent" />
      <div className="absolute inset-x-0 top-0 -z-10 h-px bg-linear-to-r from-transparent via-accent/50 to-transparent" />
      <div className="mx-auto flex min-h-[72vh] w-full max-w-7xl flex-col justify-center px-4 py-20 sm:px-6 lg:px-8">
        <p className="text-xs font-medium uppercase tracking-[0.28em] text-accent">
          {item.rating.toFixed(1)} · {item.year} · {item.genres.slice(0, 3).join(", ")}
        </p>
        <h1 className="mt-5 max-w-3xl font-display text-4xl leading-tight text-foreground sm:text-6xl sm:leading-[1.05]">
          {item.title}
        </h1>
        <p className="mt-5 max-w-xl text-base leading-7 text-muted sm:text-lg">
          {item.overview}
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href="#discover">Get Started</Button>
          <Button href="/movies" variant="secondary">
            Explore Movies
          </Button>
        </div>
      </div>
    </section>
  );
}
