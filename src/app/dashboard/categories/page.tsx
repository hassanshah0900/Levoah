import React from "react";
import CategoriesTable from "./components/CategoriesTable";
import { getAllCategories } from "./lib/queries";

export default async function CategoriesPage() {
  const { data } = await getAllCategories();
  return (
    <div>
      <CategoriesTable categories={data} />
    </div>
  );
}
