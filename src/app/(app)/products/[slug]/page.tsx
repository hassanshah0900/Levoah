import Container from "@/components/Container";
import { Suspense } from "react";
import { getRelatedProductsWithVariants } from "./lib/queries";
import SingleProduct from "../../[...categories]/components/SingleProduct";
import RelatedProducts from "../../[...categories]/components/RelatedProducts";
import { getProductWithVariants } from "../../[...categories]/lib/queries";
import RelatedProductsSectionSkeleton from "../../[...categories]/components/RelatedProductsSkeleton";
import SingleProductSkeleton from "../../[...categories]/components/SingleProductSkeleton";

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
  const relatedProducts = await getRelatedProductsWithVariants(slug);

  // return <RelatedProducts products={relatedProducts} />;
  return <div></div>;
}
