import type { RarityLevel } from "../value-objects/rarity";

/** Produit blind box — appartient à une Category */
export interface Product {
  id: string;
  categoryId: string;
  slug: string;
  characterName: string;
  /** Sous-série ou vague au sein de la catégorie */
  series: string;
  rarity: RarityLevel;
  /** Probabilité d'obtention en % (0–100) */
  probability: number;
  priceCents: number;
  stock: number;
  description?: string;
  featured?: boolean;
  isActive: boolean;
  createdAt: number;
  updatedAt: number;
}
