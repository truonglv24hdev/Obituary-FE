import React from "react";
import Link from "next/link";
import Image from "next/image";

const Heading = () => {
  return (
    <header className="bg-[#699D99] h-[80px] justify-between px-[100px] flex items-center">
      <div className="flex items-center gap-3">
        <div className="rounded p-2 text-[#6ea09e] font-bold text-lg flex items-center gap-2">
          <Image src="/img/image.png" alt="Logo" width={142} height={57} />
        </div>
      </div>
      <nav className="flex items-center text-white font-medium py-3 px-7 gap-10 rounded-lg bg-white/10 h-[60px]">
        <a href="#" className="h-6 font-semibold text-[18px] leading-[24px]">
          Home
        </a>
        <a href="#" className="h-6 font-light text-[18px] leading-[24px]">
          Resources
        </a>
        <a href="#" className="h-6 font-light text-[18px] leading-[24px]">
          Example
        </a>
        <a href="#" className="h-6 font-light text-[18px] leading-[24px]">
          Pricing
        </a>
        <a href="#" className="h-6 font-light text-[18px] leading-[24px]">
          FAQs
        </a>
        <a href="#" className="h-6 font-light text-[18px] leading-[24px]">
          Contact us
        </a>
      </nav>
      <div className="flex items-center gap-5 w-[242px] h-11">
        <Link
          href="/sign-up"
          className="bg-[#E5F6EC] text-[#222222] px-7 py-2 rounded-sm font-light text-[18px] leading-[24px]"
        >
          Register
        </Link>
        <Link
          href="/sign-in"
          className="bg-[#E5F6EC] text-[#222222] px-5 py-2 rounded-sm font-light text-[18px] leading-[24px]"
        >
          Sign In
        </Link>
      </div>
    </header>
  );
};

export default Heading;
