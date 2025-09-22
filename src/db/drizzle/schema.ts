import {
  pgTable,
  foreignKey,
  pgPolicy,
  bigint,
  integer,
  jsonb,
  timestamp,
  text,
  unique,
  smallint,
  boolean,
  primaryKey,
  pgView,
  json,
  pgEnum,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const collectionType = pgEnum("collection_type", [
  "manual",
  "automatic",
]);
export const matchType = pgEnum("match_type", ["and", "or"]);
export const productType = pgEnum("product_type", [
  "glasses",
  "accessories",
  "lenses",
]);

export const productVariants = pgTable(
  "product_variants",
  {
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity({
      name: "product_variants_id_seq",
      startWith: 1,
      increment: 1,
      minValue: 1,
      maxValue: 9223372036854775807,
      cache: 1,
    }),
    price: integer(),
    quantityInStock: integer("quantity_in_stock"),
    attributes: jsonb(),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    productId: bigint("product_id", { mode: "number" }),
  },
  (table) => [
    foreignKey({
      columns: [table.productId],
      foreignColumns: [products.id],
      name: "product_variants_product_id_fkey",
    }),
    pgPolicy("allow delete access on product_variants based on role", {
      as: "permissive",
      for: "delete",
      to: ["public"],
      using: sql`authorize('product_variants.delete'::text)`,
    }),
    pgPolicy("allow insert access on product_variants based on role", {
      as: "permissive",
      for: "insert",
      to: ["public"],
    }),
    pgPolicy("allow read access on product_variants based on role", {
      as: "permissive",
      for: "select",
      to: ["public"],
    }),
    pgPolicy("allow update access on product_variants based on role", {
      as: "permissive",
      for: "update",
      to: ["public"],
    }),
  ]
);

export const categories = pgTable(
  "categories",
  {
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity({
      name: "categories_id_seq",
      startWith: 1,
      increment: 1,
      minValue: 1,
      maxValue: 9223372036854775807,
      cache: 1,
    }),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
    name: text().notNull(),
    slug: text().notNull(),
    path: text().notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    parentCategory: bigint("parent_category", { mode: "number" }),
    meta: jsonb(),
    imageUrl: text("image_url"),
    description: text(),
    productType: productType("product_type").default("glasses").notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.parentCategory],
      foreignColumns: [table.id],
      name: "categories_parent_category_fkey",
    }),
    pgPolicy("allow select access to all users", {
      as: "permissive",
      for: "select",
      to: ["public"],
      using: sql`true`,
    }),
    pgPolicy("allow delete access on categories to only admin", {
      as: "permissive",
      for: "delete",
      to: ["public"],
    }),
    pgPolicy("allow update access on categories to only admin", {
      as: "permissive",
      for: "update",
      to: ["public"],
    }),
    pgPolicy("allow insert access on categories to only admin", {
      as: "permissive",
      for: "insert",
      to: ["public"],
    }),
  ]
);

export const roles = pgTable(
  "roles",
  {
    id: integer().primaryKey().generatedByDefaultAsIdentity({
      name: "roles_id_seq",
      startWith: 1,
      increment: 1,
      minValue: 1,
      maxValue: 2147483647,
      cache: 1,
    }),
    name: text().notNull(),
  },
  (table) => [unique("roles_name_key").on(table.name)]
);

export const permissions = pgTable("permissions", {
  id: integer().primaryKey().generatedByDefaultAsIdentity({
    name: "permissions_id_seq",
    startWith: 1,
    increment: 1,
    minValue: 1,
    maxValue: 2147483647,
    cache: 1,
  }),
  name: text().notNull(),
});

export const addresses = pgTable("addresses", {
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity({
    name: "addresses_id_seq",
    startWith: 1,
    increment: 1,
    minValue: 1,
    maxValue: 9223372036854775807,
    cache: 1,
  }),
  fullName: text("full_name").notNull(),
  country: text().notNull(),
  province: text(),
  city: text(),
  phone: text(),
  email: text(),
  address: text(),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
  postalCode: text("postal_code"),
  userId: smallint("user_id"),
});

export const collections = pgTable(
  "collections",
  {
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity({
      name: "collections_id_seq",
      startWith: 1,
      increment: 1,
      minValue: 1,
      maxValue: 9223372036854775807,
      cache: 1,
    }),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
    title: text().notNull(),
    description: text(),
    pageTitle: text("page_title"),
    metaDescription: text("meta_description"),
    slug: text().notNull(),
    type: collectionType().default("manual").notNull(),
    matchType: matchType("match_type"),
  },
  (table) => [unique("collections_slug_key").on(table.slug)]
);

export const conditions = pgTable(
  "conditions",
  {
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity({
      name: "conditions_id_seq",
      startWith: 1,
      increment: 1,
      minValue: 1,
      maxValue: 9223372036854775807,
      cache: 1,
    }),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    collectionId: bigint("collection_id", { mode: "number" }),
    field: text().notNull(),
    relation: text().notNull(),
    value: jsonb().notNull(),
    variant: text().notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.collectionId],
      foreignColumns: [collections.id],
      name: "conditions_collection_id_fkey",
    })
      .onUpdate("cascade")
      .onDelete("cascade"),
  ]
);

