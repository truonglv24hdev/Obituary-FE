"use client";
import React, { useEffect, useState } from "react";
import HeaderAccount from "../HeaderAccount";
import Link from "next/link";
import { getMemorialByUser } from "@/lib/memorialAPI";
import { useRouter } from "next/navigation";
import { TMemorial } from "@/types/type";
import HaveMemorials from "./MyMemorials/HaveMemorials";
import NoMemorials from "./MyMemorials/NoMemorials";

const Memorials = () => {
  const [memorials, setMemorials] = useState<TMemorial[] | null>(null);
  const router = useRouter();

  useEffect(() => {
    getMemorialByUser()
      .then((memorials) => {
        setMemorials(memorials);
        console.log(memorials);
      })
      .catch((err) => {
        console.error("Lỗi khi lấy profile:", err);
        localStorage.removeItem("token");
        router.replace("/sign-in");
      });
  }, []);

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
        {memorials && memorials.length > 0 ? (
          <HaveMemorials memorials={memorials} />
        ) : (
          <NoMemorials />
        )}
      </div>
    </div>
  );
};

export default Memorials;
