import { mutation } from "./_generated/server";
import { getNarutoImageUrlsForSlug } from "./lib/naruto_images";

/** Met à jour les URLs product_images de la catégorie Naruto (sans re-seed complet) */
export const fixNarutoImages = mutation({
  args: {},
  handler: async (ctx) => {
    const category = await ctx.db
      .query("categories")
      .withIndex("by_slug", (q) => q.eq("slug", "naruto"))
      .unique();

    if (!category) {
      return { updated: 0, message: "Catégorie naruto introuvable" };
    }

    const products = await ctx.db
      .query("products")
      .withIndex("by_category", (q) => q.eq("categoryId", category._id))
      .collect();

    let updated = 0;

    for (const product of products) {
      const { box, reveal } = getNarutoImageUrlsForSlug(product.slug);
      const images = await ctx.db
        .query("product_images")
        .withIndex("by_product", (q) => q.eq("productId", product._id))
        .collect();

      for (const image of images) {
        const nextUrl = image.type === "box" ? box : reveal;
        if (image.url !== nextUrl) {
          await ctx.db.patch(image._id, { url: nextUrl });
          updated += 1;
        }
      }
    }

    return {
      updated,
      products: products.length,
      message: `${updated} image(s) mise(s) à jour vers /public/images/products/naruto/`,
    };
  },
});
