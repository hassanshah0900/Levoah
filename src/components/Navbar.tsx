"use client";

import { useShoppingCart } from "@/contexts/ShoppingCartContext";
import { eyeglassesSublinks, sunglassesSublinks } from "@/lib/navbar-data";
import { cn } from "@/lib/utils";
import { ShoppingBag } from "lucide-react";
import Image from "next/image";
import levoah from "../../public/images/Levoah.png";
import Container from "./Container";
import MobileNavbar from "./MobileNavbar";
import NavbarHoverItem from "./NavbarHoverItem";
import NavbarImageItem from "./NavbarImageItem";
import { buttonVariants } from "./ui/button";

export default function Navbar() {
  const { cartItems, setIsOpen } = useShoppingCart();

  return (
    <div className="bg-navbar/70 text-navbar-foreground backdrop-blur-sm shadow-black/40 shadow-md sticky top-0 z-20 border-y-0 border-highlight/60 ">
      <Container>
        <div className="flex justify-between items-center py-2">
          <div className="w-20">
            <Image src={levoah} alt="Logo" />
          </div>
          <nav className="justify-center items-center gap-4 hidden sm:flex">
            <NavbarHoverItem label="Sunglasses">
              {sunglassesSublinks.map((item) => (
                <NavbarImageItem
                  key={item.url}
                  label={item.title}
                  url={item.url}
                  imageUrl={item.imageUrl}
                />
              ))}
            </NavbarHoverItem>
            <NavbarHoverItem label="Eyeglasses">
              {eyeglassesSublinks.map((item) => (
                <NavbarImageItem
                  key={item.url}
                  label={item.title}
                  url={item.url}
                  imageUrl={item.imageUrl}
                />
              ))}
            </NavbarHoverItem>
          </nav>
          <div className="space-x-4 flex justify-center items-center">
            <button
              className="relative text-secondary [&_svg]:size-5 cursor-pointer"
              onClick={() => setIsOpen(true)}
            >
              <div
                className={cn(
                  "h-4 sm:h-5 aspect-square rounded-full bg-highlight text-xs absolute -translate-2 flex justify-center items-center",
                  cartItems.length ? "opacity-100" : "opacity-0"
                )}
              >
                {cartItems.length}
              </div>
              <span
                className={buttonVariants({
                  variant: "default",
                  shape: "round",
                  size: "icon",
                })}
              >
                <ShoppingBag />
              </span>
            </button>
            <MobileNavbar />
          </div>
        </div>
      </Container>
    </div>
  );
}
