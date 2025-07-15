import axios from "axios";
declare module "axios" {
  export interface AxiosRequestConfig {
    requiresAuth?: boolean;
  }
}

const instance = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (config.requiresAuth && token) {
    config.headers["x-auth-token"] = token;
  }
  return config;
});

export default instance;
