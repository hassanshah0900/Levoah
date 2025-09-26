import { collections, conditions } from "@/db/drizzle/schema";
import {
  and,
  AnyColumn,
  eq,
  gt,
  gte,
  ilike,
  lt,
  lte,
  ne,
  not,
  or,
  sql,
} from "drizzle-orm";

type Condition = Omit<
  typeof conditions.$inferSelect,
  "createdAt" | "collectionId"
>;

export function filter(
  conditions: Condition[],
  joinOperator: "and" | "or",
  table: Record<string, any>
) {
  const joinFn = joinOperator === "and" ? and : or;

  const filters = conditions.map((condition) => {
    const { key, property } = parseJsonColumnName(condition.field);
    const column = getColumn(table, key);

    switch (condition.relation) {
      case "eq":
        if (condition.variant === "date") {
          const start = new Date(Number(condition.value));
          start.setHours(0, 0, 0, 0);
          const end = new Date(start);
          end.setHours(23, 59, 59, 999);
          return and(gt(column, start), lt(column, end));
        }
        return column
          ? column.dataType === "json"
            ? sql`${column} ->> ${property} = ${condition.value}`
            : eq(column, condition.value)
          : undefined;
      case "ne":
        if (condition.variant === "date") {
          const start = new Date(Number(condition.value));
          start.setHours(0, 0, 0, 0);
          const end = new Date(start);
          end.setHours(23, 59, 59, 999);
          return or(lt(column, start), gt(column, end));
        }
        return column
          ? column.dataType === "json"
            ? sql`${column} ->> ${property} != ${condition.value}`
            : ne(column, condition.value)
          : undefined;
      case "lt":
        if (condition.variant === "date") {
          const date = new Date(Number(condition.value));
          date.setHours(0, 0, 0, 0);
          return lt(column, date);
        }
        return lt(column, condition.value);
      case "lte":
        if (condition.variant === "date") {
          const date = new Date(Number(condition.value));
          date.setHours(23, 59, 59, 999);
          return lte(column, date);
        }
        return lte(column, condition.value);
      case "gt":
        if (condition.variant === "date") {
          const date = new Date(Number(condition.value));
          date.setHours(23, 59, 59, 999);
          return gt(column, date);
        }
        return gt(column, condition.value);
      case "gte":
        if (condition.variant === "date") {
          const date = new Date(Number(condition.value));
          date.setHours(0, 0, 0, 0);
          return gte(column, date);
        }
        return gte(column, condition.value);
      case "sw":
        return ilike(column, `${condition.value}%`);
      case "ew":
        return ilike(column, `%${condition.value}`);
      case "c":
        column
          ? column.dataType === "json"
            ? sql`${column} ->> ${property} ILIKE %${condition.value}%`
            : ilike(column, `%${condition.value}%`)
          : undefined;
      case "nc":
        column
          ? column.dataType === "json"
            ? sql`${column} ->> ${property} NOT ILIKE %${condition.value}%`
            : not(ilike(column, `%${condition.value}%`))
          : undefined;
    }
  });

  const validFilters = filters.filter(Boolean);
  return joinFn(...validFilters);
}

function getColumn(table: Record<string, any>, columnKey: string) {
  return table[columnKey] as AnyColumn;
}

function parseJsonColumnName(columnName: string) {
  const result = columnName.split(".");
  const key = result[0];
  const property = result[1];
  return { key, property };
}

const column = collections["id"];
column.dataType;
