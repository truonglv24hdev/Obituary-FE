"use client";
import React from "react";
import { usePathname } from "next/navigation";

const HeaderMemorial = () => {
  const pathName = usePathname();
  const isActive = "/memorial" === pathName;
  return (
    <div>
      <div className="w-full lg:w-[540px] h-full lg:h-28 flex flex-col gap-4">
        <h1 className="h-auto lg:h-12 text-[40px] font-medium">
          Create memorial website
        </h1>
        <p className="font-light text-2xl">
          It only takes a few moments to create a Tribute. <br />
          Please tell us...
        </p>
      </div>

      {/* Stepper */}
      <div className="relative mt-6 mb-10">
        {/* Line + Circles */}
        <div className="flex ml-5 items-center justify-between w-auto lg:w-[994px]">
          {/* Step 1 */}
          <div className="relative flex flex-col items-center">
            <div className="w-6 h-6 rounded-full border-4 border-gray-400 bg-white z-10" />
            <div className="absolute top-10">
              <div
                className={`  text-sm px-3 py-1 rounded shadow relative ${
                  isActive ? "bg-[#1E293B] text-white " : "bg-gray-200 text-black"
                }`}
              >
                About
                <div
                  className={`absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 ${
                    isActive ? "bg-[#1E293B] " : "bg-gray-200"
                  } rotate-45`}
                />
              </div>
            </div>
          </div>

          {/* Line */}
          <div className="flex-1 h-3 w-[885px] bg-gray-200" />

          {/* Step 2 */}
          <div className="relative flex flex-col items-center">
            <div className="w-6 h-6 rounded-full border-4 border-gray-400 bg-white z-10" />
            <div className="absolute top-10">
              <div
                className={` text-black text-sm px-3 py-1 rounded shadow relative ${
                  isActive ? " bg-gray-200 text-black" : " bg-[#1E293B] text-white"
                }`}
              >
                Payment
                <div
                  className={`absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 ${
                    isActive ? " bg-gray-200" : " bg-[#1E293B]"
                  } rotate-45`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderMemorial;
