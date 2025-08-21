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
    price: z
      .string()
      .min(1, "Price is required.")
      .transform((val) => parseInt(val)),
    sale_price: z.string().transform((val) => (val ? parseInt(val) : 0)),
    description: z.string(),
  })
  .refine((data) => data.price > data.sale_price, {
    error: "Sale price can't be greater than original price",
    path: ["salePrice"],
    when(payload) {
      return z
        .object({
          price: z.number().min(1),
          salePrice: z.number(),
        })
        .safeParse(payload.value).success;
    },
  });
