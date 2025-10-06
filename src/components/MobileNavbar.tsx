import {
  eyeglassesSublinks,
  SubLink,
  sunglassesSublinks,
} from "@/lib/navbar-data";
import { ChevronRight, Menu, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import levoah from "../../public/images/Levoah.png";
import NavbarImageItem from "./NavbarImageItem";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";

export default function MobileNavbar() {
  return (
    <div className="sm:hidden flex justify-center items-center">
      <Drawer direction="left">
        <DrawerTrigger aria-label="Open menu">
          <Menu />
        </DrawerTrigger>
        <DrawerContent className="min-w-full bg-background/80 backdrop-blur-xs">
          <DrawerHeader className="hidden">
            <DrawerTitle>Menu</DrawerTitle>
            <DrawerDescription>
              Choose a link below to navigate.
            </DrawerDescription>
          </DrawerHeader>
          <div>
            <div className="p-2 pb-4 flex justify-between items-center border-2 mb-5">
              <Image
                src={levoah}
                alt="Logo"
                className="w-20 shadow-white/20 shadow-[0_0_5px]"
              />
              <DrawerClose className="pe-3">
                <X />
              </DrawerClose>
            </div>
            <div className="p-4">
              <nav className="flex flex-col gap-4">
                <RootLink label="Eyeglasses" sublinks={eyeglassesSublinks} />
                <RootLink label="Sunglasses" sublinks={sunglassesSublinks} />
              </nav>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

function RootLink({ label, sublinks }: { label: string; sublinks: SubLink[] }) {
  const [open, setOpen] = useState(false);
  return (
    <Drawer direction="left" open={open} onOpenChange={setOpen}>
      <DrawerTrigger
        aria-label="Open menu"
        className="flex justify-between items-center"
      >
        {label} <ChevronRight />
      </DrawerTrigger>
      <DrawerContent className="min-w-full bg-background/80 backdrop-blur-xs overflow-y-auto">
        <DrawerHeader className="hidden">
          <DrawerTitle>{label} sublinks</DrawerTitle>
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
          {sublinks?.map((sublink) => (
            <NavbarImageItem
              key={sublink.url}
              label={sublink.title}
              url={sublink.url}
              imageUrl={sublink.imageUrl}
            />
          ))}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
