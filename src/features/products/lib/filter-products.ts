import type { ProductWithImages, RarityLevel } from "@/domain";
import { RARITY_SORT_ORDER } from "./rarity-styles";

export type PriceRange = "all" | "under-10" | "10-15" | "15-plus";

export type SortOption =
  | "featured"
  | "price-asc"
  | "price-desc"
  | "rarity-desc"
  | "name-asc"
  | "newest";

export interface ProductFilters {
  animeId: string;
  rarity: RarityLevel | "all";
  series: string;
  priceRange: PriceRange;
  sort: SortOption;
  search: string;
}

export const DEFAULT_FILTERS: ProductFilters = {
  animeId: "all",
  rarity: "all",
  series: "all",
  priceRange: "all",
  sort: "featured",
  search: "",
};

function matchesPrice(cents: number, range: PriceRange): boolean {
  switch (range) {
    case "under-10":
      return cents < 1000;
    case "10-15":
      return cents >= 1000 && cents < 1500;
    case "15-plus":
      return cents >= 1500;
    default:
      return true;
  }
}

export function filterAndSortProducts(
  items: ProductWithImages[],
  filters: ProductFilters,
): ProductWithImages[] {
  const search = filters.search.trim().toLowerCase();

  let result = items.filter((item) => {
    const { product, category } = item;

    if (filters.animeId !== "all" && product.categoryId !== filters.animeId) {
      return false;
    }
    if (filters.rarity !== "all" && product.rarity !== filters.rarity) {
      return false;
    }
    if (filters.series !== "all" && product.series !== filters.series) {
      return false;
    }
    if (!matchesPrice(product.priceCents, filters.priceRange)) {
      return false;
    }
    if (search) {
      const haystack = [
        product.characterName,
        product.series,
        product.slug,
        category?.name,
        product.description,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(search)) return false;
    }
    return true;
  });

  result = [...result].sort((a, b) => {
    switch (filters.sort) {
      case "price-asc":
        return a.product.priceCents - b.product.priceCents;
      case "price-desc":
        return b.product.priceCents - a.product.priceCents;
      case "rarity-desc":
        return (
          RARITY_SORT_ORDER[b.product.rarity] -
          RARITY_SORT_ORDER[a.product.rarity]
        );
      case "name-asc":
        return a.product.characterName.localeCompare(
          b.product.characterName,
          "fr",
        );
      case "newest":
        return b.product.createdAt - a.product.createdAt;
      case "featured":
      default: {
        const af = a.product.featured ? 1 : 0;
        const bf = b.product.featured ? 1 : 0;
        if (bf !== af) return bf - af;
        return (
          RARITY_SORT_ORDER[b.product.rarity] -
          RARITY_SORT_ORDER[a.product.rarity]
        );
      }
    }
  });

  return result;
}

export function extractFilterOptions(items: ProductWithImages[]) {
  const categoryMap = new Map<string, { id: string; name: string; slug: string }>();
  const seriesSet = new Set<string>();

  for (const item of items) {
    if (item.category) {
      categoryMap.set(item.category.id, {
        id: item.category.id,
        name: item.category.name,
        slug: item.category.slug,
      });
    }
    seriesSet.add(item.product.series);
  }

  return {
    categories: [...categoryMap.values()].sort((a, b) =>
      a.name.localeCompare(b.name, "fr"),
    ),
    series: [...seriesSet].sort((a, b) => a.localeCompare(b, "fr")),
  };
}
