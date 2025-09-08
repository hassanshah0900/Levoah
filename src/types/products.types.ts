import { Category } from "@/app/dashboard/(main)/categories/lib/types";

export type ProductType = "glasses" | "accessories";
interface SharedProductProperties {
  id: number;
  title: string;
  slug: string;
  description?: string;
  published: boolean;
  category: Pick<Category, "id" | "name">;
  product_type: ProductType;
}
interface SharedProductVariantProperties<T> {
  id: number;
  image_url: string;
  price: number;
  quantity_in_stock: number;
  product_id: number;
  attributes: T;
}
interface Glasses extends SharedProductProperties {
  product_type: "glasses";
  variants: GlassesVariant[];
}

type GlassesVariant = SharedProductVariantProperties<{
  lense_color: string;
  frame_color: string;
}>;

interface Accessory extends SharedProductProperties {
  product_type: "accessories";
  variants: AccessoryVariant[];
}
type AccessoryVariant = SharedProductVariantProperties<{
  color: string;
  model: string;
}>;

export type ProductAttributesKey = keyof (GlassesVariant["attributes"] &
  AccessoryVariant["attributes"]);

export interface ProductAttribute {
  label: string;
  value: string;
}

type VariantMap = {
  glasses: GlassesVariant;
  accessories: AccessoryVariant;
};

export type ProductVariant<T extends keyof VariantMap = keyof VariantMap> =
  VariantMap[T];

type ProductMap = {
  glasses: Glasses;
  accessories: Accessory;
};

export type Product<T extends ProductType = ProductType> = ProductMap[T];
