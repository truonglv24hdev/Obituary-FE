import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
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

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  wakeServiceRSVP: z.enum(["attending", "not-attending"]),
  cortegeDepartureRSVP: z.enum(["attending", "not-attending"]),
  cremationRSVP: z.enum(["attending", "not-attending"]),
  location: z.string().min(1, "Location is required"),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
});

const FormRSVP = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      wakeServiceRSVP: "attending",
      cortegeDepartureRSVP: "attending",
      cremationRSVP: "attending",
      location: "",
      date: "",
      time: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="max-w-[1000px]">
      <h1 className="text-3xl font-semibold mb-8">RSVP</h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-10 bg-[#E5F6EC4D] h-[696px] p-8"
        >
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
            name="wakeServiceRSVP"
            render={({ field }) => (
              <FormItem className="flex w-[632px] h-12 gap-14">
                <FormLabel className="w-[230px] text-base museo">
                  Wake Service RSVP
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-[402px] bg-white rounded border-none shadow-none">
                      <SelectValue placeholder="Select your attendance" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="attending">Attending</SelectItem>
                    <SelectItem value="not-attending">Not Attending</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cortegeDepartureRSVP"
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
                      <SelectValue placeholder="Select your attendance" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="attending">Attending</SelectItem>
                    <SelectItem value="not-attending">Not Attending</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cremationRSVP"
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
                      <SelectValue placeholder="Select your attendance" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="attending">Attending</SelectItem>
                    <SelectItem value="not-attending">Not Attending</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

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
              type="submit"
              className="w-[150px] h-11 bg-teal-600 rounded hover:bg-teal-700 text-white"
            >
              Submit RSVP
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default FormRSVP;
