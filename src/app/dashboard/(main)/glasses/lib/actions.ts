"use server";

import { createClient } from "@/supabase/server";
import { Product, ProductVariant } from "@/types/products.types";
import {
  GlassesEditFormSchemaType,
  GlassesFormSchemaType,
  ProductVariantEditSchemaType,
  ProductVariantSchemaType,
} from "./validation";

export async function createGlasses(
  glasses: GlassesFormSchemaType & { published: boolean }
) {
  const supabase = await createClient();

  const p_glasses = {
    ...glasses,
    categories: [...glasses.categories, glasses.type],
    product_type: "glasses",
  };
  const { error } = await supabase.rpc("create_glasses", {
    p_glasses,
  });
  if (error) throw error;
}

export async function editGlasses(
  glasses: GlassesEditFormSchemaType & { id: number }
) {
  const supabase = await createClient();

  const p_glasses = {
    ...glasses,
    categories: [...glasses.categories, glasses.type],
  };

  const { error } = await supabase.rpc("update_glasses", {
    p_glasses,
  });
  if (error) {
    throw error;
  }
}

export async function deleteSingleProduct(productId: number) {
  console.log("action Id: ", productId);

  const supabase = await createClient();

  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", productId);

  if (error) throw error;
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
  glassesVariant: ProductVariantSchemaType & { product_id: number }
) {
  const supabase = await createClient();

  const { data: variant, error } = await supabase
    .from("product_variants")
    .insert({
      price: glassesVariant.price,
      quantity_in_stock: glassesVariant.quantity_in_stock,
      product_id: glassesVariant.product_id,
      attributes: {
        frame_color: glassesVariant.frame_color,
        lense_color: glassesVariant.lense_color,
      },
    })
    .select("id")
    .single();

  if (error) throw error;

  const { data, error: storageError } = await supabase.storage
    .from("Product Images")
    .upload(crypto.randomUUID(), glassesVariant.image);
  if (storageError) throw storageError;

  const { error: imageError } = await supabase.from("images").insert({
    product_id: glassesVariant.product_id,
    variant_id: variant.id,
    path: data.path,
  });

  if (imageError) throw imageError;
}

export async function editGlassesVariant(
  glassesVariant: ProductVariant<"glasses"> &
    Pick<ProductVariantEditSchemaType, "image">
) {
  const supabase = await createClient();

  let image_url = glassesVariant.image_url;
  if (glassesVariant.image) {
    const { data, error } = await supabase.storage
      .from("Product Images")
      .upload(crypto.randomUUID(), glassesVariant.image);
    if (error) throw error;

    image_url = data.path;
  }

  const { error } = await supabase.rpc("update_product_variant", {
    variant: {
      ...glassesVariant,
      image_url,
    },
  });
  if (error) throw error;

  if (glassesVariant.image) {
    const { error } = await supabase.storage
      .from("Product Images")
      .remove([glassesVariant.image_url]);
    if (error) throw error;
  }
}

export async function deleteSingleGlassesVariant(
  glassesVariant: ProductVariant<"glasses">
) {
  const supabase = await createClient();

  const { error: storageError } = await supabase.storage
    .from("Product Images")
    .remove([glassesVariant.image_url]);
  if (storageError) throw storageError;

  const { data, error } = await supabase
    .from("product_variants")
    .delete()
    .eq("id", glassesVariant.id)
    .eq("product_id", glassesVariant.product_id)
    .select("id");
  if (error) throw error;

  return data.map((item) => item.id as ProductVariant["id"]);
}

export async function changeGlassesPublishedStatus(
  glassesIds: Product<"glasses">["id"][],
  published: boolean
) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("products")
    .update({ published })
    .in("id", [glassesIds]);

  if (error) throw error;
}
