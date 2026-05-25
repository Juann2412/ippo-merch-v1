import type {
  Category,
  Order,
  OrderItem,
  OrderWithItems,
  Product,
  ProductImage,
  ProductWithImages,
  User,
} from "@/domain";
import type { Doc, Id } from "@convex/_generated/dataModel";

export function toUser(doc: Doc<"users">): User {
  return {
    id: doc._id,
    clerkId: doc.clerkId,
    email: doc.email,
    name: doc.name,
    imageUrl: doc.imageUrl,
    createdAt: doc.createdAt ?? doc._creationTime,
    updatedAt: doc.updatedAt ?? doc._creationTime,
  };
}

export function toCategory(doc: Doc<"categories">): Category {
  return {
    id: doc._id,
    slug: doc.slug,
    name: doc.name,
    description: doc.description,
    sortOrder: doc.sortOrder,
    isActive: doc.isActive,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  };
}

export function toProduct(doc: Doc<"products">): Product {
  return {
    id: doc._id,
    categoryId: doc.categoryId,
    slug: doc.slug,
    characterName: doc.characterName,
    series: doc.series,
    rarity: doc.rarity,
    probability: doc.probability,
    priceCents: doc.priceCents,
    stock: doc.stock,
    description: doc.description,
    featured: doc.featured,
    isActive: doc.isActive,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  };
}

export function toProductImage(doc: Doc<"product_images">): ProductImage {
  return {
    id: doc._id,
    productId: doc.productId,
    url: doc.url,
    type: doc.type,
    sortOrder: doc.sortOrder,
    altText: doc.altText,
    createdAt: doc.createdAt,
  };
}

export function toOrder(doc: Doc<"orders">): Order {
  return {
    id: doc._id,
    userId: doc.userId,
    status: doc.status,
    subtotalCents: doc.subtotalCents,
    shippingCents: doc.shippingCents,
    totalCents: doc.totalCents,
    currency: doc.currency,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  };
}

export function toOrderItem(doc: Doc<"order_items">): OrderItem {
  return {
    id: doc._id,
    orderId: doc.orderId,
    productId: doc.productId,
    quantity: doc.quantity,
    unitPriceCents: doc.unitPriceCents,
    lineTotalCents: doc.lineTotalCents,
  };
}

export function toProductWithImages(
  product: Doc<"products">,
  images: Doc<"product_images">[],
  category: Doc<"categories"> | null,
): ProductWithImages {
  return {
    product: toProduct(product),
    images: images.map(toProductImage).sort((a, b) => a.sortOrder - b.sortOrder),
    category: category ? toCategory(category) : undefined,
  };
}

export function toOrderWithItems(
  order: Doc<"orders">,
  items: Doc<"order_items">[],
): OrderWithItems {
  return {
    order: toOrder(order),
    items: items.map(toOrderItem),
  };
}

export function asCategoryId(id: string): Id<"categories"> {
  return id as Id<"categories">;
}

export function asProductId(id: string): Id<"products"> {
  return id as Id<"products">;
}

export function asUserId(id: string): Id<"users"> {
  return id as Id<"users">;
}

export function asOrderId(id: string): Id<"orders"> {
  return id as Id<"orders">;
}

export function asProductImageId(id: string): Id<"product_images"> {
  return id as Id<"product_images">;
}

export function asOrderItemId(id: string): Id<"order_items"> {
  return id as Id<"order_items">;
}
