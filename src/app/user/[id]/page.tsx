"use client";

import { use, useEffect, useState } from "react";
import {
  ArrowLeft,
  Mail,
  Edit,
  MapPinHouse,
  EthernetPort,
  MoreHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";
import { getUserByAdmin } from "@/lib/accountAPI";
import { TMemorial, TUser } from "@/types/type";
import { getMemorials, updateStatusMemorial } from "@/lib/memorialAPI";
import { IconWorld } from "@/components/icons";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Link from "next/link";

export default function UserProfileView({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [user, setUser] = useState<TUser | null>(null);
  const [memorials, setMemorials] = useState<TMemorial[] | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-base rounded h-10 w-17 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "deleted":
        return "bg-red-100 h-10 w-17 text-base rounded text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const router = useRouter();

  useEffect(() => {
    getUserByAdmin(id)
      .then((data) => {
        if (!data) return;
        setUser(data);
      })
      .catch((err) => console.error("Lỗi khi lấy user:", err));

    getMemorials(id)
      .then((data) => {
        if (!data) return;
        setMemorials(data);
        console.log(data);
      })
      .catch((err) => console.error("Lỗi khi lấy memorial:", err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => router.push(`/admin`)}
                variant="ghost"
                size="sm"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Users
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  User Profile
                </h1>
                <p className="text-gray-600">
                  View and manage user information
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Link href={`/user/edit/${id}`} className="flex items-center border rounded p-2">
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* User Info Card */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <Avatar className="w-24 h-24 mx-auto mb-4">
                    <AvatarImage src={user?.first_name || "/placeholder.svg"} />
                    <AvatarFallback className="text-2xl">
                      {user?.first_name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {user?.first_name} {user?.last_name}
                  </h2>
                  <Badge
                    className={getStatusColor(
                      user?.deleted ? "banned" : "active"
                    )}
                  >
                    {user?.deleted ? "banned" : "active"}
                  </Badge>
                </div>

                <div className="mt-6 flex flex-col gap-7">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Mail className="w-6 h-6" />
                    <span className="text-base text-black">{user?.email}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <MapPinHouse className="w-6 h-6" />
                    <span className="text-base text-black">
                      {user?.address}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <IconWorld className="w-6 h-6" />
                    <span className="text-base text-black">
                      {user?.country}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <EthernetPort className="w-6 h-6" />
                    <span className="text-base text-black">{user?.code}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stats Card */}
            <Card className="mt-6 ">
              <CardHeader className="mt-2">
                <CardTitle className="text-2xl">Memorials Statistics</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col mb-4 gap-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-xl">
                    Memorials Created
                  </span>
                  <span className="font-semibold">{memorials?.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-xl">Memories Shared</span>
                  <span className="font-semibold">
                    {memorials?.filter((m) => m.deleted === false).length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-xl">Total Views</span>
                  <span className="font-semibold">
                    {memorials?.filter((m) => m.deleted === true).length}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="memorials" className="space-y-6">
              {/* Memorials Tab */}
              <TabsContent value="memorials">
                <Card className="p-3">
                  <CardHeader>
                    <CardTitle className="text-2xl">User's Memorials</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="text-xl">
                            Memorial Name
                          </TableHead>
                          <TableHead className="text-xl">Status</TableHead>
                          <TableHead className="text-xl">Created</TableHead>
                          <TableHead className="text-xl">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {memorials?.map((memorial) => (
                          <TableRow key={memorial._id}>
                            <TableCell className="font-medium text-base">
                              {memorial.first_name} {memorial.middle_name}{" "}
                              {memorial.last_name}
                            </TableCell>
                            <TableCell>
                              <Badge
                                className={getStatusColor(
                                  memorial.deleted ? "deleted" : "active"
                                )}
                              >
                                {memorial.deleted ? "deleted" : "active"}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-base">
                              {new Date(
                                memorial.createdAt
                              ).toLocaleDateString()}
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
                                      router.push(
                                        `/memorial/${memorial.obituaryId}`
                                      )
                                    }
                                    className="text-base hover:bg-gray-500 "
                                  >
                                    View Memorial
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-base hover:bg-gray-500 ">
                                    Edit Memorial
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={async () => {
                                      try {
                                        await updateStatusMemorial(
                                          memorial._id
                                        );
                                        window.location.reload();
                                        router.refresh();
                                      } catch (err) {
                                        console.error("Update failed:", err);
                                      }
                                    }}
                                    className={`${
                                      memorial.deleted
                                        ? "text-green-600"
                                        : "text-red-600"
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
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
