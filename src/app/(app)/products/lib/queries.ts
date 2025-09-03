"use server";

import { Category } from "@/app/dashboard/categories/lib/types";
import { createClient } from "@/supabase/server";
import { ProductWithVariants } from "@/types/products.types";

interface GetProductsWithVariantsProps {
  pageIndex: number;
  pageSize: number;
  categorySlug?: string;
}
export async function getProductsWithVariants({
  pageIndex,
  pageSize,
  categorySlug,
}: GetProductsWithVariantsProps) {
  const supabase = await createClient();

  let queryBuilder = supabase
    .from("products_with_variants")
    .select("*", { count: "exact" });

  if (categorySlug) {
    const categories = await getCategoryWithParents(categorySlug);

    const categoriesIds = categories.map((category) => category.id);

    queryBuilder = queryBuilder.in("category_id", categoriesIds);
  }

  const rangeStart = pageIndex * pageSize;
  const rangeEnd = rangeStart + pageSize - 1;
  const { data, count, error } = await queryBuilder.range(rangeStart, rangeEnd);

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
    .eq("slug", slug);

  if (error) throw error;

  return data[0] as Category;
}

export async function getCategoryWithParents(idOrSlug: number | string) {
  if (!idOrSlug) return [];

  const supabase = await createClient();
  const columnName = typeof idOrSlug === "number" ? "id" : "slug";
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq(columnName, idOrSlug);

  if (error) return [];
  const category = data[0] as Category;

  const categoriesSlug = category.path.split("/");

  const { data: categories, error: categoriesError } = await supabase
    .from("categories")
    .select("*")
    .in("slug", categoriesSlug);

  if (categoriesError) return [];
  return categories as Category[];
}
