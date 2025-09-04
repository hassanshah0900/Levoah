export const runtime = "edge";
export const dynamic = "force-dynamic";

import React from "react";
import ProductsGrid from "./products/components/ProductsGrid";

export default function HomePage() {
  return (
    <div>
      <ProductsGrid />
    </div>
  );
}
