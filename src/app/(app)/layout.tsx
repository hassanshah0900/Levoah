import FloatingShoppingCart from "@/components/FloatingShoppingCart";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { ShoppingCartProvider } from "@/contexts/ShoppingCartContext";
import React, { PropsWithChildren } from "react";

export default function layout({ children }: PropsWithChildren) {
  return (
    <ShoppingCartProvider>
      <div>
        <div className="flex justify-center items-center bg-secondary text-secondary-foreground font-semibold text-sm p-0.5">
          Order Over 5000 to get free delivery
        </div>
        <Navbar />
        {children}
        <FloatingShoppingCart />
        <Footer />
      </div>
    </ShoppingCartProvider>
  );
}
