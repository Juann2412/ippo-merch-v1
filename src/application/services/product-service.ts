import type { Product, ProductWithImages } from "@/domain";

export interface ProductService {
  getFeaturedProducts(limit?: number): Promise<ProductWithImages[]>;
  getProductBySlug(slug: string): Promise<ProductWithImages | null>;
}
