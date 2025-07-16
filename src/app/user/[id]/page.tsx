"use client";

import { use, useEffect, useState } from "react";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit,
  Ban,
  CheckCircle,
  MoreHorizontal,
  Heart,
  MessageSquare,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { TUser } from "@/types/type";

// Mock user data
const userData = {
  id: "1",
  name: "Sarah Johnson",
  email: "sarah.johnson@email.com",
  phone: "+1 (555) 123-4567",
  avatar: "/placeholder.svg?height=120&width=120",
  status: "active",
  joinDate: "2023-01-15",
  lastActive: "2 hours ago",
  location: "San Francisco, CA",
  bio: "Loving mother and grandmother who enjoys spending time with family and volunteering in the community.",
  memorialsCreated: 3,
  memoriesShared: 12,
  totalViews: 2847,
  followers: 24,
};

const userMemorials = [
  {
    id: 1,
    name: "Robert Johnson Memorial",
    status: "published",
    views: 1247,
    memories: 8,
    createdDate: "2023-03-20",
  },
  {
    id: 2,
    name: "Mary Johnson Memorial",
    status: "published",
    views: 892,
    memories: 4,
    createdDate: "2023-06-15",
  },
  {
    id: 3,
    name: "James Johnson Memorial",
    status: "pending",
    views: 0,
    memories: 0,
    createdDate: "2023-11-28",
  },
];

const userActivity = [
  {
    id: 1,
    action: "Created memorial",
    target: "James Johnson Memorial",
    date: "2023-11-28",
    time: "2:30 PM",
  },
  {
    id: 2,
    action: "Shared memory",
    target: "Robert Johnson Memorial",
    date: "2023-11-25",
    time: "4:15 PM",
  },
  {
    id: 3,
    action: "Updated profile",
    target: "Profile information",
    date: "2023-11-20",
    time: "10:45 AM",
  },
  {
    id: 4,
    action: "Shared memory",
    target: "Mary Johnson Memorial",
    date: "2023-11-18",
    time: "3:20 PM",
  },
];

export default function UserProfileView({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [userStatus, setUserStatus] = useState(userData.status);
  const [user, setUser] = useState<TUser | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "banned":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const router = useRouter();

  const handleStatusChange = (newStatus: string) => {
    setUserStatus(newStatus);
  };

  useEffect(() => {
    getUserByAdmin(id)
      .then((data) => {
        console.log(data);
        if (!data) return;
        setUser(data);
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
              <Button variant="outline" size="sm">
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    onClick={() => handleStatusChange("active")}
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Activate User
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleStatusChange("banned")}
                  >
                    <Ban className="w-4 h-4 mr-2" />
                    Ban User
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Mail className="w-4 h-4 mr-2" />
                    Send Email
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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

                <div className="mt-6 space-y-4">
                  <div className="flex items-center space-x-3 text-gray-600">
                    <Mail className="w-4 h-4" />
                    <span className="text-sm">{user?.email}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span className="text-sm">{userData.phone}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{user?.address}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">
                      Joined {new Date(userData.joinDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stats Card */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">User Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Memorials Created</span>
                  <span className="font-semibold">
                    {userData.memorialsCreated}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Memories Shared</span>
                  <span className="font-semibold">
                    {userData.memoriesShared}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Views</span>
                  <span className="font-semibold">
                    {userData.totalViews.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Followers</span>
                  <span className="font-semibold">{userData.followers}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Last Active</span>
                  <span className="font-semibold">{userData.lastActive}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="memorials" className="space-y-6">
              <TabsList>
                <TabsTrigger
                  value="memorials"
                  className="flex items-center space-x-2"
                >
                  <Heart className="w-4 h-4" />
                  <span>Memorials</span>
                </TabsTrigger>
                <TabsTrigger
                  value="activity"
                  className="flex items-center space-x-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Activity</span>
                </TabsTrigger>
              </TabsList>

              {/* Memorials Tab */}
              <TabsContent value="memorials">
                <Card>
                  <CardHeader>
                    <CardTitle>User's Memorials</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Memorial Name</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Views</TableHead>
                          <TableHead>Memories</TableHead>
                          <TableHead>Created</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {userMemorials.map((memorial) => (
                          <TableRow key={memorial.id}>
                            <TableCell className="font-medium">
                              {memorial.name}
                            </TableCell>
                            <TableCell>
                              <Badge
                                className={getStatusColor(memorial.status)}
                              >
                                {memorial.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {memorial.views.toLocaleString()}
                            </TableCell>
                            <TableCell>{memorial.memories}</TableCell>
                            <TableCell>
                              {new Date(
                                memorial.createdDate
                              ).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                              <Button variant="ghost" size="sm">
                                <Eye className="w-4 h-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Activity Tab */}
              <TabsContent value="activity">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {userActivity.map((activity) => (
                        <div
                          key={activity.id}
                          className="flex items-start space-x-4 p-4 border rounded-lg"
                        >
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <p className="font-medium">
                                {activity.action}:{" "}
                                <span className="text-blue-600">
                                  {activity.target}
                                </span>
                              </p>
                              <span className="text-sm text-gray-500">
                                {activity.time}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">
                              {activity.date}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
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
