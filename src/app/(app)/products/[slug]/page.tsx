import Container from "@/components/Container";
import { Suspense } from "react";
import RelatedProductsSectionSkeleton from "../../[...categories]/components/RelatedProductsSkeleton";
import SingleProduct from "../components/SingleProduct";
import SingleProductSkeleton from "../components/SingleProductSkeleton";
import { getProductWithVariants } from "../../[...categories]/lib/queries";
import { getRelatedProductsWithVariants } from "./lib/queries";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <Container>
      <Suspense fallback={<SingleProductSkeleton />}>
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
  return <div></div>;
}
