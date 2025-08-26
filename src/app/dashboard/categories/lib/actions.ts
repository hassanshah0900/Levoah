"use server";

import { createClient } from "@/supabase/server";
import { Category } from "./types";
import { CategorySchemaType } from "./validation";

export async function createCategory(category: CategorySchemaType) {
  const supabase = await createClient();

  const { error } = await supabase.from("categories").insert({ ...category });
  if (error) throw error;
}

export async function editCategory(category: Category) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("categories")
    .update({ ...category })
    .eq("id", category.id);

  if (error) throw error;
}
