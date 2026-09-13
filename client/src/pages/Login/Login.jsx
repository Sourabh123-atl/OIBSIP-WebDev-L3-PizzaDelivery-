import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaShieldAlt,
  FaArrowRight,
} from "react-icons/fa";
import authPizza from "../../assets/auth-pizza.png";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

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
      toast.error("Please enter email and password.");
      return;
    }

    setLoading(true);
    try {
      const res = await login(formData.email, formData.password);
      toast.success(res.message || "Welcome back to Pizzario! 🍕");

      const from = location.state?.from?.pathname;
      if (from) {
        navigate(from);
      } else if (res.user?.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      toast.error(error.message || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fillDemoAdmin = () => {
    setFormData({
      email: "admin@pizzario.com",
      password: "admin123",
    });
    toast.info("Filled Admin demo credentials! Click Login.");
  };

  return (
    <section className="min-h-screen bg-[#FFF8F2] flex items-center justify-center py-12 px-4 sm:px-6 relative overflow-hidden">
      {/* Decorative background glows */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-red-200/40 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-orange-200/40 rounded-full blur-3xl pointer-events-none"></div>

      {/* Main Container */}
      <div className="w-full max-w-[480px] bg-white rounded-[32px] shadow-xl p-8 sm:p-10 border border-orange-100 relative z-10 transition-all duration-300">
        
        {/* Header with Logo */}
        <div className="flex flex-col items-center text-center">
          <Link to="/" className="group inline-block mb-3">
            <div className="w-20 h-20 rounded-2xl bg-orange-50/70 p-2 flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:bg-orange-100/70">
              <img
                src={authPizza}
                alt="Pizza"
                className="w-16 h-16 object-contain"
              />
            </div>
          </Link>

          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[#252642]">
            PIZZA<span className="text-red-600">RIO</span>
          </h1>

          <h2 className="mt-1 text-xl sm:text-2xl font-bold text-gray-800">
            Welcome Back
          </h2>

          <p className="mt-1.5 text-sm text-gray-500 max-w-sm">
            Sign in to order your favorite pizzas, track deliveries, and manage your account.
          </p>
        </div>

        {/* Demo Admin Shortcut Banner */}
        <div className="mt-6 p-3.5 bg-gradient-to-r from-red-50 to-orange-50 border border-red-100 rounded-2xl flex items-center justify-between gap-2 shadow-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-red-600 text-white flex items-center justify-center text-xs shadow-xs">
              <FaShieldAlt />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-800 leading-tight">Admin Demo</p>
              <p className="text-[11px] text-gray-500">One-click evaluation</p>
            </div>
          </div>

          <button
            type="button"
            onClick={fillDemoAdmin}
            className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-red-600 hover:text-white border border-red-200 text-xs font-bold text-red-600 transition-all duration-200 shadow-xs cursor-pointer active:scale-95"
          >
            Auto-fill
          </button>
        </div>

        {/* Form */}
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          {/* Email Input */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">
              Email Address
            </label>
            <div className="auth-input-group">
              <FaEnvelope className="auth-input-icon" />
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="auth-input"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600">
                Password
              </label>
              <Link
                to="/forgot-password"
                className="text-xs font-bold text-red-600 hover:text-red-700 hover:underline transition"
              >
                Forgot?
              </Link>
            </div>

            <div className="auth-input-group">
              <FaLock className="auth-input-icon" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="auth-input"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 text-gray-400 hover:text-gray-600 cursor-pointer p-1 text-sm transition"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Remember Me Checkbox */}
          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2.5 text-xs font-medium text-gray-600 cursor-pointer select-none">
              <input
                type="checkbox"
                defaultChecked
                className="w-4 h-4 rounded border-gray-300 text-red-600 accent-red-600 cursor-pointer"
              />
              Remember my session
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-13 mt-2 rounded-2xl bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-bold text-base shadow-lg shadow-red-500/25 hover:shadow-red-500/35 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer active:scale-98 disabled:opacity-50"
          >
            {loading ? (
              <span>Signing in...</span>
            ) : (
              <>
                <span>Sign In to Account</span>
                <FaArrowRight className="text-xs" />
              </>
            )}
          </button>
        </form>

        {/* Card Footer */}
        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <p className="text-sm text-gray-500">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-bold text-red-600 hover:text-red-700 hover:underline transition"
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Login;