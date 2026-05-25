"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import type { ProductWithImages } from "@/domain";
import { ProductsFilters } from "@/features/products/components/products-filters";
import { ProductsGrid } from "@/features/products/components/products-grid";
import {
  DEFAULT_FILTERS,
  extractFilterOptions,
  filterAndSortProducts,
  type ProductFilters,
} from "@/features/products/lib/filter-products";

interface ProductsCatalogProps {
  items: ProductWithImages[];
}

export function ProductsCatalog({ items }: ProductsCatalogProps) {
  const [filters, setFilters] = useState<ProductFilters>(DEFAULT_FILTERS);

  const { categories, series } = useMemo(
    () => extractFilterOptions(items),
    [items],
  );

  const filtered = useMemo(
    () => filterAndSortProducts(items, filters),
    [items, filters],
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(240px,280px)_1fr] lg:items-start">
      <ProductsFilters
        filters={filters}
        categories={categories}
        series={series}
        resultCount={filtered.length}
        onChange={setFilters}
        onReset={() => setFilters(DEFAULT_FILTERS)}
      />

      <div className="min-w-0 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border/40 bg-card/30 px-4 py-3 text-sm text-muted-foreground backdrop-blur-sm"
        >
          <span>
            Affichage de{" "}
            <strong className="text-foreground">{filtered.length}</strong> sur{" "}
            {items.length} figurines
          </span>
          <span className="text-xs uppercase tracking-widest text-neon-violet/90">
            Survolez une carte pour l&apos;unboxing reveal
          </span>
        </motion.div>

        <ProductsGrid items={filtered} />
      </div>
    </div>
  );
}
