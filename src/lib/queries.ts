"use server";

import { getProductsByCollection } from "@/app/(app)/collections/lib/queries";

export async function getSunglasses() {
  const { products, count } = await getProductsByCollection("sunglasses", {
    pageSize: 10,
    pageIndex: 0,
  });

  return products;
}

export async function getEyeglasses() {
  const { products, count } = await getProductsByCollection("eyeglasses", {
    pageSize: 10,
    pageIndex: 0,
  });

  return products;
}
