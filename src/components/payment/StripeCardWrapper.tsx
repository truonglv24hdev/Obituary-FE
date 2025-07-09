"use client";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import type { StripeElementsOptions } from "@stripe/stripe-js";
import { ReactNode } from "react";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

// ✅ Khai báo kiểu cho options để tránh lỗi
const options: StripeElementsOptions = {
  locale: "auto",
  appearance: {
    theme: "stripe",
  },
};

const StripeCardWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <Elements stripe={stripePromise} options={options}>
      {children}
    </Elements>
  );
};

export default StripeCardWrapper;
