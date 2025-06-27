"use client"
import Footer from "@/components/layout/Footer";
import Heading from "@/components/layout/Heading";
import PaymentMemorial from "@/components/my-memorial/PaymentMemorial";
import React, { use } from "react";

const page = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  return (
    <>
      <Heading className="bg-[#699D99]" />
      <PaymentMemorial id={id}/>
      <Footer/>
    </>
  );
};

export default page;
