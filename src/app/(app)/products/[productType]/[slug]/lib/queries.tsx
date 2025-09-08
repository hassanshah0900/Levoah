"use server";

import { createClient } from "@/supabase/server";
import { Product } from "@/types/products.types";

export async function getRelatedProductsWithVariants(
  productSlug: Product["slug"]
) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .rpc("get_related_products_with_variants", {
      slug: productSlug,
    })
    .select("*");

  if (error) throw error;

  return data as Product[];
}
