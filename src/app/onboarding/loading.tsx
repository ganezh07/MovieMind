export default function OnboardingLoading() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 space-y-3">
        <div className="h-8 w-80 animate-pulse rounded-lg bg-white/10" />
        <div className="h-4 w-96 max-w-full animate-pulse rounded-lg bg-white/10" />
      </div>
      <div className="mb-6 h-12 w-full animate-pulse rounded-lg bg-white/10" />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {Array.from({ length: 10 }, (_, i) => (
          <div key={i} className="aspect-[2/3] animate-pulse rounded-lg bg-white/10" />
        ))}
      </div>
    </div>
  );
}
