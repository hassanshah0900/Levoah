import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="flex justify-center items-center gap-5">
        <Link href={"/dashboard/products"}>
          <Button>Dashboard Products</Button>
        </Link>
        <Link href={"/products"}>
          <Button>Products</Button>
        </Link>
      </div>
    </div>
  );
}
