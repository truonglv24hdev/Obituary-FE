import axios from "./Axios";

export async function postMemorial(formData: FormData) {
  const res = await axios.post("/api/memorial", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    requiresAuth: true,
  });
  return res.data;
}

export async function getMemorialByUser(page: number = 1, limit: number = 4) {
  const res = await axios.get(`/api/memorial?page=${page}&limit=${limit}`, {
    requiresAuth: true,
  });
  return res.data;
}

export async function getMemorialById(id: string) {
  const res = await axios.get(`/api/memorial/${id}`);
  return res.data;
}

export async function putMemorial(id: string, formData: FormData) {
  const res = await axios.put(`/api/memorial/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    requiresAuth: true,
  });
  return res.data;
}
