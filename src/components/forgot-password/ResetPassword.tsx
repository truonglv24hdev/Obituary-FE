"use client";
import React, { useState } from "react";
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
import { resetPassword } from "@/lib/authAPI";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  password: z
    .string()
    .min(6)
    .max(20)
    .refine((val) => val.length >= 6 && val.length <= 20, {
      message: "Password must be between 6 and 20 characters",
    }),
  confirmPassword: z
    .string()
    .min(6)
    .max(20)
    .refine((val) => val.length >= 6 && val.length <= 20, {
      message: "Password must be between 6 and 20 characters",
    }),
});

const ResetPassword = ({ email }: { email: string }) => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const { password, confirmPassword } = data;

    const result = await resetPassword(password, confirmPassword, email);
    if (result.code == 3) {
      router.push("/sign-in");
    }
  };

  return (
    <div className="h-200 flex items-center justify-center bg-white relative">
      <div className="bg-white shadow-lg border rounded-lg px-8 py-10 md:w-[539px] h-[440px] z-10 flex flex-col gap-3">
        <h2 className="text-[40px] font-serif font-medium mb-6">
          New Password
        </h2>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-8"
          >
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <input
                      type="password"
                      placeholder="Atleast 8 letters"
                      className="w-full h-13 bg-[#29354833]/20 text-base museo px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-200"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <input
                      type="password"
                      placeholder="Atleast 8 letters"
                      className="w-full h-13 bg-[#29354833]/20 text-base museo px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-200"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full h-14 bg-[#699D99] text-white py-2 rounded museo font-medium text-xl"
            >
              Continue
            </Button>
            {errorMessage && (
              <div className="text-red-500 text-center text-sm">
                {errorMessage}
              </div>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ResetPassword;
