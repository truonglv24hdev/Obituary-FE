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

export async function getMemorialByUser() {
  const res = await axios.get("/api/memorial", { requiresAuth: true });
  return res.data;
}
