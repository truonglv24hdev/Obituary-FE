"use client";
import React, { useEffect, useState } from "react";
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
import Link from "next/link";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { sendLink } from "@/lib/authAPI";
import { forgotPassword } from "@/lib/memorialAPI";

const formSchema = z.object({
  email: z.string().email(),
});

const ForgotPassword = () => {
  const router = useRouter();
  const [type, setType] = useState(false);
  const [memorial, setMemorial] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  useEffect(() => {
    const memorialId = localStorage.getItem("memorialId");
    if (memorialId) {
      setType(true);
      setMemorial(memorialId);
    }
  }, []);

  async function onSubmit(data: z.infer<typeof formSchema>) {
    if (type && data.email) {
      const result = await forgotPassword(data.email, memorial);
      if (result == 2) {
        router.push(`/forgot-password/otp/${data.email}`);
      }
      console.log(1);
    } else {
      const result = await sendLink(data.email);
      if (result == 2) {
        router.push(`/forgot-password/otp/${data.email}`);
      }
      console.log(2);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white relative px-4">
      <div className="bg-white shadow-lg border rounded-lg px-8 py-9 w-full max-w-[539px] md:h-[395px] z-10 flex flex-col gap-8">
        <h2 className="text-[40px] font-serif font-medium">Forgot Password</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium">Email</FormLabel>
                  <FormControl>
                    <input
                      type="email"
                      placeholder="Example@email.com"
                      className="w-full mb-4 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-200"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full md:w-[475px] h-[56px] museo bg-[#699D99] text-white py-2 rounded font-medium text-xl"
            >
              Send code
            </Button>
          </form>
        </Form>
        {type ? (
          ""
        ) : (
          <div className="text-center text-lg mt-4">
            Back to{" "}
            <Link href="/sign-in" className="text-blue-500 hover:underline">
              Log in
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
