import { cn } from "@/lib/utils";
import Image from "next/image";
import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import placeholderImage from "../../public/images/image-placeholder.webp";
import { Button } from "./ui/button";

interface Props {
  imgUrl?: string;
  rounded?: boolean;
  shouldReset?: boolean;
  onChange: (file: File) => void;
}
export default function ImageInput({
  imgUrl,
  rounded = true,
  shouldReset = true,
  onChange,
}: Props) {
  const [selectedImg, setSelectedImg] = useState<string | null>(imgUrl ?? null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { formState } = useFormContext();

  function removeImage(e: MouseEvent) {
    setSelectedImg(null);
    e.stopPropagation();
    if (inputRef.current) inputRef.current.value = "";
  }

  function selectImage(e: ChangeEvent<HTMLInputElement>) {
    const file = e.currentTarget?.files?.item(0);
    if (file) {
      setSelectedImg(URL.createObjectURL(file));
      onChange(file);
    }
  }

  useEffect(() => {
    if (formState.isSubmitSuccessful && shouldReset) setSelectedImg(null);
  }, [formState.isSubmitted]);

  return (
    <div>
      <div
        className={cn(
          "relative w-60 aspect-square overflow-hidden group",
          rounded && "rounded-md"
        )}
        onClick={() => selectedImg || inputRef.current?.click()}
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
            onClick={removeImage}
            className={cn(
              "absolute top-1/2 left-1/2 -translate-1/2 group-hover:opacity-100 opacity-0 transition-all"
            )}
          >
            Remove
          </Button>
        )}
      </div>
      <input
        type="file"
        className="opacity-0 w-0 h-0 overflow-hidden"
        ref={inputRef}
        onChange={selectImage}
      />
    </div>
  );
}
