import { Show, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { clerkRoutes } from "@/infrastructure/clerk/auth-config";

export async function SiteHeader() {
  const { userId } = await auth();

  // #region agent log
  fetch("http://127.0.0.1:7772/ingest/0b275a91-0f0d-485b-a1ad-c4ccb8488b12", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Debug-Session-Id": "0ce92c",
    },
    body: JSON.stringify({
      sessionId: "0ce92c",
      runId: "post-fix",
      hypothesisId: "H1",
      location: "site-header.tsx:render",
      message: "SiteHeader auth state (Clerk v7 Show API)",
      data: {
        hasUserId: Boolean(userId),
        usesShowComponent: true,
        clerkVersion: 7,
      },
      timestamp: Date.now(),
    }),
  }).catch(() => {});
  // #endregion

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="font-heading text-lg font-bold tracking-tight">
          <span className="bg-gradient-to-r from-neon-pink via-neon-violet to-neon-cyan bg-clip-text text-transparent">
            IPPO Merch
          </span>
        </Link>
        <nav className="flex items-center gap-6 text-sm text-muted-foreground">
          <Link href="/catalog" className="transition-colors hover:text-foreground">
            Catalogue
          </Link>
          <Link href="/cart" className="transition-colors hover:text-foreground">
            Panier
          </Link>
          <Show when="signed-out">
            <Link
              href={clerkRoutes.signIn}
              className="transition-colors hover:text-foreground"
            >
              Connexion
            </Link>
          </Show>
          <Show when="signed-in">
            <UserButton />
          </Show>
        </nav>
      </div>
    </header>
  );
}
