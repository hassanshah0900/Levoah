import ProductImage from "@/app/(app)/[...categories]/components/ProductImage";
import { getSubcategories } from "@/app/dashboard/(main)/categories/lib/queries";
import { Category } from "@/app/dashboard/(main)/categories/lib/types";
import { useQuery } from "@tanstack/react-query";
import { ChevronRight, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ComponentProps, useState } from "react";
import levoah from "../../public/images/Levoah.png";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import NavbarSubmenuItem from "./NavbarSubmenuItem";

export default function MobileNavbar() {
  return (
    <div className="sm:hidden flex justify-center items-center">
      <Drawer direction="left">
        <DrawerTrigger aria-label="Open menu">
          <Menu />
        </DrawerTrigger>
        <DrawerContent className="bg-primary text-primary-foreground min-w-full">
          <DrawerHeader className="hidden">
            <DrawerTitle>Menu</DrawerTitle>
            <DrawerDescription>
              Choose a link below to navigate.
            </DrawerDescription>
          </DrawerHeader>
          <div className="">
            <div className="p-1 flex justify-between items-center">
              <Image src={levoah} alt="Logo" className="w-30 " />
              <DrawerClose className="pe-5">
                <X />
              </DrawerClose>
            </div>
            <div className="p-4">
              <nav className="flex flex-col  font-semibold gap-4">
                <BaseCategory slug="eyeglasses" label="Eyeglasses" />
                <BaseCategory slug="sunglasses" label="Sunglasses" />
              </nav>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

function BaseCategory({ slug, label }: { slug: string; label: string }) {
  const [open, setOpen] = useState(false);
  const { data: categories } = useQuery({
    queryKey: ["categories", "sub", slug],
    queryFn: () => getSubcategories(slug),
  });

  return (
    <Drawer direction="left" open={open} onOpenChange={setOpen}>
      <DrawerTrigger
        aria-label="Open menu"
        className="flex justify-between items-center"
      >
        {label} <ChevronRight />
      </DrawerTrigger>
      <DrawerContent className="bg-primary min-w-full overflow-y-auto text-primary-foreground">
        <DrawerHeader className="hidden">
          <DrawerTitle>Sunglasses subcategories</DrawerTitle>
          <DrawerDescription>
            Choose a link below to navigate.
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4 flex flex-col gap-2">
          <div className="flex justify-end ">
            <DrawerClose>
              <X />
            </DrawerClose>
          </div>
          {categories?.map((category) => (
            <Link href={category.path} key={category.id}>
              <NavbarSubmenuItem
                imgUrl={category.image_url}
                label={category.name}
              />
            </Link>
          ))}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
