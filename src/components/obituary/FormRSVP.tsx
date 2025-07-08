import React from "react";
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
    <div className="w-full max-w-[1000px] px-2 sm:px-4">
      <h1 className="text-3xl font-semibold mb-8">RSVP</h1>
      <FormProvider {...form}>
        <div className="flex flex-col text-[#222222B2] font-light gap-6 sm:gap-10 bg-[#E5F6EC4D] min-h-[696px] p-2 sm:p-8 rounded-md">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="flex flex-col sm:flex-row w-full sm:w-[632px] gap-1 sm:gap-[151px] mb-2 sm:mb-0">
                <FormLabel className="w-full sm:w-[200px] museo text-sm sm:text-base">First Name</FormLabel>
                <FormControl>
                  <Input
                    className="w-full bg-white rounded border border-gray-200 sm:border-none shadow-none text-sm sm:text-base px-2 sm:px-3 py-2 sm:py-1"
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
              <FormItem className="flex flex-col sm:flex-row w-full sm:w-[632px] gap-1 sm:gap-[151px] mb-2 sm:mb-0">
                <FormLabel className="w-full sm:w-[200px] museo text-sm sm:text-base">Last Name</FormLabel>
                <FormControl>
                  <Input
                    className="w-full bg-white rounded border border-gray-200 sm:border-none shadow-none text-sm sm:text-base px-2 sm:px-3 py-2 sm:py-1"
                    placeholder="Doe"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Wake Service */}
          <FormField
            control={form.control}
            name="wakeService.attending"
            render={({ field }) => (
              <FormItem className="flex flex-col sm:flex-row w-full sm:w-[632px] gap-1 sm:gap-14 mb-2 sm:mb-0">
                <FormLabel className="w-full sm:w-[230px] text-base museo sm:text-base">Wake Service RSVP</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full sm:w-[402px] bg-white rounded border border-gray-200 sm:border-none shadow-none text-sm sm:text-base">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="attending">🟢 Attending</SelectItem>
                    <SelectItem value="not-attending">🔴 Not Attending</SelectItem>
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
                  <FormItem className="flex flex-col sm:flex-row w-full sm:w-[632px] gap-1 sm:gap-14 mb-2 sm:mb-0">
                    <FormLabel className="w-full sm:w-[230px] text-base museo sm:text-base">Date</FormLabel>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full sm:w-[367px] justify-start bg-[#E5F6EC4D] font-normal border sm:border-0 border-b border-gray-400 rounded-none text-left text-sm sm:text-base px-2 sm:px-3 py-2 sm:py-1"
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
                  <FormItem className="flex flex-col sm:flex-row w-full sm:w-[632px] gap-1 sm:gap-14 mb-2 sm:mb-0">
                    <FormLabel className="w-full sm:w-[230px] text-base museo sm:text-base">Time</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="hh:mm am/pm"
                        className="w-full sm:w-[402px] border border-gray-200 sm:border-0 border-b rounded-none bg-transparent shadow-none text-sm sm:text-base px-2 sm:px-3 py-2 sm:py-1"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          {/* Cortege Departure */}
          <FormField
            control={form.control}
            name="cortegeDeparture.attending"
            render={({ field }) => (
              <FormItem className="flex flex-col sm:flex-row w-full sm:w-[632px] gap-1 sm:gap-14 mb-2 sm:mb-0">
                <FormLabel className="w-full sm:w-[230px] text-base museo sm:text-base">Cortege Departure RSVP</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full sm:w-[402px] bg-white rounded border border-gray-200 sm:border-none shadow-none text-sm sm:text-base">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="attending">🟢 Attending</SelectItem>
                    <SelectItem value="not-attending">🔴 Not Attending</SelectItem>
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
                  <FormItem className="flex flex-col sm:flex-row w-full sm:w-[632px] gap-1 sm:gap-14 mb-2 sm:mb-0">
                    <FormLabel className="w-full sm:w-[230px] text-base museo sm:text-base">Date</FormLabel>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full sm:w-[367px] justify-start bg-[#E5F6EC4D] font-normal border sm:border-0 border-b border-gray-400 rounded-none text-left text-sm sm:text-base px-2 sm:px-3 py-2 sm:py-1"
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
                  <FormItem className="flex flex-col sm:flex-row w-full sm:w-[632px] gap-1 sm:gap-14 mb-2 sm:mb-0">
                    <FormLabel className="w-full sm:w-[230px] text-base museo sm:text-base">Time</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="hh:mm am/pm"
                        className="w-full sm:w-[402px] border border-gray-200 sm:border-0 border-b rounded-none bg-transparent shadow-none text-sm sm:text-base px-2 sm:px-3 py-2 sm:py-1"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          {/* Cremation */}
          <FormField
            control={form.control}
            name="cremation.attending"
            render={({ field }) => (
              <FormItem className="flex flex-col sm:flex-row w-full sm:w-[632px] gap-1 sm:gap-14 mb-2 sm:mb-0">
                <FormLabel className="w-full sm:w-[230px] text-base museo sm:text-base">Cremation RSVP</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full sm:w-[402px] bg-white rounded border border-gray-200 sm:border-none shadow-none text-sm sm:text-base">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="attending">🟢 Attending</SelectItem>
                    <SelectItem value="not-attending">🔴 Not Attending</SelectItem>
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
                  <FormItem className="flex flex-col sm:flex-row w-full sm:w-[632px] gap-1 sm:gap-14 mb-2 sm:mb-0">
                    <FormLabel className="w-full sm:w-[230px] text-base museo sm:text-base">Date</FormLabel>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full sm:w-[367px] justify-start bg-[#E5F6EC4D] font-normal border sm:border-0 border-b border-gray-400 rounded-none text-left text-sm sm:text-base px-2 sm:px-3 py-2 sm:py-1"
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
                  <FormItem className="flex flex-col sm:flex-row w-full sm:w-[632px] gap-1 sm:gap-14 mb-2 sm:mb-0">
                    <FormLabel className="w-full sm:w-[230px] text-base museo sm:text-base">Time</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="hh:mm am/pm"
                        className="w-full sm:w-[402px] border border-gray-200 sm:border-0 border-b rounded-none bg-transparent shadow-none text-sm sm:text-base px-2 sm:px-3 py-2 sm:py-1"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          {/* Add Guest */}
          <div className="flex justify-end w-full sm:w-[632px] mt-2 sm:mt-0">
            <button
              type="button"
              className="w-full sm:w-[133px] h-11 text-base museo bg-[#699D99] rounded text-white hover:bg-[#4B6B6C] transition sm:text-base"
            >
              Add Guest
            </button>
          </div>

          {/* Email + Phone */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex flex-col sm:flex-row w-full sm:w-[632px] gap-1 sm:gap-[151px] mb-2 sm:mb-0">
                <FormLabel className="w-full sm:w-[200px] museo text-sm sm:text-base">Email</FormLabel>
                <FormControl>
                  <Input
                    className="w-full bg-white rounded border border-gray-200 sm:border-none shadow-none text-sm sm:text-base px-2 sm:px-3 py-2 sm:py-1"
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
              <FormItem className="flex flex-col sm:flex-row w-full sm:w-[632px] gap-1 sm:gap-[151px] mb-2 sm:mb-0">
                <FormLabel className="w-full sm:w-[200px] museo text-sm sm:text-base">Mobile/Phone</FormLabel>
                <FormControl>
                  <Input
                    className="w-full bg-white rounded border border-gray-200 sm:border-none shadow-none text-sm sm:text-base px-2 sm:px-3 py-2 sm:py-1"
                    placeholder="Your phone number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit */}
          <div className="flex justify-end mt-8">
            <Button
              type="button"
              onClick={() => form.handleSubmit(Submit)()}
              className="w-full sm:w-[150px] h-11 bg-teal-600 rounded hover:bg-teal-700 text-white text-sm sm:text-base"
            >
              Submit RSVP
            </Button>
          </div>
        </div>
      </FormProvider>
    </div>
  );
};

export default FormRSVP;
