import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const NoMemorials = () => {
  return (
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
          <strong className="text-2xl font-semibold">Create a memorial</strong>{" "}
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
  );
};

export default NoMemorials;
