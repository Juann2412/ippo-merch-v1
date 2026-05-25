import type {
  CreateProductInput,
  CreateProductImageInput,
  ProductImageRepository,
  ProductRepository,
  UpdateProductInput,
  UpdateProductImageInput,
} from "@/application/ports/product-repository";
import { api } from "@convex/_generated/api";
import type { ConvexHttpClient } from "convex/browser";
import {
  asCategoryId,
  asProductId,
  asProductImageId,
  toProduct,
  toProductImage,
  toProductWithImages,
} from "@/infrastructure/convex/mappers";

export class ConvexProductRepository implements ProductRepository {
  constructor(private readonly client: ConvexHttpClient) {}

  async list(options?: { categoryId?: string; activeOnly?: boolean }) {
    const docs = await this.client.query(api.products.list, {
      categoryId: options?.categoryId
        ? asCategoryId(options.categoryId)
        : undefined,
      activeOnly: options?.activeOnly,
    });
    return docs.map(toProduct);
  }

  async getById(id: string) {
    const doc = await this.client.query(api.products.getById, {
      id: asProductId(id),
    });
    return doc ? toProduct(doc) : null;
  }

  async getBySlug(slug: string) {
    const doc = await this.client.query(api.products.getBySlug, { slug });
    return doc ? toProduct(doc) : null;
  }

  async getFeatured(limit?: number) {
    const docs = await this.client.query(api.products.getFeatured, { limit });
    return docs.map(toProduct);
  }

  async getWithRelations(id: string) {
    const row = await this.client.query(api.products.getWithRelations, {
      id: asProductId(id),
    });
    return row ? toProductWithImages(row.product, row.images, row.category) : null;
  }

  async getWithRelationsBySlug(slug: string) {
    const row = await this.client.query(api.products.getWithRelationsBySlug, {
      slug,
    });
    return row ? toProductWithImages(row.product, row.images, row.category) : null;
  }

  async create(input: CreateProductInput) {
    const id = await this.client.mutation(api.products.create, {
      ...input,
      categoryId: asCategoryId(input.categoryId),
    });
    const doc = await this.client.query(api.products.getById, { id });
    if (!doc) throw new Error("Échec création produit");
    return toProduct(doc);
  }

  async update(id: string, input: UpdateProductInput) {
    await this.client.mutation(api.products.update, {
      id: asProductId(id),
      ...input,
      categoryId: input.categoryId
        ? asCategoryId(input.categoryId)
        : undefined,
    });
    const doc = await this.client.query(api.products.getById, {
      id: asProductId(id),
    });
    if (!doc) throw new Error("Produit introuvable après mise à jour");
    return toProduct(doc);
  }

  async remove(id: string) {
    await this.client.mutation(api.products.remove, { id: asProductId(id) });
  }
}

export class ConvexProductImageRepository implements ProductImageRepository {
  constructor(private readonly client: ConvexHttpClient) {}

  async listByProduct(productId: string) {
    const docs = await this.client.query(api.product_images.listByProduct, {
      productId: asProductId(productId),
    });
    return docs.map(toProductImage);
  }

  async getById(id: string) {
    const doc = await this.client.query(api.product_images.getById, {
      id: asProductImageId(id),
    });
    return doc ? toProductImage(doc) : null;
  }

  async create(input: CreateProductImageInput) {
    const id = await this.client.mutation(api.product_images.create, {
      ...input,
      productId: asProductId(input.productId),
    });
    const doc = await this.client.query(api.product_images.getById, { id });
    if (!doc) throw new Error("Échec création image");
    return toProductImage(doc);
  }

  async update(id: string, input: UpdateProductImageInput) {
    await this.client.mutation(api.product_images.update, {
      id: asProductImageId(id),
      ...input,
    });
    const doc = await this.client.query(api.product_images.getById, {
      id: asProductImageId(id),
    });
    if (!doc) throw new Error("Image introuvable après mise à jour");
    return toProductImage(doc);
  }

  async remove(id: string) {
    await this.client.mutation(api.product_images.remove, {
      id: asProductImageId(id),
    });
  }
}
