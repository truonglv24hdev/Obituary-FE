import Footer from "@/components/layout/Footer";
import Heading from "@/components/layout/Heading";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import CreateMemorial from "@/components/my-memorial/CreateMemorial";
import React from "react";

type PageProps = {
  searchParams: Promise<{
    firstName?: string;
    lastName?: string;
  }>;
};

const Page = async ({ searchParams }: PageProps) => {
  const resolvedSearchParams = await searchParams;
  const firstName = resolvedSearchParams.firstName;
  const lastName = resolvedSearchParams.lastName;

  return (
    <>
      <ProtectedRoute>
        <Heading className="bg-[#699D99]" />
        <CreateMemorial firstName={firstName} lastName={lastName} />
        <Footer />
      </ProtectedRoute>
    </>
  );
};

export default Page;