export const orders = pgTable(
  "orders",
  {
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity({
      name: "orders_id_seq",
      startWith: 1,
      increment: 1,
      minValue: 1,
      maxValue: 9223372036854775807,
      cache: 1,
    }),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    userId: bigint("user_id", { mode: "number" }),
    status: text(),
    shippingAddress: jsonb("shipping_address").notNull(),
    shippingAmount: integer("shipping_amount"),
    paymentStatus: text("payment_status"),
    discountAmount: integer("discount_amount"),
    taxAmount: integer("tax_amount"),
    paymentMethod: text("payment_method"),
    trackingCode: text("tracking_code"),
  },
  (table) => [
    unique("orders_tracking_code_key").on(table.trackingCode),
    pgPolicy("allow access to everyone", {
      as: "permissive",
      for: "insert",
      to: ["public"],
      withCheck: sql`true`,
    }),
    pgPolicy("allow access to everything to everyone", {
      as: "permissive",
      for: "all",
      to: ["public"],
    }),
  ]
);

export const brands = pgTable("brands", {
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity({
    name: "brands_id_seq",
    startWith: 1,
    increment: 1,
    minValue: 1,
    maxValue: 9223372036854775807,
    cache: 1,
  }),
  name: text(),
  slug: text(),
  logo: text(),
});

export const images = pgTable(
  "images",
  {
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity({
      name: "images_id_seq",
      startWith: 1,
      increment: 1,
      minValue: 1,
      maxValue: 9223372036854775807,
      cache: 1,
    }),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    productId: bigint("product_id", { mode: "number" }),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    variantId: bigint("variant_id", { mode: "number" }),
    path: text(),
    alt: text(),
  },
  (table) => [
    foreignKey({
      columns: [table.productId],
      foreignColumns: [products.id],
      name: "images_product_id_fkey",
    })
      .onUpdate("cascade")
      .onDelete("cascade"),
    foreignKey({
      columns: [table.variantId],
      foreignColumns: [productVariants.id],
      name: "images_variant_id_fkey",
    })
      .onUpdate("cascade")
      .onDelete("cascade"),
    pgPolicy("allow delete access based on role", {
      as: "permissive",
      for: "delete",
      to: ["authenticated"],
      using: sql`authorize('product_variants.delete'::text)`,
    }),
    pgPolicy("allow update access based on role", {
      as: "permissive",
      for: "update",
      to: ["authenticated"],
    }),
    pgPolicy("allow insert access based on role", {
      as: "permissive",
      for: "insert",
      to: ["authenticated"],
    }),
    pgPolicy("allow read access to everyone", {
      as: "permissive",
      for: "select",
      to: ["public"],
    }),
  ]
);

export const colors = pgTable(
  "colors",
  {
    id: integer().primaryKey().generatedByDefaultAsIdentity({
      name: "colors_id_seq",
      startWith: 1,
      increment: 1,
      minValue: 1,
      maxValue: 2147483647,
      cache: 1,
    }),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
    name: text().notNull(),
    type: text().notNull(),
  },
  (table) => [
    pgPolicy("allow read access to everyone", {
      as: "permissive",
      for: "select",
      to: ["public"],
      using: sql`true`,
    }),
  ]
);

export const orderItems = pgTable(
  "order_items",
  {
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity({
      name: "order_items_id_seq",
      startWith: 1,
      increment: 1,
      minValue: 1,
      maxValue: 9223372036854775807,
      cache: 1,
    }),
    quantity: integer(),
    unitPrice: integer("unit_price"),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    orderId: bigint("order_id", { mode: "number" }).notNull(),
    item: jsonb().notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.orderId],
      foreignColumns: [orders.id],
      name: "order_items_order_id_fkey",
    })
      .onUpdate("cascade")
      .onDelete("cascade"),
    pgPolicy("allow access to everyone", {
      as: "permissive",
      for: "all",
      to: ["public"],
      using: sql`true`,
      withCheck: sql`true`,
    }),
    pgPolicy("allow access on order items", {
      as: "permissive",
      for: "insert",
      to: ["public"],
    }),
  ]
);

export const products = pgTable(
  "products",
  {
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity({
      name: "products_id_seq",
      startWith: 1,
      increment: 1,
      minValue: 1,
      maxValue: 9223372036854775807,
      cache: 1,
    }),
    title: text().notNull(),
    description: text(),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
    published: boolean().default(true).notNull(),
    slug: text(),
    attributes: jsonb().default({}).notNull(),
    productType: productType("product_type").default("glasses").notNull(),
  },
  (table) => [
    pgPolicy("allow delete access on products based on role", {
      as: "permissive",
      for: "delete",
      to: ["public"],
      using: sql`authorize('products.delete'::text)`,
    }),
    pgPolicy("allow read access on products based on role", {
      as: "permissive",
      for: "select",
      to: ["public"],
    }),
    pgPolicy("allow update access on products based on role", {
      as: "permissive",
      for: "update",
      to: ["public"],
    }),
    pgPolicy("allow insert access on products based on role", {
      as: "permissive",
      for: "insert",
      to: ["public"],
    }),
  ]
);

