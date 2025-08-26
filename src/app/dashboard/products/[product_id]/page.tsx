import React from "react";
import ProductVariantsTable from "../components/ProductVariantsTable";
import { getAllProductVariants } from "../lib/queries";

export default async function DashboardProductPage({
  params,
}: {
  params: Promise<{ product_id: number }>;
}) {
  const { product_id } = await params;
  const { data: variants } = await getAllProductVariants(product_id);
  console.log(variants);

  return (
    <div>
      <ProductVariantsTable product_id={product_id} variants={variants || []} />
    </div>
  );
}
