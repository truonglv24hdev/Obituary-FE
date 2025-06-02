import React from "react";
import HeaderAccount from "../HeaderAccount";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const Memorials = () => {
  return (
    <div>
      <div className="h-[1094px] flex flex-col gap-10 px-[229px] py-20 ml-40 ">
        <HeaderAccount />

        <div className="w-[982px] h-12 border-b border-gray-200 mb-6">
          <nav className="h-12 flex gap-15">
            <Link
              href="/account"
              className=" border-b-1 border-transparent py-4 px-1 text-xl font-semibold text-gray-500 hover:border-gray-300 hover:text-gray-700"
            >
              Basic Information
            </Link>
            <Link
              href="/account/memorials"
              className="border-b-1 border-black py-4 px-1 text-xl font-semibold text-black"
            >
              My Memorials
            </Link>
          </nav>
        </div>
        <div className="flex flex-col j items-center gap-10 w-[519px] h-[596px] ml-65">
          <div>
            <Image
              src={"/img/memorial.png"}
              alt="memorial"
              width={391}
              height={397}
              className="items-center"
            />
            <p className="w-[520px] h-14 text-2xl font-light text-center ">
              <strong className="text-2xl font-semibold">
                Create a memorial
              </strong>{" "}
              by adding basic or detailed information
            </p>
          </div>
          <div className="flex w-[333px] h-11 gap-6">
            <Link
              href={"/memorial"}
              className="h-11 w-[154px] inline-flex items-center justify-center text-center border text-base font-light rounded text-black bg-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
              type="submit"
            >
              Get Started
            </Link>
            <Button
              className="h-11 w-[154px] inline-flex items-center justify-center text-center border text-base font-light rounded text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
              type="submit"
            >
              Upgrade plane
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Memorials;
