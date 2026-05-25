import type { BlindBox } from "@/domain";

export interface ProductService {
  getFeaturedBlindBoxes(limit?: number): Promise<BlindBox[]>;
  getBlindBoxBySlug(slug: string): Promise<BlindBox | null>;
}
