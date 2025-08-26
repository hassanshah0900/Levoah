"use server";

import { createClient } from "@/supabase/server";
import { SortingState } from "@tanstack/react-table";

interface GetAllProductsProps {
  filters: {
    pageIndex: number;
    pageSize: number;
    title: string;
    sorting: SortingState;
  };
}

export async function getAllProducts({
  filters: { pageIndex, pageSize, sorting, title },
}: GetAllProductsProps) {
  const supabase = await createClient();

  let filterBuilder = supabase.from("products").select("*", { count: "exact" });

  if (title) filterBuilder = filterBuilder.ilike("title", `%${title}%`);

  for (let columnSort of sorting) {
    filterBuilder = filterBuilder.order(columnSort.id, {
      ascending: !columnSort.desc,
    });
  }

  const rangeStart = pageIndex * pageSize;
  const rangeEnd = rangeStart + pageSize - 1;
  filterBuilder = filterBuilder.range(rangeStart, rangeEnd);

  const { data, error, count } = await filterBuilder;

  if (error) throw error;
  return { products: data, count };
}

export async function getAllProductVariants(product_id: number) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("product_variants_with_images")
    .select("*")
    .eq("product_id", product_id);

  if (error) console.log(error);

  return { data };
}
