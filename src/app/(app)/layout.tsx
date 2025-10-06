"use client";

import FloatingShoppingCart from "@/components/FloatingShoppingCart";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { ShoppingCartProvider } from "@/contexts/ShoppingCartContext";
import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";

export default function layout({ children }: PropsWithChildren) {
  const pathname = usePathname();
  return (
    <ShoppingCartProvider>
      <div>
        <Navbar />
        {children}
        {pathname !== "/checkout" && (
          <>
            <FloatingShoppingCart />
            <Footer />
          </>
        )}
      </div>
    </ShoppingCartProvider>
  );
}
