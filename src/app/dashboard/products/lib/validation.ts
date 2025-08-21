import { createSortingStateParser } from "@/lib/parsers";
import {
  createSearchParamsCache,
  parseAsInteger,
  parseAsString,
} from "nuqs/server";
import z from "zod";
export const productFormSchema = z
  .object({
    image: z.instanceof(File, { error: "Image is required." }),
    title: z.string().min(1, "Title is required"),
    price: z.coerce.number().min(1, "Price is required."),
    sale_price: z.coerce.number().optional().default(0),
    description: z.string(),
  })
  .refine((data) => data.price > data.sale_price, {
    error: "Sale price can't be greater than original price",
    path: ["sale_price"],
    when(payload) {
      return productFormSchema
        .pick({ price: true, sale_price: true })
        .safeParse(payload.value).success;
    },
  });

export type ProductFormSchemaType = z.infer<typeof productFormSchema>;

export const productEditFormSchema = productFormSchema
  .extend({
    published: z.boolean().default(true),
  })
  .partial({ image: true })
  .refine((data) => data.price > data.sale_price, {
    error: "Sale price can't be greater than original price",
    path: ["sale_price"],
    when(payload) {
      return productFormSchema
        .pick({ price: true, sale_price: true })
        .safeParse(payload.value).success;
    },
  });

export type ProductEditFormSchemaType = z.infer<typeof productEditFormSchema>;

export const productsPageSearchParamsCache = createSearchParamsCache({
  pageIndex: parseAsInteger.withDefault(0),
  pageSize: parseAsInteger.withDefault(10),
  sorting: createSortingStateParser().withDefault([
    { id: "created_at", desc: false },
  ]),
  title: parseAsString.withDefault(""),
});
