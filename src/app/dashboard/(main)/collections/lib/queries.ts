"use server";

import { db } from "@/db";
import { collections } from "@/db/drizzle/schema";

export async function getCollections() {
  const [collectionsList, count] = await Promise.all([
    db.select().from(collections),
    db.$count(collections),
  ]);

  return { collections: collectionsList, count };
}
