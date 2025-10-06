import { cn, getImagePublicUrl } from "@/lib/utils";
import Image from "next/image";
import { ComponentProps } from "react";

interface Props extends Omit<ComponentProps<typeof Image>, "src"> {
  src?: string | null;
}
export default function ProductImage({ src, className, ...props }: Props) {
  return (
    <div
      className={cn("relative w-full aspect-square overflow-hidden", className)}
    >
      <Image
        {...props}
        src={src ? getImagePublicUrl(src) : "/images/image-placeholder.webp"}
        fill
        className="object-cover object-center"
        sizes="(max-width: 430px) 100vw, (max-width: 640px) 50vw, (max-width: 768px) 33.33vw, (max-width: 1100px) 25vw, 280px"
      />
    </div>
  );
}
