"use server";

import {
  collectionProducts,
  collections,
  conditions,
} from "@/db/drizzle/schema";
import { CollectionSchemaType } from "./validation";
import { db } from "@/db";
import { Collection } from "./types";
import { eq } from "drizzle-orm";

export async function createCollection(collection: CollectionSchemaType) {
  const { insertedId } = (
    await db
      .insert(collections)
      .values({
        ...collection,
      })
      .returning({ insertedId: collections.id })
  )[0];

  if (collection.type === "manual") {
    await db.insert(collectionProducts).values([
      ...collection.products.map((productId) => ({
        collectionId: insertedId,
        productId,
      })),
    ]);
  }

  if (collection.type === "automatic") {
    await db.insert(conditions).values([
      ...collection.conditions.map((condition) => ({
        ...condition,
        collectionId: insertedId,
      })),
    ]);
  }
}

export async function deleteCollection(collection: Collection) {
  if (!collection) return;
  await db.delete(collections).where(eq(collections.id, collection.id));
}
