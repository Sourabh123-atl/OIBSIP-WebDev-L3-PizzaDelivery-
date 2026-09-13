import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaShieldAlt,
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
    <section className="min-h-screen bg-[#FFF8F2] flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-[500px] rounded-3xl bg-white shadow-xl p-8 sm:p-12 border border-orange-50">
        {/* Header */}
        <div className="flex flex-col items-center text-center">
          <Link to="/" className="group">
            <img
              src={authPizza}
              alt="Pizza"
              className="h-20 w-20 object-contain transition group-hover:rotate-12 duration-300"
            />
          </Link>

          <h1 className="mt-4 text-3xl font-black tracking-wide text-[#252642]">
            PIZZA<span className="text-red-600">RIO</span>
          </h1>

          <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-[#252642]">
            Welcome Back
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Sign in to manage orders, customize pizzas, and explore great deals.
          </p>
        </div>

        {/* Demo Credentials Helper Pill */}
        <div className="mt-6 p-3 bg-amber-50 border border-amber-200 rounded-2xl flex items-center justify-between text-xs text-amber-900">
          <div className="flex items-center gap-2">
            <FaShieldAlt className="text-amber-600 text-sm" />
            <span>Need Admin access?</span>
          </div>
          <button
            type="button"
            onClick={fillDemoAdmin}
            className="font-bold text-red-600 hover:underline cursor-pointer bg-white px-3 py-1 rounded-lg shadow-xs border border-amber-200"
          >
            Use Demo Admin
          </button>
        </div>

        {/* Form */}
        <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <label className="mb-2 block text-xs font-bold text-gray-700 uppercase tracking-wider">
              Email Address
            </label>
            <div className="flex items-center rounded-xl border border-gray-200 bg-white px-4 py-3.5 transition focus-within:border-red-600 focus-within:ring-2 focus-within:ring-red-600/10">
              <FaEnvelope className="text-gray-400 text-base shrink-0" />
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="ml-3 w-full min-w-0 bg-transparent text-sm text-gray-800 outline-none"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block text-xs font-bold text-gray-700 uppercase tracking-wider">
              Password
            </label>
            <div className="flex items-center rounded-xl border border-gray-200 bg-white px-4 py-3.5 transition focus-within:border-red-600 focus-within:ring-2 focus-within:ring-red-600/10">
              <FaLock className="text-gray-400 text-base shrink-0" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="ml-3 w-full min-w-0 bg-transparent text-sm text-gray-800 outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="ml-2 text-gray-400 hover:text-gray-600 cursor-pointer shrink-0"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center gap-2 text-gray-600 cursor-pointer select-none">
              <input
                type="checkbox"
                defaultChecked
                className="h-3.5 w-3.5 rounded accent-red-600 cursor-pointer"
              />
              Remember Me
            </label>

            <Link
              to="/forgot-password"
              className="font-bold text-red-600 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-red-600 py-3.5 text-base font-bold text-white shadow-md transition duration-300 hover:bg-red-700 active:scale-98 disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 border-t border-gray-100 pt-6 text-center">
          <p className="text-xs sm:text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-bold text-red-600 hover:underline"
            >
              Create an Account
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Login;