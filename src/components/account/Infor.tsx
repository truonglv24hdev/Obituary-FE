"use client";
import React from "react";
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

const formSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters." }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }),
  address: z.string().optional(),
  country: z.string().optional(),
  postCode: z.string().optional(),
});

const Infor = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "John",
      lastName: "Doe",
      email: "Johndoe@gmail.com",
      password: "**********", // Note: Displaying actual password is not secure. This is for structure.
      address: "",
      country: "New York",
      postCode: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-2">My Account</h1>
      <p className="text-gray-600 mb-6">
        You can change your account settings here
      </p>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <a
            href="#"
            className="border-b-2 border-indigo-500 py-4 px-1 text-sm font-medium text-indigo-600"
            aria-current="page"
          >
            Basic Information
          </a>
          <a
            href="#"
            className="border-b-2 border-transparent py-4 px-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
          >
            My Memorials
          </a>
        </nav>
      </div>

      {/* Basic Information Section */}
      <div className="bg-green-50 p-6 rounded-lg shadow-sm max-w-xl">
        <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-2 gap-4"
          >
            {/* First Name */}
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="First Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Last Name */}
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Last Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email Address */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Email Address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    {/* Note: Input type should be "password" in a real app */}
                    <Input type="text" placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Address */}
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Country */}
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input placeholder="Country" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Post Code */}
            <FormField
              control={form.control}
              name="postCode"
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel>Post Code</FormLabel>
                  <FormControl>
                    <Input placeholder="Post Code" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Edit/Save Button */}
            <div className="col-span-2 text-right">
              <Button type="submit">Edit</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Infor;
