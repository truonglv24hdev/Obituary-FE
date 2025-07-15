// app/(admin)/dashboard/page.tsx
"use client";

import { useState } from "react";
import { Users, Heart, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserTable from "@/components/admin/UserManagement";
import MemorialTable from "@/components/admin/MemorialManagement";
import Heading from "@/components/layout/Heading";

const users = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah@email.com",
    status: "active",
    memorials: 2,
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "michael@email.com",
    status: "active",
    memorials: 1,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    email: "emily@email.com",
    status: "pending",
    memorials: 0,
  },
  {
    id: 4,
    name: "Robert Williams",
    email: "robert@email.com",
    status: "banned",
    memorials: 3,
  },
];

const memorials = [
  {
    id: 1,
    name: "Sarah Johnson Memorial",
    creator: "John Johnson",
    status: "published",
    views: 1247,
  },
  {
    id: 2,
    name: "Michael Chen Memorial",
    creator: "Lisa Chen",
    status: "published",
    views: 892,
  },
  {
    id: 3,
    name: "Emily Rodriguez Memorial",
    creator: "Carlos Rodriguez",
    status: "privated",
    views: 0,
  },
  {
    id: 4,
    name: "Robert Williams Memorial",
    creator: "Mary Williams",
    status: "deleted",
    views: 2156,
  },
];

export default function SimpleAdmin() {
  const [searchUsers, setSearchUsers] = useState("");
  const [searchMemorials, setSearchMemorials] = useState("");
  const [activeTab, setActiveTab] = useState("users");

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchUsers.toLowerCase()) ||
      user.email.toLowerCase().includes(searchUsers.toLowerCase())
  );

  const filteredMemorials = memorials.filter(
    (memorial) =>
      memorial.name.toLowerCase().includes(searchMemorials.toLowerCase()) ||
      memorial.creator.toLowerCase().includes(searchMemorials.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
      case "published":
        return "bg-green-100 text-green-800";
      case "privated":
        return "bg-yellow-100 text-yellow-800";
      case "banned":
      case "deleted":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
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
            } mb-8`}
          >
            {activeTab === "users" && (
              <>
                <div className="w-80 items-center h-20 border bg-white rounded-lg p-4 flex justify-between">
                  <div className="text-2xl museo font-medium">Total Users</div>
                  <p className="text-2xl museo font-medium">{users.length}</p>
                </div>
                <div className="w-80 items-center h-20 border bg-white rounded-lg p-4 flex justify-between">
                  <div className="text-2xl museo font-medium">Users Active</div>
                  <p className="text-2xl museo font-medium">
                    {users.filter((u) => u.status === "active").length}
                  </p>
                </div>
                <div className="w-80 items-center h-20 border bg-white rounded-lg p-4 flex justify-between">
                  <div className="text-2xl museo font-medium">User Banned</div>
                  <p className="text-2xl museo font-medium">
                    {users.filter((u) => u.status === "banned").length}
                  </p>
                </div>
              </>
            )}

            {activeTab === "memorials" && (
              <>
                <div className="w-90 items-center h-20 border bg-white rounded-lg p-4 flex justify-between">
                  <div className="text-2xl museo font-medium">
                    Total Memorial
                  </div>
                  <p className="text-2xl museo font-medium">{users.length}</p>
                </div>
                <div className="w-90 items-center h-20 border bg-white rounded-lg p-4 flex justify-between">
                  <div className="text-2xl museo font-medium">
                    Memorial Public{" "}
                  </div>

                  <p className="text-2xl museo font-medium">
                    {memorials.filter((m) => m.status === "published").length}
                  </p>
                </div>
                <div className="w-90 items-center h-20 border bg-white rounded-lg p-4 flex justify-between">
                  <div className="text-2xl museo font-medium">
                    Memorial Privated
                  </div>
                  <p className="text-2xl museo font-medium">
                    {memorials.filter((m) => m.status === "privated").length}
                  </p>
                </div>
                <div className="w-90 items-center h-20 border bg-white rounded-lg p-4 flex justify-between">
                  <div className="text-2xl museo font-medium">
                    Memorial Deleted
                  </div>
                  <p className="text-2xl museo font-medium">
                    {memorials.filter((m) => m.status === "deleted").length}
                  </p>
                </div>
              </>
            )}
          </div>

          <Tabs
            defaultValue="users"
            className="space-y-6"
            onValueChange={setActiveTab}
          >
            <TabsList>
              <TabsTrigger
                value="users"
                className="flex items-center space-x-2"
              >
                <Users className="w-4 h-4" />
                <span>Users</span>
              </TabsTrigger>
              <TabsTrigger
                value="memorials"
                className="flex items-center space-x-2"
              >
                <Heart className="w-4 h-4" />
                <span>Memorials</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="users">
              <Card className="p-4">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>User Management</CardTitle>
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
                  <UserTable />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="memorials">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Memorial Management</CardTitle>
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
                    memorials={filteredMemorials}
                    getStatusColor={getStatusColor}
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
