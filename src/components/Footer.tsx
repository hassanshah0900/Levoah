import Link from "next/link";
import { FaFacebookF, FaTiktok } from "react-icons/fa6";
import { RiInstagramFill } from "react-icons/ri";
import Container from "./Container";

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
        <div className="grid gird-cols-1 gap-8 xs:gap-x-4 xs:grid-cols-[2fr_1fr] md:gap-4 md:grid-cols-[2fr_repeat(3,1fr)]">
          <div className="space-y-5">
            <p className="text-background">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolor
              temporibus rerum saepe reiciendis dolore, modi voluptatem
              asperiores ipsam placeat cupiditate corporis omnis sequi
            </p>
            <div className="flex items-center gap-4">
              <Link
                href={"https://www.instagram.com/levoahfashion"}
                className="text-primary-foreground text-2xl"
              >
                <RiInstagramFill />
              </Link>
              <Link
                href={"https://www.facebook.com/share/1A4JMP5bxR/"}
                className="text-primary-foreground text-xl"
              >
                <FaFacebookF />
              </Link>
              <Link
                href={"https://www.tiktok.com/@levoahfashion"}
                className="text-primary-foreground text-xl"
              >
                <FaTiktok />
              </Link>
            </div>
          </div>
          <div>
            <ul className="space-y-1.5">
              <h4 className="text-lg font-semibold text-primary-foreground mb-3">
                Heading
              </h4>
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
            <ul className="space-y-1.5">
              <h4 className="text-lg font-semibold text-primary-foreground mb-3">
                Heading
              </h4>
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
            <ul className="space-y-1.5">
              <h4 className="text-lg font-semibold text-primary-foreground mb-3">
                Heading
              </h4>
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
