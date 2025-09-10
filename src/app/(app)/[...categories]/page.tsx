export const runtime = "edge";

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";
import { getCategoryBySlug, getProductsWithVariants } from "./lib/queries";
import ProductsGrid from "./components/ProductsGrid";
import { PAGE_SIZE } from "./lib/data";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ categorySlug: string; productType: string }>;
}) {
  const { categorySlug, productType } = await params;

  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchInfiniteQuery({
      queryKey: ["products with variants", categorySlug, productType],
      queryFn: ({ pageParam }) =>
        getProductsWithVariants({
          pageIndex: pageParam,
          pageSize: PAGE_SIZE,
          categorySlug,
        }),
      initialPageParam: 0,
    }),

    queryClient.prefetchQuery({
      queryKey: ["categories", categorySlug],
      queryFn: () => getCategoryBySlug(categorySlug),
    }),
  ]);

  const state = dehydrate(queryClient);

  return (
    <HydrationBoundary state={state}>
      <ProductsGrid />
    </HydrationBoundary>
  );
}
