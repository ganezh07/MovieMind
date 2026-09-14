import Link from "next/link";

export function PersonalizePrompt() {
  return (
    <div
      className="flex flex-col gap-4 rounded-lg border border-accent/20 bg-accent/5 px-6 py-5 sm:flex-row sm:items-center sm:justify-between"
      style={{ animation: "section-fade-in 0.5s ease-out both" }}
    >
      <div>
        <h2 className="text-lg font-bold text-foreground">
          Personalize MovieMind
        </h2>
        <p className="mt-1 text-sm text-muted">
          Tell us what you&apos;ve watched and we&apos;ll improve your recommendations.
        </p>
      </div>
      <Link
        href="/onboarding"
        className="shrink-0 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-strong"
      >
        Personalize Now
      </Link>
    </div>
  );
}
