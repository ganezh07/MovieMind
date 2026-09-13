import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

const variants = {
  primary:
    "bg-accent text-white hover:bg-accent-strong shadow-[0_4px_20px_-4px_rgba(229,9,20,0.5)]",
  secondary:
    "border border-line bg-white/5 text-foreground hover:bg-white/10 hover:border-white/20",
  ghost: "text-muted hover:text-foreground",
} as const;

type Variant = keyof typeof variants;

type SharedProps = {
  children: ReactNode;
  className?: string;
  variant?: Variant;
};

type ButtonAsButton = SharedProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: undefined;
  };

type ButtonAsLink = SharedProps & {
  href: string;
};

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold tracking-tight transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:pointer-events-none disabled:opacity-50",
    variants[props.variant ?? "primary"],
    props.className,
  );

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={classes}>
        {props.children}
      </Link>
    );
  }

  const { children, className: _className, variant: _variant, type, ...rest } =
    props as ButtonAsButton;

  return (
    <button type={type ?? "button"} className={classes} {...rest}>
      {children}
    </button>
  );
}
