import React, { ComponentProps, useState } from "react";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";

export default function PasswordInput({
  className,
  ...props
}: Omit<ComponentProps<typeof Input>, "type">) {
  const [isPasswordVisible, setPasswordVisibility] = useState(false);
  return (
    <div
      className={cn(
        "flex justify-between items-center border border-input shadow-xs has-focus-visible:border-ring has-focus-visible:ring-ring/50 has-focus-visible:ring-[3px] has-aria-invalid:ring-destructive/20 has-aria-invalid:border-destructive",
        className
      )}
    >
      <Input
        {...props}
        type={isPasswordVisible ? "text" : "password"}
        className="border-none focus-visible:ring-0"
      />
      <button
        type="button"
        className="me-4 [&_svg]:size-5 text-muted-foreground outline-none focus-visible:text-secondary-foreground"
        onClick={() => setPasswordVisibility(!isPasswordVisible)}
      >
        {isPasswordVisible ? <Eye /> : <EyeOff />}
      </button>
    </div>
  );
}
