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
    <div className="md:mb-10">
      <Heading className="bg-[#699D99]" />
      <div className="w-full h-auto flex items-center justify-center px-4 py-[15px] border-b bg-white">
        <div className="max-w-[1240px] w-full flex flex-wrap lg:flex-nowrap justify-center items-center gap-4 lg:gap-20 text-sm text-[#2d3b4e] overflow-x-auto">
          <div className="min-w-[122px] h-6 flex items-center gap-2">
            <div className="w-6 h-6">
              <LayoutDashboard size={24} />
            </div>
            <span className="museo text-base lg:text-lg font-light whitespace-nowrap">
              Dashboard
            </span>
          </div>
          <div className="min-w-[122px] h-6 flex items-center gap-2">
            <div className="w-6 h-6">
              <Bell size={24} />
            </div>
            <span className="museo text-base lg:text-lg font-light whitespace-nowrap">
              Notifications
            </span>
          </div>
          <div className="min-w-[122px] h-6 flex items-center gap-2">
            <div className="w-6 h-6">
              <BarChart2 size={24} />
            </div>
            <span className="museo text-base lg:text-lg font-light whitespace-nowrap">
              Statistics
            </span>
          </div>
          <div className=" h-6 flex items-center gap-2">
            <Link href={`/memorial/${memorial?.obituaryId}`} className="flex gap-2 min-w-[170px]">
              <div className="w-6 h-6">
                <ExternalLink size={24} />
              </div>
              <span className="museo text-base lg:text-lg font-light whitespace-nowrap">
                Vist page
              </span>
            </Link>
          </div>
          <Link
            href={`/obituary/${memorial?._id}`}
            className="bg-[#5f9c96] hover:bg-[#4a857f] museo text-white rounded flex items-center justify-center text-sm lg:text-base museo px-5 py-2 min-w-[124px] h-11 whitespace-nowrap"
          >
            Edit page
          </Link>
        </div>
      </div>

      <div className="w-full relative flex flex-col items-center gap-6 ">
        {/* Header */}
        <div className="w-full max-w-[1240px] mx-auto flex flex-col gap-7">
          <div className="mt-15">
            <Link
              href={"/account/memorials"}
              className="w-[217px] md:ml-0 ml-2 h-11 flex bg-[#293548] text-base museo font-light gap-3 text-white rounded px-[26px] py-2"
            >
              <IconLeftNotArrow className="w-6 h-6" />
              Back to memorial
            </Link>
          </div>

          <div className="flex flex-col xl:flex-row items-start gap-5 w-full">
            {/* Left section */}
            <div className="bg-[#E5F6EC4D] w-full xl:w-[863px] min-h-[312px] px-4 sm:px-6 py-6 rounded-lg flex flex-col sm:flex-row gap-6 sm:gap-10">
              {/* Image box */}
              <div className="flex-shrink-0 w-full sm:w-[248px] h-[248px] bg-white flex justify-center items-center">
                <Image
                  src={
                    memorial?.picture
                      ? encodeURI(
                          `https://obituary-be-production.up.railway.app${memorial.picture}`
                        )
                      : "/img/avatar.jpg"
                  }
                  alt=""
                  width={209}
                  height={209}
                  className="object-cover h-[209px]"
                />
              </div>

              {/* Info section */}
              <div className="flex flex-col gap-6 sm:gap-8 flex-1">
                <div className="flex flex-col gap-3">
                  <h1 className="text-3xl sm:text-4xl font-bold">
                    {memorial?.first_name} {memorial?.last_name}
                  </h1>
                  <p className="text-base museo font-light">Brother</p>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-[59px]">
                    <p className="w-[74px] museo text-lg font-semibold">
                      Address:
                    </p>
                    <a
                      className="museo text-lg font-light break-all"
                      href={`http://localhost:3000/memorial/${memorial?.obituaryId}`}
                    >
                      Tributechapters.com.sg/John-Doe
                    </a>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-[64px]">
                    <span className="w-[69px] museo text-lg font-semibold">
                      Privacy:
                    </span>
                    <DropdownMenu>
                      <DropdownMenuTrigger className="border-none py-1 rounded flex items-center gap-2 text-base sm:text-lg museo text-[#2d3b4e]">
                        {selected}
                        <ChevronDown className="w-4 h-4" />
                      </DropdownMenuTrigger>

                      <DropdownMenuContent
                        side="bottom"
                        align="start"
                        className="w-[219px] sm:w-[219px] max-h-[200px] px-3 sm:px-4 py-2 sm:py-3"
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
                              className={`flex items-center w-[219px] h-10 gap-3 px-3 py-2 text-sm sm:text-base museo font-light cursor-pointer ${
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
                              <span className="break-words">{option}</span>
                            </DropdownMenuItem>
                          );
                        })}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-[43px]">
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

                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-[74px]">
                    <p className="w-[59px] museo text-lg font-semibold">
                      Status:
                    </p>
                    <span className="museo text-lg font-light">
                      Memorial page is live
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Plan Box */}
            <div className="w-[353px] mx-auto md:mx-0 h-[324px] relative rounded-xl overflow-hidden">
              <Image
                src="/img/update.jpg"
                alt="Candle and flowers"
                fill
                className="absolute inset-0 w-full h-full object-cover z-0"
              />
              <div className="relative z-10 w-full h-full p-5 text-white flex flex-col gap-6">
                <p className="text-lg font-semibold">
                  {memorial?.premium ? "Paid Plan" : "Upgrade plan"}
                </p>

                <div className="flex flex-col gap-3">
                  <div className="flex gap-4 sm:gap-6 items-center">
                    <p className="text-base museo font-light">Plan:</p>
                    <span className="bg-white/20 px-2 py-0.5 text-sm museo font-light rounded-none text-white">
                      {memorial?.premium ? "One time" : "Free"}
                    </span>
                  </div>

                  {!memorial?.premium && (
                    <ul className="text-sm museo font-light flex flex-col gap-2 list-disc list-outside pl-5">
                      <li>One-time payment</li>
                      <li>
                        Unlimited photos, videos and guest condolence messages
                      </li>
                      <li>Timeline and Family Tree feature</li>
                      <li>Privacy and password protection</li>
                    </ul>
                  )}
                </div>

                {!memorial?.premium && (
                  <div className="w-full sm:w-[313px] h-10">
                    <Link
                      href={`/payment/${memorial?._id}`}
                      className="flex items-center justify-center w-full h-10 text-base museo font-light text-black rounded bg-white/50 backdrop-blur-md"
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
