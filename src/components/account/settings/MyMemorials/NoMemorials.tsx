import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const NoMemorials = () => {
  return (
    <div className="flex flex-col items-center gap-10 w-full max-w-[519px] h-auto mx-auto px-4 sm:ml-65">
      <div className="flex flex-col items-center">
        <Image
          src={"/img/memorial.png"}
          alt="memorial"
          width={391}
          height={397}
          className="items-center"
        />
        <p className="w-full max-w-[520px] h-14 text-2xl font-light text-center mt-4">
          <strong className="text-2xl font-semibold museo">
            Create a memorial
          </strong>{" "}
          by adding basic or detailed information
        </p>
      </div>

      <div className="flex flex-col sm:flex-row w-full max-w-[333px] h-auto gap-6">
        <Link
          href={"/my-memorial"}
          className="h-11 w-full sm:w-[154px] museo inline-flex items-center justify-center text-center border text-base font-light rounded text-black bg-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
        >
          Get Started
        </Link>
        <Button className="h-11 w-full sm:w-[154px] museo inline-flex items-center justify-center text-center border text-base font-light rounded text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
          <Link href={"/payment"}>Upgrade plan</Link>
        </Button>
      </div>
    </div>
  );
};

export default NoMemorials;
