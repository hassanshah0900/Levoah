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

export const glassesFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required."),
  attributes: z.object({
    frameMaterial: z.enum(frameMaterials, {
      error: "Frame material is required.",
    }),
    frameShape: z.enum(frameShapes, {
      error: "Frame shape is required.",
    }),
    bridgeAndNosepads: z.enum(bridgeAndNosepads, {
      error: "Bride & nosepads is required.",
    }),
  }),
  description: z.string(),
  category: z.coerce.number().min(1, "Category is required"),
});

export type GlassesFormSchemaType = z.infer<typeof glassesFormSchema>;

export const glassesEditFormSchema = glassesFormSchema.extend({
  published: z.boolean().default(true),
});

export type GlassesEditFormSchemaType = z.infer<
  typeof glassesEditFormSchema
> & { [key: string]: any };

export const glassesVariantSchema = z.object({
  image: z.instanceof(File, { error: "Image is required" }),
  price: z.coerce.number().min(1, "Price is required."),
  quantityInStock: z.coerce.number().min(1, "Quantity is required."),
  attributes: z.object({
    frameColor: z.string().min(1, "Frame color is required."),
    lenseColor: z.string().min(1, "Lense Color is required."),
    lenseWidth: z.coerce.number().min(1, "Lense width is required."),
    bridgeWidth: z.coerce.number().min(1, "Bridge width is required."),
    templeLength: z.coerce.number().min(1, "Temple length is required."),
  }),
});

export type GlassesVariantSchemaType = z.infer<typeof glassesVariantSchema>;

export const glassesVariantEditSchema = z
  .object({
    ...glassesVariantSchema.shape,
  })
  .partial({ image: true });

export type GlassesVariantEditSchemaType = z.infer<
  typeof glassesVariantEditSchema
>;

export const productsPageSearchParamsCache = createSearchParamsCache({
  pageIndex: parseAsInteger.withDefault(0),
  pageSize: parseAsInteger.withDefault(10),
  sorting: createSortingStateParser().withDefault([
    { id: "created_at", desc: false },
  ]),
  title: parseAsString.withDefault(""),
});
