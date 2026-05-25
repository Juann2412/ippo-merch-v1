import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import {
  orderStatusValidator,
  productImageTypeValidator,
  rarityValidator,
} from "./validators";

/**
 * Schéma aligné sur le domaine (`src/domain/`).
 *
 * User ──1:N──> orders ──1:N──> order_items ──N:1──> products
 * categories ──1:N──> products ──1:N──> product_images
 */
export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    email: v.string(),
    name: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    /** Optionnel pour rétrocompatibilité — renseigné par users.store */
    createdAt: v.optional(v.number()),
    updatedAt: v.optional(v.number()),
  }).index("by_clerk_id", ["clerkId"]),

  categories: defineTable({
    slug: v.string(),
    name: v.string(),
    description: v.optional(v.string()),
    sortOrder: v.number(),
    isActive: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_slug", ["slug"])
    .index("by_active", ["isActive", "sortOrder"]),

  products: defineTable({
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
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_slug", ["slug"])
    .index("by_category", ["categoryId"])
    .index("by_rarity", ["rarity"])
    .index("by_category_active", ["categoryId", "isActive"]),

  product_images: defineTable({
    productId: v.id("products"),
    url: v.string(),
    type: productImageTypeValidator,
    sortOrder: v.number(),
    altText: v.optional(v.string()),
    createdAt: v.number(),
  })
    .index("by_product", ["productId"])
    .index("by_product_type", ["productId", "type"]),

  orders: defineTable({
    userId: v.id("users"),
    status: orderStatusValidator,
    subtotalCents: v.number(),
    shippingCents: v.number(),
    totalCents: v.number(),
    currency: v.string(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_status", ["status"])
    .index("by_user_created", ["userId", "createdAt"]),

  order_items: defineTable({
    orderId: v.id("orders"),
    productId: v.id("products"),
    quantity: v.number(),
    unitPriceCents: v.number(),
    lineTotalCents: v.number(),
  })
    .index("by_order", ["orderId"])
    .index("by_product", ["productId"]),
});
