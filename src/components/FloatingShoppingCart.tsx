"use client";

import { useShoppingCart } from "@/contexts/ShoppingCartContext";
import { ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { Separator } from "./ui/separator";
import FloatingCartItem from "./FloatingCartItem";
import Link from "next/link";

export default function FloatingShoppingCart() {
  const { cartItems, isOpen, setIsOpen } = useShoppingCart();

  return (
    <div>
      <Drawer direction="right" open={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger asChild>
          <Button
            size={"icon-lg"}
            className="fixed bottom-8 right-8 z-10 rounded-full shadow-[0px_0px_8px] shadow-highlight"
          >
            <ShoppingCart />
          </Button>
        </DrawerTrigger>
        <DrawerContent className="h-screen overflow-y-auto overflow-x-hidden">
          <DrawerHeader>
            <DrawerTitle className="text-lg text-center">
              Shopping Cart
            </DrawerTitle>
          </DrawerHeader>
          <Separator />
          <div className="space-y-4 p-2">
            {cartItems.length ? (
              cartItems.map((item) => (
                <FloatingCartItem
                  key={`${item.product_id},${item.variant_id}`}
                  cartItem={item}
                />
              ))
            ) : (
              <div className="text-center h-40 flex justify-center items-center text-lg">
                No Items in cart
              </div>
            )}
          </div>
          <DrawerFooter>
            {cartItems.length ? (
              <Link href={"/checkout"} onClick={() => setIsOpen(false)}>
                <Button className="w-full">Checkout</Button>
              </Link>
            ) : null}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
