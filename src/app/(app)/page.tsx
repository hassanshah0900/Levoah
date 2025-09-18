export const dynamic = "force-dynamic";

import React from "react";
import ProductsGrid from "./[...categories]/components/ProductsGrid";

export default function HomePage() {
  return (
    <div>
      <ProductsGrid />
    </div>
  );
}
