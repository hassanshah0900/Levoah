export const runtime = "edge";

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import ProductVariantsTable from "../components/ProductVariantsTable";
import { getAllProductVariants } from "../lib/queries";

export default async function DashboardProductPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const resolvedParams = await params;
  const productId = parseInt(resolvedParams.productId);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["product_variants", productId],
    queryFn: () => getAllProductVariants({ productId }),
  });

  const state = dehydrate(queryClient);

  return (
    <HydrationBoundary state={state}>
      <ProductVariantsTable productId={productId} />
    </HydrationBoundary>
  );
}
