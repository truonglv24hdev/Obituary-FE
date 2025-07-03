import React from "react";
import { Button } from "@/components/ui/button";
import { IconBook, IconQR } from "@/components/icons";
import PaymentPlan from "../common/PaymentPlan";

const addons = [
  {
    price: "$60",
    title: "Printable hard cover memorial book",
    icon: <IconBook width={40} height={40} />,
  },
  {
    price: "$30",
    title: "QR Code plate",
    icon: <IconQR width={40} height={40} />,
  },
];

const PricingSection = () => {
  return (
    <div className="w-full bg-white flex items-center justify-center px-4 md:px-0 py-16">
      <div className="w-full max-w-[892px]">
        {/* Title */}
        <div className="w-full md:w-[716px] mx-auto flex flex-col gap-4 mb-10 text-center">
          <h2 className="font-medium text-[32px] md:text-[40px] leading-tight">
            Pricing
          </h2>
          <ul className="list-disc museo list-inside space-y-2 text-base font-light">
            <li>Start now for free. No credit card required</li>
            <li>Upgrade to premium plan at anytime</li>
          </ul>
        </div>

        <PaymentPlan />

        {/* Add-ons */}
        <div className="w-full max-w-[554px] mx-auto flex flex-col gap-2 mt-16">
          <h3 className="text-xl museo font-semibold text-center mb-6">
            Optional Add-ons
          </h3>
          <div className="flex flex-col md:flex-row justify-center gap-10">
            {addons.map((addon, idx) => (
              <div
                key={idx}
                className="flex-1 flex justify-center relative items-start"
              >
                <div className="w-full md:w-[230px] h-auto bg-white rounded-xl p-5 flex flex-col justify-between">
                  <div className="flex flex-col flex-1">
                    <div className="text-[28px] font-bold mb-2">
                      {addon.price}
                    </div>
                    <div className="mb-2">{addon.icon}</div>
                    <div className="whitespace-pre-line museo text-[18px] mb-2 font-light leading-tight min-h-[60px]">
                      {addon.title}
                    </div>
                  </div>
                  <Button className="w-full md:w-[168px] h-10 cursor-pointer border museo border-[#699D99] text-[#699D99] rounded-sm bg-white px-5 font-bold hover:bg-teal-50 transition">
                    See example
                  </Button>
                </div>
                {/* Vertical separator only on desktop */}
                {idx !== addons.length - 1 && (
                  <div className="hidden md:block absolute -right-10 top-1/2 -translate-y-1/2 w-[1px] h-[70%] bg-black" />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-10">
            <Button className="w-[134px] h-11 cursor-pointer bg-teal-600 museo text-base text-white px-8 rounded-sm font-semibold hover:bg-teal-700">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingSection;
