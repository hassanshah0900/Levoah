import { createClient } from "@supabase/supabase-js";
import imageCompression from "browser-image-compression";
import { clsx, type ClassValue } from "clsx";
import { toast } from "sonner";
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

export async function compressImage(
  file: File,
  imageType: "product" | "banner" = "product"
) {
  if (!file) return;
  try {
    return await imageCompression(file, {
      maxWidthOrHeight: imageType ? 2000 : 2200,
      fileType: "image/webp",
      initialQuality: 0.8,
    });
  } catch (error) {
    toast.error("Coudn't compress image.");
  }
}

export function getImagePublicUrl(
  url: string,
  storageName: "Product Images" | "Banners" = "Product Images"
) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  );
  const {
    data: { publicUrl },
  } = supabase.storage.from(storageName).getPublicUrl(url);
  return publicUrl;
}

const dateFormatter = new Intl.DateTimeFormat("en-PK", {
  hourCycle: "h12",
  year: "numeric",
  month: "long",
  day: "numeric",
});

export function formatDate(date: Date) {
  return dateFormatter.format(date);
}

export function isValidDate(date: Date) {
  return !isNaN(date.getTime());
}

function snakeToCamel(str: string): string {
  return str.replace(/_([a-z])/g, (_, char: string) => char.toUpperCase());
}

export function toCamelCase<T extends Record<string, any>>(obj: T): any {
  if (!obj) return null;
  if (Array.isArray(obj)) {
    return obj.map((v) => toCamelCase(v));
  } else if (obj !== null && obj.constructor === Object) {
    return Object.keys(obj).reduce((result: any, key) => {
      const camelKey = snakeToCamel(key);
      result[camelKey] = toCamelCase(obj[key]);
      return result;
    }, {});
  }
  return obj;
}

function camelToSnake(str: string): string {
  return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}

export function toSnakeCase<T>(obj: T): any {
  if (obj === null || obj === undefined) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => toSnakeCase(item));
  } else if (typeof obj === "object" && obj.constructor === Object) {
    return Object.keys(obj).reduce((result: Record<string, any>, key) => {
      const snakeKey = camelToSnake(key);
      result[snakeKey] = toSnakeCase((obj as Record<string, any>)[key]);
      return result;
    }, {});
  }

  return obj;
}
