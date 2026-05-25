/** Rôle de l'image dans l'expérience blind box */
export const PRODUCT_IMAGE_TYPES = ["box", "reveal", "gallery"] as const;

export type ProductImageType = (typeof PRODUCT_IMAGE_TYPES)[number];
