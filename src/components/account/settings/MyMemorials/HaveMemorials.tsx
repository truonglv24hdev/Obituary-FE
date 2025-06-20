import { IconSetting } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {formatDateRange} from "@/constants/formatDateRange";
import { TMemorial } from "@/types/type";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const HaveMemorials = ({ memorials }: { memorials: TMemorial[] }) => {

  return (
    <div className="w-[982px] ">
      {/* Header */}
      <div className="bg-[#E5F6EC80] p-4 rounded-t-lg flex justify-between items-center">
        <h1 className="text-2xl font-light text-gray-800 museo">My Memorials</h1>
        <div className="text-base font-light text-gray-600 flex items-center gap-2">
          <button className="hover:underline museo">&lt; Previous</button>
          <span className="text-gray-400">|</span>
          <button className="hover:underline museo">Next &gt;</button>
        </div>
      </div>

      {/* Memorial Cards Container */}
      <div className="w-[920px] h-[227px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 ml-6 mt-4">
        {memorials.map((memorial) => (
          <div
            key={memorial._id}
            className="bg-white overflow-hidden flex flex-col items-center"
          >
            <div className="relative w-[138px] h-[127px] rounded mx-auto mt-3 shadow-lg border border-gray-200 bg-white">
              <Image
                src={`http://localhost:5000${memorial.picture}`}
                alt="Preview"
                width={110}
                height={110}
                className="mx-auto my-2 w-[120px] h-[110px] object-cover"
                layout="responsive"
              />
              <Link href={`/obituary/${memorial._id}`} className="absolute bottom-1 right-1 bg-white text-black rounded shadow h-8 w-8 flex items-center justify-center cursor-pointer hover:bg-gray-400">
                <IconSetting />
              </Link>
            </div>
            <div className="p-3 flex-col flex items-center">
              <h2 className="text-lg font-semibold">
                {memorial.first_name + " " + memorial.last_name}
              </h2>
              <p className="text-sm text-gray-600">Brother</p>
              <p className="text-sm text-gray-500 mt-2">
                {formatDateRange(memorial.born, memorial.death)}
              </p>
            </div>
          </div>
        ))}

        {/* Empty Memorial Card slots */}
        {Array.from({ length: Math.max(0, 4 - memorials.length) }).map(
          (_, i) => (
            <div
              key={`empty-${i}`}
              className="bg-white rounded-lg shadow-md p-6 text-center flex flex-col items-center justify-center border-2 border-dashed border-gray-300 text-gray-500"
            >
              <Link href={"/my-memorial"}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </Link>
              <p className="mt-2 museo">New Memorial page</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};
export default HaveMemorials;
