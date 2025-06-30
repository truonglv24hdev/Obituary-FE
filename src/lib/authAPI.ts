import axios from "./Axios";

export async function signIn(email: string, password: string) {
  const res = await axios.post("/api/sign-in", { email, password });
  return res.data.token;
}

export async function signUp(
  first_name: string,
  email: string,
  password: string
) {
  const res = await axios.post("/api/sign-up", { first_name, email, password });
  return res.data.token;
}

export async function sendLink(email: string) {
  const res = await axios.post("/api/send-link", { email });
  return res.data;
}

export async function sendOtp(email: string, otp: string) {
  const res = await axios.post(`/api/otp/${email}`, { otp });
  return res.data;
}

export async function resetPassword(
  password: string,
  confirmPassword: string,
  email: string
) {
  const res = await axios.post(`/api/reset-password/${email}`, {
    password,
    confirmPassword,
  });
  return res.data;
}
