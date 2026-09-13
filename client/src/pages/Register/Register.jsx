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

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

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

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      alert(data.message);

      if (data.success) {
        navigate("/login");
      }
    } catch (error) {
      alert("Something went wrong.");
      console.error(error);
    }
  };

  return (
    <section className="min-h-screen bg-[#FFF8F2] flex items-center justify-center p-6">
      
      {/* Single clean card with forced inline padding for 100% reliability */}
      <div 
        style={{ padding: "48px", boxSizing: "border-box" }} 
        className="w-full max-w-[540px] rounded-3xl bg-white shadow-2xl"
      >
        
        {/* Header */}
        <div className="flex flex-col items-center text-center">
          <img
            src={authPizza}
            alt="Pizza"
            className="h-20 w-20 object-contain"
          />

          <h1 className="mt-4 text-3xl font-black tracking-wide text-[#252642]">
            PIZZARIO
          </h1>

          <h2 className="mt-2 text-4xl font-bold text-[#252642]">
            Create Account
          </h2>

          <p className="mt-3 text-base text-gray-500">
            Join Pizzario and start enjoying delicious pizzas delivered to your door.
          </p>
        </div>

        {/* Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          
          {/* Full Name */}
          <div className="w-full">
            <label className="mb-2.5 block text-base font-semibold text-[#252642]">
              Full Name
            </label>
            <div className="flex items-center rounded-xl border border-gray-300 bg-white px-5 py-4 transition duration-300 focus-within:border-red-600 focus-within:ring-2 focus-within:ring-red-600/20">
              <FaUser className="text-gray-400 text-lg shrink-0" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="ml-3.5 w-full min-w-0 bg-transparent text-base text-gray-800 outline-none placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Email Address */}
          <div className="w-full">
            <label className="mb-2.5 block text-base font-semibold text-[#252642]">
              Email Address
            </label>
            <div className="flex items-center rounded-xl border border-gray-300 bg-white px-5 py-4 transition duration-300 focus-within:border-red-600 focus-within:ring-2 focus-within:ring-red-600/20">
              <FaEnvelope className="text-gray-400 text-lg shrink-0" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="ml-3.5 w-full min-w-0 bg-transparent text-base text-gray-800 outline-none placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Password */}
          <div className="w-full">
            <label className="mb-2.5 block text-base font-semibold text-[#252642]">
              Password
            </label>
            <div className="flex items-center rounded-xl border border-gray-300 bg-white px-5 py-4 transition duration-300 focus-within:border-red-600 focus-within:ring-2 focus-within:ring-red-600/20">
              <FaLock className="text-gray-400 text-lg shrink-0" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                className="ml-3.5 w-full min-w-0 bg-transparent text-base text-gray-800 outline-none placeholder:text-gray-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="ml-2 text-gray-400 hover:text-gray-600 focus:outline-none shrink-0"
              >
                {showPassword ? (
                  <FaEyeSlash className="text-lg" />
                ) : (
                  <FaEye className="text-lg" />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="w-full">
            <label className="mb-2.5 block text-base font-semibold text-[#252642]">
              Confirm Password
            </label>
            <div className="flex items-center rounded-xl border border-gray-300 bg-white px-5 py-4 transition duration-300 focus-within:border-red-600 focus-within:ring-2 focus-within:ring-red-600/20">
              <FaLock className="text-gray-400 text-lg shrink-0" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                className="ml-3.5 w-full min-w-0 bg-transparent text-base text-gray-800 outline-none placeholder:text-gray-400"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="ml-2 text-gray-400 hover:text-gray-600 focus:outline-none shrink-0"
              >
                {showConfirmPassword ? (
                  <FaEyeSlash className="text-lg" />
                ) : (
                  <FaEye className="text-lg" />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full rounded-xl bg-red-600 py-4 text-lg font-semibold text-white shadow-md transition duration-300 hover:bg-red-700 active:scale-[0.99] mt-2"
          >
            Create Account
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 border-t border-gray-100 pt-6">
          <p className="text-center text-sm sm:text-base text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-red-600 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>

      </div>
    </section>
  );
}

export default Register;