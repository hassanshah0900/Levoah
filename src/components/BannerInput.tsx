import { cn, getImagePublicUrl } from "@/lib/utils";
import { Trash, Upload } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";
import { ControllerRenderProps } from "react-hook-form";
import { Button } from "./ui/button";

export default function BannerInput({
  value,
  onChange,
  name,
  ref,
}: ControllerRenderProps) {
  const [url, setUrl] = useState<string | null>(value);
  const inputRef = useRef<HTMLInputElement>(null);

  function openImage() {
    inputRef.current?.click();
  }
  function onInputChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.currentTarget?.files?.item(0);
    if (file) {
      setUrl(URL.createObjectURL(file));
      onChange(file);
    }
  }
  function removImage() {
    setUrl("");
    if (inputRef.current) inputRef.current.value = "";
  }
  return (
    <div className="relative w-full aspect-video bg-background">
      <input
        ref={(node) => {
          inputRef.current = node;
          ref(node);
        }}
        type="file"
        onChange={onInputChange}
        className="hidden w-0 overflow-hidden"
      />
      {url && (
        <Image src={url} alt="" fill className="object-contain object-center" />
      )}
      <Button
        type="button"
        onClick={removImage}
        variant={"destructive"}
        className={cn(
          "absolute right-4 top-4 hover:scale-95",
          !url && "hidden"
        )}
      >
        <Trash />
      </Button>
      <Button
        type="button"
        onClick={openImage}
        className={cn(
          "absolute top-1/2 left-1/2 -translate-1/2 hover:scale-95",
          url && "hidden"
        )}
      >
        Upload Image <Upload />
      </Button>
    </div>
  );
}
