import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import authPizza from "../../assets/auth-pizza.png";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

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

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      alert(data.message);

      if (data.success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        navigate("/");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }
  };
  return (
    <section className="min-h-screen bg-[#FFF8F2] flex items-center justify-center p-6">
      
      {/* Container with generous internal padding and slightly wider max-width */}
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
            Welcome Back
          </h2>

          <p className="mt-3 text-base text-gray-500">
            Login to continue ordering your favorite pizzas.
          </p>
        </div>

        {/* Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          
          {/* Email */}
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
                placeholder="Enter your password"
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

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between text-sm sm:text-base pt-1">
            <label className="flex items-center gap-2.5 text-gray-600 cursor-pointer select-none">
              <input
                type="checkbox"
                className="h-4 w-4 rounded accent-red-600 cursor-pointer"
              />
              Remember Me
            </label>

            <Link
              to="/forgot-password"
              className="font-medium text-red-600 transition hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full rounded-xl bg-red-600 py-4 text-lg font-semibold text-white shadow-md transition duration-300 hover:bg-red-700 active:scale-[0.99]"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 border-t border-gray-100 pt-6">
          <p className="text-center text-sm sm:text-base text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-red-600 hover:underline"
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