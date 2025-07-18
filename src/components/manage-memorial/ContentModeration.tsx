"use client";

import { format } from "date-fns";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { IconDelete } from "@/components/icons";
import { TCondolences } from "@/types/type";

type Props = {
  condolences: TCondolences[];
  handleDeleteCondolence: (id: string) => void;
  handleAcceptCondolence: (id: string) => void;
};

export default function ContentModeration({
  condolences,
  handleDeleteCondolence,
  handleAcceptCondolence,
}: Props) {
  const messages = condolences.filter(
    (item) => item.message?.trim().length > 0
  );
  const photos = condolences.filter((item) => item.photo);

  return (
    <div className="p-6 sm:p-8 bg-[#F7FBF9] w-full max-w-[1240px] mx-auto flex flex-col rounded gap-8">
      <h1 className="text-[28px] sm:text-[32px] museo font-light">
        Content Moderation
      </h1>

      {/* Messages Section */}
      <div className="flex flex-col gap-5">
        <h2 className="text-2xl museo font-light">Messages</h2>
        <div className="flex flex-col gap-5">
          {messages.map((item, i) => (
            <div
              key={i}
              className="bg-white flex flex-col gap-5 sm:gap-8 p-6 sm:p-8 rounded-lg relative w-full"
            >
              <div className="flex flex-col sm:flex-row justify-between w-full gap-3">
                <p className="font-semibold text-lg sm:text-xl museo break-words">
                  {item.full_name},{" "}
                  <span className="text-black font-light museo">
                    {format(new Date(item.createdAt), "MMM dd, yyyy, hh:mm a")}
                  </span>
                </p>
                <IconDelete
                  className="w-6 h-6 cursor-pointer text-black"
                  onClick={() => handleDeleteCondolence(item._id)}
                />
              </div>
              <p className="text-base sm:text-xl font-light museo text-black break-words whitespace-pre-line">
                {item.message}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Photos/Videos Section */}
      <div className="flex flex-col gap-5 sm:gap-8">
        <h2 className="text-2xl museo font-light">Photos/Videos</h2>
        <div className="flex flex-wrap gap-6 sm:gap-10">
          {photos.map((item, i) => (
            <div
              key={i}
              className="flex flex-col gap-4 items-center w-full sm:w-[calc(33%-20px)] max-w-full"
            >
              <div className="relative w-full aspect-[4/3] rounded-md overflow-hidden group">
                {item.video ? (
                  <>
                    <Image
                      src={"/img/video-thumbnail.png"}
                      alt="Video Thumbnail"
                      fill
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <button
                        className="w-16 h-16 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition"
                        onClick={() => window.open(item.video, "_blank")}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-8 w-8 text-black"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </button>
                    </div>
                  </>
                ) : (
                  <Image
                    src={`https://obituary-be-production.up.railway.app${item.photo}`}
                    alt="Condolence Photo"
                    fill
                    className="object-cover w-full h-full"
                  />
                )}
              </div>

              <div className="flex gap-4 w-full justify-center">
                <Button
                  className="px-5 py-2 text-sm text-[#FF2121] border border-[#FF2121] rounded bg-white hover:bg-red-50"
                  onClick={() => handleDeleteCondolence(item._id)}
                >
                  Delete
                </Button>
                <Button
                  className="px-5 py-2 text-sm text-[#27FF61] border border-[#27FF61] rounded bg-white hover:bg-green-50"
                  onClick={() => handleAcceptCondolence(item._id)}
                >
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
