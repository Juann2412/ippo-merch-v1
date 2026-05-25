"use client";

import { motion } from "framer-motion";
import { Filter, RotateCcw, Search, SlidersHorizontal } from "lucide-react";
import { RARITY_LEVELS, type RarityLevel } from "@/domain";
import {
  DEFAULT_FILTERS,
  type PriceRange,
  type ProductFilters,
  type SortOption,
} from "@/features/products/lib/filter-products";
import { cn } from "@/lib/utils";

interface FilterCategory {
  id: string;
  name: string;
  slug: string;
}

interface ProductsFiltersProps {
  filters: ProductFilters;
  categories: FilterCategory[];
  series: string[];
  resultCount: number;
  onChange: (filters: ProductFilters) => void;
  onReset: () => void;
}

const PRICE_OPTIONS: { value: PriceRange; label: string }[] = [
  { value: "all", label: "Tous les prix" },
  { value: "under-10", label: "Moins de 10 €" },
  { value: "10-15", label: "10 € – 15 €" },
  { value: "15-plus", label: "15 € et plus" },
];

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "featured", label: "Vedettes & rareté" },
  { value: "price-asc", label: "Prix croissant" },
  { value: "price-desc", label: "Prix décroissant" },
  { value: "rarity-desc", label: "Rareté" },
  { value: "name-asc", label: "Nom A–Z" },
  { value: "newest", label: "Plus récents" },
];

function SelectField({
  label,
  value,
  onChange,
  children,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 rounded-xl border border-border/80 bg-background/60 px-3 text-sm text-foreground outline-none transition-colors focus:border-neon-cyan/50 focus:ring-2 focus:ring-neon-cyan/20"
      >
        {children}
      </select>
    </label>
  );
}

export function ProductsFilters({
  filters,
  categories,
  series,
  resultCount,
  onChange,
  onReset,
}: ProductsFiltersProps) {
  const hasActiveFilters =
    filters.animeId !== DEFAULT_FILTERS.animeId ||
    filters.rarity !== DEFAULT_FILTERS.rarity ||
    filters.series !== DEFAULT_FILTERS.series ||
    filters.priceRange !== DEFAULT_FILTERS.priceRange ||
    filters.sort !== DEFAULT_FILTERS.sort ||
    filters.search !== DEFAULT_FILTERS.search;

  function patch(partial: Partial<ProductFilters>) {
    onChange({ ...filters, ...partial });
  }

  return (
    <motion.aside
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-5 rounded-2xl border border-border/60 bg-card/50 p-5 backdrop-blur-md lg:sticky lg:top-20"
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <SlidersHorizontal className="size-4 text-neon-violet" />
          Filtres
        </div>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-neon-cyan"
          >
            <RotateCcw className="size-3" />
            Réinitialiser
          </button>
        )}
      </div>

      <label className="relative flex flex-col gap-1.5">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
          Recherche
        </span>
        <Search className="pointer-events-none absolute left-3 top-[2.15rem] size-4 text-muted-foreground" />
        <input
          type="search"
          placeholder="Personnage, série…"
          value={filters.search}
          onChange={(e) => patch({ search: e.target.value })}
          className="h-10 rounded-xl border border-border/80 bg-background/60 pl-9 pr-3 text-sm outline-none transition-colors focus:border-neon-cyan/50 focus:ring-2 focus:ring-neon-cyan/20"
        />
      </label>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
        <SelectField
          label="Anime"
          value={filters.animeId}
          onChange={(v) => patch({ animeId: v })}
        >
          <option value="all">Tous les animes</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </SelectField>

        <SelectField
          label="Rareté"
          value={filters.rarity}
          onChange={(v) => patch({ rarity: v as RarityLevel | "all" })}
        >
          <option value="all">Toutes les raretés</option>
          {RARITY_LEVELS.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </SelectField>

        <SelectField
          label="Série"
          value={filters.series}
          onChange={(v) => patch({ series: v })}
        >
          <option value="all">Toutes les séries</option>
          {series.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </SelectField>

        <SelectField
          label="Prix"
          value={filters.priceRange}
          onChange={(v) => patch({ priceRange: v as PriceRange })}
        >
          {PRICE_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </SelectField>

        <SelectField
          label="Tri"
          value={filters.sort}
          onChange={(v) => patch({ sort: v as SortOption })}
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </SelectField>
      </div>

      <div
        className={cn(
          "flex items-center gap-2 rounded-xl border border-border/50 bg-muted/20 px-3 py-2.5 text-xs text-muted-foreground",
        )}
      >
        <Filter className="size-3.5 shrink-0 text-neon-pink" />
        <span>
          <strong className="text-foreground">{resultCount}</strong> blind box
          {resultCount !== 1 ? "es" : ""} trouvée{resultCount !== 1 ? "s" : ""}
        </span>
      </div>
    </motion.aside>
  );
}
