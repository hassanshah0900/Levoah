import Image from "next/image";
import React, {
  ComponentPropsWithoutRef,
  ComponentPropsWithRef,
  useRef,
  useState,
} from "react";
import placeholderImage from "../../public/images/image-placeholder.webp";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface Props extends ComponentPropsWithoutRef<"input"> {
  imgUrl?: string;
  rounded?: boolean;
}
export default function ImageInput({
  imgUrl,
  rounded = true,
  ...props
}: Props) {
  const [selectedImg, setSelectedImg] = useState<string | null>(imgUrl ?? null);
  const ref = useRef<HTMLInputElement>(null);
  return (
    <div>
      <div
        className={cn(
          "relative w-60 aspect-square overflow-hidden",
          rounded && "rounded-md"
        )}
        onClick={() => ref.current?.click()}
      >
        <Image
          src={selectedImg ?? placeholderImage}
          alt=""
          fill
          className="object-center object-cover"
        />
        {selectedImg && (
          <Button
            variant={"destructive"}
            onClick={(e) => {
              setSelectedImg(null);
              e.stopPropagation();
              if (ref.current) ref.current.value = "";
            }}
            className={cn(
              "absolute top-1/2 left-1/2 -translate-1/2 hover:opacity-100 opacity-0 transition-all"
            )}
          >
            Remove
          </Button>
        )}
      </div>
      <input
        type="file"
        className="opacity-0 w-0 h-0 overflow-hidden"
        ref={ref}
        {...props}
        onChange={(e) => {
          const file = e.currentTarget?.files?.item(0);
          if (file) {
            setSelectedImg(URL.createObjectURL(file));
          }
        }}
      />
    </div>
  );
}
