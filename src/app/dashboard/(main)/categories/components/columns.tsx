import DataTableColumnHeader from "@/components/DataTable/DataTableColumnHeader";
import { Checkbox } from "@/components/ui/checkbox";
import { createColumnHelper } from "@tanstack/react-table";
import CategoriesTableRowActions from "./CategoriesTableRowActions";
import { Category } from "../lib/types";
import ProductImage from "@/app/(app)/[...categories]/components/ProductImage";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { useParams } from "next/navigation";

const columnHelper = createColumnHelper<Category>();

export const columns = [
  columnHelper.display({
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(checked) =>
          table.toggleAllPageRowsSelected(!!checked)
        }
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        className="mr-2"
        checked={row.getIsSelected()}
        onCheckedChange={(checked) => row.toggleSelected(!!checked)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableColumnFilter: false,
    enableHiding: false,
  }),
  columnHelper.accessor("image_url", {
    id: "Image",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Image" />
    ),
    cell: ({ getValue }) => (
      <ProductImage src={getValue()} alt="" className="w-20" />
    ),
    enableSorting: false,
    enableColumnFilter: false,
  }),
  columnHelper.accessor("name", {
    id: "Name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ getValue }) => <div className="ml-3">{getValue()}</div>,
  }),
  columnHelper.accessor("slug", {
    id: "Slug",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Slug" />
    ),
    cell: ({ getValue }) => <div className="ml-3">{getValue()}</div>,
  }),
  columnHelper.accessor("parent_category", {
    id: "Parent Category",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Parent Category" />
    ),
    cell: () => {
      const { slug } = useParams<{ slug: string }>();
      return <div className="ml-3 capitalize">{slug ? slug : "No Parent"}</div>;
    },
  }),
  columnHelper.accessor("product_type", {
    id: "Product Type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Product Type" />
    ),
    cell: ({ getValue }) => <div className="ml-3 capitalize">{getValue()}</div>,
    size: 250,
  }),

  columnHelper.accessor("description", {
    id: "Description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ getValue }) => (
      <div className="ml-3 line-clamp-3">{getValue()}</div>
    ),
    size: 250,
  }),
  columnHelper.display({
    id: "Subcategories",
    cell: ({ row }) => (
      <Link
        href={`/dashboard/categories/${row.original.slug}`}
        className={buttonVariants({ variant: "link" })}
      >
        Subcategories
      </Link>
    ),
    enableColumnFilter: false,
    enableHiding: false,
    enableSorting: false,
  }),
  columnHelper.display({
    id: "actions",
    cell: ({ row }) => <CategoriesTableRowActions row={row} />,
    size: 50,
    enableColumnFilter: false,
    enableHiding: false,
    enableSorting: false,
  }),
];
