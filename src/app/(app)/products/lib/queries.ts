"use server";

import { createClient } from "@/supabase/server";
import { ProductWithVariants } from "@/types/products.types";

export async function getProductWithVariants(slug: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products_with_variants")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) throw error;

  return { product: data as ProductWithVariants };
}
