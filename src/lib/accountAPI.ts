import axios from "./Axios";

export async function getProfile() {
  const res = await axios.get("/api/user/profile", { requiresAuth: true });
  return res.data;
}

export async function updateProfile(
  first_name?: string,
  last_name?: string,
  email?: string,
  password?: string,
  address?: string,
  country?: string,
  code?: string
) {
  const res = await axios.put(
    "/api/user",
    {
      first_name,
      last_name,
      email,
      ...(password !== undefined && { password }),
      address,
      country,
      code,
    },
    {
      requiresAuth: true,
    }
  );
  return res.data;
}
