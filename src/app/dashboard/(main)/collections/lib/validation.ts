import z from "zod";

export const collectionSchema = z
  .object({
    title: z
      .string()
      .min(1, "Title is required.")
      .max(200, "Title can be maximum 200 characters long."),
    description: z
      .string()
      .max(500, "Description can be maximum 500 characters long.")
      .nullable(),
    type: z.enum(["automatic", "manual"], {
      error: "Collection type is required.",
    }),
    matchType: z.enum(["and", "or"]).optional(),
    conditions: z
      .array(
        z.object({
          field: z.string(),
          relation: z.string(),
          value: z.coerce.string(),
          variant: z.string(),
        })
      )
      .default([]),
    products: z.array(z.number()).default([]),
    pageTitle: z
      .string()
      .min(1, "Page title is required.")
      .max(70, "Page title can be maximum 70 characters long."),
    metaDescription: z
      .string()
      .min(1, "Meta description is required.")
      .max(160, "Meta description can be maximum 160 characters long."),
    slug: z.string().min(1, "URL handle is required.").max(200),
  })
  .refine((data) => data.type === "automatic" && data.conditions.length > 0, {
    path: ["conditions"],
    error: "At least 1 condition is required.",
    when(payload) {
      return z
        .object({
          type: z.literal("automatic"),
        })
        .safeParse(payload.value).success;
    },
  })
  .refine(
    (collection) =>
      collection.type === "manual" && collection.products.length > 0,
    {
      error: "At least 1 product is required.",
      path: ["products"],
      when(payload) {
        return z
          .object({
            type: z.literal("manual"),
          })
          .safeParse(payload.value).success;
      },
    }
  );

export type CollectionSchemaType = z.infer<typeof collectionSchema>;

export const collectionEditSchema = z.object({
  id: z.number(),
  ...collectionSchema.shape,
  conditions: z
    .array(
      z.object({
        id: z.number().optional(),
        field: z.string(),
        relation: z.string(),
        value: z.coerce.string(),
        variant: z.string(),
      })
    )
    .default([]),
});

export type CollectionEditSchemaType = z.infer<typeof collectionEditSchema>;
