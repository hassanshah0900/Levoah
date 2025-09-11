"use server";

import { createClient } from "@/supabase/server";
import { Category } from "./types";
import { CategorySchemaType, SubcategorySchemaType } from "./validation";

export async function createCategory(category: CategorySchemaType) {
  const supabase = await createClient();

  let image_url = null;
  if (category.image) {
    const { data, error } = await supabase.storage
      .from("Product Images")
      .upload(crypto.randomUUID(), category.image);
    if (error) throw error;
    image_url = data.path;
  }

  const { name, slug, description, parent_category, product_type } = category;
  const { error } = await supabase.from("categories").insert({
    name,
    slug,
    description,
    parent_category,
    image_url,
    product_type,
  });
  if (error) throw error;
}

export async function editCategory(category: CategorySchemaType & Category) {
  const supabase = await createClient();

  let image_url = category.image_url;
  if (category.image) {
    const { data, error: uploadError } = await supabase.storage
      .from("Product Images")
      .upload(crypto.randomUUID(), category.image);
    if (uploadError) throw uploadError;

    image_url = data.path;
  }

  const { name, slug, description, parent_category } = category;
  const { error } = await supabase
    .from("categories")
    .update({
      name,
      slug,
      description,
      image_url,
      parent_category,
    })
    .eq("id", category.id);

  if (error) throw error;

  if (category.image && category.image_url) {
    const { data, error } = await supabase.storage
      .from("Product Images")
      .remove([category.image_url]);
    if (error) throw error;
  }
}

export async function deleteSingleCategory(category: Category) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("categories")
    .delete()
    .eq("id", category.id);
  if (error) throw error;

  if (category.image_url) {
    const { error } = await supabase.storage
      .from("Product Images")
      .remove([category.image_url]);
    if (error) throw error;
  }
}

export async function createSubcategory({
  slug,
  category,
}: {
  slug: string;
  category: SubcategorySchemaType;
}) {
  const supabase = await createClient();

  let image_url = null;
  if (category.image) {
    const { data, error } = await supabase.storage
      .from("Product Images")
      .upload(crypto.randomUUID(), category.image);
    if (error) throw error;
    image_url = data.path;
  }

  const { error } = await supabase.rpc("create_subcategory", {
    parent_category_slug: slug,
    category: { ...category, image_url },
  });

  if (error) throw error;
}
