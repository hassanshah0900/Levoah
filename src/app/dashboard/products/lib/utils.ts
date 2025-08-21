import { createClient } from "@/supabase/client";

export function getProductImageUrl(url: string) {
  const supabase = createClient();
  const {
    data: { publicUrl },
  } = supabase.storage.from("Product Images").getPublicUrl(url);
  return publicUrl;
}

export function calculatePercentage(
  numerator: number,
  denominator: number
): string {
  return `${Math.ceil((numerator / denominator) * 100)}%`;
}
