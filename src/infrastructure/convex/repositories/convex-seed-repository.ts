import { api } from "@convex/_generated/api";
import type { ConvexHttpClient } from "convex/browser";

export interface SeedNarutoResult {
  skipped: boolean;
  message?: string;
  categoryId?: string;
  productsCreated?: number;
  productIds?: string[];
}

export class ConvexSeedRepository {
  constructor(private readonly client: ConvexHttpClient) {}

  async seedNaruto(force?: boolean): Promise<SeedNarutoResult> {
    return await this.client.mutation(api.seed.runNaruto, { force });
  }
}
