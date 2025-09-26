"use server";

import { filter } from "@/app/dashboard/(main)/collections/lib/filter";
import { getCollectionBySlug } from "@/app/dashboard/(main)/collections/lib/queries";
import { db } from "@/db";
import { productsWithVariants } from "@/db/drizzle/schema";

export async function getProductsByCollection(slug: string) {
  const collection = await getCollectionBySlug(slug);
  const filters = filter(
    collection.conditions,
    collection.matchType!,
    productsWithVariants
  );

  const [products, count] = await Promise.all([
    db.select().from(productsWithVariants).where(filters),
    db.$count(productsWithVariants, filters),
  ]);

  return { products, count };
}
