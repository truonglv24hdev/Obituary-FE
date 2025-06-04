// 1. components/payment/StripeCardWrapper.tsx
"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const StripeCardWrapper = ({ children }: { children: React.ReactNode }) => (
  <Elements stripe={stripePromise}>{children}</Elements>
);

export default StripeCardWrapper;
