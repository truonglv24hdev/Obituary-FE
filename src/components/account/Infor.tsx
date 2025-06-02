"use client";
import Link from "next/link";

import { useUserProfile } from "./hook/getInFo";
import Information from "./settings/Information";
import HeaderAccount from "./HeaderAccount";

const Infor = () => {
  const user = useUserProfile();

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <div className="h-[1094px] flex flex-col gap-10 px-[229px] py-20 ml-40 ">
        <HeaderAccount />

        <div className="w-[982px] h-12 border-b border-gray-200 mb-6">
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
  );
};

export default Infor;
