import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Button } from "../ui/button";
import { Table } from "@tanstack/react-table";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import { cn } from "@/lib/utils";

const PAGE_SIZES = [10, 20, 30, 40, 50];

interface Props<TData> {
  table: Table<TData>;
  pageSizes?: number[];
}
export default function DataTablePagination<TData>({
  table,
  pageSizes,
}: Props<TData>) {
  return (
    <div className="@container">
      <div className="flex flex-col @2xl:flex-row @2xl:items-center @2xl:justify-between text-sm gap-4">
        <SelectionInfo table={table} className="hidden @2xl:flex" />
        <div className="flex justify-between items-center @2xl:hidden">
          <SelectionInfo table={table} />
          <PageInfo table={table} />
        </div>
        <div className="flex justify-between items-center gap-4 @2xl:gap-10">
          <PageSizeSelector table={table} pageSizes={pageSizes} />
          <PageInfo table={table} className="hidden @2xl:flex" />
          <div className="flex justify-center items-center gap-2">
            <Button
              variant={"outline"}
              size={"icon"}
              onClick={() => table.firstPage()}
              disabled={!table.getCanPreviousPage()}
              className="hidden @2xl:flex"
            >
              <ChevronsLeft />
            </Button>
            <Button
              variant={"outline"}
              size={"icon"}
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeft />
            </Button>
            <Button
              variant={"outline"}
              size={"icon"}
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <ChevronRight />
            </Button>
            <Button
              variant={"outline"}
              size={"icon"}
              onClick={() => table.lastPage()}
              disabled={!table.getCanNextPage()}
              className="hidden @2xl:flex"
            >
              <ChevronsRight />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SelectionInfo<TData>({
  table,
  className,
}: Props<TData> & { className?: string }) {
  return (
    <p className={cn("text-muted-foreground", className)}>
      {table.getFilteredSelectedRowModel().rows.length} 0f{" "}
      {table.getFilteredRowModel().rows.length} row(s) selected
    </p>
  );
}

function PageInfo<TData>({
  table,
  className,
}: Props<TData> & { className?: string }) {
  return (
    <div className={cn("font-semibold", className)}>
      Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
    </div>
  );
}

function PageSizeSelector<TData>({
  table,
  pageSizes = PAGE_SIZES,
  className,
}: Props<TData> & { className?: string }) {
  return (
    <div className="flex items-center gap-2 ">
      <p className="font-semibold">Rows per page</p>
      <Select onValueChange={(value) => table.setPageSize(Number(value))}>
        <SelectTrigger className="pe-5">
          <p className="text-foreground">
            {table.getState().pagination.pageSize}
          </p>
        </SelectTrigger>
        <SelectContent>
          {pageSizes.map((pageSize) => (
            <SelectItem key={pageSize} value={pageSize.toString()}>
              {pageSize}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
