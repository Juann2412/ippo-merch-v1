import { query } from "./_generated/server";
import { v } from "convex/values";

export const getFeatured = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 8;
    return await ctx.db
      .query("products")
      .filter((q) =>
        q.and(
          q.eq(q.field("featured"), true),
          q.eq(q.field("isActive"), true),
        ),
      )
      .take(limit);
  },
});
