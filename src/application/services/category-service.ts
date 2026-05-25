import type {
  CategoryRepository,
  CreateCategoryInput,
  UpdateCategoryInput,
} from "@/application/ports/category-repository";
import type { Category } from "@/domain";

export class CategoryService {
  constructor(private readonly repo: CategoryRepository) {}

  list(activeOnly?: boolean): Promise<Category[]> {
    return this.repo.list(activeOnly);
  }

  getById(id: string): Promise<Category | null> {
    return this.repo.getById(id);
  }

  getBySlug(slug: string): Promise<Category | null> {
    return this.repo.getBySlug(slug);
  }

  create(input: CreateCategoryInput): Promise<Category> {
    return this.repo.create(input);
  }

  update(id: string, input: UpdateCategoryInput): Promise<Category> {
    return this.repo.update(id, input);
  }

  remove(id: string): Promise<void> {
    return this.repo.remove(id);
  }
}

export type { CreateCategoryInput, UpdateCategoryInput };
