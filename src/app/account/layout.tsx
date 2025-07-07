import Faqs from "@/components/layout/Faqs";
import Footer from "@/components/layout/Footer";
import React from "react";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {children}
      <Faqs className="bg-[#E5F6EC4D]" bg="bg-white">
        <div className="mx-auto mb-10">Frequently Asked Questions</div>
      </Faqs>
      <Footer />
    </div>
  );
}
