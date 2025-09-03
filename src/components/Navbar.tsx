"use client";

import { Hamburger, Menu, Search, ShoppingBag } from "lucide-react";
import Link from "next/link";
import Container from "./Container";
import { useShoppingCart } from "@/contexts/ShoppingCartContext";
import { cn } from "@/lib/utils";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import Image from "next/image";
import levoah from "../../public/images/Levoah.png";

export default function Navbar() {
  const { cartItems, setIsOpen } = useShoppingCart();

  return (
    <div className="bg-primary text-primary-foreground sticky top-0 z-20 border-y-0 border-highlight/60 ">
      <Container>
        <div className="flex justify-between items-center py-2">
          <div className="w-20">
            <Image src={levoah} alt="Logo" />
          </div>
          <nav className="justify-center items-center gap-4 hidden sm:flex">
            <Link
              href={""}
              className="font-semibold hover:text-secondary transition-all"
            >
              Home
            </Link>
            <Link
              href={""}
              className="font-semibold hover:text-secondary transition-all"
            >
              Shop
            </Link>
            <Link
              href={""}
              className="font-semibold hover:text-secondary transition-all"
            >
              Categories
            </Link>
            <Link
              href={""}
              className="font-semibold hover:text-secondary transition-all"
            >
              About
            </Link>
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
              <ShoppingBag />
            </button>
            <MobileNavbar />
          </div>
        </div>
      </Container>
    </div>
  );
}

function MobileNavbar() {
  return (
    <div className="sm:hidden flex justify-center items-center">
      <Drawer direction="left">
        <DrawerTrigger aria-label="Open menu">
          <Menu />
        </DrawerTrigger>
        <DrawerContent className="bg-primary">
          <DrawerHeader className="hidden">
            <DrawerTitle>Menu</DrawerTitle>
            <DrawerDescription>
              Choose a link below to navigate.
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-5">
            <nav className="flex flex-col text-primary-foreground font-semibold">
              <Link href={""} className="hover:text-secondary transition-all">
                Home
              </Link>
              <Link href={""} className="hover:text-secondary transition-all">
                Shop
              </Link>
              <Link href={""} className="hover:text-secondary transition-all">
                Categories
              </Link>
              <Link href={""} className="hover:text-secondary transition-all">
                About
              </Link>
            </nav>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
