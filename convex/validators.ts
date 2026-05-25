import { v } from "convex/values";

export const rarityValidator = v.union(
  v.literal("Common"),
  v.literal("Rare"),
  v.literal("Epic"),
  v.literal("Legendary"),
  v.literal("Secret"),
);

export const orderStatusValidator = v.union(
  v.literal("pending"),
  v.literal("paid"),
  v.literal("processing"),
  v.literal("shipped"),
  v.literal("delivered"),
  v.literal("cancelled"),
);

export const productImageTypeValidator = v.union(
  v.literal("box"),
  v.literal("reveal"),
  v.literal("gallery"),
);
