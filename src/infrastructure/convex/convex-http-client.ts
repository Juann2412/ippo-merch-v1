import { ConvexHttpClient } from "convex/browser";

let sharedClient: ConvexHttpClient | null = null;

export function getConvexHttpClient(): ConvexHttpClient {
  if (!sharedClient) {
    const url = process.env.NEXT_PUBLIC_CONVEX_URL;
    if (!url) {
      throw new Error("NEXT_PUBLIC_CONVEX_URL manquant dans l'environnement");
    }
    sharedClient = new ConvexHttpClient(url);
  }
  return sharedClient;
}
