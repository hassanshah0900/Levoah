export const runtime = "edge";

import Container from "@/components/Container";
import { Suspense } from "react";
import RelatedProducts from "../../../[...categories]/components/RelatedProducts";
import RelatedProductsSectionSkeleton from "../../../[...categories]/components/RelatedProductsSkeleton";
import SingleProduct from "../../../[...categories]/components/SingleProduct";
import SingleProductPageSkeleton from "../../../[...categories]/components/SingleProductSkeleton";
import { getProductWithVariants } from "../../../[...categories]/lib/queries";
import { getRelatedProductsWithVariants } from "./lib/queries";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <Container>
      <Suspense fallback={<SingleProductPageSkeleton />}>
        <SingleProductServer slug={slug} />
      </Suspense>
      <Suspense fallback={<RelatedProductsSectionSkeleton />}>
        <RelatedProductsServer slug={slug} />
      </Suspense>
    </Container>
  );
}

async function SingleProductServer({ slug }: { slug: string }) {
  const product = await getProductWithVariants(slug);

  return <SingleProduct product={product} />;
}

async function RelatedProductsServer({ slug }: { slug: string }) {
  const relatedProducts = await getRelatedProductsWithVariants(slug);

  return <RelatedProducts products={relatedProducts} />;
}
