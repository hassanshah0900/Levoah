import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { parseAsStringEnum, useQueryState } from "nuqs";

const items = [
  { id: "price_asc", label: "Price (high to low)" },
  { id: "price_desc", label: "Price (low to high)" },
  { id: "newest", label: "Newest First" },
  { id: "popular", label: "Top Sellers" },
] as const;

type SortType = (typeof items)[number]["id"];

export default function ProductsSorter() {
  const [sort, setSort] = useQueryState(
    "sort",
    parseAsStringEnum([
      "price_asc",
      "price_desc",
      "newest",
      "popular",
    ]).withDefault("popular")
  );
  return (
    <Select
      defaultValue={"popular"}
      onValueChange={(value) => setSort(value as SortType)}
    >
      <SelectTrigger>
        Sort by:{" "}
        <span className="uppercase font-semibold">
          {items.find((item) => item.id === sort)?.label}
        </span>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {items.map((item) => (
            <SelectItem key={item.id} value={item.id} className="uppercase">
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
