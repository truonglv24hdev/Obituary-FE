"use client";
import React, { useState } from "react";
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
import { IconLeftNotArrow } from "@/components/icons";
import Image from "next/image";
// import { Check, X } from "lucide-react";

const page = () => {
  const options = ["Public", "Private", "Password protected"];
  const [selected, setSelected] = useState("Public");

  return (
    <>
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
          <Button className="bg-[#5f9c96] hover:bg-[#4a857f] museo w-[124px] h-11 text-white rounded text-base museo px-7 py-2">
            Edit page
          </Button>
        </div>
      </div>
      <div className="w-full relative flex flex-col items-center gap-6 ">
        {/* Header */}

        <div className="w-[1240px] flex flex-col gap-5 justify-start">
          <div className="flex justify-start mt-15 ">
            <Button className="w-[217px] h-11 rounded px-[26px] py-2">
              <IconLeftNotArrow className="w-6 h-6" />
              Back to memorial
            </Button>
          </div>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-5">
            <div className="bg-[#E5F6EC4D] flex gap-10 w-[863px] h-[312px] px-6 py-6 rounded-lg">
              <div className="w-[248px] h-[248px] bg-white flex justify-center items-center">
                <Image src={"/img/1.jpg"} alt="" width={209} height={209} />
              </div>
              <div className="flex flex-col gap-8 h-[248px] w-[435px]">
                <div className="flex flex-col gap-3">
                  <h1 className="text-4xl font-bold h-10">John Doe</h1>
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
                      <DropdownMenuTrigger className="border px-2 py-1 rounded flex items-center gap-2 text-sm text-[#2d3b4e]">
                        {selected}
                        <ChevronDown className="w-4 h-4" />
                      </DropdownMenuTrigger>

                      <DropdownMenuContent className="w-[220px]">
                        {options.map((option) => {
                          const isSelected = selected === option;
                          return (
                            <DropdownMenuItem
                              key={option}
                              onClick={() => setSelected(option)}
                              className={`flex items-center gap-3 px-3 py-2 text-sm cursor-pointer ${
                                isSelected ? "bg-red-50" : ""
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
                  <p className="text-lg font-semibold h-6">Upgrade plan</p>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="flex gap-6 h-[22px]">
                    <p className="text-base museo font-light">Plan:</p>
                    <span className="bg-white/20 px-2 py-0.5 text-sm museo font-light rounded-none text-white">
                      Free
                    </span>
                  </div>
                  <ul className="text-sm museo font-light flex flex-col h-[116px] gap-2 list-disc list-outside pl-5">
                    <li>One-time payment</li>
                    <li>
                      Unlimited photos, videos and guest condolence messages
                    </li>
                    <li>Timeline and Family Tree feature</li>
                    <li>Privacy and password protection</li>
                  </ul>
                </div>

                <div className="mt-3 h-10">
                  <Button className="w-full text-base museo font-light text-black rounded bg-white/50 backdrop-blur-md">
                    Upgrade Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RSVP List Controls */}
        <div className="w-[1240px] h-[1048px] bg-[#E5F6EC4D] flex flex-col p-8">
          <div className=" h-10 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <p className="font-medium">RSVP List</p>
              <DropdownMenu>
                <DropdownMenuTrigger className="border px-2 py-1 rounded">
                  Share
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Whatsapp</DropdownMenuItem>
                  <DropdownMenuItem>Facebook</DropdownMenuItem>
                  <DropdownMenuItem>Email</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="flex gap-5 items-center">
              <span className="text-sm">Split into 'individual'</span>
              <Switch defaultChecked />
              <span className="text-sm">Group by 'family'</span>

              <div className="flex items-center gap-3">
                <DropdownMenu>
                  <DropdownMenuTrigger className="border px-2 py-1 rounded">
                    Filter
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>All</DropdownMenuItem>
                    <DropdownMenuItem>Accept</DropdownMenuItem>
                    <DropdownMenuItem>Decline</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Input placeholder="Search for a name" className="h-8 w-60" />
              </div>
            </div>
          </div>

          {/* RSVP Table */}
          <div className="">
            <table className=" border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left p-2 border">Date</th>
                  <th className="text-left p-2 border">Last Name</th>
                  <th className="text-left p-2 border">Email</th>
                  <th className="text-left p-2 border">Status</th>
                  <th className="text-left p-2 border">Contact</th>
                </tr>
              </thead>
              <tbody>
                {rsvps.map((rsvp, i) => (
                  <tr key={i} className="border-t">
                    <td className="p-2 border">{rsvp.date}</td>
                    <td className="p-2 border">{rsvp.lastName}</td>
                    <td className="p-2 border">{rsvp.email}</td>
                    <td className="p-2 border">
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded ${
                          rsvp.status === "Accept"
                            ? "text-green-600 bg-green-100"
                            : "text-red-600 bg-red-100"
                        }`}
                      >
                        {rsvp.status}
                      </span>
                    </td>
                    <td className="p-2 border">{rsvp.contact}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end mt-4">
            <Button>Download excel list</Button>
          </div>
        </div>
      </div>
    </>
  );
};

const rsvps = [
  {
    date: "08/21/2024",
    lastName: "Mercury",
    email: "freddie@queen.co.uk",
    status: "Accept",
    contact: "(307) 555-0133",
  },
  {
    date: "08/21/2024",
    lastName: "Lennon",
    email: "the_beatles@abc.co.uk",
    status: "Decline",
    contact: "(307) 555-0133",
  },
  {
    date: "08/21/2024",
    lastName: "Harrison",
    email: "the_beatles@abc.co.uk",
    status: "Accept",
    contact: "(307) 555-0133",
  },
  {
    date: "08/21/2024",
    lastName: "Starr",
    email: "the_beatles@abc.co.uk",
    status: "Accept",
    contact: "(307) 555-0133",
  },
  {
    date: "08/21/2024",
    lastName: "Hendrix",
    email: "jimi.hendrix@usa.com",
    status: "Accept",
    contact: "(307) 555-0133",
  },
  {
    date: "08/21/2024",
    lastName: "Morrison",
    email: "jim@the-door.com",
    status: "Decline",
    contact: "(319) 555-0115",
  },
  {
    date: "08/20/2024",
    lastName: "Joplin",
    email: "",
    status: "Accept",
    contact: "(907) 555-0101",
  },
  {
    date: "08/20/2024",
    lastName: "Dylan",
    email: "b.dylan@hotmail.com",
    status: "Accept",
    contact: "(319) 555-0152",
  },
  {
    date: "08/20/2024",
    lastName: "Richards",
    email: "rollingstones@live.co.uk",
    status: "Decline",
    contact: "(302) 555-0103",
  },
  {
    date: "08/19/2024",
    lastName: "Charles",
    email: "ray.charles@gmail.com",
    status: "Accept",
    contact: "(306) 555-0107",
  },
  {
    date: "08/19/2024",
    lastName: "Franklin",
    email: "",
    status: "Accept",
    contact: "(675) 555-0110",
  },
  {
    date: "08/18/2024",
    lastName: "Brown",
    email: "jamesbrown@yahoo.com",
    status: "Decline",
    contact: "(302) 555-0107",
  },
];

export default page;
