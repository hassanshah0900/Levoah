import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function CategoryNotFound() {
  return (
    <div className="flex justify-center items-start h-screen">
      <div className="flex justify-center items-center gap-5 flex-col mt-32 xs:mt-40">
        <h1 className="text-2xl xs:text-3xl md:text-4xl">
          No Such Category Exists
        </h1>
        <Link href={"/"} className={buttonVariants()}>
          Go back to Homepage
        </Link>
      </div>
    </div>
  );
}
