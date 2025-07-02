"use client";
import React, { use, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import Heading from "@/components/layout/Heading";
import {
  LayoutDashboard,
  Bell,
  BarChart2,
  ExternalLink,
  Check,
  ChevronDown,
} from "lucide-react";
import {
  IconDelete,
  IconFilterDrop,
  IconLeftNotArrow,
  IconLock,
  IconSearch,
  IconShare,
} from "@/components/icons";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TMemorial } from "@/types/type";
import { getMemorialById } from "@/lib/memorialAPI";
import { format } from "date-fns";
import * as XLSX from "xlsx";
import { deleteCondolences } from "@/lib/condolences";
import { FiFacebook, FiMail } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import Link from "next/link";

const page = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);

  const options = ["Public", "Private", "Password protected"];
  const filter = ["All", "Accept", "Decline"];
  const [selected, setSelected] = useState("Public");
  const [filtered, setFiltered] = useState("All");
  const [memorial, setMemorial] = useState<TMemorial | null>(null);

  useEffect(() => {
    getMemorialById(id)
      .then((data) => {
        if (!data) return;
        setMemorial(data);
      })
      .catch((err) => console.error("Lỗi khi lấy memorial:", err));
  }, [id]);

  const handleDownloadExcel = () => {
    if (!memorial?.rsvps || memorial.rsvps.length === 0) {
      alert("No RSVP data to export.");
      return;
    }

    const worksheetData = memorial.rsvps.map((rsvp) => ({
      Date: rsvp.createdAt
        ? new Date(rsvp.createdAt).toLocaleDateString("en-US")
        : "",
      "First Name": rsvp.first_name,
      "Last Name": rsvp.last_name,
      Email: rsvp.email || "",
      Verification: rsvp.verification ? "Accepted" : "Declined",
      Contact: rsvp.contact || "",
    }));

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "RSVPs");

    XLSX.writeFile(workbook, `rsvp_list_${memorial._id}.xlsx`);
  };

  const handleDeleteCondolence = async (condolenceId: string) => {
    try {
      const res = await deleteCondolences(condolenceId);

      if (res.code == 1) {
        setMemorial((prev) =>
          prev
            ? {
                ...prev,
                condolences: prev.condolences.filter(
                  (c) => c._id !== condolenceId
                ),
              }
            : null
        );
      }
    } catch (error) {
      console.error("Error deleting condolence:", error);
    }
  };

  console.log(memorial?.rsvps);

  return (
    <div className="mb-10">
      <Heading className="bg-[#699D99]" />
      <div className="w-full h-[74px] flex items-center justify-center px-25 py-[15px] border-b bg-white">
        <div className="max-w-[1240px] h-11 flex justify-center items-center gap-20 text-sm text-[#2d3b4e]">
          <div className="w-[122px] h-6 flex items-center gap-2">
            <div className="w-6 h-6">
              <LayoutDashboard size={24} />
            </div>
            <span className="museo text-lg font-light">Dashboard</span>
          </div>
          <div className="w-[122px] h-6 flex items-center gap-2">
            <div className="w-6 h-6">
              <Bell size={24} />
            </div>
            <span className="museo text-lg font-light">Notifications</span>
          </div>
          <div className="w-[122px] h-6 flex items-center gap-2">
            <div className="w-6 h-6">
              <BarChart2 size={24} />
            </div>
            <span className="museo text-lg font-light">Statistics</span>
          </div>
          <div className="w-[122px] h-6 flex items-center gap-2">
            <div className="w-6 h-6">
              <ExternalLink size={24} />
            </div>
            <span className="museo text-lg font-light">Vist page</span>
          </div>
          <Link
            href={`/obituary/${memorial?._id}`}
            className="bg-[#5f9c96] hover:bg-[#4a857f] museo w-[124px] h-11 text-white rounded flex items-center text-base museo px-7 py-2"
          >
            Edit page
          </Link>
        </div>
      </div>
      <div className="w-full relative flex flex-col items-center gap-6 ">
        {/* Header */}
        <div className="w-[1240px] flex flex-col gap-7 justify-start">
          <div className="flex justify-start mt-15 ">
            <Button className="w-[217px] h-11 rounded px-[26px] py-2">
              <IconLeftNotArrow className="w-6 h-6" />
              Back to memorial
            </Button>
          </div>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-5">
            <div className="bg-[#E5F6EC4D] flex gap-10 w-[863px] h-[312px] px-6 py-6 rounded-lg">
              <div className="w-[248px] h-[248px] bg-white flex justify-center items-center">
                <Image
                  src={
                    memorial?.picture
                      ? `http://localhost:5000${memorial.picture}`
                      : `/img/avatar.jpg`
                  }
                  alt=""
                  width={209}
                  height={209}
                />
              </div>
              <div className="flex flex-col gap-8 h-[248px] w-[435px]">
                <div className="flex flex-col gap-3">
                  <h1 className="text-4xl font-bold h-10">
                    {memorial?.first_name} {memorial?.last_name}
                  </h1>
                  <p className="text-base museo h-5 font-light ">Brother</p>
                </div>
                <div className="flex flex-col h-[144px] w-[435px] gap-4">
                  <div className="flex gap-[59px] items-center">
                    <p className="w-[74px] museo text-lg font-semibold">
                      Address:
                    </p>
                    <a className="museo text-lg font-light" href="#">
                      Tributechapters.com.sg/John-Doe
                    </a>
                  </div>
                  <div className="flex items-center gap-[64px]">
                    <span className="w-[69px] museo text-lg font-semibold">
                      Privacy:
                    </span>
                    <DropdownMenu>
                      <DropdownMenuTrigger className="border-none px-2 py-1 rounded flex items-center gap-2 text-sm text-[#2d3b4e]">
                        {selected}
                        <ChevronDown className="w-4 h-4" />
                      </DropdownMenuTrigger>

                      <DropdownMenuContent
                        side="bottom"
                        align="start"
                        className="w-[219px] h-[152px] px-6 py-3"
                      >
                        {options.map((option) => {
                          const isSelected = selected === option;
                          return (
                            <DropdownMenuItem
                              key={option}
                              onClick={() => setSelected(option)}
                              className={`flex items-center w-[219px] h-10 gap-3 px-3 py-2 text-base museo font-light cursor-pointer ${
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
                  </div>
                  <div className="flex gap-[43px] items-center">
                    <p className="w-22 museo text-lg font-semibold">
                      Password:
                    </p>
                    <a className="museo text-lg font-light">Set password</a>
                  </div>
                  <div className="flex gap-[74px] items-center">
                    <p className="w-[59px] museo text-lg font-semibold">
                      Status:
                    </p>
                    <a className="museo text-lg font-light">
                      Memorial page is live
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative w-[353px] h-[312px] rounded-xl overflow-hidden">
              <Image
                src="/img/update.jpg"
                alt="Candle and flowers"
                fill
                className="absolute inset-0 w-full h-full object-cover z-0"
              />

              <div className="relative z-10 w-full h-full p-5 rounded-xl text-white flex flex-col gap-7">
                <div>
                  <p className="text-lg font-semibold h-6">
                    {memorial?.premium ? "Paid Plan" : "Upgrade plan"}
                  </p>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="flex gap-6 h-[22px]">
                    <p className="text-base museo font-light">Plan:</p>
                    <span className="bg-white/20 px-2 py-0.5 text-sm museo font-light rounded-none text-white">
                      {memorial?.premium ? "One time" : "Free"}
                    </span>
                  </div>
                  {memorial?.premium ? (
                    ""
                  ) : (
                    <ul className="text-sm museo font-light flex flex-col h-[116px] gap-2 list-disc list-outside pl-5">
                      <li>One-time payment</li>
                      <li>
                        Unlimited photos, videos and guest condolence messages
                      </li>
                      <li>Timeline and Family Tree feature</li>
                      <li>Privacy and password protection</li>
                    </ul>
                  )}
                </div>

                {memorial?.premium ? (
                  ""
                ) : (
                  <div className=" w-[313px] h-10">
                    <Link
                      href={`/payment/${memorial?._id}`}
                      className="flex items-center justify-center w-[313px] h-10 text-base museo font-light text-black rounded bg-white/50 backdrop-blur-md"
                    >
                      Upgrade Now
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* RSVP List Controls */}
        <div className="w-[1240px] rounded bg-[#E5F6EC4D] flex flex-col p-8 gap-3">
          <div className=" h-10 flex justify-between items-center">
            <div className="flex items-center gap-3 h-6">
              <p className="museo text-xl font-light">RSVP List</p>
              <IconLock className="w-6 h-6" />
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <IconShare className="w-6 h-6" />
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="bottom"
                  align="start"
                  className="w-[203px] h-[152px] rounded border"
                >
                  <DropdownMenuItem className="px-6 py-3 flex gap-4 w-[203px] h-11 text-base font-light museo">
                    <FaWhatsapp
                      style={{ width: "20px", height: "20px" }}
                      className="text-black"
                    />
                    Whatsapp
                  </DropdownMenuItem>
                  <DropdownMenuItem className="px-6 py-3 flex gap-4 h-11 text-base font-light museo">
                    <FiFacebook
                      style={{ width: "20px", height: "20px" }}
                      className="text-black"
                    />{" "}
                    Facebook
                  </DropdownMenuItem>
                  <DropdownMenuItem className="px-6 py-3 flex gap-4 h-11 text-base font-light museo">
                    <FiMail
                      style={{ width: "20px", height: "20px" }}
                      className="text-black"
                    />
                    Email
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="flex gap-5 items-center">
              <div className="flex items-center gap-4 h-5">
                <span className="text-sm museo font-light">
                  Split into 'individual'
                </span>
                <Switch defaultChecked />
                <span className="text-sm museo font-light">
                  Group by 'family'
                </span>
              </div>

              <div className="flex items-center gap-3">
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
                <div className="relative w-60 h-10">
                  <Input
                    placeholder="Search for a name"
                    className="h-full w-[239px] rounded pr-10 text-teal-700 placeholder:text-[#699D99] placeholder:text-sm placeholder:font-light border border-[#699D99] focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                  <IconSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-[#699D99] w-6 h-6" />
                </div>
              </div>
            </div>
          </div>

          {/* RSVP Table */}
          <div className="w-full rounded-lg border border-gray-300 overflow-hidden">
            <Table className="w-full border-separate border-spacing-0">
              <TableHeader className="bg-[#699D99] text-black ">
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
                {memorial?.rsvps.map((rsvp, i) => (
                  <TableRow key={i} className="border-t w-[196px] h-14 ">
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
                    <TableCell className="p-2 border-b-2">
                      {rsvp.email}
                    </TableCell>
                    <TableCell className=" border-b-2">
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

          <div className="flex justify-end mt-5">
            <Button
              onClick={handleDownloadExcel}
              className="w-[199px] h-11 rounded bg-[#699D99] text-base museo font-light"
            >
              Download excel list
            </Button>
          </div>
        </div>

        {/* Content Moderation */}
        <div className="p-8 bg-[#F7FBF9] w-[1240px] flex flex-col rounded gap-8">
          <h1 className="text-[32px] museo font-light">Content Moderation</h1>

          {/* Messages Section */}
          <div className="flex flex-col gap-5">
            <h2 className="text-2xl museo font-light">Messages</h2>
            <div className="flex flex-col gap-5">
              {memorial?.condolences
                .filter((item) => item.message?.trim().length > 0)
                .map((item, i) => (
                  <div
                    key={i}
                    className="bg-white flex flex-col gap-8 p-8 rounded-lg relative w-[1176px] h-50"
                  >
                    <div className="flex justify-between w-[1112px] h-8">
                      <p className="font-semibold text-xl museo">
                        {item.full_name},{" "}
                        <span className="text-black font-light museo">
                          {format(
                            new Date(item.createdAt),
                            "MMM dd, yyyy, hh:mm a"
                          )}
                        </span>
                      </p>
                      <IconDelete
                        className="w-5.5 h-6"
                        onClick={() => handleDeleteCondolence(item._id)}
                      />
                    </div>
                    <p className="text-xl font-light museo text-black">
                      {item.message}
                    </p>
                  </div>
                ))}
            </div>
          </div>

          {/* Photos/Videos Section */}
          <div className="flex flex-col gap-8">
            <h2 className="text-2xl museo font-light">Photos/Videos</h2>
            <div className="flex gap-10 ">
              {memorial?.condolences.map((item, i) => (
                <div
                  key={i}
                  className="flex flex-col gap-5 items-center w-[365.33px] h-[396px]"
                >
                  {item.photo && (
                    <div className="relative  w-[365.33px] h-[332px] aspect-[4/3] rounded-md overflow-hidden">
                      <Image
                        src={`http://localhost:5000${item.photo}`}
                        alt=""
                        width={365.33}
                        height={332}
                        className="object-cover w-[365.33px] h-[332px]"
                      />
                    </div>
                  )}
                  <div className="flex gap-5 w-[260px] h-11 justify-center">
                    <Button className="px-7 py-2 text-sm text-[#FF2121] border border-[#FF2121] rounded bg-white hover:bg-red-50">
                      Delete
                    </Button>
                    <Button className="px-7 py-2 text-sm text-[#27FF61] border border-[#27FF61] rounded bg-white hover:bg-green-50">
                      Approve
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
