"use server";

import { createClient } from "@/supabase/server";
import {
  ProductEditFormSchemaType,
  ProductFormSchemaType,
  ProductVariantEditSchemaType,
  ProductVariantSchemaType,
} from "./validation";
import { Product, ProductVariant } from "@/types/products.types";

export async function createProduct(
  product: ProductFormSchemaType & { published: boolean }
) {
  const supabase = await createClient();
  const { error } = await supabase.rpc("create_product", {
    product,
  });
  if (error) throw error;
}

export async function addProductVariant(
  productVariant: ProductVariantSchemaType & { product_id: number }
) {
  const supabase = await createClient();

  const { data: variant, error } = await supabase
    .from("product_variants")
    .insert({
      price: productVariant.price,
      quantity_in_stock: productVariant.quantity_in_stock,
      product_id: productVariant.product_id,
      attributes: {
        frame_color: productVariant.frame_color,
        lense_color: productVariant.lense_color,
      },
    })
    .select("id")
    .single();

  if (error) throw error;

  const { data, error: storageError } = await supabase.storage
    .from("Product Images")
    .upload(crypto.randomUUID(), productVariant.image);
  if (storageError) throw storageError;

  const { error: imageError } = await supabase.from("images").insert({
    product_id: productVariant.product_id,
    variant_id: variant.id,
    path: data.path,
  });

  if (imageError) throw imageError;
}

export async function editProductVariant(
  productVariant: ProductVariant & Pick<ProductVariantEditSchemaType, "image">
) {
  const supabase = await createClient();

  let image_url = productVariant.image_url;
  if (productVariant.image) {
    const { data, error } = await supabase.storage
      .from("Product Images")
      .upload(crypto.randomUUID(), productVariant.image);
    if (error) throw error;

    const { error: deleteError } = await supabase.storage
      .from("Product Images")
      .remove([productVariant.image_url]);
    if (deleteError) throw deleteError;

    image_url = data.path;
  }

  const { error } = await supabase.rpc("update_product_variant", {
    variant: {
      ...productVariant,
      image_url,
    },
  });
  if (error) throw error;
}

export async function deleteSingleProductVariant(
  productVariant: ProductVariant
) {
  const supabase = await createClient();

  const { error: storageError } = await supabase.storage
    .from("Product Images")
    .remove([productVariant.image_url]);
  if (storageError) throw storageError;

  const { data, error } = await supabase
    .from("product_variants")
    .delete()
    .eq("id", productVariant.id)
    .eq("product_id", productVariant.product_id)
    .select("id");
  if (error) throw error;

  return data.map((item) => item.id as ProductVariant["id"]);
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

export async function editProduct(product: Product) {
  const supabase = await createClient();

  const { error } = await supabase.rpc("update_product", {
    product,
  });
  if (error) {
    console.log(error.code);
    throw error;
  }
}

export async function changeProductsPublishedStatus(
  productIds: Product["id"][],
  published: boolean
) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("products")
    .update({ published })
    .in("id", [productIds]);

  if (error) throw error;
}
