"use server";

import { filter } from "@/app/dashboard/(main)/collections/lib/filter";
import { getCollectionBySlug } from "@/app/dashboard/(main)/collections/lib/queries";
import { db } from "@/db";
import { productsWithVariants } from "@/db/drizzle/schema";
import { Product } from "@/types/products.types";

interface Filters {
  pageSize: number;
  pageIndex: number;
}
export async function getProductsByCollection(
  slug: string,
  { pageSize, pageIndex }: Filters
) {
  try {
    const collection = await getCollectionBySlug(slug);
    if (!collection) return null;
    const filters = filter(
      collection.conditions,
      collection.matchType!,
      productsWithVariants
    );
    const offsetValue = pageIndex * pageSize;
    const [products, count] = await Promise.all([
      db
        .select()
        .from(productsWithVariants)
        .where(filters)
        .offset(offsetValue)
        .limit(pageSize),
      db.$count(productsWithVariants, filters),
    ]);

    return { products: (products as Product[]) ?? [], count };
  } catch (error) {
    throw error;
  }
}
