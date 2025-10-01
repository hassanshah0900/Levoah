import { cn, getImagePublicUrl } from "@/lib/utils";
import Image from "next/image";
import { ComponentProps } from "react";

interface Props extends Omit<ComponentProps<typeof Image>, "src"> {
  src?: string | null;
}
export default function BannerImage({ src, className, ...props }: Props) {
  return (
    <div
      className={cn("relative w-full aspect-video overflow-hidden", className)}
    >
      <Image
        {...props}
        src={
          src
            ? getImagePublicUrl(src, "Banners")
            : "/images/image-placeholder.webp"
        }
        fill
        className="object-cover object-center"
      />
    </div>
  );
}
