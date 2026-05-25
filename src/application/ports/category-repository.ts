import type { Category } from "@/domain";

export interface CreateCategoryInput {
  slug: string;
  name: string;
  description?: string;
  sortOrder: number;
  isActive: boolean;
}

export interface UpdateCategoryInput {
  slug?: string;
  name?: string;
  description?: string;
  sortOrder?: number;
  isActive?: boolean;
}

export interface CategoryRepository {
  list(activeOnly?: boolean): Promise<Category[]>;
  getById(id: string): Promise<Category | null>;
  getBySlug(slug: string): Promise<Category | null>;
  create(input: CreateCategoryInput): Promise<Category>;
  update(id: string, input: UpdateCategoryInput): Promise<Category>;
  remove(id: string): Promise<void>;
}
