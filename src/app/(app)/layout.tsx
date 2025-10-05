import FloatingShoppingCart from "@/components/FloatingShoppingCart";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { ShoppingCartProvider } from "@/contexts/ShoppingCartContext";
import { PropsWithChildren } from "react";

export default function layout({ children }: PropsWithChildren) {
  return (
    <ShoppingCartProvider>
      <div>
        <Navbar />
        {children}
        <FloatingShoppingCart />
        <Footer />
      </div>
    </ShoppingCartProvider>
  );
}
