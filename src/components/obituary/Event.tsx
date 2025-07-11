"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
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
import { useEffect, useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Switch } from "@/components/ui/switch";
import { IEvent } from "@/types/type";
import ButtonLocation from "./ButtonLocation";
import EventTimeSlots from "./EventTimeSlots";

type Props = {
  height: string;
  events: IEvent[];
  setEvents: React.Dispatch<React.SetStateAction<IEvent[]>>;
};

const Event = ({ height, events, setEvents }: Props) => {
  const form = useFormContext();
  const { control, watch, setValue, register, getValues, trigger } = form;
  const { fields, append, replace } = useFieldArray({
    control,
    name: "events",
  });

  const [submitStatus, setSubmitStatus] = useState<string>("");

  useEffect(() => {
    if (events && events.length > 0) {
      const withIds = events.map((e) => ({
        ...e,
        id: e.id || Math.random().toString(36).substring(2),
      }));
      replace(withIds);
    }
  }, [events, replace]);

  const handleSaveEvent = async (index: number) => {
    setSubmitStatus("");

    const isValid = await trigger(`events.${index}`);
    if (!isValid) {
      setSubmitStatus("Vui lòng điền đầy đủ thông tin hợp lệ!");
      return;
    }

    const allEvents = getValues("events");
    const eventToSave = allEvents[index];

    if (!eventToSave.id) {
      eventToSave.id = Math.random().toString(36).substring(2);
      setValue(`events.${index}.id`, eventToSave.id);
    }

    setEvents((prev) => {
      const existingIndex = prev.findIndex((e) => e.id === eventToSave.id);
      if (existingIndex !== -1) {
        const updated = [...prev];
        updated[existingIndex] = { ...eventToSave };
        console.log(eventToSave);
        setSubmitStatus("Cập nhật sự kiện thành công!");
        return updated;
      } else {
        setSubmitStatus("Thêm sự kiện mới thành công!");
        console.log(eventToSave);
        return [...prev, eventToSave];
      }
    });
  };

  const handleAddEvent = () => {
    const newEvent: IEvent = {
      id: Math.random().toString(36).substring(2),
      eventTitle: "",
      description: "",
      location: "",
      show: true,
      schedule: [{ date: "", timeFrom: "", timeTo: "" }], 
    };
    append(newEvent); 
    setSubmitStatus("");
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
            <div className="flex flex-col sm:flex-row items-start justify-between gap-2">
              <FormField
                control={control}
                name={`events.${index}.eventTitle`}
                render={({ field }) => (
                  <FormItem className="w-full sm:w-auto">
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value ?? ""}
                        placeholder="Event Title"
                        className="text-[32px] w-full sm:w-[231px] h-[64px] font-medium rounded-none border-2 border-dashed border-[#00000080]/50"
                      />
                    </FormControl>
                    <FormMessage />
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
                          placeholder="Event description"
                          className="min-h-[260px] border border-dashed resize-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end">
                  <ButtonLocation
                    onLocationRetrieved={(address) =>
                      setValue(`events.${index}.location`, address)
                    }
                    className="w-full sm:w-[122px] h-[38px] border-[#0000001A] border"
                  />
                </div>

                <div className="flex flex-col gap-6 bg-[#E5F6EC4D] p-5">
                  {/* Location */}
                  <FormItem className="flex flex-col sm:flex-row items-start sm:gap-[166px] gap-2">
                    <FormLabel className="w-full text-base museo font-light text-[#222222B2] sm:w-[100px] pt-2">
                      Location
                    </FormLabel>
                    <FormControl>
                      <FormField
                        control={control}
                        name={`events.${index}.location`}
                        render={({ field }) => (
                          <Input
                            {...field}
                            value={field.value ?? ""}
                            className="w-full sm:w-[402px] border-0 border-b border-gray-400 rounded-none"
                          />
                        )}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>

                  {/* Add additional schedule */}
                  <EventTimeSlots eventIndex={index} />

                  <div className="flex justify-end mt-8">
                    <Button
                      type="button"
                      className="bg-[#699D99] hover:bg-[#5c8e8a] text-white"
                      onClick={() => handleSaveEvent(index)}
                    >
                      Submit
                    </Button>
                  </div>

                  {submitStatus && (
                    <p
                      className={`text-sm ${
                        submitStatus.includes("thành công")
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {submitStatus}
                    </p>
                  )}
                </div>
              </>
            )}
          </div>
        );
      })}

      <div className="flex justify-end mt-8">
        <Button
          type="button"
          className="bg-[#699D99] hover:bg-[#5c8e8a] text-white rounded w-full sm:w-[195px] h-[44px] text-base"
          onClick={handleAddEvent}
        >
          Add Another Event
        </Button>
      </div>
    </div>
  );
};

export default Event;
