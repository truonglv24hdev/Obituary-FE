import axios from "./Axios";

export async function getObituaryById(id: string) {
  const res = await axios.get(`/api/obituary/${id}`, {
    requiresAuth: true,
  });
  return res.data;
}

export async function putObituary(id: string, formData: FormData) {
  const res = await axios.put(`/api/obituary/${id}`, formData, {
    requiresAuth: true,
  });
  return res.data;
}
