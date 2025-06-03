"use client";
import React, { useEffect, useState } from "react";
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
import { useRouter } from "next/navigation";

import { updateProfile, getProfile } from "@/lib/accountAPI";
import HeaderAccount from "./HeaderAccount";
import { TUser } from "@/types/type";

const formSchema = z.object({
  first_name: z
    .string()
    .min(2, { message: "First name must be at least 2 characters." }),
  last_name: z.string().optional(),
  email: z.string().email({ message: "Invalid email address." }),
  password: z
    .string()
    .min(6)
    .max(20)
    .refine((val) => val !== "", {
      message: "Password must be between 6 and 20 characters",
    }),
  address: z.string().optional(),
  country: z.string().optional(),
  code: z
    .string()
    .optional()
    .refine((val) => !val || val.length > 5, {
      message: "Post code must be longer than 6 characters",
    }),
});

const UpdateInfor = () => {
  const [user, setUser] = useState<TUser | null>(null);
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
    getProfile()
      .then(setUser)
      .catch(() => {
        localStorage.removeItem("token");
        router.replace("/sign-in");
      });
  }, [router]);

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

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const updatedPassword =
      values.password === "********" ? undefined : values.password;

    try {
      const updatedUser = await updateProfile(
        values.first_name,
        values.last_name,
        values.email,
        updatedPassword,
        values.address,
        values.country,
        values.code
      );
      if (updatedUser) router.push("/account");
      // eslint-disable-next-line
    } catch (error) {
      alert("Failed to update profile. Please try again.");
    }
  };

  return (
    <div className="px-6 py-10 max-w-4xl mx-auto">
      <HeaderAccount />

      <nav className="mt-8 border-b border-gray-200 mb-8 flex gap-8 text-xl font-semibold">
        <Link
          href="/account"
          className="pb-2 border-b-2 border-black text-black"
        >
          Basic Information
        </Link>
        <Link
          href="/account/memorials"
          className="pb-2 border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
        >
          My Memorials
        </Link>
      </nav>

      <div className="bg-[#E5F6EC66] p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-6">Basic Information</h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {[
              {
                name: "first_name",
                label: "First Name",
                placeholder: "First Name",
              },
              {
                name: "last_name",
                label: "Last Name",
                placeholder: "Last Name",
              },
              { name: "email", label: "Email", placeholder: "Email" },
              { name: "password", label: "Password", placeholder: "Password" },
              { name: "address", label: "Address", placeholder: "Address" },
              { name: "country", label: "Country", placeholder: "Country" },
              { name: "code", label: "Post Code", placeholder: "Post Code" },
            ].map((field) => (
              <FormField
                key={field.name}
                control={form.control}
                name={field.name as keyof z.infer<typeof formSchema>}
                render={({ field: fieldProps }) => (
                  <FormItem className="flex items-center justify-between">
                    <FormLabel className="w-[120px] font-light text-base">
                      {field.label}
                    </FormLabel>
                    <div className="flex-1">
                      <FormControl>
                        <Input
                          className="w-full bg-white rounded"
                          placeholder={field.placeholder}
                          {...fieldProps}
                        />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            ))}

            <div className="text-right">
              <Button
                type="submit"
                className="h-11 px-6 bg-teal-600 hover:bg-teal-700 text-white"
              >
                Save
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default UpdateInfor;
