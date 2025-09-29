import { brands } from "@/db/drizzle/schema";

export type Brand = typeof brands.$inferSelect;
