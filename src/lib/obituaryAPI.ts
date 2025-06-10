import axios from "./Axios";

export async function getObituaryById(id: string) {
  const res = await axios.get(`/api/obituary/${id}`, {
    requiresAuth: true,
  });
  return res.data;
}
