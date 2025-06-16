"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { useEffect } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Switch } from "@/components/ui/switch";
import { IEvent } from "@/types/type";

const Event = ({
  height,
  setEvents,
  events,
}: {
  height: string;
  setEvents: React.Dispatch<React.SetStateAction<IEvent[]>>;
  events: IEvent[];
}) => {
  const form = useFormContext();
  const { control, watch, setValue, register } = form;

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "events",
  });

  // Khi props events thay đổi → reset lại form fieldArray
  useEffect(() => {
    if (events && events.length > 0) {
      form.reset({ events }); // dùng replace thay vì append nhiều lần
    }
  }, [events, replace]);

  const handleSaveEvent = async (index: number) => {
    const isValid = await form.trigger(`events.${index}`);

    if (!isValid) return;

    const allEvents = form.getValues("events");
    const eventToSave = allEvents[index];

    // Ensure all required fields are present
    const formattedEvent: IEvent = {
      id: eventToSave.id || Math.random().toString(36).substring(2),
      eventTitle: eventToSave.eventTitle || "",
      description: eventToSave.description || "",
      location: eventToSave.location || "",
      show: eventToSave.show || false,
      date: eventToSave.date || "",
      timeFrom: eventToSave.timeFrom
        ? format(new Date(`1970-01-01T${eventToSave.timeFrom}`), "hh:mm a")
        : "",
      timeTo: eventToSave.timeTo
        ? format(new Date(`1970-01-01T${eventToSave.timeTo}`), "hh:mm a")
        : "",
    };

    setEvents((prevEvents) => {
      const updatedEvents = [...prevEvents];
      const existingIndex = updatedEvents.findIndex(
        (e) => e.id === formattedEvent.id
      );

      if (existingIndex !== -1) {
        updatedEvents[existingIndex] = formattedEvent;
      } else {
        updatedEvents.push(formattedEvent);
      }

      return updatedEvents;
    });
  };

  return (
    <div
      style={{ height: height === "auto" ? "auto" : `${height}px` }}
      className="max-w-[1000px] flex flex-col gap-7"
    >
      {fields.map((field, index) => {
        const show = watch(`events.${index}.show`);

        return (
          <div key={field.id} className="space-y-6 rounded-lg">
            <input type="hidden" {...register(`events.${index}.id`)} />

            <div className="flex items-center justify-between">
              <FormField
                control={control}
                name={`events.${index}.eventTitle`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value ?? ""}
                        placeholder="Event Title"
                        className="text-[32px] w-[231px] h-[64px] font-medium rounded-none border-2 border-dashed border-[#00000080]/50"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name={`events.${index}.show`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={(val) =>
                          setValue(`events.${index}.show`, val)
                        }
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            {show && (
              <>
                <FormField
                  control={control}
                  name={`events.${index}.description`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          {...field}
                          value={field.value ?? ""}
                          placeholder="Write details about the event for guests to know"
                          className="min-h-[260px] border border-dashed resize-none"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className="flex flex-col gap-6 bg-[#E5F6EC4D] p-5">
                  <div>
                    <FormItem className="flex items-start gap-[166px]">
                      <FormLabel className="w-[100px] pt-2">Location</FormLabel>
                      <FormControl>
                        <FormField
                          control={control}
                          name={`events.${index}.location`}
                          render={({ field }) => (
                            <Input
                              {...field}
                              value={field.value ?? ""}
                              className="w-[402px] border-0 border-b border-gray-400 rounded-none"
                            />
                          )}
                        />
                      </FormControl>
                    </FormItem>
                  </div>

                  <div>
                    <FormItem className="flex items-start gap-[166px]">
                      <FormLabel className="w-[100px] pt-2">Date</FormLabel>
                      <FormControl>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-[402px] justify-start text-left bg-[#E5F6EC4D] font-normal border-0 border-b border-gray-400 rounded-none"
                            >
                              {watch(`events.${index}.date`) &&
                              Date.parse(watch(`events.${index}.date`))
                                ? format(
                                    new Date(watch(`events.${index}.date`)),
                                    "MMMM d, yyyy"
                                  )
                                : "Pick a date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={
                                watch(`events.${index}.date`)
                                  ? new Date(watch(`events.${index}.date`))
                                  : undefined
                              }
                              onSelect={(date) =>
                                setValue(
                                  `events.${index}.date`,
                                  date?.toISOString().split("T")[0]
                                )
                              }
                            />
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                    </FormItem>
                  </div>

                  <FormField
                    control={form.control}
                    name={`events.${index}.timeFrom`}
                    render={({ field }) => (
                      <FormItem className="flex items-start gap-[166px]">
                        <FormLabel className="w-[100px] pt-2">
                          Time From
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            value={field.value ?? ""}
                            type="time"
                            className="w-[402px] border-0 border-b border-gray-400 rounded-none"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`events.${index}.timeTo`}
                    render={({ field }) => (
                      <FormItem className="flex items-start gap-[166px]">
                        <FormLabel className="w-[100px] pt-2">
                          Time To
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            value={field.value ?? ""}
                            type="time"
                            className="w-[402px] border-0 border-b border-gray-400 rounded-none"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-end mt-8">
                    <Button
                      type="button"
                      className="bg-[#699D99] hover:bg-[#5c8e8a] text-white"
                      onClick={() => handleSaveEvent(index)}
                    >
                      Submit
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        );
      })}

      <div className="flex justify-end mt-8">
        <Button
          type="button"
          className="bg-[#699D99] hover:bg-[#5c8e8a] text-white rounded museo w-[195px] h-[44px] text-base museo"
          onClick={() =>
            append({
              id: Math.random().toString(36).substring(2),
              eventTitle: "",
              description: "",
              location: "",
              date: "",
              timeFrom: "",
              timeTo: "",
              show: true,
            } as IEvent)
          }
        >
          Add Another Event
        </Button>
      </div>
    </div>
  );
};

export default Event;
