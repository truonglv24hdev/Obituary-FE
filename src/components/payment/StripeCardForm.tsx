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
          const updatedUser = await premiumMemorial(id, {premium:true});
          if (updatedUser) router.push(`/manage-memorial/${id}`);
          // eslint-disable-next-line
        } catch (error) {
          alert("Failed to update profile. Please try again.");
        }
      }

      if (result.error) {
        throw new Error(result.error.message || "Payment failed");
      }
    } catch (error) {
      alert(
        "❌ " + (error instanceof Error ? error.message : "Payment failed")
      );
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
            <div className="border rounded-md p-3">
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
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1">Expiry date</label>
            <div className="border rounded-md p-3">
              <CardExpiryElement options={inputStyle} />
            </div>
          </div>

          <div>
            <label className="block text-sm mb-1">Security code</label>
            <div className="border rounded-md p-3">
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
            required
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
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
          disabled={loading}
        >
          {loading ? "Processing..." : "Make payment"}
        </Button>
      </form>
    </div>
  );
}
