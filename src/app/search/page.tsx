import Footer from "@/components/layout/Footer";
import Heading from "@/components/layout/Heading";
import MemorialSearch from "@/components/search/Search";
import React from "react";

type PageProps = {
  searchParams: Promise<{
    firstName?:string
    lastName?: string;
  }>;
};

const Page = async ({ searchParams }: PageProps) => {
  const resolvedSearchParams = await searchParams;
  const firstName = resolvedSearchParams.firstName ?? "";
  const lastName = resolvedSearchParams.lastName ?? "";

  return (
    <>
      <Heading className="bg-[#699D99]" />
      <MemorialSearch firstName={firstName} lastName={lastName} />
      <Footer />
    </>
  );
};

export default Page;
