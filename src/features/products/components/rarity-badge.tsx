"use client";

import { motion } from "framer-motion";
import type { RarityLevel } from "@/domain";
import { cn } from "@/lib/utils";
import { RARITY_STYLES } from "@/features/products/lib/rarity-styles";

interface RarityBadgeProps {
  rarity: RarityLevel;
  probability?: number;
  className?: string;
}

export function RarityBadge({
  rarity,
  probability,
  className,
}: RarityBadgeProps) {
  const style = RARITY_STYLES[rarity];

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.1, type: "spring", stiffness: 400, damping: 22 }}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md",
        style.badge,
        className,
      )}
    >
      {style.label}
      {probability !== undefined && (
        <span className="opacity-80">· {probability}%</span>
      )}
    </motion.span>
  );
}
