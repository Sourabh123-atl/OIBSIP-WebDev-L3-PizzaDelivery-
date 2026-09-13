import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
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
            Create Account
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Join Pizzario and get fast delivery, exclusive deals, and easy ordering.
          </p>
        </div>

        {/* Form */}
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div>
            <label className="mb-2 block text-xs font-bold text-gray-700 uppercase tracking-wider">
              Full Name
            </label>
            <div className="flex items-center rounded-xl border border-gray-200 bg-white px-4 py-3 transition focus-within:border-red-600 focus-within:ring-2 focus-within:ring-red-600/10">
              <FaUser className="text-gray-400 text-sm shrink-0" />
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Sourabh Patel"
                className="ml-3 w-full min-w-0 bg-transparent text-sm text-gray-800 outline-none"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="mb-2 block text-xs font-bold text-gray-700 uppercase tracking-wider">
              Email Address
            </label>
            <div className="flex items-center rounded-xl border border-gray-200 bg-white px-4 py-3 transition focus-within:border-red-600 focus-within:ring-2 focus-within:ring-red-600/10">
              <FaEnvelope className="text-gray-400 text-sm shrink-0" />
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="sourabh@example.com"
                className="ml-3 w-full min-w-0 bg-transparent text-sm text-gray-800 outline-none"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block text-xs font-bold text-gray-700 uppercase tracking-wider">
              Password
            </label>
            <div className="flex items-center rounded-xl border border-gray-200 bg-white px-4 py-3 transition focus-within:border-red-600 focus-within:ring-2 focus-within:ring-red-600/10">
              <FaLock className="text-gray-400 text-sm shrink-0" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="At least 6 characters"
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

          {/* Confirm Password */}
          <div>
            <label className="mb-2 block text-xs font-bold text-gray-700 uppercase tracking-wider">
              Confirm Password
            </label>
            <div className="flex items-center rounded-xl border border-gray-200 bg-white px-4 py-3 transition focus-within:border-red-600 focus-within:ring-2 focus-within:ring-red-600/10">
              <FaLock className="text-gray-400 text-sm shrink-0" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Repeat your password"
                className="ml-3 w-full min-w-0 bg-transparent text-sm text-gray-800 outline-none"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="ml-2 text-gray-400 hover:text-gray-600 cursor-pointer shrink-0"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-red-600 py-3.5 text-base font-bold text-white shadow-md transition duration-300 hover:bg-red-700 active:scale-98 disabled:opacity-50 cursor-pointer mt-2"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 border-t border-gray-100 pt-6 text-center">
          <p className="text-xs sm:text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-bold text-red-600 hover:underline"
            >
              Log In
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Register;