import { Button } from "@/components/ui/Button";
import { backdropUrl, posterUrl } from "@/lib/tmdb";
import type { HeroItem } from "@/types/content";

type HeroProps = {
  item: HeroItem;
  ctaHref?: string;
};

export function Hero({ item, ctaHref = "#discover" }: HeroProps) {
  const bg = backdropUrl(item.backdropPath, "original");
  const poster = posterUrl(item.posterPath, "w500");

  return (
    <section className="relative isolate overflow-hidden">
      {bg ? (
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <img
            src={bg}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            style={{
              animation: "kenburns 20s ease-in-out infinite alternate",
            }}
          />
        </div>
      ) : null}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-background via-background/80 to-background/30" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-background via-background/40 to-transparent" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_70%_30%,rgba(229,9,20,0.08),transparent_60%)]" />

      <div className="mx-auto flex min-h-[78vh] w-full max-w-7xl items-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex w-full flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div
            className="flex max-w-xl flex-col"
            style={{ animation: "hero-fade-in 0.7s ease-out both" }}
          >
            <div className="flex items-center gap-3 text-sm font-semibold text-muted">
              <span className="flex items-center gap-1.5">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--accent)" aria-hidden>
                  <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8l-6.2 4.5 2.4-7.4L2 9.4h7.6z" />
                </svg>
                <span className="text-foreground">{item.rating.toFixed(1)}</span>
              </span>
              <span className="text-line">|</span>
              <span>{item.year}</span>
              <span className="text-line">|</span>
              <span className="truncate">{item.genres.slice(0, 3).join(", ")}</span>
            </div>

            <h1 className="mt-4 font-extrabold text-4xl leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              {item.title}
            </h1>

            <p className="mt-4 max-w-lg text-base leading-7 text-muted">
              {item.overview}
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button href={ctaHref}>Get Started</Button>
              <Button href="/movies" variant="secondary">
                Explore Movies
              </Button>
            </div>
          </div>

          {poster ? (
            <div
              className="hidden shrink-0 lg:block"
              style={{ animation: "hero-fade-in 0.9s ease-out both" }}
            >
              <div className="relative overflow-hidden rounded-lg border border-line shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)]">
                <img
                  src={poster}
                  alt={item.title}
                  className="h-[420px] w-[280px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
