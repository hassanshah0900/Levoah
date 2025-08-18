import z from "zod";
export const productFormSchema = z
  .object({
    imageUrl: z.string().optional(),
    title: z.string().min(1, "Title is required"),
    price: z
      .string()
      .min(1, "Price is required.")
      .transform((val) => parseInt(val)),
    salePrice: z.string().transform((val) => (val ? parseInt(val) : 0)),
    description: z.string(),
  })
  .refine((data) => data.price > data.salePrice, {
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

export type ProductFormSchemaType = z.infer<typeof productFormSchema>;
