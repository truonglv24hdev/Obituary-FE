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
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { useRouter } from "next/navigation";
import { signUp } from "@/lib/authAPI";

type LoginFormValues = {
  first_name: string;
  email: string;
  password: string;
};

const SignUp = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const form = useForm<LoginFormValues>({
    defaultValues: {
      first_name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginFormValues) {
    const { first_name, email, password } = data;
    try {
      const token = await signUp(first_name, email, password);
      if (token) {
        localStorage.setItem("token", token);
        router.push("/");
      } else {
        setErrorMessage("Đăng ý thất bại. Vui lòng kiểm tra lại.");
      }
      // eslint-disable-next-line
    } catch (error) {
      setErrorMessage("Đăng ký thất bại. Vui lòng thử lại sau.");
    }
  }

  return (
    <div className="h-200 flex items-center justify-center bg-white relative">
      <div className="bg-white shadow-lg border rounded-lg px-8 py-10 w-[560px] h-[700px] z-10 flex flex-col gap-3">
        <h2 className="text-[40px] font-serif font-medium mb-6">
          Welcome Back
        </h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-200"
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
                      placeholder="Example@email.com"
                      className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-200"
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
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <input
                      type="password"
                      placeholder="********"
                      className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-200"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end mb-2">
              <Link href="#" className="text-sm text-blue-500 hover:underline">
                Forgot Password?
              </Link>
            </div>
            <Button
              type="submit"
              className="w-full h-10 bg-[#699D99] text-white py-2 rounded font-medium text-xl mb-4"
            >
              Sign in
            </Button>
            {errorMessage && (
              <div className="text-red-500 text-center text-sm mt-2">
                {errorMessage}
              </div>
            )}
          </form>
        </Form>
        <div className="flex items-center my-4">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="mx-2 text-gray-400 text-sm">Or continue with</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>
        <div className="flex gap-4 mb-4">
          <Button
            variant="outline"
            className="flex-1 flex items-center justify-center"
          >
            <FontAwesomeIcon icon={faGoogle} className="w-7 h-7" />
            Google
          </Button>
          <Button
            variant="outline"
            className="flex-1 flex items-center justify-center"
          >
            <FontAwesomeIcon icon={faFacebookF} className="w-7 h-7" />
            Facebook
          </Button>
        </div>
        <div className="text-center text-lg mt-5">
          New to Tribute Chapters?{" "}
          <Link href="/sign-up" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
