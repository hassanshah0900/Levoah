"use server";

import { db } from "@/db";
import { collections, conditions } from "@/db/drizzle/schema";
import { and, desc, eq, getTableColumns } from "drizzle-orm";
import { Collection } from "./types";

export async function getCollections() {
  const [collectionsList, count] = await Promise.all([
    db.select().from(collections).orderBy(desc(collections.createdAt)),
    db.$count(collections),
  ]);

  return { collections: collectionsList, count };
}

export async function getCollectionBySlug(slug: string) {
  const [collectionsList, conditionsList] = await Promise.all([
    db.select().from(collections).where(eq(collections.slug, slug)),
    db
      .select(getTableColumns(conditions))
      .from(conditions)
      .innerJoin(collections, eq(collections.id, conditions.collectionId))
      .where(
        and(eq(collections.slug, slug), eq(collections.type, "automatic"))
      ),
  ]);
  return collectionsList.length
    ? ({
        ...collectionsList[0],
        conditions: conditionsList,
        products: [],
      } as Collection)
    : null;
}
