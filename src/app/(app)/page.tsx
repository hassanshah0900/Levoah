export const dynamic = "force-dynamic";

import Container from "@/components/Container";
import ShopByGenderSection from "@/components/ShopByGenderSection";
import ShopEyeglassesSection from "@/components/ShopEyeglassesSection";
import ShopSunglassesSection from "@/components/ShopSunglassesSection";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import heroImage from "../../../public/images/hero-image.webp";

export default function HomePage() {
  return (
    <Container>
      <div className="space-y-20 mb-20">
        <div className="relative w-full aspect-square xs:aspect-[5/4] sm:aspect-video bg-card rounded-sm mt-5 px-5 sm:px-10 flex items-end">
          <div className="relative z-10 text-center xs:text-start mb-[15%] xs:mb-[5%]">
            <h1 className="text-2xl leading-[100%] xs:leading-tight xs:text-3xl sm:text-4xl lg:text-5xl font-bold uppercase mb-2 lg:mb-3 max-w-full  xs:max-w-[80%] sm:max-w-2/3 md:max-w-1/2">
              See the world in style
            </h1>
            <p className="mb-6  xs:mb-3 sm:mb-5 lg:mb-8 max-[80%] sm:max-w-2/3 lg:max-w-1/2 text-xs xs:text-sm md:text-base">
              Discover your perfect pair from our curated collection of
              sunglasses and prescription frames. Quality vision, unmatched
              design.
            </p>
            <Button>Shop Now</Button>
          </div>
          <Image
            src={heroImage}
            alt=""
            className="object-cover object-top"
            fill
            priority
            sizes="(max-with: 1100px) 100vw, 1100px"
          />
        </div>
        <ShopSunglassesSection />
        <ShopEyeglassesSection />
        <ShopByGenderSection />
      </div>
    </Container>
  );
}
