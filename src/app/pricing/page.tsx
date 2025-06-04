import React from "react";
import PricingSection from "../../components/layout/PricingSection";
import Heading from "../../components/layout/Heading";
import Image from "next/image";
import Footer from "@/components/layout/Footer";

const page = () => {
  return (
    <>
      <div className="relative h-122">
        <div className="absolute inset-0 z-0">
          <Image src="/img/pricing.jpg" alt="Logo" fill />
          <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <div className="h-32 w-[400px] flex flex-col items-center justify-center text-center text-white">
              <div className="font-medium text-[64px] ">Pricing</div>
              <p className="h-[21px] font-light text-xl">Create the tribute they would have loved</p>
            </div>
          </div>
        </div>

        <Heading className="absolute inset-0 z-10" />
      </div>
      <PricingSection />
      <Footer/>
    </>
  );
};

export default page;
