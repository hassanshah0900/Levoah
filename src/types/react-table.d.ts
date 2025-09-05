import "@tanstack/react-table"; //or vue, svelte, solid, qwik, etc.
import { Component } from "react";

declare module "@tanstack/react-table" {
  interface ColumnMeta<TData extends RowData, TValue> {
    label?: string;
    options: {
      value: string;
      label: string;
      icon?: FC<SVGProps<SVGSVGElement>>;
    }[];
    variant: "MULTI_SELECT" | "DATE_RANGE";
  }
}
