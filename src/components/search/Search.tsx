"use client";

import { useEffect, useState } from "react";
import { Search, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getMemorialBySearch } from "@/lib/memorialAPI";
import { TMemorial } from "@/types/type";
import Image from "next/image";
import Link from "next/link";

interface CreateMemorialProps {
  firstName: string;
  lastName: string;
}

export default function MemorialSearch({
  firstName,
  lastName,
}: CreateMemorialProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentFirstName, setCurrentFirstName] = useState(firstName);
  const [memorials, setMemorial] = useState<TMemorial[] | null>(null);

  useEffect(() => {
    getMemorialBySearch(currentFirstName, lastName)
      .then((data) => setMemorial(data))
      .catch((err) => console.error("Lỗi khi lấy obituary:", err));
  }, [currentFirstName, lastName]);

  const handleSearch = () => {
    setCurrentFirstName(searchQuery);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      {/* <Heading className="bg-[#699D99]" /> */}

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
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12"
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {memorials?.map((memorial) => (
            <>
              <Link key={memorial._id} href={`memorial/${memorial.obituaryId}`}>
                <Card
                  key={memorial._id}
                  className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                >
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
                        {formatDate(memorial.born)} -{" "}
                        {formatDate(memorial.death)}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </>
          ))}
        </div>
      </div>
    </div>
  );
}
