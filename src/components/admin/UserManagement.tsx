"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MoreHorizontal } from "lucide-react"
import type { TUser } from "@/types/type"
import { updateUserByAdmin } from "@/lib/accountAPI"
import { useRouter } from "next/navigation"

interface UserTableProps {
  users: TUser[]
  getStatusColor: (status: string) => string
}

export default function UserTable({ users, getStatusColor }: UserTableProps) {
  const router = useRouter()

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
                  <Badge className={getStatusColor(user.deleted ? "banned" : "active")}>
                    {user.deleted ? "banned" : "active"}
                  </Badge>
                </TableCell>
                <TableCell className="text-xl px-15">{user.memorials.length}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="lg">
                        <MoreHorizontal className="w-6 h-6" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side="bottom" align="start" className="w-35 h-34 flex flex-col gap-1">
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
                            await updateUserByAdmin(user._id)
                            window.location.reload()
                          } catch (err) {
                            console.error("Update failed:", err)
                          }
                        }}
                        className={`${user.deleted ? "text-green-600" : "text-red-600"} text-base hover:bg-gray-200`}
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
      </div>

      {/* Mobile Card View */}
      <div className="block md:hidden space-y-4">
        {users?.map((user) => (
          <div key={user._id} className="bg-white border rounded-lg p-4 shadow-sm">
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
                  <div className="text-sm sm:text-base text-gray-500 truncate">{user.email}</div>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="bottom" align="end" className="w-40">
                  <DropdownMenuItem onClick={() => router.push(`/user/${user._id}`)} className="text-sm">
                    View Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push(`/user/edit/${user._id}`)} className="text-sm">
                    Edit User
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={async () => {
                      try {
                        await updateUserByAdmin(user._id)
                        window.location.reload()
                      } catch (err) {
                        console.error("Update failed:", err)
                      }
                    }}
                    className={`${user.deleted ? "text-green-600" : "text-red-600"} text-sm`}
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
                  <Badge className={`${getStatusColor(user.deleted ? "banned" : "active")} text-xs`}>
                    {user.deleted ? "banned" : "active"}
                  </Badge>
                </div>
                <div className="text-sm text-gray-600">
                  Memorials: <span className="font-medium">{user.memorials.length}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
