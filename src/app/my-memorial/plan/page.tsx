import Footer from "@/components/layout/Footer";
import Heading from "@/components/layout/Heading";
import PaymentMemorial from "@/components/my-memorial/PaymentMemorial";
import React from "react";

const page = () => {
  return (
    <>
      <Heading className="bg-[#699D99]" />
      <PaymentMemorial />
      <Footer/>
    </>
  );
};

export default page;
