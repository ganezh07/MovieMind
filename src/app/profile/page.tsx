import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/layout/PageHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { SignOutButton } from "@/components/auth/SignOutButton";

type Profile = {
  id: string;
  display_name: string | null;
  avatar_url: string | null;
  created_at: string;
};

type Counts = {
  watched: number;
  ratings: number;
  watchlist: number;
};

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirect=/profile");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, display_name, avatar_url, created_at, onboarding_completed")
    .eq("id", user.id)
    .maybeSingle();

  const typedProfile = profile as Profile | null;

  const [watchedRes, ratingsRes, watchlistRes] = await Promise.all([
    supabase.from("watched_movies").select("id", { count: "exact", head: true }).eq("user_id", user.id),
    supabase.from("ratings").select("id", { count: "exact", head: true }).eq("user_id", user.id),
    supabase.from("watchlist").select("id", { count: "exact", head: true }).eq("user_id", user.id),
  ]);

  const counts: Counts = {
    watched: watchedRes.count ?? 0,
    ratings: ratingsRes.count ?? 0,
    watchlist: watchlistRes.count ?? 0,
  };

  const displayName = typedProfile?.display_name ?? user.email?.split("@")[0] ?? "MovieMind user";
  const createdAt = typedProfile?.created_at ?? user.created_at;
  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <PageHeader
        title="Profile"
        description="Your MovieMind account and activity overview."
      />

      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-center gap-4">
          {typedProfile?.avatar_url ? (
            <img
              src={typedProfile.avatar_url}
              alt={displayName}
              className="h-16 w-16 rounded-full border border-line object-cover"
            />
          ) : (
            <span className="flex h-16 w-16 items-center justify-center rounded-full border border-line bg-surface-2 text-xl font-bold text-foreground">
              {displayName.slice(0, 2).toUpperCase()}
            </span>
          )}
          <div>
            <p className="text-xl font-bold text-foreground">{displayName}</p>
            <p className="text-sm text-muted">{user.email}</p>
            {formattedDate ? (
              <p className="mt-1 text-xs text-muted">
                Member since {formattedDate}
              </p>
            ) : null}
          </div>
        </div>
        <SignOutButton />
      </div>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Watched" count={counts.watched} />
        <StatCard label="Ratings" count={counts.ratings} />
        <StatCard label="Watchlist" count={counts.watchlist} />
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <PlaceholderSection title="Watched" description="Movies and shows you've marked as watched will appear here." />
        <PlaceholderSection title="Ratings" description="Your rated titles and scores will appear here." />
        <PlaceholderSection title="Watchlist" description="Titles you've saved to watch later will appear here." />
      </div>
    </div>
  );
}

function StatCard({ label, count }: { label: string; count: number }) {
  return (
    <div className="rounded-lg border border-line bg-surface px-5 py-4">
      <p className="text-sm text-muted">{label}</p>
      <p className="mt-1 text-2xl font-extrabold text-foreground">{count}</p>
    </div>
  );
}

function PlaceholderSection({ title, description }: { title: string; description: string }) {
  return (
    <div>
      <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-muted">{title}</h3>
      <EmptyState
        title="Coming soon"
        description={description}
        className="py-10"
      />
    </div>
  );
}
