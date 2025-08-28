import Container from "@/components/Container";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import SingleProduct from "../../components/SingleProduct";
import { getProductWithVariants } from "../../lib/queries";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["single product with variants", { slug }],
    queryFn: () => getProductWithVariants(slug),
  });

  const state = dehydrate(queryClient);

  return (
    <HydrationBoundary state={state}>
      <Container>
        <SingleProduct slug={slug} />
      </Container>
    </HydrationBoundary>
  );
}
