import axios from "./Axios";

export async function postPayment(amount: number) {
  const res = await axios.post(
    "/api/payment/create-payment-intent",
    { amount },
    {
      requiresAuth: true,
    }
  );
  return res.data;
}
