/** Utilisateur boutique — synchronisé depuis Clerk */
export interface User {
  id: string;
  clerkId: string;
  email: string;
  name?: string;
  imageUrl?: string;
  createdAt: number;
  updatedAt: number;
}
