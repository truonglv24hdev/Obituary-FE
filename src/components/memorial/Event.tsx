"use client";

import { IconLocation } from "@/components/icons";
import { format, parseISO } from "date-fns";
import Image from "next/image";
import { Hourglass } from "lucide-react";

type Props = {
  event: {
    eventTitle: string;
    description: string;
    location: string;
    date: string[];
    timeFrom: string[];
    timeTo: string[];
  };
};

const Event = ({ event }: Props) => {
  const formatTime = (time: string) => {
    if (!time) return "";
    const [h, m] = time.split(":");
    const dateObj = new Date();
    dateObj.setHours(Number(h));
    dateObj.setMinutes(Number(m));
    return format(dateObj, "h:mmaaa").toLowerCase();
  };

  return (
    <div className="flex flex-col gap-10">
      <h3 className="text-[24px] font-medium text-[#2d3b4e]">
        {event.eventTitle}
      </h3>

      <div className="bg-[#E5F6EC4D] w-[1125px] rounded-lg p-10 flex flex-col md:flex-row gap-6 items-start">
        {/* Map */}
        <div className="rounded overflow-hidden flex-shrink-0">
          <Image
            src="/img/map-demo.png"
            alt="map"
            width={407}
            height={340}
            className="w-[407px] h-auto object-cover"
          />
        </div>

        {/* Details */}
        <div className="w-full md:w-[596px] flex flex-col gap-6">
          <div className="text-2xl museo text-[#222] whitespace-pre-line">
            {event.description}
          </div>

          <div className="flex items-start gap-3">
            <div className="flex gap-3">
              <IconLocation className="w-7 h-7 text-[#6CB1A3]" />
              <span className="text-[#6CB1A3] font-light text-2xl museo">
                Location:
              </span>
            </div>
            <span className="text-[#222] text-2xl museo font-light">
              {event.location}
            </span>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex gap-3">
              <Hourglass className="w-7 h-7 text-[#6CB1A3]" />
              <span className="text-[#6CB1A3] font-light text-2xl museo">
                Date/Time
              </span>
            </div>
            <div className="flex flex-col text-[#222] text-2xl museo">
              {event.date.map((date, i) => {
                const formattedDate = format(parseISO(date), "dd MMM yyyy");
                const from = event.timeFrom?.[i] || "";
                const to = event.timeTo?.[i] || "";

                return (
                  <span key={i}>
                    {formattedDate} ({formatTime(from)} – {formatTime(to)})
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Event;
