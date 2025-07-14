"use client";

import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { postPayment, premiumMemorial } from "@/lib/paymentAPI";
import { useRouter } from "next/navigation";

export default function StripeCardForm({
  amount,
  id,
}: {
  amount: number;
  id: string;
}) {
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const [formData, setFormData] = useState({
    cardName: "",
    address: "",
  });
  const [sameAsShipping, setSameAsShipping] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    try {
      setLoading(true);

      const { clientSecret } = await postPayment(amount);

      const cardNumber = elements.getElement(CardNumberElement);
      if (!cardNumber) throw new Error("Card number element not found");

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardNumber,
          billing_details: {
            name: formData.cardName,
            address: {
              line1: formData.address,
            },
          },
        },
      });

      if (result.paymentIntent?.status) {
        try {
          const updatedUser = await premiumMemorial(id, { premium: true });
          if (updatedUser) {
            setSuccess(true);
          }
          // eslint-disable-next-line
        } catch (error) {
          setError(true);
        }
      }

      if (result.error) {
        setError(true);
        throw new Error(result.error.message || "Payment failed");
      }
      // eslint-disable-next-line
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const inputStyle = {
    style: {
      base: {
        fontSize: "16px",
        color: "#424770",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#9e2146",
      },
    },
  };

  return (
    <div className="w-full max-w-xl flex flex-col gap-7">
      <h3 className="font-semibold text-2xl museo mb-2">Payment information</h3>
      <form onSubmit={handleSubmit} className="space-y-7">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1">Card number</label>
            <div className="border rounded p-3 bg-[#2935480D]">
              <CardNumberElement options={inputStyle} />
            </div>
          </div>

          <div>
            <label className="block text-sm mb-1">Name on card</label>
            <Input
              name="cardName"
              placeholder="Name on card"
              value={formData.cardName}
              onChange={handleInputChange}
              required
              className="h-[45px] rounded bg-[#2935480D]"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1">Expiry date</label>
            <div className="border rounded p-3 bg-[#2935480D]">
              <CardExpiryElement options={inputStyle} />
            </div>
          </div>

          <div>
            <label className="block text-sm mb-1">Security code</label>
            <div className="border rounded p-3 bg-[#2935480D]">
              <CardCvcElement options={inputStyle} />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm mb-1">Address</label>
          <Input
            name="address"
            placeholder="Billing address"
            value={formData.address}
            onChange={handleInputChange}
            className="h-12 rounded bg-[#2935480D]"
          />
          <div className="flex items-center mt-4 gap-2">
            <Checkbox
              id="shipping"
              checked={sameAsShipping}
              onCheckedChange={(checked) => setSameAsShipping(Boolean(checked))}
            />
            <label htmlFor="shipping" className="text-sm">
              Same as shipping address
            </label>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full h-12 rounded bg-[#699D99] hover:bg-emerald-700 text-white"
          disabled={loading}
        >
          {loading ? "Processing..." : "Make payment"}
        </Button>
      </form>

      {success && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
          <div className="bg-white md:w-[656px] h-[292px] rounded-2xl shadow-xl p-6 w-[90%] flex flex-col gap-7 text-center animate-fadeIn">
            <div className="flex items-center h-15 justify-center text-[60px]">
              ✅
            </div>
            <div className="flex flex-col gap-4">
              <h2 className="text-[32px] font-semibold museo">
                Payment successful!
              </h2>
              <p className="text-black font-light museo">
                Your payment has been successfully completed.
              </p>
            </div>
            <Button
              className="w-full h-11 bg-[#699D99] hover:bg-emerald-700 text-white"
              onClick={() => router.push(`/manage-memorial/${id}`)}
            >
              Continue
            </Button>
          </div>
        </div>
      )}

      {error && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
          <div className="bg-white flex flex-col gap-7 md:w-[656px] h-[292px] rounded-2xl shadow-xl p-8 w-[90%] text-center animate-fadeIn">
            <div className="flex justify-center">
              <div className="w-14 h-14 rounded-full bg-red-500 flex items-center justify-center">
                <span className="text-white text-2xl">✕</span>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <h2 className="text-[32px] font-semibold museo">
                Payment failure!
              </h2>
              <p className="text-base font-light museo">Your payment could not be processed.</p>
            </div>

            <div className=" flex gap-5 mx-auto">
              <Button
                variant="outline"
                className="w-[280px] text-base museo font-light h-11 border rounded border-[#699D99]"
                onClick={() => {
                  router.back();
                }}
              >
                Return
              </Button>
              <Button
                className="w-[280px] h-11 rounded text-base museo font-light bg-[#699D99] hover:bg-emerald-700 text-white"
                onClick={() => setError(false)}
              >
                Retry payment
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
