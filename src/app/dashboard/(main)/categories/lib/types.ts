import { ProductType } from "@/types/products.types";

export interface Category {
  id: number;
  name: string;
  slug: string;
  parent_category: number | null;
  path: string;
  description?: string;
  product_type: ProductType;
  image_url?: string;
}
