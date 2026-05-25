import { CategoryService } from "@/application/services/category-service";
import { OrderService } from "@/application/services/order-service";
import { ProductService } from "@/application/services/product-service";
import { SeedService } from "@/application/services/seed-service";
import { UserService } from "@/application/services/user-service";
import { getConvexHttpClient } from "@/infrastructure/convex/convex-http-client";
import { ConvexCategoryRepository } from "@/infrastructure/convex/repositories/convex-category-repository";
import {
  ConvexOrderItemRepository,
  ConvexOrderRepository,
} from "@/infrastructure/convex/repositories/convex-order-repository";
import {
  ConvexProductImageRepository,
  ConvexProductRepository,
} from "@/infrastructure/convex/repositories/convex-product-repository";
import { ConvexSeedRepository } from "@/infrastructure/convex/repositories/convex-seed-repository";
import { ConvexUserRepository } from "@/infrastructure/convex/repositories/convex-user-repository";
import type { ConvexHttpClient } from "convex/browser";

export interface ApplicationServices {
  categories: CategoryService;
  products: ProductService;
  users: UserService;
  orders: OrderService;
  seed: SeedService;
}

/**
 * Point d'entrée unique pour toutes les opérations données.
 * Utiliser depuis Server Actions, Route Handlers ou scripts serveur.
 */
export function createApplicationServices(
  client?: ConvexHttpClient,
): ApplicationServices {
  const convex = client ?? getConvexHttpClient();

  const categoryRepo = new ConvexCategoryRepository(convex);
  const productRepo = new ConvexProductRepository(convex);
  const productImageRepo = new ConvexProductImageRepository(convex);
  const userRepo = new ConvexUserRepository(convex);
  const orderRepo = new ConvexOrderRepository(convex);
  const orderItemRepo = new ConvexOrderItemRepository(convex);
  const seedRepo = new ConvexSeedRepository(convex);

  return {
    categories: new CategoryService(categoryRepo),
    products: new ProductService(productRepo, productImageRepo),
    users: new UserService(userRepo),
    orders: new OrderService(orderRepo, orderItemRepo),
    seed: new SeedService(seedRepo),
  };
}
