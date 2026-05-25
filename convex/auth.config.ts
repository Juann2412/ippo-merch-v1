import type { AuthConfig } from "convex/server";

// Doit correspondre au Frontend API URL / Issuer de l'app Clerk (clés .env.local)
// Vérifié via décodage de NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY → ruling-prawn-6
export default {
  providers: [
    {
      domain: "https://valid-molly-44.clerk.accounts.dev",
      applicationID: "convex",
    },
  ],
} satisfies AuthConfig;
