"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

type StarRatingProps = {
  value: number;
  onChange: (rating: number) => void;
  size?: number;
};

export function StarRating({ value, onChange, size = 24 }: StarRatingProps) {
  const [hover, setHover] = useState(0);
  const display = hover || value;

  return (
    <div className="flex items-center gap-0.5" onMouseLeave={() => setHover(0)}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHover(star)}
          className="rounded-sm p-0.5 transition-transform hover:scale-110"
          aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
        >
          <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill={star <= display ? "var(--accent)" : "none"}
            stroke={star <= display ? "var(--accent)" : "currentColor"}
            strokeWidth="1.5"
            className={cn(
              "transition-colors",
              star <= display ? "text-accent" : "text-muted/50",
            )}
          >
            <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8l-6.2 4.5 2.4-7.4L2 9.4h7.6z" />
          </svg>
        </button>
      ))}
    </div>
  );
}
