import { Skeleton } from "../ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

const DEFAULT_ROW_COUNT = 5;
const DEFAULT_COLUMN_COUNT = 5;
const DEFAULT_FILTER_COUNT = 0;

interface Props {
  columnCount?: number;
  rowCount?: number;
  filterCount?: number;
  cellWidths?: string[];
  hasPagination?: boolean;
  hasSearch?: boolean;
  hasColumnVisibilityToggler?: boolean;
  shouldShrink?: boolean;
}
export default function DataTableLoadingSkeleton({
  rowCount = DEFAULT_ROW_COUNT,
  columnCount = DEFAULT_COLUMN_COUNT,
  filterCount = DEFAULT_FILTER_COUNT,
  cellWidths = ["auto"],
  hasPagination = false,
  hasSearch = false,
  hasColumnVisibilityToggler = false,
  shouldShrink = false,
}: Props) {
  const processedCellWidths = Array.from(
    { length: columnCount },
    (_, idx) => cellWidths[idx % cellWidths.length] ?? "auto"
  );
  return (
    <div className="space-y-5 my-5 @container">
      <div className="flex justify-between items-center gap-5">
        <div className="flex justify-center items-center gap-2">
          {hasSearch && <Skeleton className="h-8 w-40" />}
          {Array.from({ length: filterCount }).map((_, idx) => (
            <Skeleton key={idx} className="h-8 w-20 border border-dashed" />
          ))}
        </div>
        {hasColumnVisibilityToggler && <Skeleton className="h-8 w-20" />}
      </div>
      <Table className="border ">
        <TableHeader>
          {Array.from({ length: 1 }).map((_, idx) => (
            <TableRow key={idx} className="hover:bg-transparent">
              {Array.from({ length: columnCount }).map((_, idx) => (
                <TableHead
                  key={idx}
                  style={{
                    width: processedCellWidths[idx],
                    minWidth: shouldShrink ? "auto" : processedCellWidths[idx],
                  }}
                >
                  <Skeleton className="h-8 w-full" />
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className="space-y-2">
          {Array.from({ length: rowCount }).map((_, idx) => (
            <TableRow key={idx} className="hover:bg-transparent">
              {Array.from({ length: columnCount }).map((_, idx) => (
                <TableCell
                  key={idx}
                  style={{
                    width: processedCellWidths[idx],
                    minWidth: shouldShrink ? "auto" : processedCellWidths[idx],
                  }}
                >
                  <Skeleton className="h-6 w-full" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {hasPagination && (
        <div>
          <div className="justify-between items-center hidden @2xl:flex">
            <Skeleton className="h-5 w-40 shrink-0" />
            <div className="flex justify-center items-center gap-10">
              <div className="flex justify-center items-center gap-2">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="w-12 h-8" />
              </div>
              <Skeleton className="h-5 w-20" />
              <div className="flex justify-center items-center gap-2">
                {Array.from({ length: 4 }).map((_, idx) => (
                  <Skeleton key={idx} className="size-8" />
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center gap-5 @2xl:hidden">
            <div className="space-y-4">
              <Skeleton className="h-5 w-40 shrink-0" />
              <div className="flex justify-start items-center gap-2">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="w-12 h-8" />
              </div>
            </div>
            <div className="space-y-4">
              <Skeleton className="h-5 w-20" />
              <div className="flex gap-2 justify-end">
                <Skeleton className="size-8" />
                <Skeleton className="size-8" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
