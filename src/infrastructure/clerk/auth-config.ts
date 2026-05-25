export const clerkRoutes = {
  signIn: process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL ?? "/sign-in",
  signUp: process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL ?? "/sign-up",
} as const;
