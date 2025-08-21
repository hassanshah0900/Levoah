import { Column, ColumnDef } from "@tanstack/react-table";
import {
  Parser,
  parseAsArrayOf,
  parseAsString,
  parseAsTimestamp,
} from "nuqs/server";
import { CSSProperties } from "react";

export function getCommonPinningStyles<TData>(
  column: Column<TData>
): CSSProperties {
  const isPinned = column.getIsPinned();

  return {
    position: isPinned ? "sticky" : "relative",
    right: isPinned === "right" ? `${column.getAfter()}px` : undefined,
    left: isPinned === "left" ? `${column.getStart()}px` : undefined,
    zIndex: isPinned ? 1 : 0,
    opacity: isPinned ? 0.97 : 1,
    background: "var(--color-background)",
    width: column.getSize(),
  };
}

export function createDataTableFiltersParsers<TData, TValue = unknown>(
  columns: ColumnDef<TData, TValue>[]
) {
  const filterableColumns = columns.filter(
    (column) => column.enableColumnFilter
  );

  return filterableColumns.reduce<
    Record<string, Parser<string> | Parser<string[]> | Parser<Date[]>>
  >((acc, column) => {
    if (column.meta?.options) {
      acc[column.id ?? ""] = parseAsArrayOf(parseAsString);
    } else if (column.meta?.variant === "DATE_RANGE") {
      acc[column.id ?? ""] = parseAsArrayOf(parseAsTimestamp);
    } else {
      acc[column.id ?? ""] = parseAsString;
    }
    return acc;
  }, {});
}
