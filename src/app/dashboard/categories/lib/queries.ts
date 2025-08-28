"use server";

import { createClient } from "@/supabase/server";
import { Category } from "./types";

export async function getAllCategories() {
  const supabase = await createClient();

  const { data, error, count } = await supabase
    .from("categories")
    .select("*", { count: "exact" });

  if (error) throw error;

  return { categories: data as Category[], count };
}
