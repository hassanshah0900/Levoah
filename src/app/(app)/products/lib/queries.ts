"use server";

import { Category } from "@/app/dashboard/categories/lib/types";
import { createClient } from "@/supabase/server";
import { ProductWithVariants } from "@/types/products.types";

interface GetProductsWithVariantsProps {
  pageIndex: number;
  pageSize: number;
}
export async function getProductsWithVariants({
  pageIndex,
  pageSize,
}: GetProductsWithVariantsProps) {
  const supabase = await createClient();

  const rangeStart = pageIndex * pageSize;
  const rangeEnd = rangeStart + pageSize - 1;
  const { data, count, error } = await supabase
    .from("products_with_variants")
    .select("*", { count: "exact" })
    .range(rangeStart, rangeEnd);

  if (error) throw error;

  return { products: data as ProductWithVariants[], count };
}

export async function getProductsByCategory() {
  const supabase = await createClient();
}

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

export async function getCategoryBySlug(slug: string) {
  if (!slug) return null;
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) throw error;

  return data as Category;
}
