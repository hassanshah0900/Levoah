import { getProductImageUrl } from "@/app/dashboard/products/lib/utils";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { ComponentProps } from "react";

interface Props extends ComponentProps<typeof Image> {
  src: string;
}
export default function ProductImage({ src, className, ...props }: Props) {
  return (
    <div
      className={cn("relative w-full aspect-square overflow-hidden", className)}
    >
      <Image
        {...props}
        src={getProductImageUrl(src) || "/public/images/image-placeholder.webp"}
        fill
        className="object-cover object-center"
      />
    </div>
  );
}
