import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaLock, FaEye, FaEyeSlash, FaArrowLeft } from "react-icons/fa";
import authPizza from "../../assets/auth-pizza.png";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../../config/api";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          newPassword: password,
        }),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to reset password.");
      }

      toast.success("Password reset successfully! Please login with your new password.");
      navigate("/login");
    } catch (err) {
      setLoading(false);
      toast.error(err.message || "Something went wrong.");
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
            Reset Password
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Create a strong new password for your Pizzario account.
          </p>
        </div>

        {/* Form */}
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          {/* New Password */}
          <div>
            <label className="mb-2 block text-xs font-bold text-gray-700 uppercase tracking-wider">
              New Password
            </label>
            <div className="flex items-center rounded-xl border border-gray-200 bg-white px-4 py-3.5 transition focus-within:border-red-600 focus-within:ring-2 focus-within:ring-red-600/10">
              <FaLock className="text-gray-400 text-sm shrink-0" />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
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
              Confirm New Password
            </label>
            <div className="flex items-center rounded-xl border border-gray-200 bg-white px-4 py-3.5 transition focus-within:border-red-600 focus-within:ring-2 focus-within:ring-red-600/10">
              <FaLock className="text-gray-400 text-sm shrink-0" />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className="ml-3 w-full min-w-0 bg-transparent text-sm text-gray-800 outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-red-600 py-3.5 text-base font-bold text-white shadow-md transition duration-300 hover:bg-red-700 active:scale-98 disabled:opacity-50 cursor-pointer mt-2"
          >
            {loading ? "Updating Password..." : "Reset Password"}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 border-t border-gray-100 pt-6 text-center">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-xs font-bold text-red-600 hover:underline"
          >
            <FaArrowLeft className="text-[10px]" /> Back to Login
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ResetPassword;