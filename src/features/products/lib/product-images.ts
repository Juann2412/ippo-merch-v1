import type { ProductImage, ProductImageType } from "@/domain";

export function getProductImageUrl(
  images: ProductImage[],
  type: ProductImageType,
  fallback?: string,
): string | undefined {
  const found = images.find((img) => img.type === type);
  return found?.url ?? images[0]?.url ?? fallback;
}
