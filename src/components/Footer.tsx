import { Facebook, Instagram, Youtube } from "lucide-react";
import Link from "next/link";
import Container from "./Container";
import { Button } from "./ui/button";

const links = [
  { label: "Company" },
  { label: "About" },
  { label: "Popular Products" },
  { label: "Reviews" },
];
export default function Footer() {
  return (
    <footer className="bg-primary pt-10 pb-20 border-t-2 border-highlight/60">
      <Container>
        <div className="grid grid-cols-[1.5fr_repeat(3,1fr)]">
          <div className="space-y-5">
            <p className="text-background">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolor
              temporibus rerum saepe reiciendis dolore, modi voluptatem
              asperiores ipsam placeat cupiditate corporis omnis sequi
            </p>
            <div className="flex items-center gap-2">
              <Button variant={"outline"} size={"icon"}>
                <Instagram />
              </Button>
              <Button variant={"outline"} size={"icon"}>
                <Facebook />
              </Button>
              <Button variant={"outline"} size={"icon"}>
                <Youtube />
              </Button>
            </div>
          </div>
          <div>
            <ul className="space-y-2">
              {links.map(({ label }) => (
                <li key={label}>
                  <Link href={""} className="text-background">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <ul className="space-y-2">
              {links.map(({ label }) => (
                <li key={label}>
                  <Link href={""} className="text-background">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <ul className="space-y-2">
              {links.map(({ label }) => (
                <li key={label}>
                  <Link href={""} className="text-background">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </footer>
  );
}
