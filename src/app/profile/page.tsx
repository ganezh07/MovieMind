import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";

export default function ProfilePage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <PageHeader
        title="Profile"
        description="Account, ratings, and watch history will appear here after authentication."
      />
      <EmptyState
        title="No profile yet"
        description="Sign-in is not part of this phase. This screen exists so navigation and empty states are already in place."
        action={
          <Button href="/" variant="secondary">
            Back home
          </Button>
        }
      />
    </div>
  );
}
