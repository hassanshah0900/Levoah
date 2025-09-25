"use server";

import {
  collectionProducts,
  collections,
  conditions,
} from "@/db/drizzle/schema";
import { CollectionEditSchemaType, CollectionSchemaType } from "./validation";
import { db } from "@/db";
import { Collection } from "./types";
import { and, eq, ne, notInArray } from "drizzle-orm";

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

export async function editCollection(collection: CollectionEditSchemaType) {
  try {
    await db.update(collections).set({ ...collection });

    const newConditions = collection.conditions
      .filter((condition) => !condition.id)
      .map((condition) => ({ ...condition, collectionId: collection.id }));
    const existingConditions = collection.conditions.filter(
      (condition) => !!condition.id
    );

    await db.delete(conditions).where(
      and(
        eq(conditions.collectionId, collection.id),
        notInArray(
          conditions.id,
          existingConditions.map((condition) => condition.id!)
        )
      )
    );

    await Promise.all([
      ...existingConditions.map((condition) =>
        db
          .update(conditions)
          .set({ ...condition })
          .where(eq(conditions.id, condition.id!))
      ),
      db.insert(conditions).values(newConditions),
    ]);
  } catch (error) {
    throw error;
  }
}
