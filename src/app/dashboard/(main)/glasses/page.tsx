export const runtime = "edge";

import { SearchParams } from "nuqs/server";
import { getAllProducts } from "./lib/queries";
import GlassesTable from "./components/GlassesTable";
import { productsPageSearchParamsCache } from "./lib/validation";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { pageIndex, pageSize, sorting, title } =
    await productsPageSearchParamsCache.parse(searchParams);

  const { glasses, count } = await getAllProducts({
    filters: { pageIndex, pageSize, sorting, title },
  });

  return (
    <div>
      <GlassesTable glasses={glasses} rowCount={count ?? 0} />
    </div>
  );
}
