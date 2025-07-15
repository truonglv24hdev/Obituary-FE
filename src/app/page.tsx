"use client";
import Image from "next/image";
import React, { useState } from "react";
import { IconSearch } from "../components/icons";
import Heading from "../components/layout/Heading";
import HowItWorks from "../components/layout/HowItWorks";
import Heartwarming from "../components/layout/Heartwarming";
import HeroSection from "../components/layout/HeroSection";
import PricingSection from "../components/layout/PricingSection";
import Footer from "@/components/layout/Footer";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [searchFirstName, setSearchFirstName] = useState("");
  const [searchLastName, setSearchLastName] = useState("");
  const [startFirstName, setStartFirstName] = useState("");
  const [startLastName, setStartLastName] = useState("");

  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchFirstName || searchLastName) {
      router.push(
        `/search?firstName=${searchFirstName}&lastName=${searchLastName}`
      );
    }
  };

  const handleStartFree = async (e: React.FormEvent) => {
    e.preventDefault();
    if (startFirstName && startLastName) {
      router.push(
        `/my-memorial?firstName=${startFirstName}&lastName=${startLastName}`
      );
    } else {
      router.push("/my-memorial");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Heading className="bg-[#699D99]" />
      <div className="w-full flex-1 flex flex-col md:flex-row justify-center items-center px-4 md:px-25 py-10">
        <div className="relative w-full md:w-[1240px] h-auto md:h-[680px] rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row">
          <div className="absolute inset-0 z-0 min-h-[500px] md:min-h-0">
            <Image
              src="/img/home.png"
              alt="Logo"
              fill
              className="object-cover"
            />
          </div>

          <section className="inset-y-0 w-full md:w-[543px] z-10 px-6 md:px-12 py-8 md:py-0 flex flex-col items-center justify-center gap-4 border-b-[#0000001A] rounded-tl-[12px] md:rounded-bl-[12px] backdrop-blur-[48px] overflow-hidden bg-black/50 md:bg-transparent">
            <div className="w-full md:w-[447px] h-auto md:h-[501px] flex flex-col gap-[35px]">
              <div className="w-full md:w-[447px] h-auto md:h-[90px] flex flex-col gap-5 text-center md:text-left">
                <h1 className="text-[32px] md:text-[40px] leading-[40px] md:leading-[48px] font-black font-serif text-white tracking-normal">
                  Create a Memorial
                </h1>
                <p className="text-[16px] md:text-[18px] leading-[22px] text-[#f3f8f7] museo font-museo">
                  Preserve And Share Memory Of Your Loved One
                </p>
              </div>

              <div className="h-auto md:h-[365px] flex flex-col gap-11">
                {/* Search Obituary */}
                <div className="w-full md:w-[447px] h-auto md:h-24 flex flex-col gap-5">
                  <h2 className="text-[18px] md:text-[20px] font-semibold museo text-white text-center md:text-center">
                    Search Obituary
                  </h2>
                  <form onSubmit={handleSearchSubmit}>
                    <div className="flex flex-col md:flex-row gap-3 md:gap-0">
                      <input
                        type="text"
                        placeholder="First name"
                        value={searchFirstName}
                        onChange={(e) => setSearchFirstName(e.target.value)}
                        className="w-full md:w-[201px] h-13 museo px-5 py-4.5 border border-gray-200 bg-white placeholder:text-black 
          rounded-md md:rounded-l-md md:rounded-r-none"
                      />
                      <input
                        type="text"
                        placeholder="Last name"
                        value={searchLastName}
                        onChange={(e) => setSearchLastName(e.target.value)}
                        className="w-full md:w-[201px] h-13 museo px-3 py-2 border border-t border-b md:border-l-0 border-gray-200 bg-white placeholder:text-black
          rounded-md md:rounded-none"
                      />
                      <button
                        type="submit"
                        className="w-full cursor-pointer md:w-[45px] h-13 bg-[#6ea09e] text-white py-2 font-bold flex justify-center items-center
          rounded-md md:rounded-r-md md:rounded-l-none"
                      >
                        <IconSearch className="w-6 h-6" />
                      </button>
                    </div>
                  </form>
                </div>

                {/* Divider */}
                <div className="flex items-center my-4">
                  <div className="flex-1 h-px bg-gray-300" />
                  <span className="mx-3 text-white font-bold">Or</span>
                  <div className="flex-1 h-px bg-gray-300" />
                </div>

                {/* Share memories of */}
                <div className="w-full md:w-[447px] h-auto md:h-24 flex flex-col gap-5">
                  <h2 className="text-[18px] md:text-[20px] museo font-semibold text-white text-center md:text-center">
                    Share memories of
                  </h2>
                  <form onSubmit={handleStartFree}>
                    <div className="flex flex-col md:flex-row gap-3">
                      <input
                        type="text"
                        placeholder="First name"
                        value={startFirstName}
                        onChange={(e) => setStartFirstName(e.target.value)}
                        className="w-full md:w-[217px] h-13 md:h-13 px-3 py-2 museo rounded-md border border-gray-200 bg-white placeholder:text-black"
                      />
                      <input
                        type="text"
                        placeholder="Last name"
                        value={startLastName}
                        onChange={(e) => setStartLastName(e.target.value)}
                        className="w-full md:w-[217px] h-13 px-3 py-2 museo rounded-md border border-gray-200 bg-white placeholder:text-black"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full mt-3 cursor-pointer md:w-[447px] rounded-lg h-13 bg-[#6ea09e] text-white py-2 font-light museo text-base flex justify-center items-center"
                    >
                      Start for Free
                    </Button>
                  </form>
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
