import axios from "./Axios";

export async function postCondolences(id: string, formData: FormData) {
  const res = await axios.post(`/api/condolences/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    requiresAuth: true,
  });
  return res.data;
}

export async function deleteCondolences(id: string) {
  const res = await axios.delete(`/api/condolences/${id}`, {
    requiresAuth: true,
  });
  return res.data;
}

export async function getCondolences(id: string) {
  const res = await axios.get(`/api/condolences/${id}`);
  return res.data;
}
