import type { RarityLevel } from "@/domain";

export interface RarityStyle {
  label: string;
  badge: string;
  glow: string;
  border: string;
  text: string;
}

export const RARITY_STYLES: Record<RarityLevel, RarityStyle> = {
  Common: {
    label: "Common",
    badge: "bg-rarity-common/20 text-rarity-common border-rarity-common/40",
    glow: "",
    border: "group-hover:border-rarity-common/50 group-hover:shadow-[0_0_28px_oklch(0.55_0.02_260/0.35)]",
    text: "text-rarity-common",
  },
  Rare: {
    label: "Rare",
    badge: "bg-rarity-rare/20 text-rarity-rare border-rarity-rare/50",
    glow: "group-hover:glow-neon-cyan",
    border:
      "group-hover:border-rarity-rare/60 group-hover:shadow-[0_0_32px_oklch(0.62_0.18_250/0.45)]",
    text: "text-rarity-rare",
  },
  Epic: {
    label: "Epic",
    badge: "bg-rarity-epic/25 text-rarity-epic border-rarity-epic/50",
    glow: "group-hover:glow-neon-violet",
    border:
      "group-hover:border-rarity-epic/60 group-hover:shadow-[0_0_36px_oklch(0.58_0.22_295/0.5)]",
    text: "text-rarity-epic",
  },
  Legendary: {
    label: "Legendary",
    badge: "bg-rarity-legendary/25 text-rarity-legendary border-rarity-legendary/60",
    glow: "group-hover:glow-neon-gold",
    border:
      "group-hover:border-rarity-legendary/70 group-hover:shadow-[0_0_40px_oklch(0.78_0.16_85/0.55)]",
    text: "text-rarity-legendary",
  },
  Secret: {
    label: "Secret",
    badge: "rarity-secret-shimmer border-white/30 text-white font-bold",
    glow: "group-hover:glow-neon-pink",
    border:
      "group-hover:border-neon-pink/70 group-hover:shadow-[0_0_44px_oklch(0.72_0.22_350/0.55)]",
    text: "text-neon-pink",
  },
};

export const RARITY_SORT_ORDER: Record<RarityLevel, number> = {
  Secret: 5,
  Legendary: 4,
  Epic: 3,
  Rare: 2,
  Common: 1,
};
