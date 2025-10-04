"use server";

import { toCamelCase } from "@/lib/utils";
import { createClient } from "@/supabase/server";
import { Collection } from "./types";

export async function getCollections() {
  const supabase = await createClient();

  const { data, count, error } = await supabase
    .from("collections")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false });
  if (error) throw error;

  return { collections: toCamelCase(data) as Collection[], count };
}

export async function getCollectionBySlug(slug: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("collections")
    .select(
      `
      *, 
      conditions(*)
      `
    )
    .eq("slug", slug)
    .limit(1);
  if (error) throw error;

  console.log(toCamelCase(data[0]));

  return data.length ? toCamelCase(data[0]) : null;
}
