import DataTableColumnHeader from "@/components/DataTable/DataTableColumnHeader";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Product } from "@/types/products.types";
import { createColumnHelper } from "@tanstack/react-table";
import Link from "next/link";
import GlassesTableRowActions from "./GlassesTableRowActions";

const columnHelper = createColumnHelper<Product<"glasses">>();

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
    enableHiding: false,
  }),
  columnHelper.accessor("title", {
    id: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ getValue }) => <div className="ml-3">{getValue()}</div>,
    enableColumnFilter: true,
  }),
  columnHelper.accessor("slug", {
    header: ({ column }) => (
      <DataTableColumnHeader title="Slug" column={column} />
    ),
    cell: ({ getValue }) => (
      <div className="ml-3 whitespace-nowrap">{getValue()}</div>
    ),
  }),
  columnHelper.accessor("attributes.modelCode", {
    header: ({ column }) => (
      <DataTableColumnHeader title="Model" column={column} />
    ),
    cell: ({ getValue }) => (
      <div className="ml-3 whitespace-nowrap">{getValue()}</div>
    ),
    enableSorting: false,
  }),
  columnHelper.accessor("description", {
    id: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ getValue }) => (
      <div className="ml-3 line-clamp-3">{getValue()}</div>
    ),
    size: 250,
  }),
  columnHelper.accessor("published", {
    id: "published",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Published" />
    ),
    cell: ({ getValue }) => (
      <Badge variant={getValue() ? "default" : "secondary"} className="ml-2">
        {getValue() ? "Published" : "Draft"}
      </Badge>
    ),
    enableSorting: false,
  }),

  columnHelper.accessor("attributes.frameShape", {
    id: "Frame Shape",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Frame Shape" />
    ),
    cell: ({ getValue }) => (
      <Badge className="ml-3">{getValue() ?? "No Value"}</Badge>
    ),
    enableSorting: false,
  }),
  columnHelper.accessor("attributes.frameMaterial", {
    id: "Frame Material",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Frame Material" />
    ),
    cell: ({ getValue }) => (
      <Badge className="ml-3">{getValue() ?? "No Value"}</Badge>
    ),
    enableSorting: false,
  }),
  columnHelper.accessor("attributes.bridgeAndNosepads", {
    id: "Bridge & Nosepads",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Bridge & Nosepads" />
    ),
    cell: ({ getValue }) => (
      <Badge className="ml-3">{getValue() ?? "No Value"}</Badge>
    ),
    enableSorting: false,
  }),
  columnHelper.accessor("attributes.lenseWidth", {
    id: "Lense Width",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Lense Width" />
    ),
    cell: ({ getValue }) => (
      <div className="ml-3">{getValue() ? `${getValue()} mm` : "No Value"}</div>
    ),
    enableSorting: false,
  }),
  columnHelper.accessor("attributes.bridgeWidth", {
    id: "Bridge Width",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Bridge Width" />
    ),
    cell: ({ getValue }) => (
      <div className="ml-3">{getValue() ? `${getValue()} mm` : "No Value"}</div>
    ),
    enableSorting: false,
  }),
  columnHelper.accessor("attributes.templeLength", {
    id: "Temple Length",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Temple Length" />
    ),
    cell: ({ getValue }) => (
      <div className="ml-3">{getValue() ? `${getValue()} mm` : "No Value"}</div>
    ),
    enableSorting: false,
  }),
  columnHelper.accessor("category", {
    id: "Category",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
    cell: ({ getValue }) => <div className="ml-3">{getValue()?.name}</div>,
  }),
  columnHelper.accessor("brand", {
    id: "Brand",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Brand" />
    ),
    cell: ({ getValue }) => <div className="ml-3">{getValue()?.name}</div>,
  }),
  columnHelper.display({
    id: "variants_link",
    cell: ({ row }) => (
      <Link
        href={`/dashboard/glasses/${row.original.id}`}
        className={buttonVariants({ variant: "link" })}
      >
        Variants
      </Link>
    ),
    enableColumnFilter: false,
    enableHiding: false,
    enableSorting: false,
  }),
  columnHelper.display({
    id: "actions",
    cell: ({ row }) => <GlassesTableRowActions row={row} />,
    enablePinning: true,
    enableHiding: false,
    minSize: 50,
    size: 50,
  }),
];
