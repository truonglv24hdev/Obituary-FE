"use client";

import { format } from "date-fns";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { IconDelete } from "@/components/icons";
import { TCondolences } from "@/types/type"; 

type Props = {
  condolences: TCondolences[];
  handleDeleteCondolence: (id: string) => void;
};

export default function ContentModeration({
  condolences,
  handleDeleteCondolence,
}: Props) {
  const messages = condolences.filter((item) => item.message?.trim().length > 0);
  const photos = condolences.filter((item) => item.photo);

  return (
    <div className="p-8 bg-[#F7FBF9] w-[1240px] flex flex-col rounded gap-8">
      <h1 className="text-[32px] museo font-light">Content Moderation</h1>

      {/* Messages Section */}
      <div className="flex flex-col gap-5">
        <h2 className="text-2xl museo font-light">Messages</h2>
        <div className="flex flex-col gap-5">
          {messages.map((item, i) => (
            <div
              key={i}
              className="bg-white flex flex-col gap-8 p-8 rounded-lg relative w-[1176px]"
            >
              <div className="flex justify-between w-full">
                <p className="font-semibold text-xl museo">
                  {item.full_name},{" "}
                  <span className="text-black font-light museo">
                    {format(new Date(item.createdAt), "MMM dd, yyyy, hh:mm a")}
                  </span>
                </p>
                <IconDelete
                  className="w-5.5 h-6 cursor-pointer"
                  onClick={() => handleDeleteCondolence(item._id)}
                />
              </div>
              <p className="text-xl font-light museo text-black">{item.message}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Photos/Videos Section */}
      <div className="flex flex-col gap-8">
        <h2 className="text-2xl museo font-light">Photos/Videos</h2>
        <div className="flex flex-wrap gap-10">
          {photos.map((item, i) => (
            <div
              key={i}
              className="flex flex-col gap-5 items-center w-[365.33px]"
            >
              <div className="relative w-[365.33px] h-[332px] aspect-[4/3] rounded-md overflow-hidden">
                <Image
                  src={`http://localhost:5000${item.photo}`}
                  alt="Condolence"
                  width={365}
                  height={332}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="flex gap-5 w-full justify-center">
                <Button
                  className="px-7 py-2 text-sm text-[#FF2121] border border-[#FF2121] rounded bg-white hover:bg-red-50"
                  onClick={() => handleDeleteCondolence(item._id)}
                >
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
  );
}
