"use client";
import React, { use, useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
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

import { TMemorial } from "@/types/type";
import {
  getMemorialById,
  putMemorial,
  verifyMemorial,
} from "@/lib/memorialAPI";
import * as XLSX from "xlsx";
import { deleteCondolences } from "@/lib/condolences";
import Link from "next/link";
import SetPasswordDialog from "@/components/manage-memorial/SetPasswordDialog";
import RsvpListTable from "@/components/manage-memorial/RsvpListTable";
import ContentModeration from "@/components/manage-memorial/ContentModeration";
import PasswordPrompt from "@/components/manage-memorial/PasswordPrompt";

const page = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);

  const [isAuthorized, setIsAuthorized] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const options = ["Public", "Private", "Password protected"];
  const [selected, setSelected] = useState("Public");
  const [filtered, setFiltered] = useState("All");
  const [memorial, setMemorial] = useState<TMemorial | null>(null);
  const [type, setType] = useState(false);

  useEffect(() => {
    getMemorialById(id)
      .then((data) => {
        if (!data) return;
        setMemorial(data);
        setSelected(data.privacy);

        // Nếu là password protected, luôn hiển thị modal
        if (data.privacy === "Password protected") {
          setShowPasswordModal(true);
          setIsAuthorized(false);
        } else {
          setIsAuthorized(true);
        }
      })
      .catch((err) => console.error("Lỗi khi lấy memorial:", err));
  }, [id]);

  useEffect(() => {
    const memorialId = localStorage.getItem("memorialId");
    if (memorialId && memorialId === id) {
      setType(true);
    }
  }, [id]);

  const handlePasswordSubmit = async (password: string) => {
    const result = await verifyMemorial(id, password);
    if (result.code == 2) {
      setIsAuthorized(true);
      setShowPasswordModal(false);
    } else {
      setErrorMessage("Incorrect password");
    }
  };

  const getFilteredRsvps = () => {
    if (!memorial?.rsvps) return [];

    if (filtered === "Accept") {
      return memorial.rsvps.filter((r) => r.verification === true);
    }

    if (filtered === "Decline") {
      return memorial.rsvps.filter((r) => r.verification == false);
    }

    return memorial.rsvps;
  };

  const handleDownloadExcel = () => {
    const rsvpsToExport = getFilteredRsvps();

    if (!rsvpsToExport.length) {
      alert("No RSVP data to export.");
      return;
    }

    const worksheetData = rsvpsToExport.map((rsvp) => ({
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
    XLSX.writeFile(workbook, `rsvp_list_${memorial?._id}.xlsx`);
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

  const isAuto = type === true;

  if (showPasswordModal && !isAuthorized && !type) {
    return (
      <PasswordPrompt
        onSubmit={handlePasswordSubmit}
        errorMessage={errorMessage}
        onClearError={() => setErrorMessage("")}
        id={id}
      />
    );
  }

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
          <div className=" justify-start mt-15 ">
            <Link
              href={"/account/memorials"}
              className="w-[217px] h-11 flex bg-[#293548] text-base museo font-light gap-3 text-white rounded px-[26px] py-2"
            >
              <IconLeftNotArrow className="w-6 h-6" />
              Back to memorial
            </Link>
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
                      <DropdownMenuTrigger className="border-none  py-1 rounded flex items-center gap-2 text-lg museo text-[#2d3b4e]">
                        {selected}
                        <ChevronDown className="w-4 h-4" />
                      </DropdownMenuTrigger>

                      <DropdownMenuContent
                        side="bottom"
                        align="start"
                        className="w-[219px] h-[152px] px-4 py-3"
                      >
                        {options.map((option) => {
                          const isSelected = selected === option;
                          return (
                            <DropdownMenuItem
                              key={option}
                              onClick={async () => {
                                setSelected(option);
                                setMemorial((prev) =>
                                  prev ? { ...prev, privacy: option } : prev
                                );

                                try {
                                  const formData = new FormData();
                                  formData.append("privacy", option);
                                  await putMemorial(id, formData);
                                } catch (error) {
                                  console.error(
                                    "Cập nhật privacy thất bại:",
                                    error
                                  );
                                }
                              }}
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
                    <SetPasswordDialog
                      key={isAuto ? "auto" : "manual"}
                      title={isAuto ? "Set new password" : "Set password"}
                      defaultOpen={isAuto}
                      onSave={async (newPassword) => {
                        const formPassword = new FormData();
                        formPassword.append("password", newPassword);
                        await putMemorial(id, formPassword);

                        if (isAuto) {
                          localStorage.removeItem("memorialId");
                          setType(false);
                        }
                      }}
                      {...(!isAuto
                        ? {
                            trigger: (
                              <span className="museo text-lg font-light cursor-pointer">
                                {memorial?.password
                                  ? "**********"
                                  : "Set password"}
                              </span>
                            ),
                          }
                        : {})}
                    />
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
        <RsvpListTable
          rsvps={memorial?.rsvps || []}
          filtered={filtered}
          setFiltered={setFiltered}
          handleDownloadExcel={handleDownloadExcel}
        />

        {/* Content Moderation */}
        <ContentModeration
          condolences={memorial?.condolences || []}
          handleDeleteCondolence={handleDeleteCondolence}
        />
      </div>
    </div>
  );
};

export default page;
