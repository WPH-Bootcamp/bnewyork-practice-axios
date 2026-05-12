import axios from "axios";

export const api = axios.create({
  baseURL: "https://be-blg-production.up.railway.app",
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer {token}`;
  }

  return config;
});
