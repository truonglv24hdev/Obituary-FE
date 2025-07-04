"use client";
import React, { useEffect, useState } from "react";
import HeaderAccount from "../HeaderAccount";
import Link from "next/link";
import { getMemorialByUser } from "@/lib/memorialAPI";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { TMemorial } from "@/types/type";
import HaveMemorials from "./MyMemorials/HaveMemorials";
import NoMemorials from "./MyMemorials/NoMemorials";

const Memorials = () => {
  const [memorials, setMemorials] = useState<TMemorial[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const router = useRouter();
  const pathname = usePathname();
  // const searchParams = useSearchParams();

  // useEffect(() => {
  //   const currentPage = parseInt(searchParams.get("page") || "1", 10);
  //   setPage(currentPage);
  // }, [searchParams]);

  useEffect(() => {
    getMemorialByUser(page)
      .then((res) => {
        setMemorials(res.data);
        setTotalPages(res.totalPages);
      })
      .catch((err) => {
        console.error("Lỗi khi lấy memorials:", err);
        localStorage.removeItem("token");
        router.replace("/sign-in");
      });
  }, [page]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    router.push(`/account/memorials?page=${newPage}`);
  };

  const isActive = pathname === "/account/memorials";

  return (
    <div className="w-full h[-735px] flex px-[229px] py-20 gap-10 justify-center">
      <div className="w-[982px] flex flex-col">
        <HeaderAccount showUpgrade={isActive && memorials.length > 0} />
        <div className=" h-12 border-b border-gray-200 mb-6">
          <nav className="h-12 flex gap-15">
            <Link
              href="/account"
              className="museo border-b-1 border-transparent py-4 px-1 text-xl font-semibold text-gray-500 hover:border-gray-300 hover:text-gray-700"
            >
              Basic Information
            </Link>
            <Link
              href="/account/memorials"
              className="museo border-b-1 border-black py-4 px-1 text-xl font-semibold text-black"
            >
              My Memorials
            </Link>
          </nav>
        </div>

        {memorials.length > 0 ? (
          <HaveMemorials
            memorials={memorials}
            page={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        ) : (
          <NoMemorials />
        )}
      </div>
    </div>
  );
};

export default Memorials;
