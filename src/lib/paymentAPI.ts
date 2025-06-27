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

export async function premiumMemorial(id: string, data: { premium: boolean }) {
  const res = await axios.put(
    `/api/memorial/${id}`,
    data,
    {
      requiresAuth: true,
    }
  );
  return res.data;
}
