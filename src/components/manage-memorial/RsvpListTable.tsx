"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Check } from "lucide-react";
import {
  IconFilterDrop,
  IconLock,
  IconSearch,
  IconShare,
} from "@/components/icons";
import { FaWhatsapp } from "react-icons/fa";
import { FiFacebook, FiMail } from "react-icons/fi";
import { format } from "date-fns";
import { Switch } from "../ui/switch";

type RSVP = {
  createdAt?: Date;
  first_name: string;
  last_name: string;
  email?: string;
  verification?: boolean;
  contact?: string;
};

export default function RsvpListTable({
  rsvps,
  filtered,
  setFiltered,
  handleDownloadExcel,
}: {
  rsvps: RSVP[];
  filtered: string;
  setFiltered: (f: string) => void;
  handleDownloadExcel: () => void;
}) {
  const filter = ["All", "Accept", "Decline"];

  const getFilteredRsvps = () => {
    if (!rsvps) return [];
    if (filtered === "Accept")
      return rsvps.filter((r) => r.verification === true);
    if (filtered === "Decline")
      return rsvps.filter((r) => r.verification === false);
    return rsvps;
  };

  const shareUrl =
    "http://localhost:3000/manage-memorial/6854d388c8086af6b171cd60";
  const encodedUrl = encodeURIComponent(shareUrl);

  const handleShare = (platform: "whatsapp" | "facebook" | "email") => {
    let url = "";
    switch (platform) {
      case "whatsapp":
        url = `https://wa.me/?text=${encodedUrl}`;
        break;
      case "facebook":
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case "email":
        url = `mailto:?subject=Check this out&body=${encodedUrl}`;
        break;
    }
    window.open(url, "_blank");
  };

  return (
    <div className="w-full overflow-x-auto">
      <div className="w-full min-w-[360px] max-w-[1240px] mx-auto rounded bg-[#E5F6EC4D] flex flex-col p-4 sm:p-6 md:p-8 gap-3">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div className="flex items-center gap-3">
            <p className="museo text-xl font-light">RSVP List</p>
            <IconLock className="w-6 h-6" />
            <DropdownMenu>
              <DropdownMenuTrigger>
                <IconShare className="w-6 h-6 cursor-pointer" />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="bottom"
                align="start"
                className="w-[203px] h-[155px] rounded border"
              >
                <DropdownMenuItem
                  onClick={() => handleShare("whatsapp")}
                  className="px-6 py-3 flex gap-4 text-base font-light museo"
                >
                  <FaWhatsapp
                    className="text-black"
                    style={{ width: 20, height: 20 }}
                  />
                  Whatsapp
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleShare("facebook")}
                  className="px-6 py-3 flex gap-4 text-base font-light museo"
                >
                  <FiFacebook
                    className="text-black"
                    style={{ width: 20, height: 20 }}
                  />
                  Facebook
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleShare("email")}
                  className="px-6 py-3 flex gap-4 text-base font-light museo"
                >
                  <FiMail
                    className="text-black"
                    style={{ width: 20, height: 20 }}
                  />
                  Email
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Filter + Search */}
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            <div className="flex items-center gap-3">
              <span className="text-sm museo font-light">
                Split into 'individual'
              </span>
              <Switch defaultChecked />
              <span className="text-sm museo font-light">
                Group by 'family'
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <DropdownMenu>
                <DropdownMenuTrigger className="border cursor-pointer flex justify-between items-center text-[14px] museo w-[104px] h-10 bg-[#699D99] text-white rounded px-3 py-[5px]">
                  Filter
                  <IconFilterDrop className="w-6 h-6" />
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="bottom"
                  align="start"
                  className="w-[203px] h-[152px] rounded border"
                >
                  {filter.map((option) => {
                    const isSelected = filtered === option;
                    return (
                      <DropdownMenuItem
                        key={option}
                        onClick={() => setFiltered(option)}
                        className={`flex items-center h-11 gap-4 px-6 py-3 text-base font-light museo cursor-pointer ${
                          isSelected ? "bg-[#E5F6EC4D]" : ""
                        }`}
                      >
                        <div
                          className={`w-5 h-5 flex items-center justify-center rounded border ${
                            isSelected
                              ? "bg-[#699D99] text-white"
                              : "border-gray-300"
                          }`}
                        >
                          {isSelected && (
                            <Check className="w-4 h-4 text-white" />
                          )}
                        </div>
                        <span>{option}</span>
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuContent>
              </DropdownMenu>

              <div className="relative w-full sm:w-60 h-10">
                <Input
                  placeholder="Search for a name"
                  className="h-full w-full sm:w-[239px] rounded pr-10 text-teal-700 placeholder:text-[#699D99] placeholder:text-sm placeholder:font-light border border-[#699D99] focus-visible:ring-0 focus-visible:ring-offset-0"
                />
                <IconSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-[#699D99] w-6 h-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="w-full overflow-x-auto">
          <Table className="min-w-[720px] w-full border-separate border-spacing-0">
            <TableHeader className="bg-[#699D99] text-black">
              <TableRow className="h-14 hover:bg-inherit">
                <TableHead className="text-white text-base museo font-semibold text-center w-[196px]">
                  Date
                </TableHead>
                <TableHead className="text-white text-base museo font-semibold w-[196px] pl-4">
                  First Name
                </TableHead>
                <TableHead className="text-white text-base museo font-semibold w-[196px] pl-4">
                  Last Name
                </TableHead>
                <TableHead className="text-white text-base museo font-semibold w-[196px]">
                  Email
                </TableHead>
                <TableHead className="text-white text-base museo font-semibold text-center w-[196px]">
                  Verification Expiry
                </TableHead>
                <TableHead className="text-white text-base museo font-semibold text-center w-[196px]">
                  Contact
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="bg-white">
              {getFilteredRsvps().map((rsvp, i) => (
                <TableRow key={i} className="border-t w-[196px] h-14">
                  <TableCell className="text-center border-b-2">
                    {rsvp.createdAt &&
                      format(new Date(rsvp.createdAt), "MM/dd/yyyy")}
                  </TableCell>
                  <TableCell className="pl-4 border-b-2">
                    {rsvp.first_name}
                  </TableCell>
                  <TableCell className="pl-4 border-b-2">
                    {rsvp.last_name}
                  </TableCell>
                  <TableCell className="p-2 border-b-2">{rsvp.email}</TableCell>
                  <TableCell className="border-b-2">
                    <div
                      className={`flex justify-center items-center text-sm mx-auto font-light museo w-[70px] h-6 px-2 py-1 rounded ${
                        rsvp.verification
                          ? "text-green-600 bg-white border border-[#28C76F80]"
                          : "text-red-600 bg-white border border-[#FF000080]"
                      }`}
                    >
                      {rsvp.verification ? "Accept" : "Decline"}
                    </div>
                  </TableCell>
                  <TableCell className="text-center border-b-2">
                    {rsvp.contact}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Download */}
        <div className="flex justify-end mt-5">
          <Button
            onClick={handleDownloadExcel}
            className="w-full sm:w-[199px] h-11 rounded bg-[#699D99] text-base museo font-light"
          >
            Download excel list
          </Button>
        </div>
      </div>
    </div>
  );
}
