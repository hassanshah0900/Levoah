import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(text: string) {
  if (!text) return "";
  return text
    .trim()
    .toLowerCase()
    .replace(/[\s\W-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getNextPageIndex(
  currentPageIndex: number,
  numberOfRows: number,
  pageSize: number
) {
  const numberofPages = Math.ceil(numberOfRows / pageSize);
  const lastPageIndex = numberofPages - 1;

  if (currentPageIndex < lastPageIndex) return currentPageIndex + 1;
}
