"use client";
import React from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { IconClock, IconEmail, IconWeb } from "@/components/icons";
import Heading from "@/components/layout/Heading";
import Image from "next/image";
import Footer from "@/components/layout/Footer";

const Page = () => {
  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  return (
    <>
      <div className="relative h-122">
        <div className="absolute inset-0 z-0">
          <Image src="/img/pricing.jpg" alt="Logo" fill />
          <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <div className="h-32 w-[400px] flex flex-col items-center justify-center text-center text-white">
              <div className="font-medium text-[64px] ">Contact us</div>
              <p className="h-[21px] font-light text-xl">
                Please feel free to contact us and we will get back to you
                within 24 hours.
              </p>
            </div>
          </div>
        </div>

        <Heading className="absolute inset-0 z-10" />
      </div>
      <div className="flex flex-col md:flex-row gap-40 p-12 bg-white">
        {/* Left Info */}
        <div className="flex flex-col w-[478px] h-[468px] gap-15 mt-15 ml-10">
          <h1 className="w-[478px] h-[478px] font-medium text-[40px]">
            Get In Touch
          </h1>
          <p className="w-[478px] h-15 text-base font-medium">
            Getting in touch is simple, and we are always here to ensure your
            experience is smooth, respectful, and supported every step of the
            way.
          </p>
          <div className="w-[478px] grid grid-cols-2 gap-x-6 gap-y-8">
            <div className="flex items-start gap-4">
              <span className="text-[#7bb7a4] text-3xl">
                <IconClock width={40} height={40} />
              </span>
              <div>
                <div className="font-serif text-xl">Business Hours</div>
                <div className="text-gray-600">Mon-Fri, 09:00 - 06:00</div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="text-[#7bb7a4] text-3xl">
                <IconEmail width={40} height={40} />
              </span>
              <div>
                <div className="font-serif text-xl">Email</div>
                <div className="text-gray-600">TributeChapter@gmail.com</div>
              </div>
            </div>

            <div className="flex items-start gap-4 col-span-2 sm:col-span-1">
              <span className="text-[#7bb7a4] text-3xl">
                <IconWeb width={40} height={40} />
              </span>
              <div>
                <div className="font-serif text-xl">Website</div>
                <div className="text-gray-600">TributeChapter.com</div>
              </div>
            </div>
          </div>
          <div>
            <div className="font-serif text-2xl mb-3">Follow Us On</div>
            <div className="flex gap-4">
              {/* Facebook */}
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-[#7bb7a4] flex items-center justify-center text-white text-xl"
              >
                <svg
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  width="22"
                  height="22"
                >
                  <path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0" />
                </svg>
              </a>
              {/* Instagram */}
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-[#7bb7a4] flex items-center justify-center text-white text-xl"
              >
                <svg
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  width="22"
                  height="22"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.241 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.241 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.241-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608C4.515 2.567 5.782 2.295 7.148 2.233 8.414 2.175 8.794 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.771.131 4.659.425 3.678 1.406c-.98.98-1.274 2.092-1.334 3.374C2.013 5.668 2 6.077 2 12c0 5.923.013 6.332.072 7.612.06 1.282.354 2.394 1.334 3.374.98.98 2.092 1.274 3.374 1.334C8.332 23.987 8.741 24 12 24s3.668-.013 4.948-.072c1.282-.06 2.394-.354 3.374-1.334.98-.98 1.274-2.092 1.334-3.374.059-1.28.072-1.689.072-7.612 0-5.923-.013-6.332-.072-7.612-.06-1.282-.354-2.394-1.334-3.374-.98-.98-2.092-1.274-3.374-1.334C15.668.013 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z" />
                </svg>
              </a>
              {/* Youtube */}
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-[#7bb7a4] flex items-center justify-center text-white text-xl"
              >
                <svg
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  width="22"
                  height="22"
                >
                  <path d="M23.498 6.186a2.994 2.994 0 0 0-2.112-2.112C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.386.574A2.994 2.994 0 0 0 .502 6.186C0 8.072 0 12 0 12s0 3.928.502 5.814a2.994 2.994 0 0 0 2.112 2.112C4.5 20.5 12 20.5 12 20.5s7.5 0 9.386-.574a2.994 2.994 0 0 0 2.112-2.112C24 15.928 24 12 24 12s0-3.928-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              {/* X (Twitter) */}
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-[#7bb7a4] flex items-center justify-center text-white text-xl"
              >
                <svg
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  width="22"
                  height="22"
                >
                  <path d="M17.53 2.47a.75.75 0 0 1 1.06 1.06L13.06 9l5.53 5.47a.75.75 0 0 1-1.06 1.06L12 10.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 9 5.47 3.53a.75.75 0 0 1 1.06-1.06L12 7.94l5.53-5.47z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        {/* Right Form */}
        <div className="w-[682px]">
          <Form {...form}>
            <form
              className="flex-1 bg-[#f4fbf7] rounded-xl border p-8 space-y-6 mt-15 min-h-[542px] "
              onSubmit={form.handleSubmit((data) => {
                console.log(data);
              })}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <input
                          className="w-full p-3 rounded-md border border-gray-200 bg-white"
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
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <input
                          className="w-full p-3 rounded-md border border-gray-200 bg-white"
                          placeholder="Smith"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <input
                          type="email"
                          className="w-full p-3 rounded-md border border-gray-200 bg-white"
                          placeholder="Enter your email"
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
                    <FormItem>
                      <FormLabel>Phone number</FormLabel>
                      <FormControl>
                        <input
                          className="w-full p-3 rounded-md border border-gray-200 bg-white"
                          placeholder="+92 000 1111 000"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <textarea
                        className="w-full p-3 rounded-md border border-gray-200 bg-white min-h-[180px]"
                        placeholder="Leave your message"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="bg-[#7bb7a4] text-white px-8 py-2 rounded-md text-lg hover:bg-[#5e9c8a] transition"
                >
                  Submit
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Page;
