"use client";

import { Button } from "@/components/ui/Button";

export default function Error({
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center px-4 py-20 text-center sm:px-6 lg:px-8">
      <h2 className="font-display text-3xl text-foreground">
        Something went wrong
      </h2>
      <p className="mt-3 max-w-md text-sm leading-6 text-muted">
        We couldn&apos;t load this page. Please try again.
      </p>
      <div className="mt-6 flex gap-3">
        <Button onClick={retry}>Try again</Button>
        <Button href="/" variant="secondary">
          Back home
        </Button>
      </div>
    </div>
  );
}
