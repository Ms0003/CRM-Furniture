import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const loginAdmin = async (credentials) => {
  const { data } = await api.post("/auth/login", credentials);
  return data;
};

export const getProducts = async () => {
  const { data } = await api.get("/products");
  return data.products;
};

export const createProduct = async (product) => {
  const { data } = await api.post("/products", product);
  return data.product;
};

export const updateProduct = async (id, product) => {
  const { data } = await api.put(`/products/${id}`, product);
  return data.product;
};

export const deleteProduct = async (id) => {
  const { data } = await api.delete(`/products/${id}`);
  return data;
};

export default api;
