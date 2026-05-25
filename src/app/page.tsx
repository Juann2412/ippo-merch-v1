import Link from "next/link";

export default function HomePage() {
  return (
    <section className="mx-auto flex min-h-[calc(100vh-3.5rem)] max-w-7xl flex-col items-center justify-center px-4 py-16 text-center sm:px-6">
      <p className="mb-4 text-sm font-medium uppercase tracking-widest text-neon-cyan">
        Unboxing mystère · Collection otaku
      </p>
      <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">
        <span className="text-gradient-neon">Blind Box Figurines</span>
        <br />
        <span className="text-foreground">Manga & Anime</span>
      </h1>
      <p className="mt-6 max-w-xl text-lg text-muted-foreground">
        Naruto, One Piece, Jujutsu Kaisen, Demon Slayer, Dragon Ball…
        Chaque boîte cache une figurine — quelle rareté allez-vous tirer ?
      </p>
      <div className="mt-10 flex flex-col gap-4 sm:flex-row">
        <Link
          href="/products"
          className="glow-neon-pink inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105"
        >
          Explorer les blind box
        </Link>
        <Link
          href="/inscription"
          className="inline-flex h-12 items-center justify-center rounded-full border border-border px-8 text-sm font-medium transition-colors hover:border-neon-cyan hover:text-neon-cyan"
        >
          Créer un compte
        </Link>
      </div>
    </section>
  );
}
