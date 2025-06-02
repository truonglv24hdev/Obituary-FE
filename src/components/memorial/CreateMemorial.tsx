"use client";
import Heading from "@/components/layout/Heading";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import Image from "next/image";

const formSchema = z.object({
  first_name: z
    .string()
    .min(2, { message: "First name must be at least 2 characters." }),
  middle_name: z
    .string()
    .min(2, { message: "First name must be at least 2 characters." }),
  last_name: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters." }),
  gender: z.string().email({ message: "Invalid email address." }),
  born: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }),
  death: z.string().optional(),
  country: z.string().optional(),
  code: z.string().optional(),
});

const CreateMemorial = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      middle_name: "",
      last_name: "",
      gender: "",
      born: "********",
      death: "",
      country: "",
      code: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div>
      <Heading className="bg-[#699D99]" />
      <div className="w-[1500px] h-[1587px] px-[229px] py-20 flex flex-col gap-13">
        <div className="w-[540px] h-28 flex flex-col gap-4">
          <h1 className="h-12 text-[40px] font-medium">
            Create memorial website
          </h1>
          <p className="font-light text-2xl">
            It only takes a few moments to create a Tribute. <br />
            Please tell us...
          </p>
        </div>

        {/* Stepper */}
        <div className="relative mt-6 mb-10">
          {/* Line + Circles */}
          <div className="flex items-center justify-between w-full">
            {/* Step 1 */}
            <div className="relative flex flex-col items-center">
              <div className="w-6 h-6 rounded-full border-4 border-gray-400 bg-white z-10" />
              <div className="absolute top-10">
                <div className="bg-[#1E293B] text-white text-sm px-3 py-1 rounded shadow relative">
                  About
                  <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#1E293B] rotate-45" />
                </div>
              </div>
            </div>

            {/* Line */}
            <div className="flex-1 h-3 bg-gray-200" />

            {/* Step 2 */}
            <div className="relative flex flex-col items-center">
              <div className="w-6 h-6 rounded-full border-4 border-gray-400 bg-white z-10" />
              <div className="absolute top-10">
                <div className="bg-gray-200 text-black text-sm px-3 py-1 rounded shadow relative">
                  Payment
                  <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-gray-200 rotate-45" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form Box */}
        <div className="bg-green-50 p-8 rounded-lg shadow-sm">
          <h2 className="text-lg font-medium mb-6">
            This memorial is dedicated to:
          </h2>

          {/* Image Upload */}
          <div className="flex gap-45 mb-2">
            <p>Picture</p>
            <div className="relative w-32 h-40 rounded shadow-md overflow-hidden bg-white">
              <Image src={"/img/1.jpg"} alt="" width={160} height={160} className="px-1 py-2 h-40" />
              <Button className="absolute bottom-1 right-1 bg-[#133C4C] rounded shadow h-5 w-2 hover:bg-gray-400">
                ✏️
              </Button>
            </div>
          </div>

          {/* Name Inputs */}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-7 w-[918px]"
            >
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem className="flex gap-37 h-12 items-center">
                    <FormLabel className="w-21 font-light text-base">
                      First Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="w-[400px] bg-white rounded"
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
                name="middle_name"
                render={({ field }) => (
                  <FormItem className="flex gap-37 h-12 items-center">
                    <FormLabel className="w-21 font-light text-base">
                      Middle Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="w-[400px] bg-white rounded"
                        placeholder="William"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem className="flex gap-37 h-12 items-center">
                    <FormLabel className="w-21 font-light text-base">
                      Last Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="w-[400px] bg-white rounded"
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
                name="gender"
                render={({ field }) => (
                  <FormItem className="flex gap-37 h-12 items-center">
                    <FormLabel className="w-21 font-light text-base">
                      Gender
                    </FormLabel>
                    <FormControl>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-1">
                          <input
                            type="radio"
                            value="male"
                            checked={field.value === "male"}
                            onChange={field.onChange}
                          />
                          Male
                        </label>
                        <label className="flex items-center gap-1">
                          <input
                            type="radio"
                            value="female"
                            checked={field.value === "female"}
                            onChange={field.onChange}
                          />
                          Female
                        </label>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="born"
                render={({ field }) => (
                  <FormItem className="flex gap-37 h-12 items-center">
                    <FormLabel className="w-21 font-light text-base">
                      Born
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="w-[400px] bg-white rounded"
                        placeholder="DD/MM/YYYY"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="death"
                render={({ field }) => (
                  <FormItem className="flex gap-37 h-12 items-center">
                    <FormLabel className="w-21 font-light text-base">
                      Death
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="w-[400px] bg-white rounded"
                        placeholder="DD/MM/YYYY"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <label className="block text-2xl font-light text-gray-700">
                Memorial web address:
              </label>

              <FormField
                control={form.control}
                name="death"
                render={({ field }) => (
                  <FormItem className="flex gap-37 h-12 items-center">
                    <FormLabel className="w-21 font-light text-base">
                      https://
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="w-[400px] bg-white rounded"
                        placeholder="John-Doe"
                        {...field}
                      />
                    </FormControl>
                    <p className="w-16">Tributechapters.com.sg</p>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="text-sm text-gray-600 ml-58 mt-2 mb-6">
                <p className="font-medium mb-1">Suggestions:</p>
                <ul className="list-disc list-inside ml-2">
                  <li>Tributechapters.com.sg/John-doe29</li>
                  <li>Tributechapters.com.sg/JohnDoe</li>
                  <li>Tributechapters.com.sg/John-doe1980</li>
                </ul>
              </div>

              <div className="col-span-2 text-right">
                <Button
                  className="h-11 w-21 inline-flex items-center justify-center text-center border text-base font-light rounded text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                  type="submit"
                >
                  Continue
                </Button>
              </div>
            </form>
          </Form>
          {/* Suggestions */}
        </div>
      </div>
    </div>
  );
};

export default CreateMemorial;
