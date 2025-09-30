"use server";

import { db } from "@/db";
import { brands } from "@/db/drizzle/schema";
import { desc } from "drizzle-orm";

export async function getAllBrands() {
  return db.select().from(brands).orderBy(desc(brands.name));
}
