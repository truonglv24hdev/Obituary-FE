"use client"

import { useEffect, useState } from "react"
import { Users, Heart, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import UserTable from "@/components/admin/UserManagement"
import MemorialTable from "@/components/admin/MemorialManagement"
import Heading from "@/components/layout/Heading"
import { getAllUser } from "@/lib/accountAPI"
import type { TMemorial, TUser } from "@/types/type"
import { getAllMemorial } from "@/lib/memorialAPI"

export default function SimpleAdmin() {
  const [searchUsers, setSearchUsers] = useState("")
  const [searchMemorials, setSearchMemorials] = useState("")
  const [activeTab, setActiveTab] = useState("users")
  const [users, setUsers] = useState<TUser[] | null>(null)
  const [memorials, setMemorials] = useState<TMemorial[] | null>(null)

  useEffect(() => {
    getAllUser()
      .then((data) => {
        if (!data) return
        setUsers(data.items)
      })
      .catch((err) => console.error("Lỗi khi lấy memorial:", err))
  }, [])

  useEffect(() => {
    getAllMemorial()
      .then((data) => {
        if (!data) return
        setMemorials(data)
      })
      .catch((err) => console.error("Lỗi khi lấy memorial:", err))
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
      case "published":
        return "bg-green-100 text-base rounded h-10 w-17 text-green-800"
      case "privated":
        return "bg-yellow-100 text-yellow-800"
      case "banned":
      case "deleted":
        return "bg-red-100 h-10 w-17 text-base rounded text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPremiumColor = (status: string) => {
    switch (status) {
      case "premium":
        return "bg-green-100 h-10 w-20 text-base rounded text-green-800"
      case "free":
        return "bg-yellow-100 h-10 w-20 text-base rounded text-yellow-800"
      default:
        return "bg-gray-100 h-10 w-20 text-base rounded text-gray-800"
    }
  }

  return (
    <>
      <Heading className="bg-[#699D99]" />
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-2 sm:px-4 py-4 sm:py-8">
          {/* Stats Cards - Responsive Grid */}
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-4 lg:gap-6 mb-4 ${
              activeTab === "users" ? "xl:gap-20" : "xl:gap-10"
            }`}
          >
            {activeTab === "users" && (
              <>
                <div className="w-full sm:w-80 items-center h-16 sm:h-20 border bg-white rounded-lg p-3 sm:p-4 flex justify-between">
                  <div className="text-lg sm:text-2xl museo font-medium">Total Users</div>
                  <p className="text-lg sm:text-2xl museo font-medium">{users?.length}</p>
                </div>
                <div className="w-full sm:w-80 items-center h-16 sm:h-20 border bg-white rounded-lg p-3 sm:p-4 flex justify-between">
                  <div className="text-lg sm:text-2xl museo font-medium">Users Active</div>
                  <p className="text-lg sm:text-2xl museo font-medium">
                    {users?.filter((u) => u.deleted === false).length}
                  </p>
                </div>
                <div className="w-full sm:w-80 items-center h-16 sm:h-20 border bg-white rounded-lg p-3 sm:p-4 flex justify-between">
                  <div className="text-lg sm:text-2xl museo font-medium">User Banned</div>
                  <p className="text-lg sm:text-2xl museo font-medium">
                    {users?.filter((u) => u.deleted === false).length}
                  </p>
                </div>
              </>
            )}
            {activeTab === "memorials" && (
              <>
                <div className="w-full sm:w-70 items-center h-16 sm:h-20 border bg-white rounded-lg p-3 sm:p-4 flex justify-between">
                  <div className="text-lg sm:text-2xl museo font-medium">Total Memorial</div>
                  <p className="text-lg sm:text-2xl museo font-medium">{memorials?.length}</p>
                </div>
                <div className="w-full sm:w-70 items-center h-16 sm:h-20 border bg-white rounded-lg p-3 sm:p-4 flex justify-between">
                  <div className="text-lg sm:text-2xl museo font-medium">Memorial Active</div>
                  <p className="text-lg sm:text-2xl museo font-medium">
                    {memorials?.filter((m) => m.deleted === true).length}
                  </p>
                </div>
                <div className="w-full sm:w-70 items-center h-16 sm:h-20 border bg-white rounded-lg p-3 sm:p-4 flex justify-between">
                  <div className="text-lg sm:text-2xl museo font-medium">Memorial Deleted</div>
                  <p className="text-lg sm:text-2xl museo font-medium">
                    {memorials?.filter((m) => m.deleted === false).length}
                  </p>
                </div>
                <div className="w-full sm:w-70 items-center h-16 sm:h-20 border bg-white rounded-lg p-3 sm:p-4 flex justify-between">
                  <div className="text-lg sm:text-2xl museo font-medium">Memorial Premium</div>
                  <p className="text-lg sm:text-2xl museo font-medium">
                    {memorials?.filter((m) => m.premium === true).length}
                  </p>
                </div>
              </>
            )}
          </div>

          <Tabs defaultValue="users" className="space-y-3" onValueChange={setActiveTab}>
            {/* Responsive Tabs */}
            <TabsList className="w-full sm:w-130 h-11 grid grid-cols-2 sm:flex">
              <TabsTrigger
                value="users"
                className="flex w-full sm:w-30 md:w-20 h-10 items-center justify-center sm:space-x-2"
              >
                <Users className="w-5 h-5 sm:w-7 sm:h-7" />
                <span className="text-base sm:text-xl ml-1 sm:ml-0">Users</span>
              </TabsTrigger>
              <TabsTrigger
                value="memorials"
                className="flex w-full sm:w-auto md:w-20 h-10 items-center justify-center sm:space-x-2"
              >
                <Heart className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="text-base sm:text-xl ml-1 sm:ml-0">Memorials</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="users">
              <Card className="p-2 sm:p-4">
                <CardHeader className="px-2 sm:px-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <CardTitle className="text-2xl sm:text-4xl museo">User Management</CardTitle>
                    <div className="relative w-full sm:w-64">
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
                <CardContent className="px-2 sm:px-6">
                  <div className="overflow-x-auto">
                    <UserTable users={users ?? []} getStatusColor={getStatusColor} />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="memorials">
              <Card className="p-2 sm:p-4">
                <CardHeader className="px-2 sm:px-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <CardTitle className="text-2xl sm:text-4xl museo">Memorial Management</CardTitle>
                    <div className="relative w-full sm:w-64">
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
                <CardContent className="px-2 sm:px-6">
                  <div className="overflow-x-auto">
                    <MemorialTable
                      memorials={memorials ?? []}
                      getStatusColor={getStatusColor}
                      getPremiumColor={getPremiumColor}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  )
}
