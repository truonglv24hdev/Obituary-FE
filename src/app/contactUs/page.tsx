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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faXTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

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
      <div className=" relative h-122">
        <div className="absolute inset-0 z-0">
          <Image src="/img/payment.jpg" alt="Logo" fill />
          <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <div className="h-32 w-[400px] flex flex-col items-center justify-center text-center text-white">
              <div className="font-medium text-[64px] ">Contact us</div>
              <p className="h-[21px] museo font-light text-xl">
                Please feel free to contact us and we will get back to you
                within 24 hours.
              </p>
            </div>
          </div>
        </div>

        <Heading className="absolute inset-0 z-10" />
      </div>

      <div className="w-full">
        <div className=" flex flex-col md:flex-row md:max-w-[1240px] md:mx-auto gap-10 md:gap-40 p-6 md:py-14 md:px-0 mb-5 bg-white">
          {/* Left Info */}
          <div className="flex flex-col w-full md:w-[478px] gap-10 mt-10 md:mt-15">
            <h1 className="w-full md:w-[478px] h-auto museo font-black text-[32px] md:text-[40px]">
              Get In Touch
            </h1>
            <p className="w-full md:w-[478px] h-auto text-base museo font-medium">
              Getting in touch is simple, and we are always here to ensure your
              experience is smooth, respectful, and supported every step of the
              way.
            </p>

            <div className="w-full md:w-[478px] grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8">
              <div className="flex items-start gap-4">
                <span className="text-[#7bb7a4] text-3xl">
                  <IconClock width={40} height={40} />
                </span>
                <div>
                  <div className="font-serif text-lg md:text-xl">
                    Business Hours
                  </div>
                  <div className="text-gray-600">Mon-Fri, 09:00 - 06:00</div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="text-[#7bb7a4] text-3xl">
                  <IconEmail width={40} height={40} />
                </span>
                <div>
                  <div className="font-serif text-lg md:text-xl">Email</div>
                  <div className="text-gray-600">TributeChapter@gmail.com</div>
                </div>
              </div>

              <div className="flex items-start gap-4 col-span-1 sm:col-span-2 md:col-span-1">
                <span className="text-[#7bb7a4] text-3xl">
                  <IconWeb width={40} height={40} />
                </span>
                <div>
                  <div className="font-serif text-lg md:text-xl">Website</div>
                  <div className="text-gray-600">TributeChapter.com</div>
                </div>
              </div>
            </div>

            <div>
              <div className="font-serif text-xl md:text-2xl mb-3">
                Follow Us On
              </div>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-[#7bb7a4] flex items-center justify-center text-white text-xl"
                >
                  <FontAwesomeIcon icon={faFacebookF} className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-[#7bb7a4] flex items-center justify-center text-white text-xl"
                >
                  <FontAwesomeIcon icon={faInstagram} className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-[#7bb7a4] flex items-center justify-center text-white text-xl"
                >
                  <FontAwesomeIcon icon={faYoutube} className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-[#7bb7a4] flex items-center justify-center text-white text-xl"
                >
                  <FontAwesomeIcon icon={faXTwitter} className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="w-full md:w-[682px] mt-10 md:mt-15">
            <Form {...form}>
              <form
                className="flex-1 bg-[#f4fbf7] rounded-xl border p-6 md:p-8 space-y-6 min-h-[542px]"
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
      </div>

      <Footer />
    </>
  );
};

export default Page;
