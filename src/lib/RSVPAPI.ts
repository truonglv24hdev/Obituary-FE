import axios from "./Axios";

export async function createRSVP(formData: FormData) {
  const res = await axios.post(`/api/rsvp`, formData, {
    requiresAuth: true,
  });
  return res.data;
}
