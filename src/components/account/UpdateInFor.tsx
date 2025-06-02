"use client";
import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useUserProfile } from "./hook/getInFo";
import { updateProfile } from "@/lib/accountAPI";
import { useRouter } from "next/navigation";
import HeaderAccount from "./HeaderAccount";

const formSchema = z.object({
  first_name: z
    .string()
    .min(2, { message: "First name must be at least 2 characters." }),
  last_name: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }),
  address: z.string().optional(),
  country: z.string().optional(),
  code: z.string().optional(),
});

const UpdateInfor = ({}) => {
  const user = useUserProfile();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "********",
      address: "",
      country: "",
      code: "",
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        first_name: user.first_name ?? "",
        last_name: user.last_name ?? "",
        email: user.email ?? "",
        password: "********",
        address: user.address ?? "",
        country: user.country ?? "",
        code: user.code ?? "",
      });
    }
  }, [user, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { first_name, last_name, email, address, country, code } = values;
    const updatedPassword =
      values.password === "********" ? undefined : values.password;
    try {
      const user = await updateProfile(
        first_name,
        last_name,
        email,
        updatedPassword,
        address,
        country,
        code
      );
      if (user) {
        router.push("/account");
      } else {
      }
      // eslint-disable-next-line
    } catch (error) {}
  }

  return (
    <div>
      <div className="h-[1094px] flex flex-col gap-10 px-[229px] py-20 ml-40">
        <HeaderAccount />

        <div className="w-[982px] h-12 border-b border-gray-200 mb-6">
          <nav className="h-12 flex gap-15">
            <Link
              href="/account"
              className=" border-b-1 border-black py-4 px-1 text-xl font-semibold text-black"
            >
              Basic Information
            </Link>
            <Link
              href="/account/memorials"
              className="border-b-1 border-transparent py-4 px-1 text-xl font-semibold text-gray-500 hover:border-gray-300 hover:text-gray-700"
            >
              My Memorials
            </Link>
          </nav>
        </div>

        <div className="bg-[#E5F6EC66] p-6 rounded-lg shadow-sm w-[982px] h-[694px] flex flex-col gap-10">
          <h2 className="text-xl font-semibold ">Basic Information</h2>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-7 w-[918px]"
            >
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem className="flex justify-between h-12 items-center">
                    <FormLabel className="w-21 font-light text-base">
                      First Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="w-[688px] bg-white rounded"
                        placeholder="First Name"
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
                  <FormItem className="flex justify-between h-12 items-center">
                    <FormLabel className="w-21 font-light text-base">
                      Last Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="w-[688px] bg-white rounded"
                        placeholder="Last Name"
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
                  <FormItem className="flex justify-between h-12 items-center">
                    <FormLabel className="w-21 font-light text-base">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="w-[688px] bg-white rounded"
                        placeholder="Email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="flex justify-between h-12 items-center">
                    <FormLabel className="w-21 font-light text-base">
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="w-[688px] bg-white rounded"
                        placeholder="Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem className="flex justify-between h-12 items-center">
                    <FormLabel className="w-21 font-light text-base">
                      Address
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="w-[688px] bg-white rounded"
                        placeholder="Address"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem className="flex justify-between h-12 items-center">
                    <FormLabel className="w-21 font-light text-base">
                      Country
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="w-[688px] bg-white rounded"
                        placeholder="Country"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem className="flex justify-between h-12 items-center">
                    <FormLabel className="w-21 font-light text-base">
                      Post Code
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="w-[688px] bg-white rounded"
                        placeholder="Post Code"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="col-span-2 text-right">
                <Button
                  className="h-11 w-21 inline-flex items-center justify-center text-center border text-base font-light rounded text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                  type="submit"
                >
                  Save
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default UpdateInfor;
