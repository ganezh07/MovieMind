"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/cn";

const links = [
  { href: "/", label: "Home" },
  { href: "/movies", label: "Movies" },
  { href: "/tv", label: "TV Shows" },
  { href: "/search", label: "Search" },
  { href: "/watchlist", label: "Watchlist" },
  { href: "/profile", label: "Profile" },
] as const;

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-accent font-display text-sm font-semibold text-background">
            MM
          </span>
          <span className="font-display text-xl tracking-[0.08em] text-foreground">
            MovieMind
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {links.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-full px-3 py-1.5 text-sm transition-colors duration-200",
                  active
                    ? "bg-white/10 text-foreground"
                    : "text-muted hover:bg-white/5 hover:text-foreground",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-line text-foreground md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span className="flex flex-col gap-1.5" aria-hidden>
            <span
              className={cn(
                "block h-0.5 w-5 bg-foreground transition duration-200",
                open && "translate-y-2 rotate-45",
              )}
            />
            <span
              className={cn(
                "block h-0.5 w-5 bg-foreground transition duration-200",
                open && "opacity-0",
              )}
            />
            <span
              className={cn(
                "block h-0.5 w-5 bg-foreground transition duration-200",
                open && "-translate-y-2 -rotate-45",
              )}
            />
          </span>
        </button>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          className="border-t border-line px-4 py-3 md:hidden"
          aria-label="Mobile"
        >
          <ul className="flex flex-col gap-1">
            {links.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "block rounded-lg px-3 py-2 text-sm",
                      active
                        ? "bg-white/10 text-foreground"
                        : "text-muted hover:bg-white/5 hover:text-foreground",
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
