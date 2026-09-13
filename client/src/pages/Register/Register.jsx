import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaArrowRight,
} from "react-icons/fa";
import authPizza from "../../assets/auth-pizza.png";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.password) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const res = await register(
        formData.name.trim(),
        formData.email.trim(),
        formData.password
      );
      toast.success(res.message || "Account created successfully! Welcome to Pizzario 🍕");
      navigate("/");
    } catch (error) {
      toast.error(error.message || "Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-[#FFF8F2] flex items-center justify-center py-12 px-4 sm:px-6 relative overflow-hidden">
      {/* Decorative background glows */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-red-200/40 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-orange-200/40 rounded-full blur-3xl pointer-events-none"></div>

      {/* Card */}
      <div className="w-full max-w-[480px] bg-white rounded-[32px] shadow-xl p-8 sm:p-10 border border-orange-100 relative z-10">
        
        {/* Header */}
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
            Create Account
          </h2>

          <p className="mt-1.5 text-sm text-gray-500 max-w-sm">
            Join Pizzario for fast ordering, live tracking, and exclusive discounts.
          </p>
        </div>

        {/* Form */}
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">
              Full Name
            </label>
            <div className="auth-input-group">
              <FaUser className="auth-input-icon" />
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Sourabh Patel"
                className="auth-input"
              />
            </div>
          </div>

          {/* Email */}
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
                placeholder="sourabh@example.com"
                className="auth-input"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">
              Password
            </label>
            <div className="auth-input-group">
              <FaLock className="auth-input-icon" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="At least 6 characters"
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

          {/* Confirm Password */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">
              Confirm Password
            </label>
            <div className="auth-input-group">
              <FaLock className="auth-input-icon" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Repeat password"
                className="auth-input"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 text-gray-400 hover:text-gray-600 cursor-pointer p-1 text-sm transition"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-13 mt-4 rounded-2xl bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-bold text-base shadow-lg shadow-red-500/25 hover:shadow-red-500/35 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer active:scale-98 disabled:opacity-50"
          >
            {loading ? (
              <span>Creating Account...</span>
            ) : (
              <>
                <span>Complete Registration</span>
                <FaArrowRight className="text-xs" />
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <p className="text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-bold text-red-600 hover:text-red-700 hover:underline transition"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Register;