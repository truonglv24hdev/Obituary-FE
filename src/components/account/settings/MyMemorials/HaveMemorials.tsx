"use client";

import { IconSetting } from "@/components/icons";
import { formatDateRange } from "@/constants/formatDateRange";
import { TMemorial } from "@/types/type";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  memorials: TMemorial[];
  page: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
};

const HaveMemorials = ({
  memorials,
  page,
  totalPages,
  onPageChange,
}: Props) => {
  return (
    <div className="w-full">
      {/* Header */}
      <div className="bg-[#E5F6EC80] p-4 rounded-t-lg flex justify-between items-center">
        <h1 className="text-2xl font-light text-gray-800 museo">
          My Memorials
        </h1>
        <div className="text-base font-light text-gray-600 flex items-center gap-2">
          <button
            className="hover:underline museo disabled:text-gray-300"
            onClick={() => onPageChange(page - 1)}
            disabled={page <= 1}
          >
            &lt; Previous
          </button>
          <span className="text-gray-400">|</span>
          <button
            className="hover:underline museo disabled:text-gray-300"
            onClick={() => onPageChange(page + 1)}
            disabled={page >= totalPages + 1}
          >
            Next &gt;
          </button>
        </div>
      </div>

      {/* Memorial cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 px-4 mt-4">
        {memorials.map((memorial) => (
          <div
            key={memorial._id}
            className="bg-white overflow-hidden flex flex-col items-center"
          >
            <div className="relative w-[138px] h-[127px] rounded mx-auto mt-3 shadow-lg border border-gray-200 bg-white">
              <Image
                src={`http://localhost:5000${memorial.picture}`}
                alt="Preview"
                width={120}
                height={110}
                className="mx-auto my-2 w-[120px] h-[110px] object-cover"
              />
              <Link
                href={`/manage-memorial/${memorial._id}`}
                className="absolute bottom-1 right-1 bg-white text-black rounded shadow h-8 w-8 flex items-center justify-center cursor-pointer hover:bg-gray-400"
              >
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

        {/* Empty slots */}
        {Array.from({ length: Math.max(0, 4 - memorials.length) }).map(
          (_, i) => (
            <div
              key={`empty-${i}`}
              className="bg-white rounded-lg shadow-md p-6 text-center flex flex-col items-center justify-center border-2 border-dashed border-gray-300 text-gray-500"
            >
              <Link
                href={"/my-memorial"}
                className="flex flex-col items-center justify-center gap-2"
              >
                {/* Ô vuông chứa dấu + */}
                <div className="w-[132px] h-[132px] bg-[#E5F6EC80] flex items-center justify-center rounded">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 text-black"
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
                </div>
                {/* Text label */}
                <p className="mt-1 museo text-base font-light text-gray-700">
                  New Memorial page
                </p>
              </Link>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default HaveMemorials;
