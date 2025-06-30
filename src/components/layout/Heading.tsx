"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "../ui/button";
import ActiveLink from "../common/ActiveLink";
import { menuItems } from "@/constants/header";
import { IconUser } from "../icons";

const Heading = ({ className }: { className?: string }) => {
  const { isAuthenticated, logout } = useAuth();
  return (
    <div className={cn("h-[80px] w-full px-[100px] py-2", className)}>
      <div className="max-w-[1240px]  flex items-center justify-between mx-auto  max-h-[60px]">
        {/* Logo */}
        <div className="flex items-center gap-3 h-[60px]">
          <Link href={"/"} className="flex items-center">
            <Image src={"/img/image.png"} width={142} height={60} className="w-[142px] h-[60px]" alt="logo" />
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex items-center text-white font-medium museo py-3 px-7 gap-10 rounded-lg bg-white/10 h-[60px]">
          {menuItems.map((menu) => (
            <MenuItem key={menu.url} url={menu.url} title={menu.title} />
          ))}
        </nav>

        {/* Auth buttons */}
        <div className="flex  gap-5 max-w[242] h-11">
          {isAuthenticated ? (
            <>
              <Button
                onClick={logout}
                className="bg-[#E5F6EC] w-[115px] museo h-11 text-[#222222] flex items-center justify-center rounded-sm font-light text-[18px] leading-[24px] hover:bg-[#E5F6EC]"
              >
                Logout
              </Button>
              <Link
                href="/account"
                className="bg-[#E5F6EC] w-[177px] museo h-11 text-[#222222] flex items-center justify-center gap-3 rounded-sm font-light text-[18px] leading-[24px] "
              >
                <IconUser className="w-5 h-5"/>
                My account
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/sign-up"
                className="bg-[#E5F6EC] w-[115px] museo h-11 text-[#222222] flex items-center justify-center rounded-sm font-light text-[18px] leading-[24px]"
              >
                Register
              </Link>
              <Link
                href="/sign-in"
                className="bg-[#E5F6EC] w-[115px] museo h-11 text-[#222222] flex items-center justify-center rounded-sm font-light text-[18px] leading-[24px]"
              >
                Sign In
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
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
