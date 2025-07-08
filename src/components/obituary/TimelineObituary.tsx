import { TTimelineEvent } from "@/types/type";
import React from "react";
import { Switch } from "../ui/switch";
import { IconCalendar, IconTrash } from "../icons";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import ButtonLocation from "./ButtonLocation";

type Props = {
  showTimeline: boolean;
  setShowTimeline: (value: boolean) => void;
  timelineEvents: TTimelineEvent[];
  setTimelineEvents: (events: TTimelineEvent[]) => void;
  addTimelineEvent: () => void;
};

const TimelineObituary: React.FC<Props> = ({
  showTimeline,
  setShowTimeline,
  timelineEvents,
  setTimelineEvents,
  addTimelineEvent,
}) => {
  return (
    <div className="space-y-6 z-0 relative">
      <div className="flex items-center justify-between">
        <h3 className="text-[32px] font-medium museo">Timeline</h3>
        <Switch checked={showTimeline} onCheckedChange={setShowTimeline} />
      </div>

      {showTimeline && (
        <div className="relative px-4 sm:px-0 overflow-x-hidden">
          <div className="flex flex-col gap-y-24 relative z-10">
            {timelineEvents.map((event, index) => {
              const isLeft = index % 2 === 0;

              return (
                <React.Fragment key={index}>
                  <div className="relative">
                    <div className="hidden sm:block absolute left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-[#A6BF98] z-10 top-5 -translate-y-1/2" />

                    {index > 0 && (
                      <div className="hidden sm:block absolute left-1/2 transform -translate-x-1/2 w-px h-70 border-l-1 border-dashed border-[#293548] -top-60" />
                    )}

                    <div
                      className={`relative flex ${
                        isLeft ? "justify-start" : "justify-end"
                      }`}
                    >
                      <div
                        className={`bg-white rounded-lg shadow-sm w-full sm:w-[445px] relative ${
                          isLeft ? "mr-auto ml-0" : "ml-auto mr-0"
                        }`}
                      >
                        <div className="relative flex flex-col sm:flex-row gap-6">
                          {/* Date Column */}
                          <div className="flex flex-col min-w-[50px] min-h-[160px]">
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full sm:w-[90px] min-h-[160px] border-none rounded-none flex items-start justify-start text-left p-2 relative",
                                    !event.date && "text-muted-foreground"
                                  )}
                                >
                                  <div className="flex flex-col space-y-1">
                                    {event.date ? (
                                      <>
                                        <span className="text-sm museo">
                                          {format(new Date(event.date), "MMMM")}
                                        </span>
                                        <span className="text-sm font-bold">
                                          {format(new Date(event.date), "d")}
                                        </span>
                                        <span className="text-sm museo">
                                          {format(new Date(event.date), "yyyy")}
                                        </span>
                                      </>
                                    ) : (
                                      <span className="text-sm">
                                        Pick a date
                                      </span>
                                    )}
                                  </div>
                                  <IconCalendar className="h-5 w-5 text-muted-foreground absolute bottom-2 right-2" />
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={
                                    event.date ? new Date(event.date) : undefined
                                  }
                                  onSelect={(date) => {
                                    const newEvents = timelineEvents.map((ev) =>
                                      ev.id === event.id
                                        ? {
                                            ...ev,
                                            date: date
                                              ? date.toISOString()
                                              : "",
                                          }
                                        : ev
                                    );
                                    setTimelineEvents(newEvents);
                                  }}
                                  disabled={(date) =>
                                    date > new Date() || date < new Date("1900-01-01")
                                  }
                                />
                              </PopoverContent>
                            </Popover>
                          </div>

                          {/* Vertical Divider */}
                          <div className="absolute left-22 w-px min-h-[160px] border border-gray-300 hidden sm:block" />

                          {/* Content Column */}
                          <div className="flex-1 p-2">
                            <div className="flex justify-between items-start">
                              <Input
                                value={event.title}
                                onChange={(e) => {
                                  const newEvents = timelineEvents.map((ev) =>
                                    ev.id === event.id
                                      ? { ...ev, title: e.target.value }
                                      : ev
                                  );
                                  setTimelineEvents(newEvents);
                                }}
                                placeholder="Title"
                                className=" resize-none border-none ring-0 focus:outline-none shadow-none p-0 text-black text-xl"
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="text-gray-400 hover:text-gray-600"
                                onClick={() => {
                                  setTimelineEvents(
                                    timelineEvents.filter((ev) => ev.id !== event.id)
                                  );
                                }}
                              >
                                <IconTrash className="w-4 h-4" />
                              </Button>
                            </div>

                            <Textarea
                              value={event.description}
                              onChange={(e) => {
                                const newEvents = timelineEvents.map((ev) =>
                                  ev.id === event.id
                                    ? { ...ev, description: e.target.value }
                                    : ev
                                );
                                setTimelineEvents(newEvents);
                              }}
                              placeholder="Description of event"
                              className="w-full p-0 resize-none border-none shadow-none text-black text-base whitespace-pre-wrap break-all leading-snug min-h-[40px] focus-visible:ring-0 focus:outline-none"
                            />

                            <div className="flex items-center gap-2 mt-5 justify-end text-gray-500">
                              <ButtonLocation
                                onLocationRetrieved={(address) => {
                                  const newEvents = timelineEvents.map((ev) =>
                                    ev.id === event.id
                                      ? {
                                          ...ev,
                                          description: ev.description
                                            ? `${ev.description}\n${address}`
                                            : `${address}`,
                                          location: address,
                                        }
                                      : ev
                                  );
                                  setTimelineEvents(newEvents);
                                }}
                              />
                            </div>
                          </div>
                        </div>

                        {/* Arrow Indicator */}
                        <div
                          className={`hidden sm:block absolute top-3 -translate-x-1/2 w-4 h-4 rotate-45 bg-white ${
                            isLeft ? "-right-4" : "rotate-225"
                          }`}
                          style={{
                            boxShadow: "2px -2px 4px rgba(0, 0, 0, 0.1)",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              );
            })}

            <div className="flex justify-end mt-10">
              <Button
                type="button"
                onClick={addTimelineEvent}
                className="w-full sm:w-[157px] h-11 bg-teal-600 z-0 rounded font-light hover:bg-teal-700 text-white"
              >
                Add Event
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimelineObituary;
