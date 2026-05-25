"use client";

import { AnimatePresence, motion } from "framer-motion";
import { PackageOpen } from "lucide-react";
import type { ProductWithImages } from "@/domain";
import { BlindBoxCard } from "@/features/products/components/blind-box-card";

interface ProductsGridProps {
  items: ProductWithImages[];
}

export function ProductsGrid({ items }: ProductsGridProps) {
  if (items.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex min-h-[320px] flex-col items-center justify-center rounded-2xl border border-dashed border-border/80 bg-card/30 px-6 py-16 text-center"
      >
        <PackageOpen className="mb-4 size-12 text-muted-foreground/50" />
        <p className="text-lg font-medium text-foreground">
          Aucune blind box ne correspond
        </p>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          Modifiez vos filtres ou réinitialisez la recherche pour explorer tout
          le catalogue.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      layout
      className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
    >
      <AnimatePresence mode="popLayout">
        {items.map((item, index) => (
          <BlindBoxCard key={item.product.id} item={item} index={index} />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
