"use client";
import Link from "next/link";

import Information from "./settings/Information";
import HeaderAccount from "./HeaderAccount";

const Infor = () => {
  return (
    <div className="w-full flex justify-center px-4 py-10">
      <div className="w-full max-w-[982px] flex flex-col gap-12">
        <HeaderAccount />

        <div className="border-b border-gray-200 mb-6 md:mb-0 px-4">
          <nav className="flex flex-col md:flex-row gap-4 md:gap-15 h-auto md:h-12">
            <Link
              href="/account"
              className="border-b border-black py-2 md:py-4 px-1 text-lg md:text-xl font-semibold text-black"
            >
              Basic Information
            </Link>
            <Link
              href="/account/memorials"
              className="border-b border-transparent py-2 md:py-4 px-1 text-lg md:text-xl font-semibold text-gray-500 hover:border-gray-300 hover:text-gray-700"
            >
              My Memorials
            </Link>
          </nav>
        </div>

        <Information />
      </div>
    </div>
  );
};

export default Infor;
