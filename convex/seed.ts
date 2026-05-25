import { mutation, type MutationCtx } from "./_generated/server";
import { v } from "convex/values";
import { getNarutoImageUrlsForSlug } from "./lib/naruto_images";

/**
 * Seed catalogue Naruto :
 * - Catégorie « Naruto »
 * - POP MART Ninkai Taisen + figurines GPF Bandai (prix MSRP publics)
 */
async function seedNarutoHandler(
  ctx: MutationCtx,
  args: { force?: boolean },
) {
    const now = Date.now();
    const force = args.force ?? false;

    const existingCategory = await ctx.db
      .query("categories")
      .withIndex("by_slug", (q) => q.eq("slug", "naruto"))
      .unique();

    if (existingCategory && !force) {
      return {
        skipped: true,
        message: "Seed déjà appliqué (slug naruto). Utilisez force: true pour réinitialiser.",
        categoryId: existingCategory._id,
      };
    }

    if (existingCategory && force) {
      const oldProducts = await ctx.db
        .query("products")
        .withIndex("by_category", (q) =>
          q.eq("categoryId", existingCategory._id),
        )
        .collect();
      for (const product of oldProducts) {
        const images = await ctx.db
          .query("product_images")
          .withIndex("by_product", (q) => q.eq("productId", product._id))
          .collect();
        for (const img of images) await ctx.db.delete(img._id);
        await ctx.db.delete(product._id);
      }
      await ctx.db.delete(existingCategory._id);
    }

    const categoryId = await ctx.db.insert("categories", {
      slug: "naruto",
      name: "Naruto",
      description:
        "Blind box et figurines Naruto Shippuden — POP MART Ninkai Taisen, Bandai GPF et plus.",
      sortOrder: 1,
      isActive: true,
      createdAt: now,
      updatedAt: now,
    });

    type SeedProduct = {
      slug: string;
      characterName: string;
      series: string;
      rarity: "Common" | "Rare" | "Epic" | "Legendary" | "Secret";
      probability: number;
      priceCents: number;
      stock: number;
      description: string;
      featured?: boolean;
    };

    const products: SeedProduct[] = [
      {
        slug: "ninkai-taisen-blind-box",
        characterName: "Boîte surprise",
        series: "POP MART — Ninkai Taisen",
        rarity: "Common",
        probability: 8.33,
        priceCents: 1699,
        stock: 120,
        description:
          "POP MART × Naruto Shippuden Ninkai Taisen — 1 figurine aléatoire par boîte (12 designs + secret Kaguya 1/144).",
        featured: true,
      },
      {
        slug: "naruto-kurama-mode-ninkai",
        characterName: "Naruto Uzumaki",
        series: "POP MART — Ninkai Taisen",
        rarity: "Legendary",
        probability: 8,
        priceCents: 1699,
        stock: 24,
        description: "Naruto en mode Kurama / Sage — Fourth Shinobi World War.",
        featured: true,
      },
      {
        slug: "sasuke-uchiha-ninkai",
        characterName: "Sasuke Uchiha",
        series: "POP MART — Ninkai Taisen",
        rarity: "Epic",
        probability: 8,
        priceCents: 1699,
        stock: 30,
        description: "Sasuke Uchiha — série Ninkai Taisen POP MART.",
        featured: true,
      },
      {
        slug: "sakura-haruno-ninkai",
        characterName: "Sakura Haruno",
        series: "POP MART — Ninkai Taisen",
        rarity: "Rare",
        probability: 8,
        priceCents: 1699,
        stock: 36,
        description: "Sakura Haruno — série Ninkai Taisen.",
      },
      {
        slug: "kakashi-hatake-ninkai",
        characterName: "Kakashi Hatake",
        series: "POP MART — Ninkai Taisen",
        rarity: "Rare",
        probability: 8,
        priceCents: 1699,
        stock: 36,
        description: "Kakashi Hatake — série Ninkai Taisen.",
      },
      {
        slug: "itachi-uchiha-ninkai",
        characterName: "Itachi Uchiha",
        series: "POP MART — Ninkai Taisen",
        rarity: "Epic",
        probability: 8,
        priceCents: 1699,
        stock: 28,
        description: "Itachi Uchiha — série Ninkai Taisen.",
      },
      {
        slug: "madara-uchiha-ninkai",
        characterName: "Madara Uchiha",
        series: "POP MART — Ninkai Taisen",
        rarity: "Legendary",
        probability: 8,
        priceCents: 1699,
        stock: 20,
        description: "Madara Uchiha — série Ninkai Taisen.",
      },
      {
        slug: "hashirama-senju-ninkai",
        characterName: "Hashirama Senju",
        series: "POP MART — Ninkai Taisen",
        rarity: "Epic",
        probability: 8,
        priceCents: 1699,
        stock: 24,
        description: "Hashirama Senju — série Ninkai Taisen.",
      },
      {
        slug: "obito-uchiha-ninkai",
        characterName: "Obito Uchiha",
        series: "POP MART — Ninkai Taisen",
        rarity: "Rare",
        probability: 8,
        priceCents: 1699,
        stock: 32,
        description: "Obito Uchiha — série Ninkai Taisen.",
      },
      {
        slug: "kaguya-otsutsuki-ninkai-secret",
        characterName: "Kaguya Ōtsutsuki",
        series: "POP MART — Ninkai Taisen",
        rarity: "Secret",
        probability: 0.69,
        priceCents: 1699,
        stock: 8,
        description:
          "Édition secrète Kaguya — probabilité ~1/144 selon POP MART / CBR.",
        featured: true,
      },
      {
        slug: "naruto-uzumaki-gpf-series-2",
        characterName: "Naruto Uzumaki",
        series: "Bandai GPF — Series 2",
        rarity: "Common",
        probability: 16.67,
        priceCents: 799,
        stock: 48,
        description:
          "Bandai Naruto Shippuden Great Posing Figure blind pack (~3\"). MSRP $7.99.",
      },
      {
        slug: "sasuke-uchiha-gpf-series-2",
        characterName: "Sasuke Uchiha",
        series: "Bandai GPF — Series 2",
        rarity: "Common",
        probability: 16.67,
        priceCents: 799,
        stock: 48,
        description: "Figurine GPF Bandai — Sasuke Uchiha, Series 2.",
      },
      {
        slug: "sakura-haruno-gpf-series-2",
        characterName: "Sakura Haruno",
        series: "Bandai GPF — Series 2",
        rarity: "Common",
        probability: 16.67,
        priceCents: 799,
        stock: 48,
        description: "Figurine GPF Bandai — Sakura Haruno, Series 2.",
      },
      {
        slug: "kakashi-hatake-gpf-series-2",
        characterName: "Kakashi Hatake",
        series: "Bandai GPF — Series 2",
        rarity: "Rare",
        probability: 12,
        priceCents: 799,
        stock: 40,
        description: "Figurine GPF Bandai — Kakashi Hatake, Series 2.",
      },
      {
        slug: "itachi-uchiha-gpf-series-2",
        characterName: "Itachi Uchiha",
        series: "Bandai GPF — Series 2",
        rarity: "Epic",
        probability: 10,
        priceCents: 799,
        stock: 32,
        description: "Figurine GPF Bandai — Itachi Uchiha, Series 2.",
      },
      {
        slug: "gaara-gpf-series-2",
        characterName: "Gaara",
        series: "Bandai GPF — Series 2",
        rarity: "Rare",
        probability: 12,
        priceCents: 799,
        stock: 36,
        description: "Figurine GPF Bandai — Gaara, Series 2.",
      },
    ];

    const productIds: string[] = [];

    for (const p of products) {
      const productId = await ctx.db.insert("products", {
        categoryId,
        slug: p.slug,
        characterName: p.characterName,
        series: p.series,
        rarity: p.rarity,
        probability: p.probability,
        priceCents: p.priceCents,
        stock: p.stock,
        description: p.description,
        featured: p.featured,
        isActive: true,
        createdAt: now,
        updatedAt: now,
      });
      productIds.push(productId);

      const { box, reveal } = getNarutoImageUrlsForSlug(p.slug);

      await ctx.db.insert("product_images", {
        productId,
        url: box,
        type: "box",
        sortOrder: 0,
        altText: `${p.characterName} — boîte blind box`,
        createdAt: now,
      });
      await ctx.db.insert("product_images", {
        productId,
        url: reveal,
        type: "reveal",
        sortOrder: 1,
        altText: `${p.characterName} — figurine reveal`,
        createdAt: now,
      });
    }

  return {
    skipped: false,
    categoryId,
    productsCreated: productIds.length,
    productIds,
  };
}

/** Point d'entrée public — appelé par Application SeedService */
export const runNaruto = mutation({
  args: { force: v.optional(v.boolean()) },
  handler: async (ctx, args) => seedNarutoHandler(ctx, args),
});
