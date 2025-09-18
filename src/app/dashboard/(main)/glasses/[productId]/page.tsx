import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import GlassesVariantsTable from "../components/GlassesVariantsTable";
import { getAllGlassesVariants } from "../lib/queries";

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
    queryFn: () => getAllGlassesVariants({ productId }),
  });

  const state = dehydrate(queryClient);

  return (
    <HydrationBoundary state={state}>
      <GlassesVariantsTable productId={productId} />
    </HydrationBoundary>
  );
}
