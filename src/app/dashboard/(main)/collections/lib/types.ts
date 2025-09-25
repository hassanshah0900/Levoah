import { collections, conditions } from "@/db/drizzle/schema";

export type Collection = typeof collections.$inferSelect;

export type Condition = typeof conditions.$inferSelect;
