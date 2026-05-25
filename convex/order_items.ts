import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const listByOrder = query({
  args: { orderId: v.id("orders") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("order_items")
      .withIndex("by_order", (q) => q.eq("orderId", args.orderId))
      .collect();
  },
});

export const getById = query({
  args: { id: v.id("order_items") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const create = mutation({
  args: {
    orderId: v.id("orders"),
    productId: v.id("products"),
    quantity: v.number(),
    unitPriceCents: v.number(),
    lineTotalCents: v.number(),
  },
  handler: async (ctx, args) => {
    const order = await ctx.db.get(args.orderId);
    if (!order) throw new Error("Commande introuvable");
    const product = await ctx.db.get(args.productId);
    if (!product) throw new Error("Produit introuvable");
    return await ctx.db.insert("order_items", args);
  },
});

export const update = mutation({
  args: {
    id: v.id("order_items"),
    quantity: v.optional(v.number()),
    unitPriceCents: v.optional(v.number()),
    lineTotalCents: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const { id, ...patch } = args;
    const doc = await ctx.db.get(id);
    if (!doc) throw new Error("Ligne de commande introuvable");
    await ctx.db.patch(id, patch);
    return id;
  },
});

export const remove = mutation({
  args: { id: v.id("order_items") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
