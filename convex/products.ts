import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { rarityValidator } from "./validators";
import { timestamps, touch } from "./lib/timestamps";

const productFields = {
  categoryId: v.id("categories"),
  slug: v.string(),
  characterName: v.string(),
  series: v.string(),
  rarity: rarityValidator,
  probability: v.number(),
  priceCents: v.number(),
  stock: v.number(),
  description: v.optional(v.string()),
  featured: v.optional(v.boolean()),
  isActive: v.boolean(),
};

export const list = query({
  args: {
    categoryId: v.optional(v.id("categories")),
    activeOnly: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    if (args.categoryId) {
      const rows = await ctx.db
        .query("products")
        .withIndex("by_category", (q) => q.eq("categoryId", args.categoryId!))
        .collect();
      return args.activeOnly
        ? rows.filter((p) => p.isActive)
        : rows;
    }
    const rows = await ctx.db.query("products").collect();
    return args.activeOnly ? rows.filter((p) => p.isActive) : rows;
  },
});

export const getById = query({
  args: { id: v.id("products") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("products")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();
  },
});

/** Catalogue complet : produits actifs + images + catégories */
export const listCatalog = query({
  args: { activeOnly: v.optional(v.boolean()) },
  handler: async (ctx, args) => {
    const activeOnly = args.activeOnly ?? true;
    let products = await ctx.db.query("products").collect();
    if (activeOnly) {
      products = products.filter((p) => p.isActive);
    }

    const categoryCache = new Map<
      string,
      Awaited<ReturnType<typeof ctx.db.get<"categories">>>
    >();

    const items = await Promise.all(
      products.map(async (product) => {
        if (!categoryCache.has(product.categoryId)) {
          categoryCache.set(
            product.categoryId,
            await ctx.db.get(product.categoryId),
          );
        }
        const images = await ctx.db
          .query("product_images")
          .withIndex("by_product", (q) => q.eq("productId", product._id))
          .collect();
        return {
          product,
          images,
          category: categoryCache.get(product.categoryId) ?? null,
        };
      }),
    );

    return items;
  },
});

export const getFeatured = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 8;
    return await ctx.db
      .query("products")
      .filter((q) =>
        q.and(
          q.eq(q.field("featured"), true),
          q.eq(q.field("isActive"), true),
        ),
      )
      .take(limit);
  },
});

/** Produit + images + catégorie */
export const getWithRelations = query({
  args: { id: v.id("products") },
  handler: async (ctx, args) => {
    const product = await ctx.db.get(args.id);
    if (!product) return null;

    const images = await ctx.db
      .query("product_images")
      .withIndex("by_product", (q) => q.eq("productId", product._id))
      .collect();

    const category = await ctx.db.get(product.categoryId);
    return { product, images, category };
  },
});

export const getWithRelationsBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const product = await ctx.db
      .query("products")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();
    if (!product) return null;

    const images = await ctx.db
      .query("product_images")
      .withIndex("by_product", (q) => q.eq("productId", product._id))
      .collect();

    const category = await ctx.db.get(product.categoryId);
    return { product, images, category };
  },
});

export const create = mutation({
  args: productFields,
  handler: async (ctx, args) => {
    const category = await ctx.db.get(args.categoryId);
    if (!category) throw new Error("Catégorie introuvable");

    const existing = await ctx.db
      .query("products")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();
    if (existing) {
      throw new Error(`Produit avec le slug "${args.slug}" existe déjà`);
    }

    return await ctx.db.insert("products", { ...args, ...timestamps() });
  },
});

export const update = mutation({
  args: {
    id: v.id("products"),
    categoryId: v.optional(v.id("categories")),
    slug: v.optional(v.string()),
    characterName: v.optional(v.string()),
    series: v.optional(v.string()),
    rarity: v.optional(rarityValidator),
    probability: v.optional(v.number()),
    priceCents: v.optional(v.number()),
    stock: v.optional(v.number()),
    description: v.optional(v.string()),
    featured: v.optional(v.boolean()),
    isActive: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { id, ...patch } = args;
    const doc = await ctx.db.get(id);
    if (!doc) throw new Error("Produit introuvable");

    if (patch.categoryId) {
      const category = await ctx.db.get(patch.categoryId);
      if (!category) throw new Error("Catégorie introuvable");
    }

    if (patch.slug && patch.slug !== doc.slug) {
      const conflict = await ctx.db
        .query("products")
        .withIndex("by_slug", (q) => q.eq("slug", patch.slug!))
        .unique();
      if (conflict) throw new Error(`Slug "${patch.slug}" déjà utilisé`);
    }

    await ctx.db.patch(id, { ...patch, ...touch() });
    return id;
  },
});

export const remove = mutation({
  args: { id: v.id("products") },
  handler: async (ctx, args) => {
    const images = await ctx.db
      .query("product_images")
      .withIndex("by_product", (q) => q.eq("productId", args.id))
      .collect();
    for (const image of images) {
      await ctx.db.delete(image._id);
    }

    const orderItems = await ctx.db
      .query("order_items")
      .withIndex("by_product", (q) => q.eq("productId", args.id))
      .first();
    if (orderItems) {
      throw new Error(
        "Impossible de supprimer : ce produit est référencé dans une commande",
      );
    }

    await ctx.db.delete(args.id);
  },
});
