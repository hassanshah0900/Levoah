import { Button } from "@/components/ui/button";
import {
  ShoppingCartItem,
  useShoppingCart,
} from "@/contexts/ShoppingCartContext";
import { cn } from "@/lib/utils";
import { Minus, Plus } from "lucide-react";
import React from "react";

interface Props {
  cartItem: ShoppingCartItem;
  className?: string;
  orientation?: "HORIZONTAL" | "VERTICAL";
}
export default function QuantitySelector({
  cartItem,
  className,
  orientation = "HORIZONTAL",
}: Props) {
  const { incrementQuantity, decrementQuantity } = useShoppingCart();
  return (
    <div
      className={cn(
        "flex items-center justify-center gap-1.5",
        orientation === "VERTICAL" ? "flex-col" : "flex-row-reverse",
        className
      )}
    >
      <Button
        variant={"outline"}
        size={"icon"}
        className="size-6"
        onClick={() => incrementQuantity(cartItem)}
      >
        <Plus className="size-3" />
      </Button>
      <div className="text-sm">{cartItem.quantity}</div>
      <Button
        variant={"outline"}
        size={"icon"}
        className="size-6"
        onClick={() => decrementQuantity(cartItem)}
      >
        <Minus className="size-3" />
      </Button>
    </div>
  );
}
