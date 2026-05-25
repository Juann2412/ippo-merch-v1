import type { Metadata } from "next";
import { createApplicationServices } from "@/application/create-application-services";
import { ProductsCatalog } from "@/features/products/components/products-catalog";

export const metadata: Metadata = {
  title: "Blind Box — Catalogue",
  description:
    "Explorez les blind box figurines anime : filtres par anime, rareté, série et prix.",
};

export default async function ProductsPage() {
  const { products } = createApplicationServices();
  const catalog = await products.listCatalog(true);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
      <header className="mb-10 text-center sm:mb-14 sm:text-left">
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-neon-cyan">
          Collection · Unboxing mystère
        </p>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
          <span className="text-gradient-neon">Blind Box</span>{" "}
          <span className="text-foreground">Figurines</span>
        </h1>
        <p className="mt-4 max-w-2xl text-muted-foreground sm:text-lg">
          Filtrez par anime, rareté, série ou budget. Chaque carte cache une
          figurine — survolez pour le reveal avant d&apos;ajouter au panier.
        </p>
      </header>

      {catalog.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border px-6 py-20 text-center text-muted-foreground">
          <p className="text-lg font-medium text-foreground">
            Catalogue vide pour le moment
          </p>
          <p className="mt-2 text-sm">
            Lancez le seed :{" "}
            <code className="rounded bg-muted px-2 py-0.5 text-neon-cyan">
              npm run seed:naruto
            </code>
          </p>
        </div>
      ) : (
        <ProductsCatalog items={catalog} />
      )}
    </div>
  );
}