export const collectionProducts = pgTable(
  "collection_products",
  {
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    collectionId: bigint("collection_id", { mode: "number" }).notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    productId: bigint("product_id", { mode: "number" }).notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.collectionId],
      foreignColumns: [collections.id],
      name: "collection_products_collection_id_fkey",
    })
      .onUpdate("cascade")
      .onDelete("cascade"),
    foreignKey({
      columns: [table.productId],
      foreignColumns: [products.id],
      name: "collection_products_product_id_fkey",
    })
      .onUpdate("cascade")
      .onDelete("cascade"),
    primaryKey({
      columns: [table.collectionId, table.productId],
      name: "collection_products_pkey",
    }),
  ]
);

export const productCategories = pgTable(
  "product_categories",
  {
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    productId: bigint("product_id", { mode: "number" }).notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    categoryId: bigint("category_id", { mode: "number" }).notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.categoryId],
      foreignColumns: [categories.id],
      name: "product_categories_category_id_fkey",
    })
      .onUpdate("cascade")
      .onDelete("cascade"),
    foreignKey({
      columns: [table.productId],
      foreignColumns: [products.id],
      name: "product_categories_product_id_fkey",
    })
      .onUpdate("cascade")
      .onDelete("cascade"),
    primaryKey({
      columns: [table.productId, table.categoryId],
      name: "product_categories_pkey",
    }),
    pgPolicy("allow access to everyone", {
      as: "permissive",
      for: "all",
      to: ["public"],
      using: sql`true`,
      withCheck: sql`true`,
    }),
  ]
);

export const rolePermissions = pgTable(
  "role_permissions",
  {
    roleId: integer("role_id").notNull(),
    permissionId: integer("permission_id").notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.permissionId],
      foreignColumns: [permissions.id],
      name: "role_permissions_permission_id_fkey",
    })
      .onUpdate("cascade")
      .onDelete("cascade"),
    foreignKey({
      columns: [table.roleId],
      foreignColumns: [roles.id],
      name: "role_permissions_role_id_fkey",
    })
      .onUpdate("cascade")
      .onDelete("cascade"),
    primaryKey({
      columns: [table.roleId, table.permissionId],
      name: "role_permissions_pkey",
    }),
  ]
);
export const productVariantsWithImages = pgView(
  "product_variants_with_images",
  {
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    id: bigint({ mode: "number" }),
    imageUrl: text("image_url"),
    price: integer(),
    quantityInStock: integer("quantity_in_stock"),
    attributes: jsonb(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    productId: bigint("product_id", { mode: "number" }),
  }
)
  .with({ securityInvoker: true })
  .as(
    sql`SELECT pv.id, i.path AS image_url, pv.price, pv.quantity_in_stock, pv.attributes, pv.product_id FROM product_variants pv LEFT JOIN images i ON i.variant_id = pv.id AND i.product_id = pv.product_id`
  );

export const productsWithVariants = pgView("products_with_variants", {
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  id: bigint({ mode: "number" }),
  title: text(),
  description: text(),
  published: boolean(),
  slug: text(),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" }),
  productType: productType("product_type"),
  variants: json(),
}).as(
  sql`SELECT p.id, p.title, p.description, p.published, p.slug, p.created_at, p.product_type, json_agg(json_build_object('id', pv.id, 'image_url', pv.image_url, 'price', pv.price, 'quantity_in_stock', pv.quantity_in_stock, 'attributes', pv.attributes)) AS variants FROM products p LEFT JOIN product_variants_with_images pv ON pv.product_id = p.id GROUP BY p.id HAVING count(pv.*) > 0`
);

export const glasses = pgView("glasses", {
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  id: bigint({ mode: "number" }),
  title: text(),
  description: text(),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" }),
  published: boolean(),
  slug: text(),
  attributes: jsonb(),
  productType: productType("product_type"),
  type: jsonb(),
  categories: jsonb(),
})
  .with({ securityInvoker: true })
  .as(
    sql`SELECT id, title, description, created_at, published, slug, attributes, product_type, ( SELECT jsonb_build_object('id', c.id, 'name', c.name) AS jsonb_build_object FROM categories c JOIN product_categories pc ON pc.category_id = c.id WHERE pc.product_id = p.id AND c.parent_category IS NULL LIMIT 1) AS type, COALESCE(( SELECT jsonb_agg(jsonb_build_object('id', c.id, 'name', c.name)) AS jsonb_agg FROM categories c JOIN product_categories pc ON pc.category_id = c.id WHERE pc.product_id = p.id AND c.parent_category IS NOT NULL), '[]'::jsonb) AS categories FROM products p`
  );
