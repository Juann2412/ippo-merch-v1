/** Catégorie catalogue (ex. franchise anime, collection) */
export interface Category {
  id: string;
  slug: string;
  name: string;
  description?: string;
  /** Ordre d'affichage dans les filtres / navigation */
  sortOrder: number;
  isActive: boolean;
  createdAt: number;
  updatedAt: number;
}
