import Image from "next/image";
import React from "react";
import { IconSearch } from "../components/icons";
import Heading from "../components/layout/Heading";
import HowItWorks from "../components/layout/HowItWorks";
import Heartwarming from "../components/layout/Heartwarming";
import HeroSection from "../components/layout/HeroSection";
import PricingSection from "../components/layout/PricingSection";
import Footer from "@/components/layout/Footer";
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Heading className="bg-[#699D99]" />
      <div className="w-full flex-1 flex justify-center items-center px-25 py-10">
        <div className="relative w-[1240px] h-[680px] rounded-xl  shadow-lg overflow-hidden flex">
          <div className="absolute inset-0 z-0">
            <Image src="/img/1.jpg" alt="Logo" fill className="object-cover" />
          </div>
          <section className="inset-y-0 w-[543px] z-10 px-12 flex flex-col items-center justify-center gap-4 border-b-[#0000001A] rounded-tl-[12px] rounded-bl-[12px] backdrop-blur-[48px] overflow-hidden">
            <div className="w-[447px] h-[501px] flex flex-col gap-[35px]">
              <div className="w-[447px] h-[90px] flex flex-col gap-5">
                <h1 className="w-[447px] h-12 text-[40px] leading-[48px] font-black font-serif text-white tracking-normal">
                  Create a Memorial
                </h1>
                <p className="w-[447px] h-[22px] text-[#f3f8f7] museo text-[18px] leading-[22px] tracking-normal font-museo">
                  Preserve And Share Memory Of Your Loved One
                </p>
              </div>

              <div className="h-[365px] flex flex-col gap-11">
                <div className="w-[447px] h-24 gap-5 flex flex-col">
                  <h2 className="text-[20px] h-6 font-semibold museo text-white mx-auto leading-[22px] tracking-normal">
                    Search Obituary
                  </h2>
                  <div className="h-[52px] rounded-sm justify-between flex">
                    <input
                      type="text"
                      placeholder="First name"
                      className="w-[188px] h-13 flex-1 museo px-5 py-4.5 rounded-l-md border border-gray-200 bg-white gap-1 placeholder:text-black "
                    />
                    <input
                      type="text"
                      placeholder="Last name"
                      className="w-[188px] h-13 flex-1 px-3 museo py-2 border-t border-b border-gray-200 bg-white gap-1 placeholder:text-black"
                    />
                    <button
                      type="submit"
                      className="w-[45px] h-13 cursor-pointer bg-[#6ea09e] text-white py-2 rounded-r-md font-bold"
                    >
                      <IconSearch className="w-6 h-6 mx-auto" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center my-4">
                  <div className="flex-1 h-px bg-gray-300" />
                  <span className="mx-3 text-white font-bold">Or</span>
                  <div className="flex-1 h-px bg-gray-300" />
                </div>

                <div className="w-[447px] h-24 gap-5 flex flex-col">
                  <h2 className="text-[20px] h-6 museo font-semibold text-white mx-auto leading-[22px] tracking-normal">
                    Share memories of
                  </h2>
                  <div className="h-[52px] flex gap-5">
                    <input
                      type="text"
                      placeholder="First name"
                      className="flex-1 px-3 py-2 museo rounded-md border w-[213px] border-gray-200 focus:outline-none bg-white placeholder:text-black"
                    />
                    <input
                      type="text"
                      placeholder="Last name"
                      className="flex-1 px-3 py-2 museo rounded-md border w-[213px] border-gray-200 focus:outline-none bg-white placeholder:text-black"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full museo cursor-pointer bg-[#6ea09e] text-white py-2 rounded-md font-semibold"
                  >
                    Start for Free
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <HowItWorks />
      <Heartwarming />
      <HeroSection />
      <PricingSection />
      <Footer />
    </div>
  );
}
