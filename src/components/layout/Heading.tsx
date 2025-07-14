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
        <Link href="/" className="flex justify-start items-center text-white">
          <svg
            width="102"
            height="117"
            viewBox="0 0 102 117"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-white w-15 h-[57px]"
          >
            <path
              d="M69.0234 0C70.6049 3.27828 71 15.025 71 20.4883C70.9997 33.8047 59.6329 41.4877 55.6787 44.0488C53.7275 48.6708 53.2175 54.9221 53.3174 59.1055C55.1488 56.7909 57.5749 54.4152 60.7568 52.2539C67.3816 47.754 77.0447 44.3342 90.9316 44.0762L95.0059 44V52.0479H102.007V105.581L99.5635 105.025C94.3751 103.846 85.1378 103.578 75.7412 104.99C71.9666 105.558 68.2451 106.386 64.7988 107.498C59.2706 109.547 54.2651 112.844 51 116.575C48.0026 113.578 42.0709 109.481 36.9746 107.424C33.594 106.349 29.9552 105.545 26.2656 104.99C16.869 103.578 7.63172 103.846 2.44336 105.025L0 105.581V52.0479H7.00098V44L11.0752 44.0762C24.9621 44.3342 34.6253 47.754 41.25 52.2539C44.4377 54.4192 46.8658 56.8004 48.6982 59.1191C47.4356 53.397 44.4422 48.0028 42.8291 46.6094C24.6413 39.6436 26.0243 28.6831 26.0244 25.0977C42.3339 25.61 45.7938 37.3904 46.7822 44.0488L49.748 46.6094V42.1338C49.748 40.3462 49.4701 38.5724 49.1016 36.8232C48.2848 32.9468 47.7937 28.0018 48.1377 23.5771C48.3523 20.8166 49.2968 18.1587 50.8291 15.8525C56.1322 7.8718 64.8516 2.08716 69.0234 0ZM91.0059 48.0752C64.5325 48.5671 55.5264 61.0472 53.0078 67.4736V106.868L53.167 106.871C59.2308 99.4458 71.6771 90.5889 91.0059 91.5752V48.0752ZM11.001 91.5752C30.2689 90.592 42.6964 99.391 48.7812 106.802L48.999 106.805V67.4736C46.4805 61.0472 37.4745 48.5671 11.001 48.0752V91.5752ZM4 100.669C9.89163 99.7729 18.3887 99.7618 26.8594 101.035C31.5763 101.744 36.4011 102.869 40.8271 104.522C34.5567 99.4157 24.7847 94.8774 11.2051 95.5703L7.00098 95.7842V56.0479H4V100.669ZM95.0059 95.7842L90.8018 95.5703C77.2221 94.8774 67.4501 99.4157 61.1797 104.522C65.6058 102.869 70.4305 101.744 75.1475 101.035C83.6182 99.7618 92.1152 99.7729 98.0068 100.669V56.0479H95.0059V95.7842ZM31 30C32.1 33.0909 35.8403 39.8181 42 42C40.7166 38.7273 36.7197 31.7456 31 30ZM66 9C55.9999 14 51.9999 21.5 52.5 33L59 22L56.5 38C66.4472 28.0002 67.9999 19.9998 66 9Z"
              fill="white"
            />
          </svg>
          <p className="w-20 text-2xl museo font-medium">Tribute Chapters</p>
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
                className="bg-[#E5F6EC] cursor-pointer w-[115px] museo h-11 text-[#222222] rounded-sm font-light text-[18px] leading-[24px] hover:bg-[#E5F6EC]"
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
