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
    schedule: {
      date: string;
      timeFrom: string;
      timeTo: string;
    }[];
  };
  mapUrl?: string;
};

const Event = ({ event, mapUrl }: Props) => {
  const formatTime = (time: string) => {
    if (!time) return "";
    const [h, m] = time.split(":");
    const dateObj = new Date();
    dateObj.setHours(Number(h));
    dateObj.setMinutes(Number(m));
    return format(dateObj, "h:mmaaa").toLowerCase();
  };
  console.log(event)
  return (
    <div className="flex flex-col gap-10 w-full">
      <h3 className="text-[24px] font-medium text-[#2d3b4e]">
        {event.eventTitle}
      </h3>

      <div className="bg-[#E5F6EC4D] w-full md:w-[1125px] rounded-lg p-4 md:p-10 flex flex-col md:flex-row gap-6 items-start overflow-hidden">
        {/* Map */}
        <div className="rounded overflow-hidden flex-shrink-0 w-full md:w-[407px]">
          <Image
            src={mapUrl || "/img/map-demo.png"}
            alt="map"
            width={407}
            height={308}
            className="w-full md:w-[407px] h-[200px] md:h-[308px] object-cover"
          />
        </div>

        {/* Details */}
        <div className="w-full md:w-[596px] flex flex-col gap-6">
          <div className="text-xl md:text-2xl museo text-[#222] whitespace-pre-line">
            {event.description}
          </div>

          <div className="flex flex-col sm:flex-row items-start gap-1 sm:gap-3">
            <div className="flex gap-2 md:gap-3">
              <IconLocation className="w-6 md:w-7 h-6 md:h-7 text-[#6CB1A3]" />
              <span className="text-[#6CB1A3] font-light text-xl md:text-2xl museo">
                Location:
              </span>
            </div>
            <span className="text-[#222] text-xl md:text-2xl museo font-light">
              {event.location}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-start gap-1 sm:gap-3">
            <div className="flex gap-2 md:gap-3">
              <Hourglass className="w-6 md:w-7 h-6 md:h-7 text-[#6CB1A3]" />
              <span className="text-[#6CB1A3] font-light text-xl md:text-2xl museo">
                Date/Time
              </span>
            </div>
            <div className="flex flex-col text-[#222] text-xl md:text-2xl museo">
              {event.schedule.map((slot, i) => {
                const formattedDate = format(
                  parseISO(slot.date),
                  "dd MMM yyyy"
                );
                const from = slot.timeFrom || "";
                const to = slot.timeTo || "";

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
