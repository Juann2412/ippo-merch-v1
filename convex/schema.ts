import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  products: defineTable({
    slug: v.string(),
    characterName: v.string(),
    animeTitle: v.string(),
    series: v.string(),
    rarity: v.union(
      v.literal("Common"),
      v.literal("Rare"),
      v.literal("Epic"),
      v.literal("Legendary"),
      v.literal("Secret"),
    ),
    probability: v.number(),
    priceCents: v.number(),
    stock: v.number(),
    boxImageUrl: v.string(),
    revealImageUrl: v.string(),
    description: v.optional(v.string()),
    featured: v.optional(v.boolean()),
  })
    .index("by_slug", ["slug"])
    .index("by_anime", ["animeTitle"])
    .index("by_rarity", ["rarity"]),

  users: defineTable({
    clerkId: v.string(),
    email: v.string(),
    name: v.optional(v.string()),
  }).index("by_clerk_id", ["clerkId"]),
});
