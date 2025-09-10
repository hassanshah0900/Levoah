export const runtime = "edge";

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import ProductsGrid from "./components/ProductsGrid";
import { PAGE_SIZE } from "./lib/data";
import { getCategoryBySlug, getProductsWithVariants } from "./lib/queries";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ categories: string[] }>;
}) {
  const { categories } = await params;
  const categoryPath = categories.reduce((acc, curr) => acc + `/${curr}`, "");
  const categorySlug = categories[categories.length - 1];

  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchInfiniteQuery({
      queryKey: ["products with variants", categoryPath],
      queryFn: ({ pageParam }) =>
        getProductsWithVariants({
          pageIndex: pageParam,
          pageSize: PAGE_SIZE,
          categoryPath,
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
