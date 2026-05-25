import type {
  CreateProductImageInput,
  CreateProductInput,
  ProductImageRepository,
  ProductRepository,
  UpdateProductImageInput,
  UpdateProductInput,
} from "@/application/ports/product-repository";
import type { Product, ProductImage, ProductWithImages } from "@/domain";

export class ProductService {
  constructor(
    private readonly products: ProductRepository,
    private readonly images: ProductImageRepository,
  ) {}

  list(options?: {
    categoryId?: string;
    activeOnly?: boolean;
  }): Promise<Product[]> {
    return this.products.list(options);
  }

  getById(id: string): Promise<Product | null> {
    return this.products.getById(id);
  }

  getBySlug(slug: string): Promise<Product | null> {
    return this.products.getBySlug(slug);
  }

  getFeaturedProducts(limit?: number): Promise<Product[]> {
    return this.products.getFeatured(limit);
  }

  getProductWithImages(id: string): Promise<ProductWithImages | null> {
    return this.products.getWithRelations(id);
  }

  getProductBySlug(slug: string): Promise<ProductWithImages | null> {
    return this.products.getWithRelationsBySlug(slug);
  }

  create(input: CreateProductInput): Promise<Product> {
    return this.products.create(input);
  }

  update(id: string, input: UpdateProductInput): Promise<Product> {
    return this.products.update(id, input);
  }

  remove(id: string): Promise<void> {
    return this.products.remove(id);
  }

  listImages(productId: string): Promise<ProductImage[]> {
    return this.images.listByProduct(productId);
  }

  getImageById(id: string): Promise<ProductImage | null> {
    return this.images.getById(id);
  }

  createImage(input: CreateProductImageInput): Promise<ProductImage> {
    return this.images.create(input);
  }

  updateImage(id: string, input: UpdateProductImageInput): Promise<ProductImage> {
    return this.images.update(id, input);
  }

  removeImage(id: string): Promise<void> {
    return this.images.remove(id);
  }
}

export type {
  CreateProductInput,
  UpdateProductInput,
  CreateProductImageInput,
  UpdateProductImageInput,
};
