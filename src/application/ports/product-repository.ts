import type {
  Product,
  ProductImageType,
  ProductWithImages,
  RarityLevel,
} from "@/domain";

export interface CreateProductInput {
  categoryId: string;
  slug: string;
  characterName: string;
  series: string;
  rarity: RarityLevel;
  probability: number;
  priceCents: number;
  stock: number;
  description?: string;
  featured?: boolean;
  isActive: boolean;
}

export interface UpdateProductInput {
  categoryId?: string;
  slug?: string;
  characterName?: string;
  series?: string;
  rarity?: RarityLevel;
  probability?: number;
  priceCents?: number;
  stock?: number;
  description?: string;
  featured?: boolean;
  isActive?: boolean;
}

export interface ProductRepository {
  list(options?: {
    categoryId?: string;
    activeOnly?: boolean;
  }): Promise<Product[]>;
  getById(id: string): Promise<Product | null>;
  getBySlug(slug: string): Promise<Product | null>;
  getFeatured(limit?: number): Promise<Product[]>;
  getWithRelations(id: string): Promise<ProductWithImages | null>;
  getWithRelationsBySlug(slug: string): Promise<ProductWithImages | null>;
  create(input: CreateProductInput): Promise<Product>;
  update(id: string, input: UpdateProductInput): Promise<Product>;
  remove(id: string): Promise<void>;
}

export interface CreateProductImageInput {
  productId: string;
  url: string;
  type: ProductImageType;
  sortOrder: number;
  altText?: string;
}

export interface UpdateProductImageInput {
  url?: string;
  type?: ProductImageType;
  sortOrder?: number;
  altText?: string;
}

export interface ProductImageRepository {
  listByProduct(productId: string): Promise<import("@/domain").ProductImage[]>;
  getById(id: string): Promise<import("@/domain").ProductImage | null>;
  create(input: CreateProductImageInput): Promise<import("@/domain").ProductImage>;
  update(
    id: string,
    input: UpdateProductImageInput,
  ): Promise<import("@/domain").ProductImage>;
  remove(id: string): Promise<void>;
}
