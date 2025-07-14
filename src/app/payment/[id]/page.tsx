"use client";
import { IconLeft } from "@/components/icons";
import StripeCardWrapper from "@/components/payment/StripeCardWrapper";
import { Button } from "@/components/ui/button";
import { addons } from "@/constants/optional";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { use, useEffect, useState } from "react";
import StripeCardForm from "@/components/payment/StripeCardForm";
import Link from "next/link";

const Page = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const router = useRouter();
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/sign-in");
    }
  }, []);

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const basePrice = 120;
  const totalPrice =
    basePrice +
    addons.reduce((sum, addon) => {
      return selectedAddons.includes(addon.id) ? sum + addon.price : sum;
    }, 0);

  return (
    <div className="font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Left - Order Summary */}
        <div className="bg-[#699D99] text-white p-10 lg:p-20 flex flex-col gap-10 h-auto lg:h-[945px]">
          <div className="flex items-center space-x-4 mb-6">
            <Button
              onClick={() => router.back()}
              className="text-white text-2xl rounded-[0px] h-8 w-10 bg-[#FFFFFF1A] hover:bg-[#5a8e8c]"
            >
              <IconLeft className="w-6 h-6" />
            </Button>
            <Link
              href="/"
              className="flex justify-start items-center text-white"
            >
              <svg
                width="102"
                height="117"
                viewBox="0 0 102 117"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-white w-15 h-[57px]"
              >
                <path
                  d="M69.0234 0C70.6049 3.27828 71 15.025 71 20.4883C70.9997 33.8047 59.6329 41.4877 55.6787 44.0488C53.7275 48.6708 53.2175 54.9221 53.3174 59.1055C55.1488 56.7909 57.5749 54.4152 60.7568 52.2539C67.3816 47.754 77.0447 44.3342 90.9316 44.0762L95.0059 44V52.0479H102.007V105.581L99.5635 105.025C94.3751 103.846 85.1378 103.578 75.7412 104.99C71.9666 105.558 68.2451 106.386 64.7988 107.498C59.2706 109.547 54.2651 112.844 51 116.575C48.0026 113.578 42.0709 109.481 36.9746 107.424C33.594 106.349 29.9552 105.545 26.2656 104.99C16.869 103.578 7.63172 103.846 2.44336 105.025L0 105.581V52.0479H7.00098V44L11.0752 44.0762C24.9621 44.3342 34.6253 47.754 41.25 52.2539C44.4377 54.4192 46.8658 56.8004 48.6982 59.1191C47.4356 53.397 44.4422 48.0028 42.8291 46.6094C24.6413 39.6436 26.0243 28.6831 26.0244 25.0977C42.3339 25.61 45.7938 37.3904 46.7822 44.0488L49.748 46.6094V42.1338C49.748 40.3462 49.4701 38.5724 49.1016 36.8232C48.2848 32.9468 47.7937 28.0018 48.1377 23.5771C48.3523 20.8166 49.2968 18.1587 50.8291 15.8525C56.1322 7.8718 64.8516 2.08716 69.0234 0ZM91.0059 48.0752C64.5325 48.5671 55.5264 61.0472 53.0078 67.4736V106.868L53.167 106.871C59.2308 99.4458 71.6771 90.5889 91.0059 91.5752V48.0752ZM11.001 91.5752C30.2689 90.592 42.6964 99.391 48.7812 106.802L48.999 106.805V67.4736C46.4805 61.0472 37.4745 48.5671 11.001 48.0752V91.5752ZM4 100.669C9.89163 99.7729 18.3887 99.7618 26.8594 101.035C31.5763 101.744 36.4011 102.869 40.8271 104.522C34.5567 99.4157 24.7847 94.8774 11.2051 95.5703L7.00098 95.7842V56.0479H4V100.669ZM95.0059 95.7842L90.8018 95.5703C77.2221 94.8774 67.4501 99.4157 61.1797 104.522C65.6058 102.869 70.4305 101.744 75.1475 101.035C83.6182 99.7618 92.1152 99.7729 98.0068 100.669V56.0479H95.0059V95.7842ZM31 30C32.1 33.0909 35.8403 39.8181 42 42C40.7166 38.7273 36.7197 31.7456 31 30ZM66 9C55.9999 14 51.9999 21.5 52.5 33L59 22L56.5 38C66.4472 28.0002 67.9999 19.9998 66 9Z"
                  fill="white"
                />
              </svg>
              <p className="w-20 text-2xl museo font-medium">
                Tribute Chapters
              </p>
            </Link>
          </div>

          <div className="flex flex-col gap-10">
            <h2 className="text-lg font-semibold">Order Summary</h2>
            <div className="space-y-5 text-base font-light">
              <div className="flex justify-between">
                <span>Premium price:</span>
                <span>$120.00</span>
              </div>
              {addons.map(
                (addon) =>
                  selectedAddons.includes(addon.id) && (
                    <div className="flex justify-between" key={addon.id}>
                      <span>{addon.title}:</span>
                      <span>${addon.price.toFixed(2)}</span>
                    </div>
                  )
              )}
              <hr className="border-white/30 my-2" />
              <div className="flex justify-between text-base font-light">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <h3 className="text-[32px] font-semibold mt-5 text-center">
            Optional Add-ons
          </h3>

          {/* Cho xuống hàng ở mobile */}
          <div className="flex flex-col md:flex-row gap-5">
            {addons.map((addon, idx) => (
              <div
                key={addon.id}
                className="flex-1 flex justify-center relative items-start"
              >
                <div className="w-[194px] h-[240px] rounded-xl p-5 flex flex-col justify-between">
                  <div className="flex flex-col">
                    <div className="mb-2">{addon.icon()}</div>
                    <div className="whitespace-pre-line w-50 text-xl font-light leading-tight">
                      {addon.title}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    className="h-11 border border-white text-white px-5 font-bold hover:bg-teal-50 transition"
                    onClick={() => toggleAddon(addon.id)}
                  >
                    {selectedAddons.includes(addon.id)
                      ? "Remove"
                      : addon.payment}
                  </Button>
                </div>
                {idx !== addons.length - 1 && (
                  <div className="hidden md:block absolute right-0 w-[1px] h-[70%] top-[15%] bg-white" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right - Payment Form */}
        <div className="bg-white w-full lg:w-[583px] p-13 flex flex-col gap-15">
          <div className="flex flex-col gap-3 w-full max-w-[356px] h-auto mb-6">
            <h2 className="text-[32px] sm:text-[40px] font-medium text-slate-800 mb-2">
              Pay with card
            </h2>
            <p className="text-[#293548] text-xl font-light">
              Complete your purchase by providing your payment details
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <h3 className="font-semibold museo text-2xl">Payment method</h3>
            <div className="flex flex-wrap gap-5">
              <Button variant="outline" className="rounded h-12 bg-[#2935480D]">
                Credit or debit card
              </Button>
              <Button variant="outline" className="rounded h-12 bg-[#2935480D]">
                G Pay
              </Button>
              <Button variant="outline" className="rounded h-12 bg-[#2935480D]">
                PayPal
              </Button>
              <Button variant="outline" className="rounded h-12 bg-[#2935480D]">
                Apple Pay
              </Button>
            </div>

            <StripeCardWrapper>
              <StripeCardForm amount={totalPrice} id={id} />
            </StripeCardWrapper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
