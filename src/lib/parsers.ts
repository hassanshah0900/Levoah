import { SortingState } from "@tanstack/react-table";
import { createParser } from "nuqs/server";
import z from "zod";

const sortingItemSchema = z.object({
  id: z.string(),
  desc: z.boolean(),
});

export function createSortingStateParser(columnIds?: string[] | Set<string>) {
  const validFields = columnIds
    ? columnIds instanceof Set
      ? columnIds
      : new Set(columnIds)
    : null;
  return createParser<SortingState>({
    parse(value) {
      try {
        const parsedValue = JSON.parse(value);
        const result = z.array(sortingItemSchema).safeParse(parsedValue);
        if (!result.success) return null;

        if (
          validFields &&
          !result.data.some((item) => validFields.has(item.id))
        )
          return null;

        return result.data;
      } catch {
        return null;
      }
    },
    serialize(value) {
      return JSON.stringify(value);
    },
    eq(a, b) {
      return (
        a.length === b.length &&
        a.every(
          (item, idx) => b[idx].id === item.id && b[idx].desc === item.desc
        )
      );
    },
  });
}
