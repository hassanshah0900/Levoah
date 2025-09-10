"use server";

import { Category } from "@/app/dashboard/(main)/categories/lib/types";
import { createClient } from "@/supabase/server";
import { Product } from "@/types/products.types";

interface GetProductsWithVariantsProps {
  pageIndex: number;
  pageSize: number;
  categoryPath?: string;
}
export async function getProductsWithVariants({
  pageIndex,
  pageSize,
  categoryPath,
}: GetProductsWithVariantsProps) {
  const supabase = await createClient();

  let queryBuilder;
  if (categoryPath === "/") {
    queryBuilder = supabase.from("products_with_variants").select("*");
  } else {
    queryBuilder = supabase
      .rpc("get_products_by_category", {
        p_category_path: categoryPath,
      })
      .select("*");
  }

  const rangeStart = pageIndex * pageSize;
  const rangeEnd = rangeStart + pageSize - 1;
  const { data, count, error } = await queryBuilder.range(rangeStart, rangeEnd);

  if (error) throw error;

  return { products: data as Product[], count };
}

export async function getProductWithVariants(slug: string) {
  if (!slug) return null;
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products_with_variants")
    .select("*")
    .eq("slug", slug);

  if (error) throw error;

  return (data[0] as Product) ?? null;
}

export async function getCategoryBySlug(slug: string) {
  if (!slug) return null;
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("slug", slug);

  if (error) throw error;

  return data[0] as Category;
}

export async function getCategoryWithChildren(slug: number | string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .ilike("path", `%${slug}%`);

  if (error) return [];

  return data as Category[];
}
