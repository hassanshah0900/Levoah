export const runtime = "edge";

import Container from "@/components/Container";
import { Suspense } from "react";
import RelatedProducts from "../../components/RelatedProducts";
import RelatedProductsSectionSkeleton from "../../components/RelatedProductsSkeleton";
import SingleProduct from "../../components/SingleProduct";
import SingleProductPageSkeleton from "../../components/SingleProductSkeleton";
import { getProductWithVariants } from "../../lib/queries";
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
      <Suspense fallback={<RelatedProductsSectionSkeleton />}></Suspense>
      <RelatedProductsServer slug={slug} />
    </Container>
  );
}

async function SingleProductServer({ slug }: { slug: string }) {
  const product = await getProductWithVariants(slug);

  return <SingleProduct product={product} />;
}

async function RelatedProductsServer({ slug }: { slug: string }) {
  const relatedProducts = await getRelatedProductsWithVariants(slug);

  return <div></div>;
}
