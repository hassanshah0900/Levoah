export const runtime = "edge";

import React from "react";
import CategoriesTable from "./components/CategoriesTable";
import { getAllCategories } from "./lib/queries";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function CategoriesPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });

  const state = dehydrate(queryClient);
  return (
    <HydrationBoundary state={state}>
      <CategoriesTable />
    </HydrationBoundary>
  );
}
