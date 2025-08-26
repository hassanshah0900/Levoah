import z from "zod";

export const categorySchema = z.object({
  name: z
    .string()
    .min(1, "Name is required.")
    .max(100, "Name can be at max 100 chars"),
  slug: z
    .string()
    .min(1, "Slug is required.")
    .max(100, "Slug can be at max 100 characters"),
  parent_category: z.number().optional(),
});

export type CategorySchemaType = z.infer<typeof categorySchema>;
