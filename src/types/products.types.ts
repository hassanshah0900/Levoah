import { Category } from "@/app/dashboard/categories/lib/types";

export interface Product {
  id: number;
  title: string;
  slug: string;
  category: Pick<Category, "id" | "name">;
  description?: string;
  product_type: {
    id: number;
    name: string;
    slug: string;
  };
  published: boolean;
  [key: string]: any;
}

export interface ProductVariant {
  id: number;
  price: number;
  quantity_in_stock: number;
  frame_color: string;
  lense_color: string;
  product_id: number;
  image_url: string;
}
export interface ProductWithVariants extends Product {
  variants: ProductVariant[];
}
