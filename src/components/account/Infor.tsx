"use client";
import Link from "next/link";

import Information from "./settings/Information";
import HeaderAccount from "./HeaderAccount";

const Infor = () => {
  return (
    <div>
      <div className="w-full h-[1094px] flex px-[229px] py-20 justify-center">
        <div className="w-[982px] flex flex-col gap-13">
          <HeaderAccount />

          <div className=" h-12 border-b border-gray-200 mb-6">
            <nav className="h-12 flex gap-15">
              <Link
                href="/account"
                className=" border-b-1 border-black py-4 px-1 text-xl font-semibold text-black"
              >
                Basic Information
              </Link>
              <Link
                href="/account/memorials"
                className="border-b-1 border-transparent py-4 px-1 text-xl font-semibold text-gray-500 hover:border-gray-300 hover:text-gray-700"
              >
                My Memorials
              </Link>
            </nav>
          </div>

          <Information />
        </div>
      </div>
    </div>
  );
};

export default Infor;
