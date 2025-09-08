import { ProductAttributesKey, ProductVariant } from "@/types/products.types";

export type AttributeColumnType = {
  label: string;
  propertyName: ProductAttributesKey;
};

export const glassesColumns: AttributeColumnType[] = [
  { label: "Frame Color", propertyName: "frame_color" },
  { label: "Lense Color", propertyName: "lense_color" },
];
