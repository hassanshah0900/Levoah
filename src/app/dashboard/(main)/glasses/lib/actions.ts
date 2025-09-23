"use server";

import { db } from "@/db";
import {
  images,
  productCategories,
  products,
  productVariants,
} from "@/db/drizzle/schema";
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
  await Promise.all([
    db
      .update(products)
      .set({ ...glasses })
      .where(eq(products.id, glasses.id)),
    db
      .update(productCategories)
      .set({ categoryId: glasses.category })
      .where(eq(productCategories.productId, glasses.id)),
  ]);
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

  let image_url = glassesVariant.imageUrl;
  if (glassesVariant.image) {
    const { data, error } = await supabase.storage
      .from("Product Images")
      .upload(crypto.randomUUID(), glassesVariant.image);
    if (error) throw error;

    image_url = data.path;
  }

  await Promise.all([
    db
      .update(productVariants)
      .set({ ...glassesVariant })
      .where(eq(productVariants.id, glassesVariant.id)),
    db
      .update(images)
      .set({ path: image_url })
      .where(
        and(
          eq(images.variantId, glassesVariant.id),
          eq(images.productId, glassesVariant.productId!)
        )
      ),
  ]);
  // Delete old image from storage if a new image was uploaded
  if (glassesVariant.image) {
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
