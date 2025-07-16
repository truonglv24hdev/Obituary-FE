"use client";

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
import { MoreHorizontal } from "lucide-react";
import { TUser } from "@/types/type";
import { updateUserByAdmin } from "@/lib/accountAPI";
import { useRouter } from "next/navigation";

interface UserTableProps {
  users: TUser[];
  getStatusColor: (status: string) => string;
}

export default function UserTable({ users, getStatusColor }: UserTableProps) {
  const router = useRouter();
  return (
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
        {users?.map((user) => (
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
                  <div className="text-base text-gray-500">{user.email}</div>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <Badge
                className={getStatusColor(user.deleted ? "banned" : "active")}
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
                  <DropdownMenuItem className="text-base hover:bg-gray-200">
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
  );
}
