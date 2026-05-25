import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { orderStatusValidator } from "./validators";
import { timestamps, touch } from "./lib/timestamps";

export const list = query({
  args: {
    userId: v.optional(v.id("users")),
    status: v.optional(orderStatusValidator),
  },
  handler: async (ctx, args) => {
    if (args.userId) {
      return await ctx.db
        .query("orders")
        .withIndex("by_user", (q) => q.eq("userId", args.userId!))
        .collect();
    }
    if (args.status) {
      return await ctx.db
        .query("orders")
        .withIndex("by_status", (q) => q.eq("status", args.status!))
        .collect();
    }
    return await ctx.db.query("orders").collect();
  },
});

export const getById = query({
  args: { id: v.id("orders") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const create = mutation({
  args: {
    userId: v.id("users"),
    status: orderStatusValidator,
    subtotalCents: v.number(),
    shippingCents: v.number(),
    totalCents: v.number(),
    currency: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.userId);
    if (!user) throw new Error("Utilisateur introuvable");
    return await ctx.db.insert("orders", { ...args, ...timestamps() });
  },
});

export const update = mutation({
  args: {
    id: v.id("orders"),
    status: v.optional(orderStatusValidator),
    subtotalCents: v.optional(v.number()),
    shippingCents: v.optional(v.number()),
    totalCents: v.optional(v.number()),
    currency: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...patch } = args;
    const doc = await ctx.db.get(id);
    if (!doc) throw new Error("Commande introuvable");
    await ctx.db.patch(id, { ...patch, ...touch() });
    return id;
  },
});

export const remove = mutation({
  args: { id: v.id("orders") },
  handler: async (ctx, args) => {
    const items = await ctx.db
      .query("order_items")
      .withIndex("by_order", (q) => q.eq("orderId", args.id))
      .collect();
    for (const item of items) {
      await ctx.db.delete(item._id);
    }
    await ctx.db.delete(args.id);
  },
});
