import { columns } from "./columns";

export const subcategoriesColumns = columns.filter(
  (column) => column.id !== "Subcategories"
);
