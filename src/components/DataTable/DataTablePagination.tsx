import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Button } from "../ui/button";
import { Table } from "@tanstack/react-table";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";

const PAGE_SIZES = [10, 20, 30, 40, 50];

interface Props<TData> {
  table: Table<TData>;
  pageSizes?: number[];
}
export default function DataTablePagination<TData>({
  table,
  pageSizes = PAGE_SIZES,
}: Props<TData>) {
  return (
    <div className="flex justify-between items-start text-sm">
      <p className="text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} 0f{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected
      </p>

      <div className="flex justify-center items-center gap-10">
        <div className="flex justify-center items-center gap-2">
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
        <div className="font-semibold">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>
        <div className="flex justify-center items-center gap-2">
          <Button
            variant={"outline"}
            size={"icon"}
            onClick={() => table.firstPage()}
            disabled={!table.getCanPreviousPage()}
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
          >
            <ChevronsRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
