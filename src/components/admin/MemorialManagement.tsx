"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import type { TMemorial } from "@/types/type";
import Image from "next/image";
import { updateStatusMemorial } from "@/lib/memorialAPI";
import { useRouter } from "next/navigation";

interface Props {
  memorials: TMemorial[];
  getStatusColor: (status: string) => string;
  getPremiumColor: (status: string) => string;
}

export default function MemorialTable({
  memorials,
  getStatusColor,
  getPremiumColor,
}: Props) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Calculate pagination
  const totalPages = Math.ceil(memorials.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentMemorials = memorials.slice(startIndex, endIndex);

  const goToFirstPage = () => setCurrentPage(1);
  const goToLastPage = () => setCurrentPage(totalPages);
  const goToPreviousPage = () =>
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  const goToNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <>
      {/* Desktop Table */}
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[400px] museo text-2xl">
                Memorial Name
              </TableHead>
              <TableHead className="w-[250px] museo text-2xl">
                Creator
              </TableHead>
              <TableHead className="museo text-2xl">Status</TableHead>
              <TableHead className="museo text-2xl">Premium</TableHead>
              <TableHead className="museo text-2xl">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentMemorials.map((memorial) => (
              <TableRow key={memorial._id} className="h-20">
                <TableCell className="font-medium flex gap-2 items-center text-xl">
                  <Image
                    src={`http://localhost:5000${memorial.picture}`}
                    alt="1"
                    width={80}
                    height={80}
                    className="w-20 h-20"
                  />
                  {memorial.first_name} {memorial.last_name}
                </TableCell>
                <TableCell className="text-xl">
                  {memorial?.user?.first_name} {memorial?.user?.last_name}
                </TableCell>
                <TableCell>
                  <Badge
                    className={getStatusColor(
                      memorial.deleted ? "banned" : "active"
                    )}
                  >
                    {memorial.deleted ? "deleted" : "active"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    className={getPremiumColor(
                      memorial.premium ? "premium" : "free"
                    )}
                  >
                    {memorial.premium ? "premium" : "free"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      side="bottom"
                      align="start"
                      className="w-49 h-34 flex flex-col gap-1"
                    >
                      <DropdownMenuItem
                        onClick={() =>
                          router.push(`/memorial/${memorial.obituaryId}`)
                        }
                        className="text-base hover:bg-gray-500 "
                      >
                        View Memorial
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          router.push(`/obituary/${memorial._id}`);
                        }}
                        className="text-base hover:bg-gray-500 "
                      >
                        Edit Memorial
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={async () => {
                          try {
                            await updateStatusMemorial(memorial._id);
                            window.location.reload();
                            router.refresh();
                          } catch (err) {
                            console.error("Update failed:", err);
                          }
                        }}
                        className={`${
                          memorial.deleted ? "text-green-600" : "text-red-600"
                        } text-base hover:bg-gray-200`}
                      >
                        {memorial.deleted
                          ? "Undeleted Memorial"
                          : "Deleted Memorial"}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Desktop Pagination */}
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-gray-600">
            Showing {startIndex + 1} to {Math.min(endIndex, memorials.length)}{" "}
            of {memorials.length} memorials
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={goToFirstPage}
              disabled={currentPage === 1}
              className="h-8 w-8 p-0 bg-transparent"
            >
              <ChevronsLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              className="h-8 w-8 p-0 bg-transparent"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <div className="flex items-center space-x-1">
              <span className="text-sm font-medium">
                Page {currentPage} of {totalPages}
              </span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className="h-8 w-8 p-0 bg-transparent"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={goToLastPage}
              disabled={currentPage === totalPages}
              className="h-8 w-8 p-0 bg-transparent"
            >
              <ChevronsRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="block md:hidden space-y-4">
        {currentMemorials.map((memorial) => (
          <div
            key={memorial._id}
            className="bg-white border rounded-lg p-4 shadow-sm"
          >
            <div className="flex items-start space-x-3 mb-3">
              <Image
                src={`http://localhost:5000${memorial.picture}`}
                alt="Memorial"
                width={60}
                height={60}
                className="w-12 h-12 sm:w-15 sm:h-15 rounded-lg object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="font-medium text-base sm:text-lg truncate">
                  {memorial.first_name} {memorial.last_name}
                </div>
                <div className="text-sm sm:text-base text-gray-500 truncate">
                  Created by: {memorial?.user?.first_name}{" "}
                  {memorial?.user?.last_name}
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 flex-shrink-0"
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="bottom" align="end" className="w-44">
                  <DropdownMenuItem
                    onClick={() =>
                      router.push(`/memorial/${memorial.obituaryId}`)
                    }
                    className="text-sm"
                  >
                    View Memorial
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      router.push(`/obituary/${memorial._id}`);
                    }}
                    className="text-sm"
                  >
                    Edit Memorial
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={async () => {
                      try {
                        await updateStatusMemorial(memorial._id);
                        window.location.reload();
                        router.refresh();
                      } catch (err) {
                        console.error("Update failed:", err);
                      }
                    }}
                    className={`${
                      memorial.deleted ? "text-green-600" : "text-red-600"
                    } text-sm`}
                  >
                    {memorial.deleted
                      ? "Undeleted Memorial"
                      : "Deleted Memorial"}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="flex items-center justify-between pt-3 border-t">
              <div className="flex items-center space-x-3">
                <div className="text-sm text-gray-600">
                  Status:{" "}
                  <Badge
                    className={`${getStatusColor(
                      memorial.deleted ? "banned" : "active"
                    )} text-xs`}
                  >
                    {memorial.deleted ? "deleted" : "active"}
                  </Badge>
                </div>
                <div className="text-sm text-gray-600">
                  Type:{" "}
                  <Badge
                    className={`${getPremiumColor(
                      memorial.premium ? "premium" : "free"
                    )} text-xs`}
                  >
                    {memorial.premium ? "premium" : "free"}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Mobile Pagination */}
        <div className="flex flex-col items-center space-y-3 mt-6">
          <div className="text-sm text-gray-600 text-center">
            Showing {startIndex + 1} to {Math.min(endIndex, memorials.length)}{" "}
            of {memorials.length} memorials
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={goToFirstPage}
              disabled={currentPage === 1}
              className="h-8 w-8 p-0 bg-transparent"
            >
              <ChevronsLeft className="w-3 h-3" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              className="h-8 w-8 p-0 bg-transparent"
            >
              <ChevronLeft className="w-3 h-3" />
            </Button>
            <div className="px-3 py-1 text-sm font-medium bg-gray-100 rounded">
              {currentPage} / {totalPages}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className="h-8 w-8 p-0 bg-transparent"
            >
              <ChevronRight className="w-3 h-3" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={goToLastPage}
              disabled={currentPage === totalPages}
              className="h-8 w-8 p-0 bg-transparent"
            >
              <ChevronsRight className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
