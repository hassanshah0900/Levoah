import React, { ComponentPropsWithRef } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useWatch } from "react-hook-form";
import { slugify } from "@/lib/utils";

interface Props extends Omit<ComponentPropsWithRef<typeof Input>, "onChange"> {
  onChange: (text: string) => void;
  slugSourceFieldName: string;
}
export default function SlugInput({
  slugSourceFieldName,
  onChange,
  ...props
}: Props) {
  const value = useWatch({ name: slugSourceFieldName });
  return (
    <div className="flex justify-center items-center gap-2">
      <Input {...props} onChange={(e) => onChange(e.currentTarget.value)} />
      <Button
        type="button"
        variant={"secondary"}
        onClick={() => {
          onChange(slugify(value)!);
        }}
      >
        Generate Slug
      </Button>
    </div>
  );
}
