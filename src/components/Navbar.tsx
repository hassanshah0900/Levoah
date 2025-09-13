"use client";

import { getSubcategories } from "@/app/dashboard/(main)/categories/lib/queries";
import { useShoppingCart } from "@/contexts/ShoppingCartContext";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import levoah from "../../public/images/Levoah.png";
import Container from "./Container";
import MobileNavbar from "./MobileNavbar";
import NavbarHoverItem from "./NavbarHoverItem";
import NavbarSubmenuItem from "./NavbarSubmenuItem";

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
            <NavbarCategoryItem label="Sunglasses" slug="sunglasses" />
            <NavbarCategoryItem label="Eyeglasses" slug="eyeglasses" />
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

function NavbarCategoryItem({ slug, label }: { slug: string; label: string }) {
  const [open, setOpen] = useState(false);
  const { data: categories } = useQuery({
    queryKey: ["categories", "sub", slug],
    queryFn: () => getSubcategories(slug),
  });

  return (
    <NavbarHoverItem open={open} onOpenChange={setOpen} label={label}>
      {categories?.map((category) => (
        <Link href={category.path} key={category.id}>
          <NavbarSubmenuItem
            label={category.name}
            imgUrl={category.image_url}
          />
        </Link>
      ))}
    </NavbarHoverItem>
  );
}
