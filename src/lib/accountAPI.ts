import axios from "./Axios";

export async function getProfile() {
  const res = await axios.get("/api/user/profile", { requiresAuth: true });
  return res.data;
}

export async function updateProfile(data: {
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
  address?: string;
  country?: string;
  code?: string;
  premium?: boolean;
  deleted?: boolean;
}) {
  const res = await axios.put(
    "/api/user",
    {
      ...data,
      ...(data.password !== undefined && { password: data.password }),
    },
    {
      requiresAuth: true,
    }
  );
  return res.data;
}

export async function updateUserByAdmin(id: string) {
  const res = await axios.put(`/api/user/${id}`, {
    requiresAuth: true,
  });
  return res.data;
}

export async function updateUser(
  id: string,
  data: {
    first_name?: string;
    last_name?: string;
    email?: string;
    password?: string;
    address?: string;
    country?: string;
    code?: string;
    premium?: boolean;
    deleted?: boolean;
  }
) {
  const res = await axios.put(`/api/user/edit/${id}`, {...data} ,{
    requiresAuth: true,
  });
  return res.data;
}

export async function getUserByAdmin(id: string) {
  const res = await axios.get(`/api/user/${id}`, {
    requiresAuth: true,
  });
  return res.data;
}

export async function getAllUser(user?:string) {
  const res = await axios.get("/api/user",{
    params:{
      user
    }
  });
  return res.data;
}
