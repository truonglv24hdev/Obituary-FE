import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

const HeroSection = () => {
  return (
    <div className="relative bg-black w-full h-[440px] flex items-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70 z-10"></div>

      {/* Background image */}
      <Image
        src="/img/hero.png"
        alt="Candle and flowers"
        fill
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Content */}
      <div className="absolute z-20 top-[100px] left-6 sm:left-[115px] max-w-[90%] sm:max-w-[615px] flex flex-col gap-6 sm:gap-7">
        <h1 className="text-white font-medium museo text-2xl sm:text-[40px] leading-snug sm:leading-[56px]">
          Celebrate a Life. Share a Memory.
        </h1>
        <p className="text-white font-light museo text-base sm:text-xl leading-6 sm:leading-7">
          Honor your loved ones by creating a lasting tribute. Share stories,
          photos, and memories that keep their legacy alive.
        </p>
        <Button className="w-fit cursor-pointer px-6 py-2 h-11 rounded-lg bg-[#E5F6EC] text-[#293548] font-light text-sm sm:text-[16px] hover:bg-[#E5F6EC]">
          Get started free
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;
