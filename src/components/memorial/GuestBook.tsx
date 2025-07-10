"use client";

import Image from "next/image";
import { GuestBookProps } from "@/types/type";

export default function GuestBook({ condolences }: GuestBookProps) {
  const withPhoto = condolences?.filter((item) => item.photo) || [];
  const withoutPhoto = condolences?.filter((item) => !item.photo) || [];

  // Group every 3 items of withoutPhoto
  const groupedWithoutPhoto = [];
  for (let i = 0; i < withoutPhoto.length; i += 3) {
    groupedWithoutPhoto.push(withoutPhoto.slice(i, i + 3));
  }

  return (
    <div className="flex flex-col md:flex-row w-full gap-6">
      {/* Left column: with photo */}
      <div className="w-full md:w-1/3 flex flex-col gap-6">
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
              <p className="text-[#222] text-lg museo font-light leading-[22px] tracking-[0px]">
                {`"${item.message}"`}
              </p>
              <div className="text-right font-semibold museo text-base text-[#222]">
                — {item.full_name}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Right column: without photo */}
      <div className="w-full md:w-2/3 flex flex-col gap-6">
        {groupedWithoutPhoto.map((group, groupIndex) => (
          <div key={`group-${groupIndex}`} className="flex flex-col gap-3">
            {group.map((item, index) => (
              <div
                key={`no-photo-${groupIndex}-${index}`}
                className="min-h-[134px] rounded-lg bg-[#E5F6EC] shadow px-5 py-4 flex flex-col justify-between"
              >
                <p className="text-[#222] text-lg museo font-light leading-[22px] tracking-[0px]">
                  {`"${item.message}"`}
                </p>
                <div className="text-right font-semibold museo text-base text-[#222]">
                  — {item.full_name}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
