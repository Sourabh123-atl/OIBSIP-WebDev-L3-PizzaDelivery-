import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaShieldAlt,
  FaArrowRight,
  FaArrowLeft,
} from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { adminLogin } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email.trim() || !formData.password) {
      toast.error("Please enter admin email and password.");
      return;
    }

    setLoading(true);
    try {
      const res = await adminLogin(formData.email.trim(), formData.password);
      toast.success(res.message || "Admin access verified. Welcome!");

      const from = location.state?.from?.pathname;
      if (from && from.startsWith("/admin") && from !== "/admin/login") {
        navigate(from);
      } else {
        navigate("/admin/dashboard");
      }
    } catch (error) {
      toast.error(error.message || "Invalid admin credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-gray-950 flex items-center justify-center py-12 px-4 sm:px-6 relative overflow-hidden">
      {/* Dark modern ambient glows */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-red-600/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Main Container */}
      <div className="w-full max-w-[460px] bg-gray-900 rounded-[32px] shadow-2xl p-8 sm:p-10 border border-gray-800 relative z-10">
        {/* Top Header */}
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-600 to-red-800 text-white flex items-center justify-center text-2xl shadow-lg shadow-red-900/40 mb-4">
            <FaShieldAlt />
          </div>

          <span className="text-[11px] font-bold uppercase tracking-widest text-red-400 bg-red-950/80 px-3 py-1 rounded-full border border-red-800/60 mb-2">
            Restricted Access
          </span>

          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Admin Console
          </h1>

          <p className="mt-1.5 text-xs sm:text-sm text-gray-400 max-w-xs">
            Authenticate with verified administrative credentials to access order dispatch and store metrics.
          </p>
        </div>

        {/* Form */}
        <form className="mt-7 space-y-4" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
              Administrator Email
            </label>
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="admin@pizzario.com"
                className="w-full h-12 pl-11 pr-4 rounded-xl bg-gray-800/80 border border-gray-700 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition"
                autoComplete="email"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
              Administrator Password
            </label>
            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••••••"
                className="w-full h-12 pl-11 pr-11 rounded-xl bg-gray-800/80 border border-gray-700 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 p-1 text-sm transition cursor-pointer"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-13 mt-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-lg shadow-red-900/40 transition flex items-center justify-center gap-2 cursor-pointer active:scale-98 disabled:opacity-50"
          >
            {loading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>Enter Admin Console</span>
                <FaArrowRight className="text-xs" />
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-800 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-white transition"
          >
            <FaArrowLeft className="text-[10px]" /> Back to Customer Store
          </Link>
        </div>
      </div>
    </section>
  );
}

export default AdminLogin;
