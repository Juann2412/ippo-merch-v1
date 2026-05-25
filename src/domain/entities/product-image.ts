import type { ProductImageType } from "../value-objects/product-image-type";

/** Image liée à un Product (boîte, reveal, galerie) */
export interface ProductImage {
  id: string;
  productId: string;
  url: string;
  type: ProductImageType;
  sortOrder: number;
  altText?: string;
  createdAt: number;
}
