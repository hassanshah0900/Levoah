"use server";

import { createClient } from "@/supabase/server";

export async function getAllCategories() {
  const supabase = await createClient();

  const { data, error } = await supabase.from("categories").select("*");
  if (error) throw error;

  return { data };
}
