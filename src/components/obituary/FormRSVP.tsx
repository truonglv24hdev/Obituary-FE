import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { createRSVP } from "@/lib/RSVPAPI";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
import MemoryWall from "./MemoryWall";

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required").optional(),
  lastName: z.string().min(1, "Last name is required").optional(),
  email: z.string().optional(),
  phone: z.string().optional(),

  wakeService: z
    .object({
      attending: z.enum(["attending", "not-attending", ""]).optional(),
      date: z.date().nullable().optional(),
      time: z.string().optional(),
    })
    .optional(),

  cortegeDeparture: z
    .object({
      attending: z.enum(["attending", "not-attending", ""]).optional(),
      date: z.date().nullable().optional(),
      time: z.string().optional(),
    })
    .optional(),

  cremation: z
    .object({
      attending: z.enum(["attending", "not-attending", ""]).optional(),
      date: z.date().nullable().optional(),
      time: z.string().optional(),
    })
    .optional(),
});

const FormRSVP = ({ obituaryId }: { obituaryId: string }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      wakeService: {
        attending: "",
        date: null,
        time: "",
      },
      cortegeDeparture: {
        attending: "",
        date: null,
        time: "",
      },
      cremation: {
        attending: "",
        date: null,
        time: "",
      },
    },
  });

  const wakeRSVP = form.watch("wakeService.attending");
  const cortegeRSVP = form.watch("cortegeDeparture.attending");
  const cremationRSVP = form.watch("cremation.attending");
  const [openMemoryWall, setOpenMemoryWall] = useState(false);

  async function Submit(values: z.infer<typeof formSchema>) {
    const formRSVP = new FormData();

    const formattedDateWake = values.wakeService?.date
      ? format(values.wakeService.date, "dd/MM/yyyy")
      : undefined;

    const formattedDateCortege = values.cortegeDeparture?.date
      ? format(values.cortegeDeparture.date, "dd/MM/yyyy")
      : undefined;

    const formattedDateCremation = values.cremation?.date
      ? format(values.cremation.date, "dd/MM/yyyy")
      : undefined;

    formRSVP.append("first_name", values.firstName || "");
    formRSVP.append("obituaryId", obituaryId || "");
    formRSVP.append("last_name", values.lastName || "");
    formRSVP.append("email", values.email || "");
    formRSVP.append("contact", values.phone || "");
    formRSVP.append(
      "wakeService.attending",
      values.wakeService?.attending || ""
    );
    formRSVP.append("wakeService.date", formattedDateWake || "");
    formRSVP.append("wakeService.time", values.wakeService?.time || "");

    formRSVP.append(
      "cortegeDeparture.attending",
      values.cortegeDeparture?.attending || ""
    );
    formRSVP.append("cortegeDeparture.date", formattedDateCortege || "");
    formRSVP.append(
      "cortegeDeparture.time",
      values.cortegeDeparture?.time || ""
    );

    formRSVP.append("cremation.attending", values.cremation?.attending || "");
    formRSVP.append("cremation.date", formattedDateCremation || "");
    formRSVP.append("cremation.time", values.cremation?.time || "");

    const RSVP = await createRSVP(formRSVP);

    if (RSVP) {
      form.reset();
    }
  }

  return (
    <div className="max-w-[1000px]">
      <h1 className="text-3xl font-semibold mb-8">RSVP</h1>
      <FormProvider {...form}>
        <div className="flex flex-col gap-10 bg-[#E5F6EC4D] min-h-[696px] p-8">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="flex w-[632px] h-12 gap-[151px]">
                <FormLabel className="w-[200px]">First Name</FormLabel>
                <FormControl>
                  <Input
                    className="w-full bg-white rounded border-none shadow-none"
                    placeholder="John"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="flex w-[632px] h-12 gap-[151px]">
                <FormLabel className="w-[200px]">Last Name</FormLabel>
                <FormControl>
                  <Input
                    className="w-full bg-white rounded border-none shadow-none"
                    placeholder="Doe"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="wakeService.attending"
            render={({ field }) => (
              <FormItem className="flex w-[632px] h-12 gap-14">
                <FormLabel className="w-[230px] text-base museo">
                  Wake Service RSVP
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-[402px] bg-white rounded border-none shadow-none">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="attending">🟢 Attending</SelectItem>
                    <SelectItem value="not-attending">
                      🔴 Not Attending
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {wakeRSVP === "attending" && (
            <>
              <FormField
                control={form.control}
                name="wakeService.date"
                render={({ field }) => (
                  <FormItem className="flex w-[632px] h-12 gap-14">
                    <FormLabel className="w-[230px] text-base museo">
                      Date
                    </FormLabel>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-[367px] justify-start bg-[#E5F6EC4D] font-normal border-0 border-b border-gray-400 rounded-none"
                          >
                            {field.value instanceof Date &&
                            !isNaN(field.value.getTime())
                              ? format(field.value, "MMMM d, yyyy")
                              : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value || undefined}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="wakeService.time"
                render={({ field }) => (
                  <FormItem className="flex w-[632px] h-12 gap-14">
                    <FormLabel className="w-[230px] text-base museo">
                      Time
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="string"
                        placeholder="hh:mm am/pm"
                        className="w-[402px] border-0 border-b border-gray-300 rounded-none bg-transparent shadow-none focus:outline-none focus:ring-0"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          <FormField
            control={form.control}
            name="cortegeDeparture.attending"
            render={({ field }) => (
              <FormItem className="flex w-[632px] h-12 gap-14">
                <FormLabel className="w-[230px] text-base museo">
                  Cortege Departure RSVP
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-[402px] bg-white rounded border-none shadow-none">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="attending">🟢 Attending</SelectItem>
                    <SelectItem value="not-attending">
                      🔴 Not Attending
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {cortegeRSVP === "attending" && (
            <>
              <FormField
                control={form.control}
                name="cortegeDeparture.date"
                render={({ field }) => (
                  <FormItem className="flex w-[632px] h-12 gap-14">
                    <FormLabel className="w-[230px] text-base museo">
                      Date
                    </FormLabel>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-[367px] justify-start bg-[#E5F6EC4D] font-normal border-0 border-b border-gray-400 rounded-none"
                          >
                            {field.value instanceof Date &&
                            !isNaN(field.value.getTime())
                              ? format(field.value, "MMMM d, yyyy")
                              : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value || undefined}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cortegeDeparture.time"
                render={({ field }) => (
                  <FormItem className="flex w-[632px] h-12 gap-14">
                    <FormLabel className="w-[230px] text-base museo">
                      Time
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="hh:mm am/pm"
                        className="w-[402px] border-0 border-b border-gray-300 rounded-none bg-transparent shadow-none focus:outline-none focus:ring-0"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          <FormField
            control={form.control}
            name="cremation.attending"
            render={({ field }) => (
              <FormItem className="flex w-[632px] h-12 gap-14">
                <FormLabel className="w-[230px] text-base museo">
                  Cremation RSVP
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-[402px] bg-white rounded border-none shadow-none">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="attending">🟢 Attending</SelectItem>
                    <SelectItem value="not-attending">
                      🔴 Not Attending
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {cremationRSVP === "attending" && (
            <>
              <FormField
                control={form.control}
                name="cremation.date"
                render={({ field }) => (
                  <FormItem className="flex w-[632px] h-12 gap-14">
                    <FormLabel className="w-[230px] text-base museo">
                      Date
                    </FormLabel>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-[367px] justify-start bg-[#E5F6EC4D] font-normal border-0 border-b border-gray-400 rounded-none"
                          >
                            {field.value instanceof Date &&
                            !isNaN(field.value.getTime())
                              ? format(field.value, "MMMM d, yyyy")
                              : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value || undefined}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cremation.time"
                render={({ field }) => (
                  <FormItem className="flex w-[632px] h-12 gap-14">
                    <FormLabel className="w-[230px] text-base museo">
                      Time
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="hh:mm am/pm"
                        className="w-[402px] border-0 border-b border-gray-300 rounded-none bg-transparent shadow-none focus:outline-none focus:ring-0"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          <div className="flex justify-end w-[632px] cursor-pointer">
            <button
              type="button"
              className="w-[133px] h-11 cursor-pointer text-base museo bg-[#699D99] rounded text-white hover:bg-[#4B6B6C] transition"
              onClick={() => setOpenMemoryWall(true)}
            >
              Add Guest
            </button>
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex w-[632px] h-12 gap-[151px]">
                <FormLabel className="w-[200px]">Email</FormLabel>
                <FormControl>
                  <Input
                    className="w-full bg-white rounded border-none shadow-none"
                    placeholder="example@gmail.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="flex w-[632px] h-12 gap-[151px]">
                <FormLabel className="w-[200px]">Mobile/Phone</FormLabel>
                <FormControl>
                  <Input
                    className="w-full bg-white rounded border-none shadow-none"
                    placeholder="Your phone number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end mt-8">
            <Button
              type="button"
              onClick={() => {
                console.log("Button clicked");
                form.handleSubmit(Submit)();
              }}
              className="cursor-pointer w-[150px] h-11 bg-teal-600 rounded hover:bg-teal-700 text-white"
            >
              Submit RSVP
            </Button>
          </div>
        </div>
      </FormProvider>
      {openMemoryWall && (
        <MemoryWall
          obituaryId={obituaryId}
          open={openMemoryWall}
          onClose={() => setOpenMemoryWall(false)}
        />
      )}
    </div>
  );
};

export default FormRSVP;
