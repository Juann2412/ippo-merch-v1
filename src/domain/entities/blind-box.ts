import type { RarityLevel } from "./rarity";

export interface BlindBoxImages {
  box: string;
  reveal: string;
}

export interface BlindBox {
  id: string;
  slug: string;
  characterName: string;
  animeTitle: string;
  series: string;
  rarity: RarityLevel;
  probability: number;
  priceCents: number;
  stock: number;
  images: BlindBoxImages;
  description?: string;
}
