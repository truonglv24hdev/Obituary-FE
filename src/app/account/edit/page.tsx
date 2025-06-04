import UpdateInFor from "@/components/account/UpdateInFor";
import Faqs from "@/components/layout/Faqs";
import Footer from "@/components/layout/Footer";
import Heading from "@/components/layout/Heading";
import React from "react";

const page = () => {
  return (
    <div>
      <Heading className="bg-[#699D99]" />
      <UpdateInFor />
      <Faqs/>
      <Footer/>
    </div>
  );
};

export default page;
