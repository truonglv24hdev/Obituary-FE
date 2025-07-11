"use client";
import { useEffect } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const EventTimeSlots = ({ eventIndex }: { eventIndex: number }) => {
  const { control } = useFormContext();

  const { fields, append } = useFieldArray({
    control,
    name: `events.${eventIndex}.schedule`,
  });

  // ✅ Luôn có 1 lịch khi load component
  useEffect(() => {
    if (fields.length === 0) {
      append({ date: "", timeFrom: "", timeTo: "" });
    }
  }, [fields, append]);

  return (
    <div className=" space-y-4">
      {fields.map((field, schedIndex) => (
        <div key={field.id} className="flex flex-col gap-6 mb-10">
          <FormField
            control={control}
            name={`events.${eventIndex}.schedule.${schedIndex}.date`}
            render={({ field }) => (
              <FormItem className="flex flex-col sm:flex-row items-start sm:gap-[166px] gap-2">
                <FormLabel className="w-full text-base museo font-light text-[#222222B2] sm:w-[100px] pt-2">Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full sm:w-[402px] text-base museo px-2 font-light justify-start text-left bg-[#E5F6EC4D] border-0 border-b border-gray-400 rounded-none",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? format(new Date(field.value), "MMMM d, yyyy")
                          : "Pick a date"}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value ? new Date(field.value) : undefined}
                      onSelect={(date) =>
                        field.onChange(date?.toISOString().split("T")[0])
                      }
                      disabled={(date) => date < new Date("1900-01-01")}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name={`events.${eventIndex}.schedule.${schedIndex}.timeFrom`}
            render={({ field }) => (
              <FormItem className="flex flex-col sm:flex-row items-start sm:gap-[166px] gap-2">
                <FormLabel className="w-full text-base museo font-light text-[#222222B2] sm:w-[100px] pt-2">
                  Time From
                </FormLabel>
                <FormControl>
                  <DatePicker
                    selected={
                      field.value ? new Date(`1970-01-01T${field.value}`) : null
                    }
                    onChange={(date) =>
                      field.onChange(
                        date
                          ? date.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: false,
                            })
                          : ""
                      )
                    }
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    timeCaption="Time"
                    dateFormat="h:mm aa"
                    className="w-full text-base museo sm:w-[402px] border-0 border-b border-gray-400 rounded-none bg-[#E5F6EC4D] px-2 py-2"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name={`events.${eventIndex}.schedule.${schedIndex}.timeTo`}
            render={({ field }) => (
              <FormItem className="flex flex-col sm:flex-row items-start sm:gap-[166px] gap-2">
                <FormLabel className="w-full text-base museo font-light text-[#222222B2] sm:w-[100px] pt-2">
                  Time To
                </FormLabel>
                <FormControl>
                  <DatePicker
                    selected={
                      field.value ? new Date(`1970-01-01T${field.value}`) : null
                    }
                    onChange={(date) =>
                      field.onChange(
                        date
                          ? date.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: false,
                            })
                          : ""
                      )
                    }
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    timeCaption="Time"
                    dateFormat="h:mm aa"
                    className="w-full text-base museo sm:w-[402px] border-0 border-b border-gray-400 rounded-none bg-[#E5F6EC4D] px-2 py-2"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      ))}

      <Button
        type="button"
        className="w-full sm:w-fit bg-[#699D99] hover:bg-[#5c8e8a] text-white"
        onClick={() => append({ date: "", timeFrom: "", timeTo: "" })}
      >
        Add additional date and time
      </Button>
    </div>
  );
};

export default EventTimeSlots;
