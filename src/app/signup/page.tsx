"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/Button";

function friendlyAuthError(message: string): string {
  const lower = message.toLowerCase();
  if (lower.includes("already registered") || lower.includes("already been registered")) {
    return "An account with this email already exists. Try signing in instead.";
  }
  if (lower.includes("weak password") || lower.includes("password should be at least")) {
    return "Password must be at least 6 characters long.";
  }
  if (lower.includes("rate limit")) {
    return "Too many attempts. Please wait a moment and try again.";
  }
  if (lower.includes("network") || lower.includes("fetch")) {
    return "Network error. Check your connection and try again.";
  }
  return "Something went wrong. Please try again.";
}

export default function SignupPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [needsConfirmation, setNeedsConfirmation] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createClient();
    const { data, error: authError } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        data: {
          display_name: displayName.trim() || undefined,
        },
      },
    });

    if (authError) {
      setError(friendlyAuthError(authError.message));
      setLoading(false);
      return;
    }

    if (data.user && !data.session) {
      setNeedsConfirmation(true);
      setLoading(false);
      return;
    }

    router.push("/onboarding");
    router.refresh();
  };

  if (needsConfirmation) {
    return (
      <div className="mx-auto flex w-full max-w-md flex-col justify-center px-4 py-16 sm:px-6">
        <div className="rounded-lg border border-line bg-surface p-8 text-center">
          <h1 className="text-2xl font-extrabold tracking-tight text-foreground">
            Check your email
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted">
            We sent a confirmation link to <span className="text-foreground">{email}</span>.
            Click the link in the email to activate your account, then sign in.
          </p>
          <div className="mt-6">
            <Button href="/login" variant="secondary" className="w-full">
              Go to sign in
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-md flex-col justify-center px-4 py-16 sm:px-6">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
          Create your account
        </h1>
        <p className="mt-2 text-sm text-muted">
          Join MovieMind to track what you watch and get recommendations.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label htmlFor="display-name" className="mb-1.5 block text-sm font-medium text-foreground">
            Display name <span className="text-muted">(optional)</span>
          </label>
          <input
            id="display-name"
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="Your name"
            className="w-full rounded-lg border border-line bg-surface px-4 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted focus:border-accent"
          />
        </div>

        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-foreground">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-lg border border-line bg-surface px-4 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted focus:border-accent"
          />
        </div>

        <div>
          <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-foreground">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 6 characters"
            className="w-full rounded-lg border border-line bg-surface px-4 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted focus:border-accent"
          />
        </div>

        {error ? (
          <p className="rounded-lg border border-accent/30 bg-accent/10 px-4 py-2.5 text-sm text-accent">
            {error}
          </p>
        ) : null}

        <Button type="submit" disabled={loading} className="mt-2 w-full">
          {loading ? "Creating account..." : "Sign up"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-accent transition-colors hover:text-accent-strong">
          Sign in
        </Link>
      </p>
    </div>
  );
}
