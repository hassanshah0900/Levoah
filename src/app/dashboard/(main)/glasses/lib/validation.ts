import { createSortingStateParser } from "@/lib/parsers";
import {
  createSearchParamsCache,
  parseAsInteger,
  parseAsString,
} from "nuqs/server";
import z from "zod";
import { bridgeAndNosepads } from "../components/BridgeAndNosepadsSelect";
import { frameMaterials } from "../components/FrameMaterialCombobox";
import { frameShapes } from "../components/FrameShapeCombobox";

export const productVariantSchema = z.object({
  image: z.instanceof(File, { error: "Image is required" }),
  price: z.coerce.number().min(1, "Price is required."),
  quantity_in_stock: z.coerce.number().min(1, "Quantity is required."),
  frame_color: z.string().min(1, "Frame color is required."),
  lense_color: z.string().min(1, "Lense Color is required."),
  lense_width: z.coerce.number().min(1, "Lense width is required."),
  bridge_width: z.coerce.number().min(1, "Bridge width is required."),
  temple_length: z.coerce.number().min(1, "Temple length is required."),
});

export type ProductVariantSchemaType = z.infer<typeof productVariantSchema>;

export const productVariantEditSchema = z
  .object({
    ...productVariantSchema.shape,
  })
  .partial({ image: true });

export type ProductVariantEditSchemaType = z.infer<
  typeof productVariantEditSchema
>;

export const glassesFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required."),
  frame_material: z.enum(frameMaterials, {
    error: "Frame material is required.",
  }),
  frame_shape: z.enum(frameShapes, {
    error: "Frame shape is required.",
  }),
  bridge_and_nosepads: z.enum(bridgeAndNosepads, {
    error: "Bride & nosepads is required.",
  }),
  type: z.coerce.number().min(1, "Type is required"),
  categories: z
    .array(z.coerce.number())
    .min(1, "At least one category is required"),
  description: z.string(),
});

export type GlassesFormSchemaType = z.infer<typeof glassesFormSchema>;

export const productEditFormSchema = glassesFormSchema.extend({
  published: z.boolean().default(true),
});

export type ProductEditFormSchemaType = z.infer<
  typeof productEditFormSchema
> & { [key: string]: any };

export const productsPageSearchParamsCache = createSearchParamsCache({
  pageIndex: parseAsInteger.withDefault(0),
  pageSize: parseAsInteger.withDefault(10),
  sorting: createSortingStateParser().withDefault([
    { id: "created_at", desc: false },
  ]),
  title: parseAsString.withDefault(""),
});
