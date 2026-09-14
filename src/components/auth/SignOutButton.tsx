"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

export function SignOutButton() {
  const router = useRouter();
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <button
      type="button"
      onClick={handleSignOut}
      className="rounded-lg border border-line bg-white/5 px-4 py-2 text-sm font-semibold text-foreground transition-all duration-200 hover:bg-white/10 hover:border-white/20"
    >
      Sign out
    </button>
  );
}
