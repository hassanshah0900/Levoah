import { Category } from "@/app/dashboard/(main)/categories/lib/types";
import { bridgeAndNosepads } from "@/app/dashboard/(main)/glasses/components/BridgeAndNosepadsSelect";
import { frameColors } from "@/app/dashboard/(main)/glasses/components/FrameColorCombobox";
import { frameMaterials } from "@/app/dashboard/(main)/glasses/components/FrameMaterialCombobox";
import { frameShapes } from "@/app/dashboard/(main)/glasses/components/FrameShapeCombobox";
import { lenseColors } from "@/app/dashboard/(main)/glasses/components/LenseColorCombobox";
import { products, productVariants } from "@/db/drizzle/schema";

export type ProductType = "glasses" | "accessories" | "lenses";
type SharedProductProperties<T extends Record<string, any>> =
  typeof products.$inferSelect & {
    attributes: T;
    category: Category;
  };

type SharedProductVariantProperties<T> = typeof productVariants.$inferSelect & {
  imageUrl: string;
  attributes: T;
};

type FrameMaterial = (typeof frameMaterials)[number];
type FrameShape = (typeof frameShapes)[number];
type BridgeAndNosepads = (typeof bridgeAndNosepads)[number];
interface Glasses
  extends SharedProductProperties<{
    frameShape: FrameShape;
    frameMaterial: FrameMaterial;
    bridgeAndNosepads: BridgeAndNosepads;
  }> {
  productType: "glasses";
  variants: GlassesVariant[];
}

type FrameColor = (typeof frameColors)[number];
type LenseColor = (typeof lenseColors)[number];

type GlassesVariant = SharedProductVariantProperties<{
  lenseColor: LenseColor;
  frameColor: FrameColor;
  bridgeWidth: number;
  lenseWidth: number;
  templeLength: number;
}>;

interface Accessory extends SharedProductProperties<{}> {
  productType: "accessories";
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
  lenses: never;
};

export type ProductVariant<T extends ProductType = ProductType> = VariantMap[T];

type ProductMap = {
  glasses: Glasses;
  accessories: Accessory;
  lenses: never;
};

export type Product<T extends ProductType = ProductType> = ProductMap[T];
