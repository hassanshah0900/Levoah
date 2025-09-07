export const runtime = "edge";

import Container from "@/components/Container";
import SingleProduct from "../../components/SingleProduct";
import { Suspense } from "react";
import SingleProductPageSkeleton from "../../components/SingleProductSkeleton";

export default async function ProductPage() {
  return (
    <Container>
      <Suspense fallback={<SingleProductPageSkeleton />}>
        <SingleProduct />
      </Suspense>
    </Container>
  );
}
