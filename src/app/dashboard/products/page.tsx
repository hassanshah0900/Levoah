export const runtime = "edge";

import { SearchParams } from "nuqs/server";
import { getAllProducts } from "./lib/queries";
import ProductsTable from "./components/ProductsTable";
import { productsPageSearchParamsCache } from "./lib/validation";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { pageIndex, pageSize, sorting, title } =
    await productsPageSearchParamsCache.parse(searchParams);

  const { products, count } = await getAllProducts({
    filters: { pageIndex, pageSize, sorting, title },
  });
  console.log(products);

  return (
    <div>
      <ProductsTable products={products} rowCount={count ?? 0} />
    </div>
  );
}
