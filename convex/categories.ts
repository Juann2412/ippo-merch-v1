import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { timestamps, touch } from "./lib/timestamps";

const categoryFields = {
  slug: v.string(),
  name: v.string(),
  description: v.optional(v.string()),
  sortOrder: v.number(),
  isActive: v.boolean(),
};

export const list = query({
  args: { activeOnly: v.optional(v.boolean()) },
  handler: async (ctx, args) => {
    if (args.activeOnly) {
      return await ctx.db
        .query("categories")
        .withIndex("by_active", (q) => q.eq("isActive", true))
        .collect();
    }
    return await ctx.db.query("categories").collect();
  },
});

export const getById = query({
  args: { id: v.id("categories") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("categories")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();
  },
});

export const create = mutation({
  args: categoryFields,
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("categories")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();
    if (existing) {
      throw new Error(`Catégorie avec le slug "${args.slug}" existe déjà`);
    }
    return await ctx.db.insert("categories", { ...args, ...timestamps() });
  },
});

export const update = mutation({
  args: {
    id: v.id("categories"),
    slug: v.optional(v.string()),
    name: v.optional(v.string()),
    description: v.optional(v.string()),
    sortOrder: v.optional(v.number()),
    isActive: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { id, ...patch } = args;
    const doc = await ctx.db.get(id);
    if (!doc) throw new Error("Catégorie introuvable");

    if (patch.slug && patch.slug !== doc.slug) {
      const conflict = await ctx.db
        .query("categories")
        .withIndex("by_slug", (q) => q.eq("slug", patch.slug!))
        .unique();
      if (conflict) {
        throw new Error(`Slug "${patch.slug}" déjà utilisé`);
      }
    }

    await ctx.db.patch(id, { ...patch, ...touch() });
    return id;
  },
});

export const remove = mutation({
  args: { id: v.id("categories") },
  handler: async (ctx, args) => {
    const products = await ctx.db
      .query("products")
      .withIndex("by_category", (q) => q.eq("categoryId", args.id))
      .first();
    if (products) {
      throw new Error(
        "Impossible de supprimer : des produits sont liés à cette catégorie",
      );
    }
    await ctx.db.delete(args.id);
  },
});
