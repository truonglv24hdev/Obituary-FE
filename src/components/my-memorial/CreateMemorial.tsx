"use client";
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
import HeaderMemorial from "./HeaderMemorial";
import { postMemorial } from "@/lib/memorialAPI";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  first_name: z
    .string()
    .min(2, { message: "First name must be at least 2 characters." }),
  middle_name: z
    .string()
    .min(2, { message: "Middle name must be at least 2 characters." })
    .optional(),
  last_name: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters." }),
  gender: z.enum(["MALE", "FEMALE"]).optional(),
  born: z.string().min(8),
  death: z.string().min(8),
  slug: z.string().optional(),
});

const CreateMemorial = () => {
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      middle_name: "",
      last_name: "",
      gender: undefined,
      born: "",
      death: "",
      slug: "",
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const formData = new FormData();
      formData.append("first_name", values.first_name);
      formData.append("middle_name", values.middle_name || "");
      formData.append("last_name", values.last_name);
      formData.append("gender", values.gender || "");
      formData.append("born", values.born);
      formData.append("death", values.death);
      if (values.slug) formData.append("slug", values.slug);
      if (selectedFile) formData.append("picture", selectedFile);

      const res = await postMemorial(formData);
      if (res) {
        router.push(`/my-memorial/plan/${res._id}`);
      }
    } catch (err) {
      console.error("Submit failed:", err);
    }
  }

  const slugInput = form.watch("slug")?.trim().toLowerCase() || "";
  const born = form.watch("born");
  const death = form.watch("death");

  const getYear = (dateStr?: string) => dateStr?.match(/\d{4}/)?.[0] || "";
  const bornYear = getYear(born);
  const deathYear = getYear(death);
  const age =
    bornYear && deathYear
      ? (parseInt(deathYear) - parseInt(bornYear)).toString()
      : "";

  const slugSuggestions =
    slugInput.length > 0
      ? [
          slugInput.replace(/\s+/g, "-"),
          bornYear && `${slugInput}${bornYear}`,
          age && `${slugInput}${age}`,
        ].filter(Boolean)
      : [];

  return (
    <div>
      <div className="w-[1500px] h-[1587px] px-[229px] py-20 flex flex-col gap-13">
        <HeaderMemorial />

        {/* Form Box */}
        <div className="bg-green-50 p-8 rounded-lg shadow-sm">
          <h2 className="text-lg font-medium mb-6">
            This memorial is dedicated to:
          </h2>

          {/* Image Upload */}
          <div className="flex gap-45 mb-2">
            <p>Picture</p>
            <div className="relative w-32 h-40 rounded shadow-md overflow-hidden bg-white">
              {selectedFile && (
                <Image
                  src={URL.createObjectURL(selectedFile)}
                  alt="Preview"
                  width={160}
                  height={160}
                  className="px-1 py-2 h-40 object-cover"
                />
              )}
              <label className="absolute bottom-1 right-1 bg-[#133C4C] text-white rounded shadow h-6 w-6 flex items-center justify-center cursor-pointer hover:bg-gray-400">
                ✏️
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden" // ẩn input đi
                />
              </label>
            </div>
          </div>

          {/* Form Fields */}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-7 w-[918px]"
            >
              {/* First Name */}
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

              {/* Middle Name */}
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

              {/* Last Name */}
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

              {/* Gender */}
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
                            value="MALE"
                            checked={field.value === "MALE"}
                            onChange={field.onChange}
                          />
                          Male
                        </label>
                        <label className="flex items-center gap-1">
                          <input
                            type="radio"
                            value="FEMALE"
                            checked={field.value === "FEMALE"}
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

              {/* Born */}
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

              {/* Death */}
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

              {/* Memorial web address */}
              <label className="block text-2xl font-light text-gray-700">
                Memorial web address:
              </label>
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-1">
                    <div className="flex gap-3 items-center">
                      <FormLabel className="font-light text-base w-[80px]">
                        https://
                      </FormLabel>
                      <FormControl className="ml-35">
                        <Input
                          className="w-[400px] bg-white rounded"
                          placeholder="john-doe"
                          {...field}
                        />
                      </FormControl>
                      <span className="text-sm">Tributechapters.com.sg</span>
                    </div>
                    <FormMessage />

                    {slugSuggestions.length > 0 && (
                      <div className="text-sm text-gray-600 ml-58 mt-2 mb-6">
                        <p className="text-xl text-black museo mb-3">
                          Suggestions:
                        </p>
                        <ul className="list-disc list-inside text-base museo font-light text-[#222222] space-y-2">
                          {slugSuggestions.map((s, i) => (
                            <li
                              key={i}
                              className="cursor-pointer hover:underline ml-2"
                              onClick={() => form.setValue("slug", s)}
                            >
                              Tributechapters.com.sg/{s}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </FormItem>
                )}
              />

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
        </div>
      </div>
    </div>
  );
};

export default CreateMemorial;
