"use client";
import { IconCalendar } from "@/components/icons";
import Event from "@/components/memorial/Event";
import GuestBook from "@/components/memorial/GuestBook";
import ObituaryTab from "@/components/memorial/ObituaryTab";
import MemoryWall from "@/components/obituary/MemoryWall";
import { Button } from "@/components/ui/button";
import { getCondolences } from "@/lib/condolences";
import { getObituaryById } from "@/lib/obituaryAPI";
import { TCondolences, TObituary } from "@/types/type";
import { format } from "date-fns";
import Image from "next/image";
import React, { use, useEffect, useState } from "react";

const Page = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);

  const [obituary, setObituary] = useState<TObituary | null>(null);
  const [condolences, setCondolences] = useState<TCondolences[] | null>(null);
  const [openMemoryWall, setOpenMemoryWall] = useState(false);

  const [eventMapUrls, setEventMapUrls] = useState<Record<string, string>>({});
  useEffect(() => {
    const fetchMapUrls = async () => {
      if (!obituary?.event) return;

      const fetchUrlForLocation = async (location: string) => {
        const geoUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          location
        )}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`;

        const res = await fetch(geoUrl);
        const data = await res.json();

        if (data.features && data.features.length > 0) {
          const [lon, lat] = data.features[0].center;
          return `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s+ff0000(${lon},${lat})/${lon},${lat},15,0/600x300?access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`;
        }

        return ""; // fallback nếu không tìm thấy
      };

      const promises = obituary.event.map(async (event) => {
        const url = await fetchUrlForLocation(event.location);
        return { id: event._id, url };
      });

      const results = await Promise.all(promises);

      const urlMap: Record<string, string> = {};
      results.forEach(({ id, url }) => {
        urlMap[id] = url;
      });

      setEventMapUrls(urlMap);
    };

    fetchMapUrls();
  }, [obituary]);

  useEffect(() => {
    getObituaryById(id)
      .then((data) => setObituary(data))
      .catch((err) => console.error("Lỗi khi lấy obituary:", err));

    getCondolences(id)
      .then((data) => setCondolences(data))
      .catch((err) => console.error("Lỗi khi lấy condolences:", err));
  }, [id]);

  const bornDate = obituary?.memorial?.born && new Date(obituary.memorial.born);
  const deathDate =
    obituary?.memorial?.death && new Date(obituary.memorial.death);

  const isValidBornDate =
    bornDate instanceof Date && !isNaN(bornDate.getTime());
  const isValidDeathDate =
    deathDate instanceof Date && !isNaN(deathDate.getTime());

  const isPremium = obituary?.memorial?.premium ?? false;

  return (
    <div className="flex flex-col gap-5 mb-10">
      <div>
        <Image
          src={
            obituary?.headerImage
              ? `http://localhost:5000${obituary.headerImage}`
              : `/img/default/png`
          }
          alt="headerImage"
          width={1440}
          height={400}
          className="h-100 w-full object-cover"
        />
      </div>

      <div className="flex flex-col w-[1125px] mx-auto relative items-center overflow-hidden gap-10 bg-white">
        <div className="flex gap-15">
          <div className="w-[248px] h-[248px] border rounded shadow-md overflow-hidden bg-white">
            {obituary?.memorial.picture && (
              <Image
                src={`http://localhost:5000${obituary.memorial.picture}`}
                alt="avatar"
                width={240}
                height={240}
                className="px-2 mx-auto my-auto py-3 w-[240px] h-60 object-cover"
              />
            )}
          </div>
          <div className="flex flex-col my-auto gap-5">
            <div className="text-[32px] font-medium px-2 py-1">
              {obituary?.memorial.first_name} {obituary?.memorial.last_name}
            </div>
            <div className="flex gap-3">
              <IconCalendar className="w-6 h-6" />
              <div>{isValidBornDate && format(bornDate, "MMMM d, yyyy")}</div>
              <span className="mx-1">•</span>
              <div>{isValidDeathDate && format(deathDate, "MMMM d, yyyy")}</div>
            </div>
          </div>
        </div>

        <div
          className={`w-[1125px] flex items-center shadow-md h-[62px] rounded border ${
            isPremium ? "px-10 justify-between" : "px-25 gap-25 justify-center"
          } py-[15px]`}
        >
          <ObituaryTab premium={isPremium} />
        </div>

        {isPremium && (
          <div className="text-[28px] font-medium text-center">
            &quot;You taught us not just how to live — but how to live with
            heart.&quot;
          </div>
        )}

        <div className="w-[1125px] flex flex-col gap-15 justify-start">
          {/* Words from Family */}
          <div className="flex flex-col gap-7">
            <div className="text-[32px] font-medium">Words from family</div>
            <div className="text-xl museo text-[#00000099]">
              {obituary?.wordsFromFamily}
            </div>
          </div>

          {/* Life Story */}
          <div className="flex flex-col gap-7">
            <div className="text-[32px] font-medium">Life story</div>
            <div className="text-xl museo text-[#00000099]">
              {obituary?.wordsFromFamily}
            </div>
          </div>

          {/* Family Tree (premium only) */}
          {isPremium && (
            <div className="flex flex-col gap-7">
              <div className="text-[32px] font-medium">Family tree</div>
              <div className="flex flex-col gap-12">
                {obituary?.familyTree.map((cat, index) => (
                  <div key={index} className="flex flex-col gap-10">
                    <h2 className="text-2xl museo">{cat.category}</h2>
                    <div className="flex gap-9">
                      {cat.members.map((member, i) => (
                        <div key={i} className="flex gap-5">
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
                                className="w-[140px] h-[140px] bg-white"
                                style={{ clipPath: "url(#clip-octagon)" }}
                              >
                                {member.avatar ? (
                                  <>
                                    <Image
                                      src={
                                        member.avatar
                                          ? `http://localhost:5000${member.avatar}`
                                          : "/img/avatar.jpg"
                                      }
                                      alt={member.name || "Member"}
                                      width={140}
                                      height={140}
                                      className="w-full h-full object-cover"
                                    />
                                  </>
                                ) : (
                                  <>
                                    <Image
                                      src="/img/avatar.jpg"
                                      alt={member.name || "Member"}
                                      width={140}
                                      height={140}
                                      className="w-full h-full object-cover"
                                    />
                                  </>
                                )}
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
                            <div className="w-35 h-13 text-lg museo font-light border-2 border-dashed flex items-center justify-center">
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
          )}

          {/* Favorites (premium only) */}
          {isPremium && (
            <div className="flex flex-col gap-10">
              <h2 className="text-[32px] font-medium">Favorites</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
                {obituary?.favorites.map((item, idx) => (
                  <div
                    key={idx}
                    className="w-[439px] h-[72px] flex flex-col gap-1"
                  >
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
          )}

          {/* Timeline (premium only) */}
          {isPremium && (
            <div className="flex flex-col gap-10">
              <h2 className="text-[32px] font-medium">Timeline</h2>
              <div className="flex flex-col gap-y-24 relative z-10">
                {obituary?.timeLine.map((event, index) => {
                  const isLeft = index % 2 === 0;
                  return (
                    <div key={index} className="relative">
                      <div className="absolute left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-[#A6BF98] z-10 top-5 -translate-y-1/2" />
                      {index > 0 && (
                        <div className="absolute left-1/2 transform -translate-x-1/2 w-px h-55 border-l-1 border-dashed border-[#293548] -top-50" />
                      )}
                      <div
                        className={`relative flex ${
                          isLeft ? "justify-start" : "justify-end"
                        }`}
                      >
                        <div
                          className={`bg-white rounded-lg shadow-sm w-[445px] relative ${
                            isLeft ? "mr-auto ml-18" : "ml-auto mr-18"
                          }`}
                        >
                          <div className="relative flex gap-6">
                            <div className="flex flex-col min-w-[50px] p-2 min-h-[114px]">
                              {event.date && (
                                <div className="flex flex-col">
                                  <span className="text-base">
                                    {format(event.date, "MMMM")}
                                  </span>
                                  <span className="text-2xl font-bold">
                                    {format(event.date, "d")}
                                  </span>
                                  <span className="text-base">
                                    {format(event.date, "yyyy")}
                                  </span>
                                </div>
                              )}
                            </div>
                            <div className="absolute left-22 w-px min-h-[114] border border-gray-300" />
                            <div className="flex flex-col px-7 p-2">
                              <div className="flex justify-between items-start">
                                <p>{event.title}</p>
                              </div>
                              <p>{event.description}</p>
                            </div>
                          </div>
                          <div
                            className={`absolute top-3 -translate-x-1/2 w-4 h-4 rotate-45 bg-white ${
                              isLeft ? "-right-4" : "rotate-225"
                            }`}
                            style={{
                              boxShadow: "2px -2px 4px rgba(0, 0, 0, 0.1)",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Events (always shown) */}
          <div className="flex flex-col gap-15">
            <h2 className="text-[28px] font-medium text-[#2d3b4e]">Events</h2>
            {obituary?.event.map((event, index) => (
              <Event
                key={index}
                event={event}
                mapUrl={eventMapUrls[event._id]}
              />
            ))}
          </div>

          {/* Guest Book (premium only) */}
          {isPremium && (
            <div className="flex flex-col gap-14">
              <div className="flex justify-between h-11">
                <h2 className="text-[32px] font-medium">Guest book</h2>
                <Button
                  type="button"
                  onClick={() => setOpenMemoryWall(true)}
                  className="w-[135px] h-[44px] rounded px-7 py-2 bg-[#699D99] text-base museo"
                >
                  Contribute
                </Button>
              </div>
              <GuestBook condolences={condolences || []} />
            </div>
          )}

          {/* Memory Wall Modal (premium only) */}
          {isPremium && openMemoryWall && (
            <MemoryWall
              require_email={obituary?.memorial.require_email ?? false}
              obituaryId={id}
              open={openMemoryWall}
              onClose={() => setOpenMemoryWall(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
