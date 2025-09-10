"use server";

import { createClient } from "@/supabase/server";
import { Brand } from "./types";
import { BrandSchemaType } from "./validation";

export async function createBrand(brand: BrandSchemaType) {
  const supabase = await createClient();

  let image_url = null;
  if (brand.image) {
    const { data, error } = await supabase.storage
      .from("Product Images")
      .upload(crypto.randomUUID(), brand.image);
    if (error) throw error;
    image_url = data.path;
  }

  const { name, slug } = brand;
  const { error } = await supabase
    .from("brands")
    .insert({ name, slug, logo: image_url });
  if (error) throw error;
}

export async function editBrand(brand: BrandSchemaType & Brand) {
  const supabase = await createClient();

  let image_url = brand.logo;
  if (brand.image) {
    const { data, error: uploadError } = await supabase.storage
      .from("Product Images")
      .upload(crypto.randomUUID(), brand.image);
    if (uploadError) throw uploadError;

    image_url = data.path;
  }

  const { name, slug } = brand;
  const { error } = await supabase
    .from("brand")
    .update({
      name,
      slug,
      logo: image_url,
    })
    .eq("id", brand.id);

  if (error) throw error;

  if (brand.image && brand.logo) {
    const { data, error } = await supabase.storage
      .from("Product Images")
      .remove([brand.logo]);
    if (error) throw error;
  }
}

export async function deleteSingleBrand(brand: Brand) {
  const supabase = await createClient();

  const { error } = await supabase.from("brands").delete().eq("id", brand.id);
  if (error) throw error;

  if (brand.logo) {
    const { error } = await supabase.storage
      .from("Product Images")
      .remove([brand.logo]);
    if (error) throw error;
  }
}
