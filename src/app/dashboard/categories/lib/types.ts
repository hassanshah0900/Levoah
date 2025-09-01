export interface Category {
  id: number;
  name: string;
  slug: string;
  parent_category: number | null;
  path: string;
  description?: string;
  image_url?: string;
}
