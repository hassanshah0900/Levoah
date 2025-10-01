import { collections, conditions } from "@/db/drizzle/schema";
import { Product } from "@/types/products.types";

type BaseCollectionProperties = typeof collections.$inferSelect;
type CollectionWithCondtion = BaseCollectionProperties & {
  type: "automatic";
  conditions: (typeof conditions.$inferSelect)[];
  products: never;
};

type CollectionWithProducts = BaseCollectionProperties & {
  type: "manual";
  products: Product[];
  conditions: never;
};

export type Collection = CollectionWithCondtion | CollectionWithProducts;
