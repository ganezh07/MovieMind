export default function SignupLoading() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col justify-center px-4 py-16 sm:px-6">
      <div className="mb-8 text-center">
        <div className="mx-auto h-8 w-48 animate-pulse rounded-lg bg-white/10" />
        <div className="mx-auto mt-3 h-4 w-64 animate-pulse rounded-lg bg-white/10" />
      </div>
      <div className="flex flex-col gap-4">
        <div className="h-11 w-full animate-pulse rounded-lg bg-white/10" />
        <div className="h-11 w-full animate-pulse rounded-lg bg-white/10" />
        <div className="h-11 w-full animate-pulse rounded-lg bg-white/10" />
        <div className="mt-2 h-11 w-full animate-pulse rounded-lg bg-white/10" />
      </div>
    </div>
  );
}
