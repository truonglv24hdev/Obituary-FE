"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Search,
  Calendar,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getMemorialBySearch } from "@/lib/memorialAPI";
import type { TMemorial } from "@/types/type";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { debounce } from "lodash";

interface CreateMemorialProps {
  firstName: string;
  lastName: string;
}

export default function MemorialSearch({
  firstName,
  lastName,
}: CreateMemorialProps) {
  // const [currentFirstName, setCurrentFirstName] = useState(firstName)
  const [memorials, setMemorial] = useState<TMemorial[] | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const firstNameQuery = searchParams.get("firstName") || firstName || "";

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  useEffect(() => {
    getMemorialBySearch(firstNameQuery, lastName)
      .then((data) => setMemorial(data))
      .catch((err) => console.error("Lỗi khi lấy obituary:", err));
  }, [firstNameQuery, lastName]);

  // Calculate pagination
  const totalPages = memorials ? Math.ceil(memorials.length / itemsPerPage) : 0;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentMemorials = memorials
    ? memorials.slice(startIndex, endIndex)
    : [];

  const goToFirstPage = () => setCurrentPage(1);
  const goToLastPage = () => setCurrentPage(totalPages);
  const goToPreviousPage = () =>
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  const goToNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  const handleSearch = () => {
    setCurrentPage(1);
  };

  const handleSearchMemorial = debounce(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.trim();
      if (value === "") {
        router.push(pathname);
      } else {
        router.push(`${pathname}?${createQueryString("firstName", value)}`);
      }
    },
    500
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Section */}
      <div className="bg-white py-8 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Search Memorials
            </h1>
            <p className="text-gray-600">
              Find and honor the memory of your loved ones
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search by name or location..."
                  onChange={handleSearchMemorial}
                  className="pl-10 h-12"
                />
              </div>
              <Button
                onClick={handleSearch}
                className="h-12 px-8 bg-teal-600 hover:bg-teal-700"
              >
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Results Info */}
        {memorials && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              {memorials.length} Memorial{memorials.length !== 1 ? "s" : ""}{" "}
              Found
            </h2>
            {totalPages > 1 && (
              <p className="text-gray-600 mt-1">
                Showing {startIndex + 1} to{" "}
                {Math.min(endIndex, memorials.length)} of {memorials.length}{" "}
                results
              </p>
            )}
          </div>
        )}

        {/* Memorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-8">
          {currentMemorials?.map((memorial) => (
            <Link key={memorial._id} href={`memorial/${memorial.obituaryId}`}>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                <div className="aspect-square relative">
                  <Image
                    src={`http://localhost:5000${memorial.picture}`}
                    alt={memorial._id}
                    fill
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <Badge
                    variant="secondary"
                    className="bg-[#699D99] h-10 w-[110px] rounded mb-3 text-xl museo"
                  >
                    {memorial.premium ? "premium" : "free"}
                  </Badge>
                  <h3 className="text-3xl font-semibold text-gray-900 mb-2">
                    {memorial.first_name} {memorial.last_name}
                  </h3>
                  <div className="flex items-center mb-2">
                    <Calendar className="w-5 h-5 mr-2" />
                    <span className="text-base font-medium">
                      {formatDate(memorial.born)} - {formatDate(memorial.death)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <>
            {/* Desktop Pagination */}
            <div className="hidden md:flex items-center justify-center space-x-4">
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={goToFirstPage}
                  disabled={currentPage === 1}
                  className="h-10 w-10 p-0 bg-transparent"
                >
                  <ChevronsLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                  className="h-10 w-10 p-0 bg-transparent"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <div className="flex items-center space-x-2 px-4">
                  <span className="text-sm font-medium">
                    Page {currentPage} of {totalPages}
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className="h-10 w-10 p-0 bg-transparent"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={goToLastPage}
                  disabled={currentPage === totalPages}
                  className="h-10 w-10 p-0 bg-transparent"
                >
                  <ChevronsRight className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Mobile Pagination */}
            <div className="flex md:hidden flex-col items-center space-y-4">
              <div className="text-sm text-gray-600 text-center">
                Page {currentPage} of {totalPages}
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={goToFirstPage}
                  disabled={currentPage === 1}
                  className="h-9 w-9 p-0 bg-transparent"
                >
                  <ChevronsLeft className="w-3 h-3" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                  className="h-9 w-9 p-0 bg-transparent"
                >
                  <ChevronLeft className="w-3 h-3" />
                </Button>
                <div className="px-4 py-2 text-sm font-medium bg-gray-100 rounded">
                  {currentPage} / {totalPages}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className="h-9 w-9 p-0 bg-transparent"
                >
                  <ChevronRight className="w-3 h-3" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={goToLastPage}
                  disabled={currentPage === totalPages}
                  className="h-9 w-9 p-0 bg-transparent"
                >
                  <ChevronsRight className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </>
        )}

        {/* No Results */}
        {memorials && memorials.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No memorials found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search criteria or browse all memorials.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
