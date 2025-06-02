"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "../ui/button";
import ActiveLink from "../common/ActiveLink";
import { menuItems } from "@/constants/header";

const Heading = ({ className }: { className?: string }) => {
  const { isAuthenticated, logout } = useAuth();
  return (
    <header
      className={cn(
        " h-[80px] justify-between px-[100px] flex items-center",
        className
      )}
    >
      <div className="flex items-center gap-3">
        <div className="rounded p-2 text-[#6ea09e] font-bold text-lg flex items-center gap-2">
          <Link href={"/"} className="h-27 flex items-center ml-10">
            <Image src={"/img/image.png"} width={141} height={60} alt="logo" />
          </Link>
        </div>
      </div>
      <nav className="flex items-center text-white font-medium py-3 px-7 gap-10 rounded-lg bg-white/10 h-[60px]">
        {menuItems.map((menu) => (
          <MenuItem key={menu.url} url={menu.url} title={menu.title}></MenuItem>
        ))}
      </nav>
      <div className="flex items-center gap-5 w-[300px] h-11">
        {isAuthenticated ? (
          <>
            <Button
              onClick={logout}
              className="bg-[#E5F6EC] h-10 text-[#222222] px-7 py-2 rounded-sm font-light text-[18px] leading-[24px] hover:bg-[#E5F6EC]"
            >
              Logout
            </Button>
            <Link
              href="/account"
              className="bg-[#E5F6EC] w-[150px] text-[#222222] px-5 py-2 rounded-sm font-light text-[18px] leading-[24px]"
            >
              My account
            </Link>
          </>
        ) : (
          <>
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
          </>
        )}
      </div>
    </header>
  );
};

function MenuItem({ url = "/", title = "" }) {
  return (
    <>
      <ActiveLink url={url}>{title}</ActiveLink>
    </>
  );
}

export default Heading;
