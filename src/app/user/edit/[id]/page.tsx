"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { TUser } from "@/types/type";
import { getUserByAdmin, updateUser } from "@/lib/accountAPI";

const formSchema = z.object({
  first_name: z.string().min(1, "Full name is required"),
  last_name: z.string().optional(),
  email: z.string().email("Invalid email"),
  address: z.string().optional(),
  country: z.string().optional(),
  code: z.string().optional(),
  status: z.enum(["active", "pending", "banned"]),
});

type FormValues = z.infer<typeof formSchema>;

export default function EditUserForm({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();

  const [user, setUser] = useState<TUser | null>(null);

  useEffect(() => {
    getUserByAdmin(id)
      .then((data) => {
        if (!data) return;
        setUser(data);
      })
      .catch((err) => console.error("Lỗi khi lấy user:", err));
  }, []);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      address: "",
      country: "",
      code: "",
      status: "active",
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        first_name: user.first_name ?? "",
        last_name: user.last_name ?? "",
        email: user.email ?? "",
        address: user.address ?? "",
        country: user.country ?? "",
        code: user.code ?? "",
        status: user.deleted ? "banned" : "active",
      });
    }
  }, [user, form]);

  const onSubmit = async (values: FormValues) => {
    try {
      const updatedUser = await updateUser(id, {
        first_name: values.first_name,
        last_name: values.last_name,
        email: values.email,
        address: values.address,
        country: values.country,
        code: values.code,
        deleted: values.status === "active" ? false : true,
      });
      if (updatedUser) router.push("/admin");
      // eslint-disable-next-line
    } catch (error) {
      alert("Failed to update profile. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => router.push(`/admin`)}
              variant="ghost"
              size="sm"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Profile
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Edit User</h1>
              <p className=" text-gray-600">Update user information</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        <Card className="p-3">
          <CardHeader>
            <CardTitle className="text-2xl">User Information</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                className="flex flex-col gap-5"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name="first_name"
                  render={({ field }) => (
                    <FormItem className="flex gap-10">
                      <FormLabel className="w-40">First Name</FormLabel>
                      <FormControl>
                        <Input
                          className="w-150"
                          placeholder="Enter full name"
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
                    <FormItem className="flex gap-10">
                      <FormLabel className="w-40">Last Name</FormLabel>
                      <FormControl>
                        <Input
                          className="w-150"
                          placeholder="Enter full name"
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
                    <FormItem className="flex gap-10">
                      <FormLabel className="w-40">Email</FormLabel>
                      <FormControl>
                        <Input
                          className="w-150"
                          type="email"
                          placeholder="Enter email"
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
                    <FormItem className="flex gap-10">
                      <FormLabel className="w-40">Address</FormLabel>
                      <FormControl>
                        <Input
                          className="w-150"
                          placeholder="Enter address"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem className="flex gap-10">
                      <FormLabel className="w-40">Country</FormLabel>
                      <FormControl>
                        <Input
                          className="w-150"
                          placeholder="Enter country"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem className="flex gap-10">
                      <FormLabel className="w-40">Post Code</FormLabel>
                      <FormControl>
                        <Input
                          className="w-150"
                          placeholder="Enter user code"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem className="flex gap-10">
                      <FormLabel className="w-40">Account Status</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="banned">Banned</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                <div className="flex justify-end">
                  <Button
                    type="submit"
                    className="h-11 px-6 bg-teal-600 hover:bg-teal-700 text-white"
                  >
                    Save
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
