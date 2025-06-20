"use client";
import { IconCalendar } from "@/components/icons";
import ObituaryTab from "@/components/memorial/ObituaryTab";
import { getObituaryById } from "@/lib/obituaryAPI";
import { TObituary } from "@/types/type";
import { format } from "date-fns";
import Image from "next/image";
import React, { use, useEffect, useState } from "react";

const page = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);

  const [obituary, setObituary] = useState<TObituary | null>(null);

  useEffect(() => {
    getObituaryById(id)
      .then((data) => {
        setObituary(data);
        console.log(data);
      })
      .catch((err) => {
        console.error("Lỗi khi lấy obituary:", err);
      });
  }, [id]);

  const bornDate = obituary?.memorial?.born && new Date(obituary.memorial.born);
  const isValidBornDate =
    bornDate instanceof Date && !isNaN(bornDate.getTime());

  const deathDate =
    obituary?.memorial?.death && new Date(obituary.memorial.born);
  const isValidDeathDate =
    deathDate instanceof Date && !isNaN(deathDate.getTime());

  return (
    <div className="flex flex-col gap-5">
      <div>
        {obituary?.headerImage ? (
          <Image
            src={`http://localhost:5000${obituary?.headerImage}`}
            alt={"headerImage"}
            width={1440}
            height={400}
            className="h-100 w-full object-cover"
          />
        ) : (
          <Image
            src={`/img/1.jpg`}
            alt={"headerImage"}
            width={1440}
            height={400}
            className="h-100 w-full object-cover"
          />
        )}
      </div>
      <div className="flex flex-col w-[1125px] mx-auto relative items-center overflow-hidden gap-10 bg-white">
        <div className="flex gap-15">
          <div className=" w-[248px] h-[248px] border rounded shadow-md overflow-hidden bg-white">
            {obituary?.memorial.picture && (
              <Image
                src={`http://localhost:5000${obituary?.memorial?.picture}`}
                alt={"avatar"}
                width={240}
                height={240}
                className="px-2 py-3 w-[240px] h-60 object-cover"
              />
            )}
          </div>
          <div className="flex flex-col my-auto gap-5">
            <div className="text-[32px] font-medium px-2 py-1">
              {obituary?.memorial.first_name +
                " " +
                obituary?.memorial.last_name}
            </div>
            <div className="flex gap-3">
              <IconCalendar className="w-6 h-6" />
              <div>{isValidBornDate && format(bornDate, "MMMM d, yyyy")} </div>
              <span className="mx-1">•</span>
              <div>{isValidDeathDate && format(deathDate, "MMMM d, yyyy")}</div>
            </div>
          </div>
        </div>
        <div
          className={`w-[1125px] flex  items-center shadow-md h-[62px] rounded border ${
            obituary?.memorial.premium
              ? "px-10 justify-between"
              : "px-25 gap-25 justify-center"
          } py-[15px]`}
        >
          <ObituaryTab />
        </div>
        <div className="text-[28px] font-medium">
          “You taught us not just how to live — but how to live with heart.”
        </div>
        <div className="w-[1125px] flex flex-col gap-15 justify-start">
          <div className="flex flex-col gap-7 ">
            <div className="text-[32px] font-medium">Words from family</div>
            <div className="text-xl museo text-[#00000099]">
              {obituary?.wordsFromFamily}
            </div>
          </div>
          <div className="flex flex-col gap-7 ">
            <div className="text-[32px] font-medium">Life story</div>
            <div className="text-xl museo text-[#00000099]">
              {obituary?.wordsFromFamily}
            </div>
          </div>
          <div className="flex flex-col gap-7 ">
            <div className="text-[32px] font-medium">Family tree</div>
            <div>
              {obituary?.familyTree.map((cat, index) => (
                <div key={index} className="flex flex-col gap-10">
                  <h2 className="text-2xl museo">{cat.category}</h2>
                  <div className="flex gap-9">
                    {cat.members.map((member, index) => (
                      <div key={index} className="flex gap-5">
                        <div className="flex flex-col gap-5 px-3 py-2">
                          <div className="relative w-[140px] h-[140px]">
                            <svg width="0" height="0">
                              <defs>
                                <clipPath
                                  id="clip-octagon"
                                  clipPathUnits="objectBoundingBox"
                                >
                                  <polygon points="0.143,0 0.857,0 1,0.143 1,0.857 0.857,1 0.143,1 0,0.857 0,0.143" />
                                </clipPath>
                              </defs>
                            </svg>
                            <div
                              className="w-[140px] h-[140px] bg-white rounded-none"
                              style={{ clipPath: "url(#clip-octagon)" }}
                            >
                              <Image
                                src={member.image || "/img/avatar.jpg"}
                                alt={member.name || "Member"}
                                width={140}
                                height={140}
                                className="w-full h-full object-cover"
                                style={{ clipPath: "url(#clip-octagon)" }}
                              />
                            </div>
                            <svg
                              width="140"
                              height="140"
                              viewBox="0 0 140 140"
                              className="absolute top-0 left-0 pointer-events-none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <polygon
                                points="20,0 120,0 140,20 140,120 120,140 20,140 0,120 0,20"
                                fill="none"
                                stroke="#00000080"
                                strokeWidth="2"
                              />
                            </svg>
                          </div>
                          <div className="w-35 h-13 text-lg museo font-light border-2 border-dashed  flex items-center justify-center">
                            {member.name}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-10">
            <h2 className="text-[32px] font-medium">Favorites</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
              {obituary?.favorites.map((item, idx) => (
                <div key={idx} className="w-[439px] h-[72px] flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-base museo font-light">
                    <i className={`${item.icon}`}></i>
                    <span>{item.question}</span>
                  </div>
                  <div className="text-[#222] text-base font-light">
                    {`"${item.answer}"`}
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
