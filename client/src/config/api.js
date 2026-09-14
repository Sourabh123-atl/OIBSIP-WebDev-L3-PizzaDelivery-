// API Configuration for Pizzario
// Automatically detects environment: local dev vs live production backend
const getApiBaseUrl = () => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }

  // If in browser and running on localhost or 127.0.0.1
  if (
    typeof window !== "undefined" &&
    (window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1")
  ) {
    return "http://localhost:5000/api";
  }

  // Deployed production default (Render live backend)
  return "https://oibsip-webdev-l3-pizzadelivery.onrender.com/api";
};

export const API_BASE_URL = getApiBaseUrl();

// Safe JSON parser helper for fetch responses
export const parseJsonResponse = async (res) => {
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch (err) {
    throw new Error(
      res.ok
        ? "Received non-JSON response from server."
        : `Server error (${res.status}): ${text.slice(0, 100)}`
    );
  }
};

export default API_BASE_URL;
