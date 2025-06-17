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
    <div className="h-[1305px] w-full bg-white flex items-center justify-center">
      <div className="w-[892px] h-[1145px] tracking-normal ">
        <div className=" w-[716px] h-30 mx-auto flex flex-col gap-4 mb-10">
          <h2 className=" h-12 font-medium text-[40px] leading-12 text-center">
            Pricing
          </h2>
          <ul className="list-disc museo list-inside space-y-2 text-base leading-5 font-light text-center">
            <li>Start now for free. No credit card required</li>
            <li>Upgrade to premium plan at anytime</li>
          </ul>
        </div>
        <PaymentPlan />
        <div className="w-[554px] h-[358px] flex flex-col gap-2 mx-auto">
          <h3 className="text-xl museo font-semibold mb-6 mt-8 text-center">
            Optional Add-ons
          </h3>
          <div className="h-[214px] flex  md:flex-row justify-center gap-[83px]">
            {addons.map((addon, idx) => (
              <div
                key={idx}
                className="w-[194px] flex-1 flex justify-center relative items-start"
              >
                <div className="w-[230px] h-[214px] bg-white rounded-xl p-5 flex flex-col justify-between">
                  <div className="flex flex-col flex-1">
                    <div className="text-[32px] font-bold mb-2">
                      {addon.price}
                    </div>
                    <div className="mb-2">{addon.icon}</div>
                    <div className="whitespace-pre-line museo text-[20px] mb-2 font-light leading-tight min-h-[60px]">
                      {addon.title}
                    </div>
                  </div>
                  <Button className="w-[168px] h-10 cursor-pointer border museo border-[#699D99] text-[#699D99] rounded-sm bg-white px-5 font-bold hover:bg-teal-50 transition">
                    See example
                  </Button>
                </div>
                {idx !== addons.length - 1 && (
                  <div className="absolute -right-10 top-1/2 -translate-y-1/2 w-[1px] h-[70%] bg-black" />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center">
            <Button className="w-[134px] h-11 cursor-pointer bg-teal-600 museo text-base text-white px-8 rounded-sm font-semibold mt-10 hover:bg-teal-700 ">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingSection;
