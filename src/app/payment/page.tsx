"use client";
import { IconLeft } from "@/components/icons";
import StripeCardWrapper from "@/components/payment/StripeCardWrapper";
import { Button } from "@/components/ui/button";
import { addons } from "@/constants/optional";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import StripeCardForm from "@/components/payment/StripeCardForm";
import Link from "next/link";

const Page = () => {
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
    <div className="grid grid-cols-1 lg:grid-cols-2 font-sans">
      {/* Left - Order Summary */}
      <div className="bg-[#699D99] text-white p-8 flex h-[920px] flex-col gap-10">
        <div className="flex items-center space-x-2 mb-6">
          <Button
            onClick={() => router.back()}
            className="text-white text-2xl rounded-[0px] h-6 w-10 bg-[#FFFFFF1A] hover:bg-[#5a8e8c]"
          >
            <IconLeft />
          </Button>
          <Link href={"/"}>
            <Image src={"/img/image.png"} alt="logo" width={142} height={57} />
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

        <h3 className="text-[32px] font-semibold mb-6 mt-8 text-center">
          Optional Add-ons
        </h3>
        <div className="flex flex-col md:flex-row">
          {addons.map((addon, idx) => (
            <div
              key={addon.id}
              className="flex-1 flex justify-center relative items-start"
            >
              <div className="w-[194px] h-[240px] rounded-xl p-5 flex flex-col justify-between ">
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
                  {selectedAddons.includes(addon.id) ? "Remove" : addon.payment}
                </Button>
              </div>
              {idx !== addons.length - 1 && (
                <div className="absolute right-0 w-[1px] h-[70%] top-[15%] bg-white" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Right - Payment Form */}
      <div className="bg-white w-[680px] p-10 flex flex-col gap-15">
        <div className="flex flex-col gap-3 w-[356px] h-28">
          <h2 className="text-[40px] font-medium text-slate-800 mb-2">
            Pay with card
          </h2>
          <p className="text-slate-500 text-xl font-light">
            Complete your purchase by providing your payment details
          </p>
        </div>

        <div className="flex flex-col gap-10">
          <h3 className="font-semibold text-lg ">Payment method</h3>
          <div className="flex gap-5 ">
            <Button variant="outline" className="w-[174px]">
              Credit or debit card
            </Button>
            <Button variant="outline" className="w-[116px]">
              G Pay
            </Button>
            <Button variant="outline" className="w-[116px]">
              PayPal
            </Button>
            <Button variant="outline" className="w-[116px]">
              Apple Pay
            </Button>
          </div>

          <StripeCardWrapper>
            <StripeCardForm amount={totalPrice} />
          </StripeCardWrapper>
        </div>
      </div>
    </div>
  );
};

export default Page;
