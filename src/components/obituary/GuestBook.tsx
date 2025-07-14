import Image from "next/image";
import React, { useState } from "react";
import { Switch } from "../ui/switch";
import { Button } from "../ui/button";
import { IconFilterDrop, IconSetting } from "../icons";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { GuestBookProps } from "@/types/type";

const GuestBook = ({ condolences }: GuestBookProps) => {
  const [showGuestBook, setShowGuestBook] = useState(true);
  const [selected, setSelected] = useState("All");
  const filteredCondolences =
    condolences?.filter((item) => {
      if (selected === "Approved") return item.status === true && item.deleted === false;
      if (selected === "Rejected") return item.deleted === true;
      if (selected === "Pending") return item.status === false && item.deleted === false;
      return true;
    }) || [];

  const withPhoto = filteredCondolences.filter((item) => item.photo);
  const withoutPhoto = filteredCondolences.filter((item) => !item.photo);
  const groupedWithoutPhoto = [];
  for (let i = 0; i < withoutPhoto.length; i += 3) {
    groupedWithoutPhoto.push(withoutPhoto.slice(i, i + 3));
  }

  return (
    <div className="flex flex-col gap-10 mt-16">
      {/* Header */}
      <div className="flex flex-col gap-4  sm:items-center sm:justify-between">
        <div className="flex w-full items-center justify-between">
          <h3 className="text-[28px] sm:text-[32px] museo text-[#699D99] font-medium">
            Guest book
          </h3>
          <Switch checked={showGuestBook} onCheckedChange={setShowGuestBook} />
        </div>

        {/* Toolbar */}
        <div className="flex w-full justify-end gap-3 mt-4 sm:mt-0">
          <Button
            type="button"
            className="w-[123px] h-10 flex text-sm museo justify-between gap-2 px-4 py-2 rounded bg-white border border-[#699D99] shadow text-[#699D99] hover:bg-gray-50"
          >
            <span className="material-icons">Settings</span>
            <IconSetting className="w-6 h-6" />
          </Button>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                size="sm"
                className="border cursor-pointer flex justify-between text-[14px] museo w-[123px] h-10 bg-[#699D99] text-white rounded px-3 py-[5px] hover:bg-[#5a8b88]"
                type="button"
              >
                Filter
                <IconFilterDrop className="w-6 h-6" />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              side="bottom"
              align="end"
              className="w-[203px] h-[192px] flex flex-col rounded border bg-white shadow p-0"
            >
              {["All", "Approved", "Rejected", "Pending"].map((label) => (
                <label
                  key={label}
                  className={`flex h-12 items-center gap-3 px-4 py-3 cursor-pointer text-sm sm:text-lg rounded transition ${
                    selected === label ? "bg-[#f5fbf8]" : ""
                  }`}
                  onClick={() => setSelected(label)}
                >
                  <span
                    className={`w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center rounded-lg border-2 transition ${
                      selected === label
                        ? "bg-[#699D99] border-[#699D99]"
                        : "bg-white border-gray-300"
                    }`}
                  >
                    {selected === label && (
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M5 10.5L9 14.5L15 7.5"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </span>
                  <span className="font-medium">{label}</span>
                </label>
              ))}
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Guest Book Content */}
      {showGuestBook && (
        <div className="flex flex-col lg:flex-row gap-6 w-full">
          {/* Left: With photo */}
          <div className="w-full lg:w-1/3 flex flex-col gap-6">
            {withPhoto.map((item, index) => (
              <div
                key={`with-photo-${index}`}
                className="rounded-lg bg-[#E5F6EC] overflow-hidden shadow h-[426px] flex flex-col"
              >
                <Image
                  src={`https://obituary-be-production.up.railway.app${item.photo}`}
                  alt="avatar"
                  width={365}
                  height={213}
                  className="w-full h-[213px] object-cover"
                />
                <div className="flex flex-col justify-between flex-1 px-5 py-4">
                  <p className="text-[#222] text-base sm:text-lg museo font-light leading-[22px] tracking-[0px]">
                    {`"${item.message}"`}
                  </p>
                  <div className="text-right font-semibold museo text-sm sm:text-base text-[#222]">
                    — {item.full_name}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Without photo */}
          <div className="w-full lg:w-2/3 flex flex-col gap-6">
            {groupedWithoutPhoto.map((group, groupIndex) => (
              <div key={`group-${groupIndex}`} className="flex flex-col gap-3">
                {group.map((item, index) => (
                  <div
                    key={`no-photo-${groupIndex}-${index}`}
                    className="min-h-[134px] rounded-lg bg-[#E5F6EC] shadow px-5 py-4 flex flex-col justify-between"
                  >
                    <p className="text-[#222] text-base sm:text-lg museo font-light leading-[22px] tracking-[0px]">
                      {`"${item.message}"`}
                    </p>
                    <div className="text-right font-semibold museo text-sm sm:text-base text-[#222]">
                      — {item.full_name}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GuestBook;
