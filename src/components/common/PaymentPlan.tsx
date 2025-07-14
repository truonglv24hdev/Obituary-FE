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
import Link from "next/link";

const PaymentPlan = ({ id }: { id?: string }) => {
  return (
    <div className="flex museo flex-col md:flex-row justify-center items-center mx-auto gap-5 w-full max-w-[684px] px-4">
  {plans.map((plan) => (
    <Card
      key={plan.title}
      className={`w-full md:w-[332px] h-[547px] rounded-2xl shadow-md flex flex-col relative ${
        plan.highlight
          ? "bg-[#6ea09e] text-white"
          : "bg-[#e6f4ea] text-gray-900"
      }`}
    >
      {plan.highlight && (
        <div className="absolute top-4 left-4 w-[121px] h-[27px] flex justify-center items-center bg-gradient-to-r from-[#92c4c2] to-[#4f7f7e] text-white text-[10px] rounded-full museo font-semibold uppercase tracking-wider">
          {plan.tag}
        </div>
      )}

      <CardHeader className={plan.highlight ? "my-[-8px]" : "my-8"}>
        <CardTitle className={`text-3xl font-bold ${plan.className}`}>
          {plan.price}
        </CardTitle>
        <CardTitle className="text-2xl font-bold">{plan.title}</CardTitle>
      </CardHeader>

      <CardContent>
        <ul
          className={`text-base ${
            plan.highlight ? "" : "mb-30 mt-[-40px]"
          }`}
        >
          {plan.features.map((f, i) => (
            <li key={i} className="flex items-center gap-3 mb-2 ">
              <div className={`w-5 h-5 flex items-center justify-center rounded-full shrink-0 ${plan.highlight ? "bg-white/10" : "bg-[#0D31531A]"}`}>
                <svg
                  className={`w-4 h-4 ${plan.highlight? "text-white" : "text-black"}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <span className="leading-snug museo">{f}</span>
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter className="mb-10">
        <Button
          className={` w-full cursor-pointer md:w-[268px] h-11 rounded-sm font-semibold text-base mx-auto transition-all duration-200 ${
            plan.highlight
              ? "bg-white text-[#6ea09e] hover:bg-gray-100 mt-[-20px] md:mt-[-23px]"
              : "bg-[#6ea09e] text-white hover:bg-[#5a8e8c]"
          }`}
        >
          <Link href={`${plan.href}/${id}`}>{plan.button}</Link>
        </Button>
      </CardFooter>
    </Card>
  ))}
</div>
  );
};

export default PaymentPlan;
