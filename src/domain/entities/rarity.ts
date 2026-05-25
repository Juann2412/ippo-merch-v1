export const RARITY_LEVELS = [
  "Common",
  "Rare",
  "Epic",
  "Legendary",
  "Secret",
] as const;

export type RarityLevel = (typeof RARITY_LEVELS)[number];

export const RARITY_WEIGHT: Record<RarityLevel, number> = {
  Common: 50,
  Rare: 30,
  Epic: 12,
  Legendary: 6,
  Secret: 2,
};
