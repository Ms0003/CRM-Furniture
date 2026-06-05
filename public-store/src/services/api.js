import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5001/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("clientToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getAvailableProducts = async () => {
  const { data } = await api.get("/products", {
    params: {
      available: true,
    },
  });

  return data.products;
};

export const loginClient = async (credentials) => {
  const { data } = await api.post("/auth/login", credentials);
  return data;
};

export const registerClient = async (userData) => {
  const { data } = await api.post("/auth/register", userData);
  return data;
};

export default api;
