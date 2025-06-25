import axios from "./Axios";

export async function postCondolences(id:string,formData: FormData) {
  const res = await axios.post(`/api/condolences/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    requiresAuth: true,
  });
  return res.data;
}