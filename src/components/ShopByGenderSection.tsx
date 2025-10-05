"use client";

import Image from "next/image";
import Link from "next/link";
import child from "../../public/images/child.webp";
import men from "../../public/images/men.webp";
import women from "../../public/images/women.webp";

export default function ShopByGenderSection() {
  return (
    <div>
      <h2 className="text-2xl text-center xs:text-start md:text-3xl font-bold uppercase mb-5">
        Shop by Gender
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-9 gap-2 text-center">
        <ChildrenCard />
        <MenCard />
        <WomenCard />
      </div>
    </div>
  );
}

function MenCard() {
  return (
    <Link
      href={"/collections/men"}
      className="w-full sm:aspect-auto aspect-video bg-card text-card-foreground sm:col-span-5 grid grid-cols-2 rounded-sm"
    >
      <div className="relative w-full h-full">
        <Image src={men} alt="" fill className="object-cover object-top" />
      </div>
      <h2 className=" text-xl md:text-2xl font-bold flex justify-center items-center uppercase">
        Shop Men
      </h2>
    </Link>
  );
}

function WomenCard() {
  return (
    <Link
      href={"/collections/women"}
      className="w-full aspect-video sm:aspect-auto bg-card text-card-foreground sm:col-span-full grid grid-cols-2 sm:grid-cols-5 rounded-sm"
    >
      <h2 className="sm:col-span-3 text-xl md:text-2xl font-bold flex justify-center items-center uppercase">
        Shop Women
      </h2>
      <div className="order-first sm:order-last relative sm:aspect-video sm:col-span-2">
        <Image src={women} alt="" fill className="object-cover object-top" />
      </div>
    </Link>
  );
}

function ChildrenCard() {
  return (
    <Link
      href={"/collections/children"}
      className="order-last sm:order-first w-full aspect-video bg-card text-card-foreground sm:col-span-4 grid grid-cols-2 rounded-sm"
    >
      <div className="relative w-full h-full">
        <Image src={child} alt="" fill className="object-cover object-top" />
      </div>
      <h2 className="text-xl md:text-2xl font-bold flex justify-center items-center uppercase p-4">
        Shop Children
      </h2>
    </Link>
  );
}
