import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

const variants = {
  primary:
    "bg-accent text-background hover:bg-accent-strong shadow-[0_0_0_1px_rgba(232,184,109,0.25)]",
  secondary:
    "border border-line bg-white/5 text-foreground hover:bg-white/10",
  ghost: "text-muted hover:text-foreground hover:bg-white/5",
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
    "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium tracking-wide transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:pointer-events-none disabled:opacity-50",
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
