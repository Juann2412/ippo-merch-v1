import type { ConvexSeedRepository, SeedNarutoResult } from "@/infrastructure/convex/repositories/convex-seed-repository";

export class SeedService {
  constructor(private readonly repo: ConvexSeedRepository) {}

  seedNaruto(force?: boolean): Promise<SeedNarutoResult> {
    return this.repo.seedNaruto(force);
  }
}
