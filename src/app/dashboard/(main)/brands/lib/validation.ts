import z from "zod";

export const brandSchema = z.object({
  image: z.instanceof(File, { error: "Image is required" }).optional(),
  name: z
    .string()
    .min(1, "Name is required.")
    .max(100, "Name can be at max 100 chars"),
  slug: z
    .string()
    .min(1, "Slug is required.")
    .max(100, "Slug can be at max 100 characters"),
});

export type BrandSchemaType = z.infer<typeof brandSchema>;
