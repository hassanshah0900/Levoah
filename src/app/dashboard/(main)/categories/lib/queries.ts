"use server";

import { db } from "@/db";
import { categories } from "@/db/drizzle/schema";
import { createClient } from "@/supabase/server";
import { Category } from "./types";

export async function getAllCategories() {
  const categoriesList = await db.select().from(categories);
  return categoriesList;
}

export async function getOtherCategories(categorySlug: "all" | string) {
  const supabase = await createClient();

  const { data, error, count } = await supabase
    .from("categories")
    .select("*", { count: "exact" });

  if (error) throw error;

  const result = { categories: data as Category[], count };
  if (categorySlug === "all") return result;

  let { categories } = result;

  const currentCategory = categories.find(
    (category) => category.slug === categorySlug
  );

  if (!currentCategory) throw new Error("No such category exists.");

  const categoriesToExclude = currentCategory.path.split("/");
  categories = categories.filter(
    (category) => !categoriesToExclude.includes(category.slug)
  );

  console.log(categories);

  return { categories, count: categories.length };
}

export async function getBaseCategories() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .is("parent_category", null);

  if (error) throw error;

  return data as Category[];
}

export async function getSubcategories(slug: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .rpc("get_subcategories", {
      parent_category_slug: slug,
    })
    .select("*");

  if (error) throw error;

  return data as Category[];
}
