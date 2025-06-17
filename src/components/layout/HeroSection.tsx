import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

const HeroSection = () => {
  return (
    <div className="relative bg-black w-full h-[440px] flex items-center">
      <div className="absolute inset-0 bg-black/70 z-10"></div>
      <Image
        src="/img/7.jpg"
        alt="Candle and flowers"
        fill
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      <div className="absolute z-20 w-[615px] flex flex-col h-53 top-[100px] left-[115px] gap-7">
        <h1 className="h-14 font-medium text-[40px] museo leading-14 text-white">
          Celebrate a Life. Share a Memory.
        </h1>
        <p className="h-14 museo font-light  text-xl leading-7 text-white">
          Honor your loved ones by creating a lasting tribute. Share stories,
          photos, and memories that keep their legacy alive.
        </p>
        <Button className="w-[169px] museo cursor-pointer h-11 rounded-lg px-7 py-2 bg-[#E5F6EC] text-[#293548] font-light text-[16px] hover:bg-[#E5F6EC]">
          Get started free
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;
