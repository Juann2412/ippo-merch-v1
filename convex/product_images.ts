import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { productImageTypeValidator } from "./validators";
import { timestamps } from "./lib/timestamps";

export const listByProduct = query({
  args: { productId: v.id("products") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("product_images")
      .withIndex("by_product", (q) => q.eq("productId", args.productId))
      .collect();
  },
});

export const getById = query({
  args: { id: v.id("product_images") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const create = mutation({
  args: {
    productId: v.id("products"),
    url: v.string(),
    type: productImageTypeValidator,
    sortOrder: v.number(),
    altText: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const product = await ctx.db.get(args.productId);
    if (!product) throw new Error("Produit introuvable");
    return await ctx.db.insert("product_images", {
      ...args,
      createdAt: timestamps().createdAt,
    });
  },
});

export const update = mutation({
  args: {
    id: v.id("product_images"),
    url: v.optional(v.string()),
    type: v.optional(productImageTypeValidator),
    sortOrder: v.optional(v.number()),
    altText: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...patch } = args;
    const doc = await ctx.db.get(id);
    if (!doc) throw new Error("Image introuvable");
    await ctx.db.patch(id, patch);
    return id;
  },
});

export const remove = mutation({
  args: { id: v.id("product_images") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
