import type {
  CategoryRepository,
  CreateCategoryInput,
  UpdateCategoryInput,
} from "@/application/ports/category-repository";
import { api } from "@convex/_generated/api";
import type { ConvexHttpClient } from "convex/browser";
import {
  asCategoryId,
  toCategory,
} from "@/infrastructure/convex/mappers";

export class ConvexCategoryRepository implements CategoryRepository {
  constructor(private readonly client: ConvexHttpClient) {}

  async list(activeOnly?: boolean) {
    const docs = await this.client.query(api.categories.list, { activeOnly });
    return docs.map(toCategory);
  }

  async getById(id: string) {
    const doc = await this.client.query(api.categories.getById, {
      id: asCategoryId(id),
    });
    return doc ? toCategory(doc) : null;
  }

  async getBySlug(slug: string) {
    const doc = await this.client.query(api.categories.getBySlug, { slug });
    return doc ? toCategory(doc) : null;
  }

  async create(input: CreateCategoryInput) {
    const id = await this.client.mutation(api.categories.create, input);
    const doc = await this.client.query(api.categories.getById, { id });
    if (!doc) throw new Error("Échec création catégorie");
    return toCategory(doc);
  }

  async update(id: string, input: UpdateCategoryInput) {
    await this.client.mutation(api.categories.update, {
      id: asCategoryId(id),
      ...input,
    });
    const doc = await this.client.query(api.categories.getById, {
      id: asCategoryId(id),
    });
    if (!doc) throw new Error("Catégorie introuvable après mise à jour");
    return toCategory(doc);
  }

  async remove(id: string) {
    await this.client.mutation(api.categories.remove, { id: asCategoryId(id) });
  }
}
