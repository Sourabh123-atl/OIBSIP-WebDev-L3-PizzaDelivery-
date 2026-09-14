import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Protects customer account routes (e.g. /my-orders)
export function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFF8F2]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

// Protects administrative routes (e.g. /admin/dashboard, /admin/orders)
export function AdminRoute({ children }) {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  // If not logged in at all, redirect to the separate /admin/login page
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  // If logged in as a regular user, deny access and send to home store
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
