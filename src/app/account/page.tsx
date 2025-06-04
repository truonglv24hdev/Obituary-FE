import React from "react";
import Infor from "@/components/account/Infor";
import Faqs from "@/components/layout/Faqs";
import Heading from "@/components/layout/Heading";
import Footer from "@/components/layout/Footer";

const page = () => {
  return (
    <div>
      <Heading className="bg-[#699D99]" />
      <Infor />
      <Faqs />
      <Footer/>
    </div>
  );
};

export default page;
