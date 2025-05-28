import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { plans } from "@/constants/pricing";
import { IconBook, IconQR } from "@/components/icons";

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
    <div className="h-[1305px] bg-white flex items-center justify-center">
      <div className="w-[892px] h-[1145px] tracking-normal ">
        <div className=" w-[716px] h-30 mx-auto flex flex-col gap-4 mb-10">
          <h2 className=" h-12 font-medium text-[40px] leading-12 text-center">
            Pricing
          </h2>
          <ul className="list-disc list-inside space-y-2 text-base leading-5 font-light text-center">
            <li>Start now for free. No credit card required</li>
            <li>Upgrade to premium plan at anytime</li>
          </ul>
        </div>
        <div className="flex md:flex-row justify-center items-center mx-auto gap-5 w-[684px] h-[547px]">
          {plans.map((plan,) => (
            <Card
              className={`w-[332px] h-[547px] rounded-2xl shadow-md flex flex-col relative ${
                plan.highlight
                  ? "bg-[#6ea09e] text-white"
                  : "bg-[#e6f4ea] text-gray-900"
              }`}
              key={plan.title}
            >
              {" "}
              {plan.highlight && (
                <div className="w-[121px] bg-white text-[#6ea09e] text-[10px] px-3 rounded-full font-semibold shadow-sm uppercase tracking-wider">
                  {plan.tag}
                </div>
              )}
              <CardHeader className={plan.highlight ? "" : "my-10"}>
                <CardTitle className="text-3xl font-bold mb-1 mt-2">
                  {plan.price}
                </CardTitle>
                <CardTitle className="text-2xl font-bold mb-4">
                  {plan.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className={`mb-8 text-base ${plan.highlight ? "" : ""}`}>
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <svg
                        className={`w-5 h-5 ${
                          plan.highlight ? "text-white" : "text-[#7ba7a1]"
                        } `}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className={`w-full py-2 rounded-lg font-semibold text-base mt-auto transition-all duration-200 ${
                    plan.highlight
                      ? "bg-white text-[#6ea09e] hover:bg-gray-100"
                      : "bg-[#6ea09e] text-white hover:bg-[#5a8e8c]"
                  }`}
                >
                  {plan.button}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        <h3 className="text-xl font-semibold mb-6 mt-8 text-center">
          Optional Add-ons
        </h3>
        <div className="flex flex-col md:flex-row justify-center mb-20">
          {addons.map((addon, idx) => (
            <div
              key={idx}
              className="flex-1 flex justify-center relative items-start"
            >
              <div className="w-[194px] h-[240px] bg-white rounded-xl p-5 flex flex-col justify-between ">
                <div className="flex flex-col ">
                  <div className="text-[20px] font-bold mb-2">
                    {addon.price}
                  </div>
                  <div className="mb-2">{addon.icon}</div>
                  <div className="whitespace-pre-line text-[16px] font-light leading-tight">
                    {addon.title}
                  </div>
                </div>
                <Button className="border border-[#699D99] text-[#699D99] bg-white px-5 font-bold hover:bg-teal-50 transition mt-4">
                  See example
                </Button>
              </div>
              {idx !== addons.length - 1 && (
                <div className="absolute right-0 w-[1px] h-[70%] top-[15%] bg-black" />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <Button className="bg-teal-600 text-white px-8 rounded-md font-semibold  hover:bg-teal-700 ">
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PricingSection;
