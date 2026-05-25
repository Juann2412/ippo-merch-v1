import type { Category } from "./entities/category";
import type { Order } from "./entities/order";
import type { OrderItem } from "./entities/order-item";
import type { Product } from "./entities/product";
import type { ProductImage } from "./entities/product-image";

/**
 * Graphe des entités métier et cardinalités.
 *
 * User ──1:N──> Order ──1:N──> OrderItem ──N:1──> Product
 * Category ──1:N──> Product ──1:N──> ProductImage
 */

export const DOMAIN_RELATIONS = {
  user: {
    orders: "one-to-many" as const,
  },
  category: {
    products: "one-to-many" as const,
  },
  product: {
    category: "many-to-one" as const,
    images: "one-to-many" as const,
    orderItems: "one-to-many" as const,
  },
  productImage: {
    product: "many-to-one" as const,
  },
  order: {
    user: "many-to-one" as const,
    items: "one-to-many" as const,
  },
  orderItem: {
    order: "many-to-one" as const,
    product: "many-to-one" as const,
  },
} as const;

/** Produit enrichi pour l'UI catalogue */
export interface ProductWithImages {
  product: Product;
  images: ProductImage[];
  category?: Category;
}

/** Commande enrichie pour l'historique client */
export interface OrderWithItems {
  order: Order;
  items: OrderItem[];
}
