"use server";

import { createClient } from "@/supabase/server";
import { Product } from "./types";
import { ProductEditFormSchemaType, ProductFormSchemaType } from "./validation";

export async function createProduct(
  product: ProductFormSchemaType,
  isPublished: boolean
) {
  const supabase = await createClient();
  const { data, error: storageError } = await supabase.storage
    .from("Product Images")
    .upload(crypto.randomUUID(), product.image);

  if (storageError) throw storageError;

  const newProduct = {
    image_url: data.path,
    title: product.title,
    description: product.description,
    price: product.price,
    sale_price: product.sale_price,
    published: isPublished,
  };

  const { error } = await supabase.from("products").insert(newProduct);

  if (error) throw error;
}

export async function deleteSingleProduct(productId: string) {
  console.log("action Id: ", productId);

  const supabase = await createClient();

  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", productId);

  if (error) throw error;
}

export async function deleteMultipleProducts(productIds: string[]) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("products")
    .delete()
    .in("id", productIds);

  if (error) throw error;
}

export async function editProduct(
  product: Product,
  editedProduct: ProductEditFormSchemaType
) {
  const supabase = await createClient();

  let url;
  if (editedProduct.image) {
    const { data, error } = await supabase.storage
      .from("Product Images")
      .upload(crypto.randomUUID(), editedProduct.image);

    if (error) throw error;
    url = data.path;
  }
  console.log("Now Above fields");

  let editedFields: { [key: string]: any } = {};

  for (let key of Object.keys(product)) {
    if (product[key] !== editedProduct[key])
      editedFields[key] = editedProduct[key];
  }

  if (url) {
    const { error } = await supabase.storage
      .from("Product Images")
      .remove([product.image_url]);
    if (error) throw error;
    editedFields["image_url"] = url;
  }

  console.log("Edited Fields: ", editedFields);

  const { error } = await supabase
    .from("products")
    .update(editedFields)
    .eq("id", product.id);

  console.log("Finally at the end");
  if (error) throw error;
}

export async function changeProductsPublishedStatus(
  productIds: string[],
  published: boolean
) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("products")
    .update({ published })
    .in("id", [productIds]);

  if (error) throw error;
}
