import { TTimelineEvent } from "@/types/type";
import React from "react";
import { Switch } from "../ui/switch";
import { IconCalendar, IconTrash } from "../icons";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Timeline</h3>
        <Switch checked={showTimeline} onCheckedChange={setShowTimeline} />
      </div>
      {showTimeline && (
        <div className="space-y-6">
          {timelineEvents.map((event, index) => (
            <div key={event.id} className="relative">
              {index !== 0 && (
                <div className="absolute left-[23px] -top-6 h-6 w-[2px] bg-[#699D99]" />
              )}
              {index !== timelineEvents.length - 1 && (
                <div className="absolute left-[23px] top-12 bottom-0 w-[2px] bg-[#699D99]" />
              )}
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-[#699D99] flex items-center justify-center text-white">
                    <IconCalendar className="w-6 h-6" />
                  </div>
                </div>
                <div className="flex-1 space-y-4">
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
                    className="font-medium"
                  />
                  <div className="flex gap-4">
                    <Input
                      type="date"
                      value={event.date}
                      onChange={(e) => {
                        const newEvents = timelineEvents.map((ev) =>
                          ev.id === event.id
                            ? { ...ev, date: e.target.value }
                            : ev
                        );
                        setTimelineEvents(newEvents);
                      }}
                      className="w-40"
                    />
                    <Input
                      value={event.location}
                      onChange={(e) => {
                        const newEvents = timelineEvents.map((ev) =>
                          ev.id === event.id
                            ? { ...ev, location: e.target.value }
                            : ev
                        );
                        setTimelineEvents(newEvents);
                      }}
                      placeholder="Location"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
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
                  />
                </div>
              </div>
            </div>
          ))}
          <Button
            onClick={addTimelineEvent}
            className="w-full bg-teal-600 hover:bg-teal-700 text-white"
          >
            Add Event
          </Button>
        </div>
      )}
    </div>
  );
};

export default TimelineObituary;
