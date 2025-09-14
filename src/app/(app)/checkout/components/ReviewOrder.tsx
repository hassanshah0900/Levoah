"use client";

import FloatingCartItem from "@/components/FloatingCartItem";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useShoppingCart } from "@/contexts/ShoppingCartContext";
import { ChevronDown } from "lucide-react";
import React from "react";
import { calculateSubtotal } from "../lib/utils";

export default function ReviewOrder() {
  const { cartItems } = useShoppingCart();
  return (
    <div className="space-y-2">
      <Collapsible className="group/collapsible">
        <CollapsibleTrigger className="flex justify-between items-center w-full py-2 text-xl">
          1. Review Your Order{" "}
          <ChevronDown className="transition-transform group-data-[state=open]/collapsible:rotate-180" />
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-2">
          {cartItems.map((cartItem) => (
            <FloatingCartItem key={cartItem.variant.id} cartItem={cartItem} />
          ))}
        </CollapsibleContent>
      </Collapsible>
      <div className="p-2 rounded-xs text-xl w-full flex justify-between items-center bg-secondary">
        Subtotal <span>Rs {calculateSubtotal(cartItems)}</span>
      </div>
    </div>
  );
}
