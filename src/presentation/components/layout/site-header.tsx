import { Show, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { clerkRoutes } from "@/infrastructure/clerk/auth-config";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="font-heading text-lg font-bold tracking-tight">
          <span className="bg-gradient-to-r from-neon-pink via-neon-violet to-neon-cyan bg-clip-text text-transparent">
            IPPO Merch
          </span>
        </Link>
        <nav className="flex items-center gap-6 text-sm text-muted-foreground">
          <Link href="/products" className="transition-colors hover:text-foreground">
            Produits
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
