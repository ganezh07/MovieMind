import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type EmptyStateProps = {
  title: string;
  description: string;
  icon?: ReactNode;
  action?: ReactNode;
  className?: string;
};

export function EmptyState({
  title,
  description,
  icon,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-2xl border border-dashed border-line bg-surface/60 px-6 py-16 text-center",
        className,
      )}
    >
      {icon ? (
        <div className="mb-4 text-accent" aria-hidden>
          {icon}
        </div>
      ) : null}
      <h2 className="font-display text-2xl text-foreground">{title}</h2>
      <p className="mt-2 max-w-md text-sm leading-6 text-muted">{description}</p>
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}
