"use server";

import { db } from "@/db";
import {
  collectionProducts,
  collections,
  conditions,
} from "@/db/drizzle/schema";
import { createClient } from "@/supabase/server";
import { and, eq, notInArray } from "drizzle-orm";
import { Collection } from "./types";
import { CollectionEditSchemaType, CollectionSchemaType } from "./validation";

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
    await db.insert(conditions).values(
      collection.conditions.map((condition) => ({
        ...condition,
        collectionId: insertedId,
      }))
    );
  }

  if (collection.banner) {
    const supabase = await createClient();
    const { data, error } = await supabase.storage
      .from("Banners")
      .upload(crypto.randomUUID(), collection.banner);
    if (error) throw error;

    await db.update(collections).set({ bannerUrl: data.path });
  }
}

export async function deleteCollection(collection: Collection) {
  if (!collection) return;
  await db.delete(collections).where(eq(collections.id, collection.id));

  if (collection.bannerUrl) {
    const supabase = await createClient();
    const { error } = await supabase.storage
      .from("Banners")
      .remove([collection.bannerUrl]);
    if (error) throw error;
  }
}

export async function editCollection(collection: CollectionEditSchemaType) {
  const supabase = await createClient();
  let bannerUrl = collection.bannerUrl;
  if (collection.banner) {
    const { data, error } = await supabase.storage
      .from("Banners")
      .upload(crypto.randomUUID(), collection.banner);
    if (error) throw error;
    bannerUrl = data.path;
  }

  await db
    .update(collections)
    .set({
      title: collection.title,
      description: collection.description,
      pageTitle: collection.pageTitle,
      metaDescription: collection.metaDescription,
      slug: collection.slug,
      matchType: collection.matchType,
      type: collection.type,
      bannerUrl,
    })
    .where(eq(collections.id, collection.id));

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
    newConditions.length > 0 && db.insert(conditions).values(newConditions),
  ]);

  if (collection.bannerUrl && collection.banner) {
    const { error } = await supabase.storage
      .from("Banners")
      .remove([collection.bannerUrl]);
    if (error) throw error;
  }
}
