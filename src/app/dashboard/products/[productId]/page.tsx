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
  params: Promise<{ productId: number }>;
}) {
  const { productId } = await params;
  console.log(productId);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["product_variants", { productId }],
    queryFn: () => getAllProductVariants({ productId }),
  });

  const state = dehydrate(queryClient);

  return (
    <HydrationBoundary state={state}>
      <ProductVariantsTable productId={productId} />
    </HydrationBoundary>
  );
}
