"use client";

import { createDataTableFiltersParsers } from "@/lib/dataTableUtils";
import { createSortingStateParser } from "@/lib/parsers";
import {
  ColumnFiltersState,
  getCoreRowModel,
  getPaginationRowModel,
  PaginationState,
  SortingState,
  TableOptions,
  Updater,
  useReactTable,
} from "@tanstack/react-table";
import { parseAsInteger, useQueryState, useQueryStates } from "nuqs";
import { TransitionFunction, useState } from "react";

type ColumnFilterValue = string | string[] | Date[];
interface Props<TData>
  extends Omit<
    TableOptions<TData>,
    | "getCoreRowModel"
    | "manualSorting"
    | "manualFiltering"
    | "manualPagination"
    | "state"
  > {
  history?: "replace" | "push";
  shallow?: boolean;
  scroll?: boolean;
  throttleMs?: number;
  startTransition?: TransitionFunction;
}
export function useDataTable<TData>({
  history = "replace",
  shallow = false,
  scroll = false,
  throttleMs,
  startTransition,
  initialState,
  columns,
  ...props
}: Props<TData>) {
  const queryStateOptions = {
    history,
    shallow,
    scroll,
    throttleMs,
    startTransition,
  };

  const [pageIndex, setPageIndex] = useQueryState(
    "pageIndex",
    parseAsInteger
      .withOptions(queryStateOptions)
      .withDefault(initialState?.pagination?.pageIndex ?? 0)
  );

  const [pageSize, setPageSize] = useQueryState(
    "pageSize",
    parseAsInteger
      .withOptions(queryStateOptions)
      .withDefault(initialState?.pagination?.pageSize ?? 10)
  );

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex,
    pageSize,
  });

  const onPaginationChange = (updaterOrValue: Updater<PaginationState>) => {
    setPagination((prevPagination) => {
      const newPagination =
        typeof updaterOrValue === "function"
          ? updaterOrValue(prevPagination)
          : updaterOrValue;
      setPageIndex(newPagination.pageIndex);
      setPageSize(newPagination.pageSize);
      return newPagination;
    });
  };

  const columnIds = new Set(
    columns.map((column) => column.id).filter(Boolean) as string[]
  );
  const [sorting, setSorting] = useQueryState(
    "sorting",
    createSortingStateParser(columnIds)
      .withOptions(queryStateOptions)
      .withDefault(initialState?.sorting ?? [])
  );

  const onSortingChange = (updaterOrValue: Updater<SortingState>) => {
    const newSorting =
      typeof updaterOrValue === "function"
        ? updaterOrValue(sorting)
        : updaterOrValue;
    setSorting(newSorting);
  };

  const filtersParsers = createDataTableFiltersParsers(columns);

  const [filters, setFilters] = useQueryStates(
    filtersParsers,
    queryStateOptions
  );

  const initialColumnFiltersState = Object.entries(
    filters
  ).reduce<ColumnFiltersState>((acc, [key, value]) => {
    if (value) {
      acc.push({ id: key, value });
    }
    return acc;
  }, []);

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    initialColumnFiltersState
  );

  const onColumnFiltersChange = (
    updaterOrValue: Updater<ColumnFiltersState>
  ) => {
    setColumnFilters((prevColumnFilters) => {
      const newColumnFilters =
        typeof updaterOrValue === "function"
          ? updaterOrValue(prevColumnFilters)
          : updaterOrValue;

      const newFilters = { ...filters };

      for (let filter of newColumnFilters) {
        if (
          columns.find(
            (column) => filter.id === column.id && column.enableColumnFilter
          )
        )
          newFilters[filter.id] = filter.value as ColumnFilterValue;
      }

      for (let filter of prevColumnFilters) {
        if (
          !newColumnFilters.find(
            (columnFilter) => columnFilter.id === filter.id
          )
        )
          newFilters[filter.id] = null;
      }

      setFilters(newFilters);

      table.resetPageIndex();

      return newColumnFilters;
    });
  };

  const table = useReactTable({
    ...props,
    columns,
    initialState,
    state: {
      pagination,
      sorting,
      columnFilters,
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange,
    onSortingChange,
    onColumnFiltersChange,
    manualFiltering: true,
    manualSorting: true,
    manualPagination: true,
  });

  return { table };
}
