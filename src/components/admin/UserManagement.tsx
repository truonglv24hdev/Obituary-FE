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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import type { TUser } from "@/types/type";
import { updateUserByAdmin } from "@/lib/accountAPI";
import { useRouter } from "next/navigation";

interface UserTableProps {
  users: TUser[];
  getStatusColor: (status: string) => string;
}

export default function UserTable({ users, getStatusColor }: UserTableProps) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Calculate pagination
  const totalPages = Math.ceil(users.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = users.slice(startIndex, endIndex);

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
              <TableHead className="w-100 museo text-2xl">User</TableHead>
              <TableHead className="w-70 museo text-2xl">Status</TableHead>
              <TableHead className="w-70 museo text-2xl">Memorials</TableHead>
              <TableHead className="museo text-2xl">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentUsers?.map((user) => (
              <TableRow key={user._id} className="h-20">
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" />
                      <AvatarFallback className="text-base font-bold">
                        {user.first_name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-lg">
                        {user.first_name} {user.last_name}
                      </div>
                      <div className="text-base text-gray-500">
                        {user.email}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    className={getStatusColor(
                      user.deleted ? "banned" : "active"
                    )}
                  >
                    {user.deleted ? "banned" : "active"}
                  </Badge>
                </TableCell>
                <TableCell className="text-xl px-15">
                  {user.memorials.length}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="lg">
                        <MoreHorizontal className="w-6 h-6" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      side="bottom"
                      align="start"
                      className="w-35 h-34 flex flex-col gap-1"
                    >
                      <DropdownMenuItem
                        onClick={() => router.push(`/user/${user._id}`)}
                        className="text-base hover:bg-gray-200"
                      >
                        View Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => router.push(`/user/edit/${user._id}`)}
                        className="text-base hover:bg-gray-200"
                      >
                        Edit User
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={async () => {
                          try {
                            await updateUserByAdmin(user._id);
                            window.location.reload();
                          } catch (err) {
                            console.error("Update failed:", err);
                          }
                        }}
                        className={`${
                          user.deleted ? "text-green-600" : "text-red-600"
                        } text-base hover:bg-gray-200`}
                      >
                        {user.deleted ? "Unban User" : "Ban User"}
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
            Showing {startIndex + 1} to {Math.min(endIndex, users.length)} of{" "}
            {users.length} users
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
        {currentUsers?.map((user) => (
          <div
            key={user._id}
            className="bg-white border rounded-lg p-4 shadow-sm"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <Avatar className="w-10 h-10 sm:w-12 sm:h-12">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                  <AvatarFallback className="text-sm sm:text-base font-bold">
                    {user.first_name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-base sm:text-lg truncate">
                    {user.first_name} {user.last_name}
                  </div>
                  <div className="text-sm sm:text-base text-gray-500 truncate">
                    {user.email}
                  </div>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="bottom" align="end" className="w-40">
                  <DropdownMenuItem
                    onClick={() => router.push(`/user/${user._id}`)}
                    className="text-sm"
                  >
                    View Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => router.push(`/user/edit/${user._id}`)}
                    className="text-sm"
                  >
                    Edit User
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={async () => {
                      try {
                        await updateUserByAdmin(user._id);
                        window.location.reload();
                      } catch (err) {
                        console.error("Update failed:", err);
                      }
                    }}
                    className={`${
                      user.deleted ? "text-green-600" : "text-red-600"
                    } text-sm`}
                  >
                    {user.deleted ? "Unban User" : "Ban User"}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="flex items-center justify-between pt-3 border-t">
              <div className="flex items-center space-x-4">
                <div className="text-sm text-gray-600">
                  Status:{" "}
                  <Badge
                    className={`${getStatusColor(
                      user.deleted ? "banned" : "active"
                    )} text-xs`}
                  >
                    {user.deleted ? "banned" : "active"}
                  </Badge>
                </div>
                <div className="text-sm text-gray-600">
                  Memorials:{" "}
                  <span className="font-medium">{user.memorials.length}</span>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Mobile Pagination */}
        <div className="flex flex-col items-center space-y-3 mt-6">
          <div className="text-sm text-gray-600 text-center">
            Showing {startIndex + 1} to {Math.min(endIndex, users.length)} of{" "}
            {users.length} users
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
