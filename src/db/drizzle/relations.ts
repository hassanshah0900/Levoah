import { relations } from "drizzle-orm/relations";
import { products, productVariants, categories, collections, conditions, images, orders, orderItems, brands, collectionProducts, productCategories, permissions, rolePermissions, roles } from "./schema";

export const productVariantsRelations = relations(productVariants, ({one, many}) => ({
	product: one(products, {
		fields: [productVariants.productId],
		references: [products.id]
	}),
	images: many(images),
}));

export const productsRelations = relations(products, ({one, many}) => ({
	productVariants: many(productVariants),
	images: many(images),
	brand: one(brands, {
		fields: [products.brandId],
		references: [brands.id]
	}),
	collectionProducts: many(collectionProducts),
	productCategories: many(productCategories),
}));

export const categoriesRelations = relations(categories, ({one, many}) => ({
	category: one(categories, {
		fields: [categories.parentCategory],
		references: [categories.id],
		relationName: "categories_parentCategory_categories_id"
	}),
	categories: many(categories, {
		relationName: "categories_parentCategory_categories_id"
	}),
	productCategories: many(productCategories),
}));

export const conditionsRelations = relations(conditions, ({one}) => ({
	collection: one(collections, {
		fields: [conditions.collectionId],
		references: [collections.id]
	}),
}));

export const collectionsRelations = relations(collections, ({many}) => ({
	conditions: many(conditions),
	collectionProducts: many(collectionProducts),
}));

export const imagesRelations = relations(images, ({one}) => ({
	product: one(products, {
		fields: [images.productId],
		references: [products.id]
	}),
	productVariant: one(productVariants, {
		fields: [images.variantId],
		references: [productVariants.id]
	}),
}));

export const orderItemsRelations = relations(orderItems, ({one}) => ({
	order: one(orders, {
		fields: [orderItems.orderId],
		references: [orders.id]
	}),
}));

export const ordersRelations = relations(orders, ({many}) => ({
	orderItems: many(orderItems),
}));

export const brandsRelations = relations(brands, ({many}) => ({
	products: many(products),
}));

export const collectionProductsRelations = relations(collectionProducts, ({one}) => ({
	collection: one(collections, {
		fields: [collectionProducts.collectionId],
		references: [collections.id]
	}),
	product: one(products, {
		fields: [collectionProducts.productId],
		references: [products.id]
	}),
}));

export const productCategoriesRelations = relations(productCategories, ({one}) => ({
	category: one(categories, {
		fields: [productCategories.categoryId],
		references: [categories.id]
	}),
	product: one(products, {
		fields: [productCategories.productId],
		references: [products.id]
	}),
}));

export const rolePermissionsRelations = relations(rolePermissions, ({one}) => ({
	permission: one(permissions, {
		fields: [rolePermissions.permissionId],
		references: [permissions.id]
	}),
	role: one(roles, {
		fields: [rolePermissions.roleId],
		references: [roles.id]
	}),
}));

export const permissionsRelations = relations(permissions, ({many}) => ({
	rolePermissions: many(rolePermissions),
}));

export const rolesRelations = relations(roles, ({many}) => ({
	rolePermissions: many(rolePermissions),
}));