import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";

export default async function WatchlistPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirect=/watchlist");
  }

  const { count } = await supabase
    .from("watchlist")
    .select("id", { count: "exact", head: true })
    .eq("user_id", user.id);

  const isEmpty = (count ?? 0) === 0;

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <PageHeader
        title="Watchlist"
        description="Titles you've saved to watch later."
      />
      {isEmpty ? (
        <EmptyState
          title="Your watchlist is empty"
          description="Browse movies and TV shows, then save titles to watch later."
          action={<Button href="/movies">Browse movies</Button>}
        />
      ) : (
        <EmptyState
          title="Watchlist items coming soon"
          description="Your saved titles will be displayed here in the next phase."
        />
      )}
    </div>
  );
}
