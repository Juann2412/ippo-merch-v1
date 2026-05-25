"use client";

import { motion, useSpring } from "framer-motion";
import { Package, ShoppingBag, Sparkles, Zap } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import type { ProductWithImages } from "@/domain";
import { useCartStore } from "@/features/cart/store/cart-store";
import { formatPrice } from "@/features/products/lib/format-price";
import { getProductImageUrl } from "@/features/products/lib/product-images";
import { RARITY_STYLES } from "@/features/products/lib/rarity-styles";
import { RarityBadge } from "@/features/products/components/rarity-badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BlindBoxCardProps {
  item: ProductWithImages;
  index?: number;
}

export function BlindBoxCard({ item, index = 0 }: BlindBoxCardProps) {
  const { product, images, category } = item;
  const [revealed, setRevealed] = useState(false);
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  const boxUrl = getProductImageUrl(images, "box");
  const revealUrl = getProductImageUrl(images, "reveal", boxUrl);
  const displayUrl = revealed ? revealUrl : boxUrl;

  const rarityStyle = RARITY_STYLES[product.rarity];
  const outOfStock = product.stock <= 0;

  const rotateX = useSpring(0, { stiffness: 300, damping: 30 });
  const rotateY = useSpring(0, { stiffness: 300, damping: 30 });

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    rotateX.set(y * -8);
    rotateY.set(x * 8);
  }

  function handleMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  function handleAddToCart() {
    if (outOfStock || !displayUrl) return;
    addItem({
      productId: product.id,
      slug: product.slug,
      characterName: product.characterName,
      priceCents: product.priceCents,
      imageUrl: displayUrl,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  }

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{
        duration: 0.45,
        delay: Math.min(index * 0.06, 0.36),
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setRevealed(true)}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1200,
        transformStyle: "preserve-3d",
      }}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card/80 backdrop-blur-sm transition-colors duration-300",
        rarityStyle.border,
        rarityStyle.glow,
      )}
    >
      {/* Halo néon au survol */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100",
          product.rarity === "Secret" &&
            "bg-gradient-to-br from-neon-pink/10 via-neon-violet/10 to-neon-cyan/10",
          product.rarity === "Legendary" && "bg-neon-gold/5",
          product.rarity === "Epic" && "bg-neon-violet/5",
          product.rarity === "Rare" && "bg-neon-cyan/5",
        )}
      />

      {/* Image zone */}
      <div className="relative aspect-[4/5] overflow-hidden bg-muted/30">
        {product.featured && (
          <motion.div
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ repeat: Infinity, duration: 2.5 }}
            className="absolute left-3 top-3 z-10 flex items-center gap-1 rounded-full border border-neon-gold/40 bg-background/70 px-2 py-0.5 text-[10px] font-semibold text-neon-gold backdrop-blur-md"
          >
            <Sparkles className="size-3" />
            Vedette
          </motion.div>
        )}

        <div className="absolute right-3 top-3 z-10">
          <RarityBadge rarity={product.rarity} probability={product.probability} />
        </div>

        {displayUrl ? (
          <motion.div
            key={revealed ? "reveal" : "box"}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35 }}
            className="relative h-full w-full"
          >
            <Image
              src={displayUrl}
              alt={product.characterName}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className={cn(
                "object-cover transition-transform duration-700 group-hover:scale-110",
                revealed && "brightness-110",
              )}
              priority={index < 4}
            />
          </motion.div>
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground">
            <Package className="size-16 opacity-30" />
          </div>
        )}

        {/* Overlay mystère → reveal */}
        <motion.div
          className={cn(
            "absolute inset-x-0 bottom-0 flex items-center justify-center gap-2 bg-gradient-to-t from-background via-background/80 to-transparent py-6 text-xs font-medium uppercase tracking-widest transition-opacity",
            revealed ? "opacity-0" : "opacity-100 group-hover:opacity-0",
          )}
        >
          <Zap className="size-3.5 text-neon-cyan" />
          Survolez pour révéler
        </motion.div>

        {/* Scan line néon */}
        <motion.div
          className="pointer-events-none absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-neon-cyan/80 to-transparent opacity-0 group-hover:opacity-100"
          animate={{ top: ["0%", "100%", "0%"] }}
          transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
        />
      </div>

      {/* Contenu */}
      <div className="relative flex flex-1 flex-col gap-3 p-4">
        {category && (
          <p className="text-[10px] font-semibold uppercase tracking-widest text-neon-cyan/90">
            {category.name}
          </p>
        )}

        <div>
          <h3 className="font-semibold leading-tight tracking-tight text-foreground">
            {product.characterName}
          </h3>
          <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">
            {product.series}
          </p>
        </div>

        <div className="mt-auto flex items-end justify-between gap-2">
          <div>
            <p className={cn("text-lg font-bold tabular-nums", rarityStyle.text)}>
              {formatPrice(product.priceCents)}
            </p>
            <p
              className={cn(
                "text-[10px]",
                outOfStock ? "text-destructive" : "text-muted-foreground",
              )}
            >
              {outOfStock ? "Rupture de stock" : `${product.stock} en stock`}
            </p>
          </div>

          <Button
            size="sm"
            variant={added ? "secondary" : "default"}
            disabled={outOfStock}
            onClick={handleAddToCart}
            className={cn(
              "shrink-0 rounded-full",
              !outOfStock && "glow-neon-pink hover:scale-105",
            )}
          >
            <ShoppingBag className="size-3.5" />
            {added ? "Ajouté !" : "Ajouter"}
          </Button>
        </div>
      </div>
    </motion.article>
  );
}
