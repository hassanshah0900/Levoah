import { Search, ShoppingBag } from "lucide-react";
import Link from "next/link";
import Container from "./Container";

export default function Navbar() {
  return (
    <div className="bg-primary text-primary-foreground sticky top-0 z-10 border-y-2 border-highlight/60">
      <Container>
        <div className="flex justify-between items-center py-2">
          <div className="w-10 h-10 bg-background"></div>
          <nav className="flex justify-center items-center gap-4">
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

          <div className="space-x-4">
            <button className="text-secondary [&_svg]:size-5 cursor-pointer">
              <Search />
            </button>
            <button className="relative text-secondary [&_svg]:size-5 cursor-pointer">
              <div className="h-5 w-5 rounded-full bg-highlight text-xs absolute -translate-2 flex justify-center items-center">
                5
              </div>
              <ShoppingBag />
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
}
