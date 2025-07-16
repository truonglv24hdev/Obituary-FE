// app/(admin)/dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";
import { Users, Heart, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserTable from "@/components/admin/UserManagement";
import MemorialTable from "@/components/admin/MemorialManagement";
import Heading from "@/components/layout/Heading";
import { getAllUser } from "@/lib/accountAPI";
import { TMemorial, TUser } from "@/types/type";
import { getAllMemorial } from "@/lib/memorialAPI";

export default function SimpleAdmin() {
  const [searchUsers, setSearchUsers] = useState("");
  const [searchMemorials, setSearchMemorials] = useState("");
  const [activeTab, setActiveTab] = useState("users");
  const [users, setUsers] = useState<TUser[] | null>(null);
  const [memorials, setMemorials] = useState<TMemorial[] | null>(null);

  useEffect(() => {
    getAllUser()
      .then((data) => {
        if (!data) return;
        setUsers(data.items);
      })
      .catch((err) => console.error("Lỗi khi lấy memorial:", err));
  }, []);

  useEffect(() => {
    getAllMemorial()
      .then((data) => {
        if (!data) return;
        setMemorials(data);
      })
      .catch((err) => console.error("Lỗi khi lấy memorial:", err));
  }, []);

  // const filteredUsers = users.filter(
  //   (user) =>
  //     user.name.toLowerCase().includes(searchUsers.toLowerCase()) ||
  //     user.email.toLowerCase().includes(searchUsers.toLowerCase())
  // );

  // const filteredMemorials = memorials.filter(
  //   (memorial) =>
  //     memorial.name.toLowerCase().includes(searchMemorials.toLowerCase()) ||
  //     memorial.creator.toLowerCase().includes(searchMemorials.toLowerCase())
  // );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
      case "published":
        return "bg-green-100 text-base rounded h-10 w-17 text-green-800";
      case "privated":
        return "bg-yellow-100 text-yellow-800";
      case "banned":
      case "deleted":
        return "bg-red-100 h-10 w-17 text-base rounded text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPremiumColor = (status: string) => {
    switch (status) {
      case "premium":
        return "bg-green-100 h-10 w-20 text-base rounded text-green-800";
      case "free":
        return "bg-yellow-100 h-10 w-20 text-base rounded text-yellow-800";
      default:
        return "bg-gray-100 h-10 w-20 text-base rounded text-gray-800";
    }
  };

  return (
    <>
      <Heading className="bg-[#699D99]" />
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <h1 className="text-2xl font-bold text-gray-900">
                  Admin Dashboard
                </h1>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div
            className={`flex w-full justify-between ${
              activeTab === "user" ? "gap-20" : "gap-10"
            } mb-4`}
          >
            {activeTab === "users" && (
              <>
                <div className="w-80 items-center md:h-20 border bg-white rounded-lg p-4 flex justify-between">
                  <div className="text-2xl museo font-medium">Total Users</div>
                  <p className="text-2xl museo font-medium">{users?.length}</p>
                </div>
                <div className="w-80 items-center md:h-20 border bg-white rounded-lg p-4 flex justify-between">
                  <div className="text-2xl museo font-medium">Users Active</div>
                  <p className="text-2xl museo font-medium">
                    {users?.filter((u) => u.deleted === false).length}
                  </p>
                </div>
                <div className="w-80 items-center md:h-20 border bg-white rounded-lg p-4 flex justify-between">
                  <div className="text-2xl museo font-medium">User Banned</div>
                  <p className="text-2xl museo font-medium">
                    {users?.filter((u) => u.deleted === false).length}
                  </p>
                </div>
              </>
            )}

            {activeTab === "memorials" && (
              <>
                <div className="w-90 items-center md:h-20 border bg-white rounded-lg p-4 flex justify-between">
                  <div className="text-2xl museo font-medium">
                    Total Memorial
                  </div>
                  <p className="text-2xl museo font-medium">
                    {memorials?.length}
                  </p>
                </div>
                <div className="w-90 items-center md:h-20 border bg-white rounded-lg p-4 flex justify-between">
                  <div className="text-2xl museo font-medium">
                    Memorial Active{" "}
                  </div>

                  <p className="text-2xl museo font-medium">
                    {memorials?.filter((m) => m.deleted === true).length}
                  </p>
                </div>
                <div className="w-90 items-center md:h-20 border bg-white rounded-lg p-4 flex justify-between">
                  <div className="text-2xl museo font-medium">
                    Memorial Deleted
                  </div>
                  <p className="text-2xl museo font-medium">
                    {memorials?.filter((m) => m.deleted === false).length}
                  </p>
                </div>
                <div className="w-90 items-center md:h-20 border bg-white rounded-lg p-4 flex justify-between">
                  <div className="text-2xl museo font-medium">
                    Memorial Premium
                  </div>
                  <p className="text-2xl museo font-medium">
                    {memorials?.filter((m) => m.premium === true).length}
                  </p>
                </div>
              </>
            )}
          </div>

          <Tabs
            defaultValue="users"
            className="space-y-3"
            onValueChange={setActiveTab}
          >
            <TabsList className="w-130 h-11">
              <TabsTrigger
                value="users"
                className="flex w-30 md:w-20 md:h-10 items-center space-x-2"
              >
                <Users className="w-7 h-7" />
                <span className="text-xl">Users</span>
              </TabsTrigger>
              <TabsTrigger
                value="memorials"
                className="flex md:w-20 md:h-10 items-center space-x-2"
              >
                <Heart className="w-6 h-6" />
                <span className="text-xl">Memorials</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="users">
              <Card className="p-4">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-4xl museo">User Management</CardTitle>
                    <div className="relative w-64">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search users..."
                        value={searchUsers}
                        onChange={(e) => setSearchUsers(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <UserTable
                    users={users ?? []}
                    getStatusColor={getStatusColor}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="memorials">
              <Card className="p-4">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-4xl museo">Memorial Management</CardTitle>
                    <div className="relative w-64">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search memorials..."
                        value={searchMemorials}
                        onChange={(e) => setSearchMemorials(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <MemorialTable
                    memorials={memorials ?? []}
                    getStatusColor={getStatusColor}
                    getPremiumColor={getPremiumColor}
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
