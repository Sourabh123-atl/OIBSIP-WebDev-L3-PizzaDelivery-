import { createContext, useContext, useState, useEffect } from "react";
import { API_BASE_URL, parseJsonResponse } from "../config/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("pizzario_user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (e) {
      return null;
    }
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem("pizzario_token") || null;
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user && token) {
      localStorage.setItem("pizzario_user", JSON.stringify(user));
      localStorage.setItem("pizzario_token", token);
    } else {
      localStorage.removeItem("pizzario_user");
      localStorage.removeItem("pizzario_token");
    }
  }, [user, token]);

  // Customer Login (Hits /api/auth/login)
  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await parseJsonResponse(res);
      setLoading(false);

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Invalid customer credentials.");
      }

      setUser(data.user);
      setToken(data.token);
      return { success: true, user: data.user, message: data.message };
    } catch (err) {
      setLoading(false);
      throw err;
    }
  };

  // Dedicated Admin Login (Hits /api/admin/login)
  const adminLogin = async (email, password) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await parseJsonResponse(res);
      setLoading(false);

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Invalid admin credentials.");
      }

      if (data.user?.role !== "admin") {
        throw new Error("Access denied. Admin role required.");
      }

      setUser(data.user);
      setToken(data.token);
      return { success: true, user: data.user, message: data.message };
    } catch (err) {
      setLoading(false);
      throw err;
    }
  };

  // Customer Registration (Hits /api/auth/register)
  const register = async (name, email, password) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await parseJsonResponse(res);
      setLoading(false);

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Registration failed.");
      }

      setUser(data.user);
      setToken(data.token);
      return { success: true, user: data.user, message: data.message };
    } catch (err) {
      setLoading(false);
      throw err;
    }
  };

  // Universal Logout
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("pizzario_user");
    localStorage.removeItem("pizzario_token");
  };

  const isAuthenticated = Boolean(user && token);
  const isAdmin = Boolean(user && user.role === "admin");

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        isAdmin,
        loading,
        login,
        adminLogin,
        register,
        logout,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;
