import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import imageCompression from "browser-image-compression";
import { toast } from "sonner";

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

export async function compressImage(file: File) {
  if (!file) return;
  try {
    return await imageCompression(file, {
      maxWidthOrHeight: 2000,
      fileType: "image/webp",
      initialQuality: 0.8,
    });
  } catch (error) {
    toast.error("Coudn't compress image.");
  }
}
