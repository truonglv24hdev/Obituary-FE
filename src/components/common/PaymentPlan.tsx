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

const PaymentPlan = () => {
  return (
    <div className="flex museo md:flex-row justify-center items-center mx-auto gap-5 w-[684px] h-[547px]">
      {plans.map((plan) => (
        <Card
          className={`w-[332px] h-[547px] rounded-2xl shadow-md flex flex-col relative gap-5 ${
            plan.highlight
              ? "bg-[#6ea09e] text-white"
              : "bg-[#e6f4ea] text-gray-900"
          }`}
          key={plan.title}
        >
          {" "}
          {plan.highlight && (
            <div className="absolute top-4 left-4 w-[121px] h-[27px] flex justify-center items-center bg-gradient-to-r from-[#92c4c2] to-[#4f7f7e] text-white text-[10px] rounded-full museo font-semibold uppercase tracking-wider">
              {plan.tag}
            </div>
          )}
          <CardHeader className={plan.highlight ? "" : "my-10"}>
            <CardTitle className={`text-3xl font-bold mb-1 ${plan.className}`}>
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
              className={`w-[268px] h-11 mb-5 rounded-sm font-semibold text-base mx-auto transition-all duration-200 ${
                plan.highlight
                  ? "bg-white text-[#6ea09e] hover:bg-gray-100"
                  : "bg-[#6ea09e] text-white hover:bg-[#5a8e8c]"
              }`}
            >
              <Link href={plan.href}>{plan.button}</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default PaymentPlan;
