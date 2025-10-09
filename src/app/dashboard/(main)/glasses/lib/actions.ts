"use server";

import { db } from "@/db";
import {
  images,
  productCategories,
  products,
  productVariants,
} from "@/db/drizzle/schema";
import { toSnakeCase } from "@/lib/utils";
import { createClient } from "@/supabase/server";
import { Product, ProductVariant } from "@/types/products.types";
import { and, eq, inArray } from "drizzle-orm";
import {
  GlassesEditFormSchemaType,
  GlassesFormSchemaType,
  GlassesVariantEditSchemaType,
  GlassesVariantSchemaType,
} from "./validation";

export async function createGlasses(
  glasses: GlassesFormSchemaType & { published: boolean }
) {
  const insertedGlasses = (
    await db
      .insert(products)
      .values({
        ...glasses,
        productType: "glasses",
      })
      .returning()
  )[0];

  await db
    .insert(productCategories)
    .values({
      productId: insertedGlasses.id,
      categoryId: glasses.category,
    })
    .onConflictDoNothing({
      target: [productCategories.productId, productCategories.categoryId],
    });
}

export async function editGlasses(
  glasses: GlassesEditFormSchemaType & { id: number }
) {
  const supabase = await createClient();

  const { category, ...glassesToUpdate } = glasses;

  const { error } = await supabase
    .from("products")
    .update({
      ...toSnakeCase(glassesToUpdate),
      attributes: glassesToUpdate.attributes,
    })
    .eq("id", glasses.id);
  if (error) throw error;

  const {
    data,
    count,
    error: categoryUpdateError,
  } = await supabase
    .from("product_categories")
    .update({ product_id: glasses.id, category_id: category })
    .eq("product_id", glasses.id)
    .select("*");
  if (categoryUpdateError) throw categoryUpdateError;
  console.log(data);

  if (!data.length) {
    const { error } = await supabase
      .from("product_categories")
      .insert({ product_id: glasses.id, category_id: category });
    if (error) throw error;
  }
}

export async function deleteSingleGlassesPair(productId: number) {
  await db.delete(products).where(eq(products.id, productId));
}

export async function deleteMultipleProducts(productIds: Product["id"][]) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("products")
    .delete()
    .in("id", productIds);

  if (error) throw error;
}

export async function createGlassesVariant(
  glassesVariant: GlassesVariantSchemaType & { productId: number }
) {
  const supabase = await createClient();
  const insertedVariant = (
    await db
      .insert(productVariants)
      .values({ ...glassesVariant })
      .returning()
  )[0];

  const { data, error: storageError } = await supabase.storage
    .from("Product Images")
    .upload(crypto.randomUUID(), glassesVariant.image);
  if (storageError) throw storageError;

  await db.insert(images).values({
    productId: glassesVariant.productId,
    variantId: insertedVariant.id,
    path: data.path,
  });
}

export async function editGlassesVariant(
  glassesVariant: Pick<
    ProductVariant<"glasses">,
    "id" | "productId" | "imageUrl"
  > &
    GlassesVariantEditSchemaType
) {
  const supabase = await createClient();

  let imageUrl = glassesVariant.imageUrl;
  let isNewImage = false;
  if (glassesVariant.image) {
    const { data, error } = await supabase.storage
      .from("Product Images")
      .upload(crypto.randomUUID(), glassesVariant.image);
    if (error) throw error;
    imageUrl = data.path;
    isNewImage = true;
  }

  await db.transaction(async (tx) => {
    await tx
      .update(productVariants)
      .set({
        ...glassesVariant,
      })
      .where(eq(productVariants.id, glassesVariant.id));

    const existing = await tx
      .select()
      .from(images)
      .where(
        and(
          eq(images.variantId, glassesVariant.id),
          eq(images.productId, glassesVariant.productId!)
        )
      );

    existing.length > 0
      ? await tx
          .update(images)
          .set({ path: imageUrl })
          .where(
            and(
              eq(images.variantId, glassesVariant.id),
              eq(images.productId, glassesVariant.productId!)
            )
          )
      : await tx.insert(images).values({
          productId: glassesVariant.productId,
          variantId: glassesVariant.id,
          path: imageUrl,
        });
  });

  // Delete old image from storage if a new image was uploaded

  if (isNewImage && glassesVariant.imageUrl) {
    const { error } = await supabase.storage
      .from("Product Images")
      .remove([glassesVariant.imageUrl]);
    if (error) throw error;
  }
}

export async function deleteSingleGlassesVariant(
  glassesVariant: ProductVariant<"glasses">
) {
  const supabase = await createClient();
  await db
    .delete(productVariants)
    .where(
      and(
        eq(productVariants.id, glassesVariant.id),
        eq(productVariants.productId, glassesVariant.productId!)
      )
    );

  const { error: storageError } = await supabase.storage
    .from("Product Images")
    .remove([glassesVariant.imageUrl]);
  if (storageError) throw storageError;
}

export async function changeGlassesPublishedStatus(
  glassesIds: Product<"glasses">["id"][],
  published: boolean
) {
  await db
    .update(products)
    .set({ published })
    .where(inArray(products.id, glassesIds));
}
