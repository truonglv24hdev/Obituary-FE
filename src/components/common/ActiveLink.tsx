"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const ActiveLink = ({
  url,
  children,
}: {
  url: string;
  children: React.ReactNode;
}) => {
  const pathName = usePathname();
  const isActive = url === pathName;
  return (
    <Link
      href={url}
      className={`h-6  text-[18px] leading-[24px] hover:font-semibold ${
        isActive ? "font-semibold" : "font-light"
      }`}
    >
      {children}
    </Link>
  );
};

export default ActiveLink;
