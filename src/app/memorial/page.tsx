import Footer from "@/components/layout/Footer";
import Heading from "@/components/layout/Heading";
import CreateMemorial from "@/components/memorial/CreateMemorial";
import React from "react";

const page = () => {
  return (
    <>
      <Heading className="bg-[#699D99]" />
      <CreateMemorial />
      <Footer/>
    </>
  );
};

export default page;
