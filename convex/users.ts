import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { touch, timestamps } from "./lib/timestamps";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("users").collect();
  },
});

export const getById = query({
  args: { id: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

/** Utilisateur connecté (JWT Clerk validé par auth.config.ts) */
export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    return await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .unique();
  },
});

/** Synchronise l'utilisateur Clerk dans Convex après connexion */
export const store = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Non authentifié — connectez-vous via Clerk");
    }

    const existing = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .unique();

    const email = identity.email ?? "";
    const name = identity.name ?? identity.nickname ?? undefined;
    const imageUrl = identity.pictureUrl ?? undefined;
    const now = Date.now();

    if (existing) {
      await ctx.db.patch(existing._id, {
        email,
        name,
        imageUrl,
        updatedAt: now,
      });
      return existing._id;
    }

    return await ctx.db.insert("users", {
      clerkId: identity.subject,
      email,
      name,
      imageUrl,
      createdAt: now,
      updatedAt: now,
    });
  },
});

export const update = mutation({
  args: {
    id: v.id("users"),
    email: v.optional(v.string()),
    name: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...patch } = args;
    const doc = await ctx.db.get(id);
    if (!doc) throw new Error("Utilisateur introuvable");
    await ctx.db.patch(id, { ...patch, ...touch() });
    return id;
  },
});

export const remove = mutation({
  args: { id: v.id("users") },
  handler: async (ctx, args) => {
    const orders = await ctx.db
      .query("orders")
      .withIndex("by_user", (q) => q.eq("userId", args.id))
      .first();
    if (orders) {
      throw new Error(
        "Impossible de supprimer : des commandes sont liées à cet utilisateur",
      );
    }
    await ctx.db.delete(args.id);
  },
});

export const create = mutation({
  args: {
    clerkId: v.string(),
    email: v.string(),
    name: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .unique();
    if (existing) {
      throw new Error("Utilisateur Clerk déjà enregistré");
    }
    return await ctx.db.insert("users", { ...args, ...timestamps() });
  },
});
