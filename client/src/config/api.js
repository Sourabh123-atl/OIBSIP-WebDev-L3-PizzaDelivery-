// API Configuration for Pizzario
// In development, if VITE_API_URL is unset, defaults to http://localhost:5000/api
// In production, can use relative path /api or environment variable
export const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.PROD ? "/api" : "http://localhost:5000/api");

export default API_BASE_URL;
