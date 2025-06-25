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
        setSubmitStatus("Cập nhật sự kiện thành công!");
        return updated;
      } else {
        setSubmitStatus("Thêm sự kiện mới thành công!");
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
      date: "",
      timeFrom: "",
      timeTo: "",
      show: true,
    };
    append(newEvent);
    setEvents((prev) => [...prev, newEvent]);
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
                    className="w-[122px] h-[38px] border-[#0000001A] border"
                  />
                </div>

                <div className="flex flex-col gap-6 bg-[#E5F6EC4D] p-5">
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
                    <FormMessage />
                  </FormItem>

                  <FormItem className="flex items-start gap-[166px]">
                    <FormLabel className="w-[100px] pt-2">Date</FormLabel>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-[402px] justify-start text-left bg-[#E5F6EC4D] font-normal border-0 border-b border-gray-400 rounded-none"
                          >
                            {watch(`events.${index}.date`)
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
                    <FormMessage />
                  </FormItem>

                  {["timeFrom", "timeTo"].map((key) => (
                    <FormField
                      key={key}
                      control={control}
                      name={`events.${index}.${key}` as const}
                      render={({ field }) => (
                        <FormItem className="flex items-start gap-[166px]">
                          <FormLabel className="w-[100px] pt-2">
                            {key === "timeFrom" ? "Time From" : "Time To"}
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="time"
                              value={field.value ?? ""}
                              className="w-[402px] border-0 border-b border-gray-400 rounded-none"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}

                  <Button
                    type="button"
                    className="w-[228px] h-8 bg-[#699D99] rounded px-2 py-[6px] text-base museo "
                  >
                    Add additional date and time
                  </Button>

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
          className="bg-[#699D99] hover:bg-[#5c8e8a] text-white rounded w-[195px] h-[44px] text-base"
          onClick={handleAddEvent}
        >
          Add Another Event
        </Button>
      </div>
    </div>
  );
};

export default Event;
