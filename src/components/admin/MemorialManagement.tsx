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

interface Memorial {
  id: number;
  name: string;
  creator: string;
  status: string;
  views: number;
}

interface Props {
  memorials: Memorial[];
  getStatusColor: (status: string) => string;
}

export default function MemorialTable({ memorials, getStatusColor }: Props) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Memorial Name</TableHead>
          <TableHead>Creator</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Views</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {memorials.map((memorial) => (
          <TableRow key={memorial.id}>
            <TableCell className="font-medium">{memorial.name}</TableCell>
            <TableCell>{memorial.creator}</TableCell>
            <TableCell>
              <Badge className={getStatusColor(memorial.status)}>
                {memorial.status}
              </Badge>
            </TableCell>
            <TableCell>{memorial.views.toLocaleString()}</TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>View Memorial</DropdownMenuItem>
                  <DropdownMenuItem>Edit Memorial</DropdownMenuItem>
                  <DropdownMenuItem>Approve</DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600">
                    Delete
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
