import { ConvexReactClient } from "convex/react";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

export function createConvexClient() {
  if (!convexUrl) {
    return null;
  }
  return new ConvexReactClient(convexUrl);
}
