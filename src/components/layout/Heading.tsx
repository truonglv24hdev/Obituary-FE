"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "../ui/button";
import ActiveLink from "../common/ActiveLink";
import { menuItems } from "@/constants/header";
import { IconUser } from "../icons";
import { Menu, X } from "lucide-react";

const Heading = ({ className }: { className?: string }) => {
  const { isAuthenticated, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className={cn("w-full px-6 md:px-[100px] py-2 bg-transparent", className)}
    >
      <div className="max-w-[1240px] mx-auto flex items-center justify-between h-[80px]">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/img/image.png"
            width={142}
            height={60}
            alt="logo"
            className="w-[120px] md:w-[142px]"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center text-white font-medium museo gap-10 px-7 py-3 rounded-lg bg-white/10 h-[60px]">
          {menuItems.map((menu) => (
            <MenuItem key={menu.url} url={menu.url} title={menu.title} />
          ))}
        </nav>

        {/* Auth buttons - Desktop */}
        <div className="hidden md:flex gap-5">
          {isAuthenticated ? (
            <>
              <Button
                onClick={logout}
                className="bg-[#E5F6EC] w-[115px] museo h-11 text-[#222222] rounded-sm font-light text-[18px] leading-[24px] hover:bg-[#E5F6EC]"
              >
                Logout
              </Button>
              <Link
                href="/account"
                className="bg-[#E5F6EC] w-[177px] museo h-11 text-[#222222] flex items-center justify-center gap-3 rounded-sm font-light text-[18px] leading-[24px]"
              >
                <IconUser className="w-5 h-5" />
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

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-white">
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white/90 backdrop-blur-md text-black rounded-md px-4 py-4 mt-2">
          <nav className="flex flex-col gap-4">
            {menuItems.map((menu) => (
              <ActiveLink
                key={menu.url}
                url={menu.url}
                // onClick={() => setMenuOpen(false)}
              >
                {menu.title}
              </ActiveLink>
            ))}
          </nav>

          <div className="mt-4 flex flex-col gap-2">
            {isAuthenticated ? (
              <>
                <Button
                  onClick={() => {
                    logout();
                    setMenuOpen(false);
                  }}
                  className="bg-[#E5F6EC] text-[#222222] museo font-light"
                >
                  Logout
                </Button>
                <Link
                  href="/account"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center gap-2 bg-[#E5F6EC] px-4 py-2 rounded museo font-light text-[#222222] w-full"
                >
                  <IconUser className="w-5 h-5" />
                  My account
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/sign-up"
                  onClick={() => setMenuOpen(false)}
                  className="bg-[#E5F6EC] px-4 py-2 rounded museo font-light text-[#222222] text-center"
                >
                  Register
                </Link>
                <Link
                  href="/sign-in"
                  onClick={() => setMenuOpen(false)}
                  className="bg-[#E5F6EC] px-4 py-2 rounded museo font-light text-[#222222] text-center"
                >
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

function MenuItem({ url = "/", title = "" }) {
  return <ActiveLink url={url}>{title}</ActiveLink>;
}

export default Heading;
