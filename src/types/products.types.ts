import { Category } from "@/app/dashboard/(main)/categories/lib/types";
import { bridgeAndNosepads } from "@/app/dashboard/(main)/glasses/components/BridgeAndNosepadsSelect";
import { frameColors } from "@/app/dashboard/(main)/glasses/components/FrameColorCombobox";
import { frameMaterials } from "@/app/dashboard/(main)/glasses/components/FrameMaterialCombobox";
import { frameShapes } from "@/app/dashboard/(main)/glasses/components/FrameShapeCombobox";
import { lenseColors } from "@/app/dashboard/(main)/glasses/components/LenseColorCombobox";

export type ProductType = "glasses" | "accessories" | "lenses";
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

type FrameMaterial = (typeof frameMaterials)[number];
type FrameShape = (typeof frameShapes)[number];
type BridgeAndNosepads = (typeof bridgeAndNosepads)[number];
interface Glasses extends SharedProductProperties {
  frame_shape: FrameShape;
  frame_material: FrameMaterial;
  bridge_and_nosepads: BridgeAndNosepads;
  product_type: "glasses";
  variants: GlassesVariant[];
}

type FrameColor = (typeof frameColors)[number];
type LenseColor = (typeof lenseColors)[number];

type GlassesVariant = SharedProductVariantProperties<{
  lense_color: LenseColor;
  frame_color: FrameColor;
  bridge_width: number;
  lense_width: number;
  temple_length: number;
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
  lenses: never;
};

export type Product<T extends ProductType = ProductType> = ProductMap[T];
