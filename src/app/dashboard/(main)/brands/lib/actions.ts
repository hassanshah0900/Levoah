"use server";

import { createClient } from "@/supabase/server";
import { Brand } from "./types";
import { BrandSchemaType } from "./validation";
import { db } from "@/db";
import { brands } from "@/db/drizzle/schema";
import { eq } from "drizzle-orm";

export async function createBrand(brand: BrandSchemaType) {
  const supabase = await createClient();

  let imageUrl = null;
  if (brand.image) {
    const { data, error } = await supabase.storage
      .from("Product Images")
      .upload(crypto.randomUUID(), brand.image);
    if (error) throw error;
    imageUrl = data.path;
  }

  const { name, slug } = brand;
  await db.insert(brands).values({ name, slug, logo: imageUrl });
}

export async function editBrand(brand: BrandSchemaType & Brand) {
  const supabase = await createClient();

  let imageUrl = brand.logo;
  if (brand.image) {
    const { data, error: uploadError } = await supabase.storage
      .from("Product Images")
      .upload(crypto.randomUUID(), brand.image);
    if (uploadError) throw uploadError;
    imageUrl = data.path;
  }

  const { name, slug } = brand;
  await db
    .update(brands)
    .set({
      name,
      slug,
      logo: imageUrl,
    })
    .where(eq(brands.id, brand.id));

  if (brand.image && brand.logo) {
    const { data, error } = await supabase.storage
      .from("Product Images")
      .remove([brand.logo]);
    if (error) throw error;
  }
}

export async function deleteSingleBrand(brand: Brand) {
  await db.delete(brands).where(eq(brands.id, brand.id));

  const supabase = await createClient();
  if (brand.logo) {
    const { error } = await supabase.storage
      .from("Product Images")
      .remove([brand.logo]);
    if (error) throw error;
  }
}
