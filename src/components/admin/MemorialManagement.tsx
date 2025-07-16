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
import { MoreHorizontal } from "lucide-react";
import { TMemorial } from "@/types/type";
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
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[400px] museo text-2xl">
            Memorial Name
          </TableHead>
          <TableHead className="w-[250px] museo text-2xl">Creator</TableHead>
          <TableHead className="museo text-2xl">Status</TableHead>
          <TableHead className="museo text-2xl">Premium</TableHead>
          <TableHead className="museo text-2xl">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {memorials.map((memorial) => (
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
                    onClick={() => router.push(`/memorial/${memorial.obituaryId}`)}
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
                        await updateStatusMemorial(memorial._id);
                        window.location.reload();
                       router.refresh()
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
  );
}
