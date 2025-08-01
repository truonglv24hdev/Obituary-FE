import Faqs from "@/components/layout/Faqs";
import Footer from "@/components/layout/Footer";
import Heading from "@/components/layout/Heading";
import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <>
      <div className="relative h-122">
        <div className="absolute inset-0 z-0">
          <Image src="/img/FAQs.jpg" alt="Logo" fill />
          <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <div className="h-32 w-[400px] flex flex-col items-center justify-center text-center text-white">
              <div className="font-medium text-[64px] ">FAQs</div>
              <p className="h-[21px] font-light museo text-xl">
                Here to Help You Navigate Every Step with Confidence and Care
              </p>
            </div>
          </div>
        </div>

        <Heading className="absolute inset-0 z-10" />
      </div>
      <Faqs />
      <Footer />
    </>
  );
};

export default page;
