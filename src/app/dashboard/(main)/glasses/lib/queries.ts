"use server";

import { db } from "@/db";
import { glasses, productVariantsWithImages } from "@/db/drizzle/schema";
import { createClient } from "@/supabase/server";
import { Product, ProductType, ProductVariant } from "@/types/products.types";
import { SortingState } from "@tanstack/react-table";
import { desc, eq } from "drizzle-orm";
import { Category } from "../../categories/lib/types";

interface GetAllProductsProps {
  filters: {
    pageIndex: number;
    pageSize: number;
    title?: string;
    sorting?: SortingState;
  };
}

export async function getAllProducts() {
  return (await db
    .select()
    .from(glasses)
    .orderBy(desc(glasses.createdAt))) as Product<"glasses">[];
}

export async function getAllGlassesVariants({
  productId,
}: {
  productId: number;
}) {
  const productVariants = await db
    .select()
    .from(productVariantsWithImages)
    .where(eq(productVariantsWithImages.productId, productId))
    .orderBy(desc(productVariantsWithImages.createdAt));

  return {
    productVariants: productVariants as ProductVariant<"glasses">[],
  };
}

export async function getCategoriesByProductType(
  productType: ProductType,
  onlyBaseCategories?: boolean
) {
  const supabase = await createClient();

  let queryBuilder = supabase
    .from("categories")
    .select("*")
    .eq("product_type", productType);

  queryBuilder = onlyBaseCategories
    ? queryBuilder.is("parent_category", null)
    : queryBuilder;

  const { data, error } = await queryBuilder;

  if (error) throw error;

  return data as Category[];
}

export async function getChildCategories(parentCategoryId: number) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("parent_category", parentCategoryId);

  if (error) throw error;

  return data as Category[];
}
