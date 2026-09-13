import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaLock, FaEye, FaEyeSlash, FaArrowLeft, FaArrowRight } from "react-icons/fa";
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

      toast.success("Password reset successfully! Please login.");
      navigate("/login");
    } catch (err) {
      setLoading(false);
      toast.error(err.message || "Something went wrong.");
    }
  };

  return (
    <section className="min-h-screen bg-[#FFF8F2] flex items-center justify-center py-12 px-4 sm:px-6 relative overflow-hidden">
      {/* Glows */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-red-200/40 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-orange-200/40 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-[480px] bg-white rounded-[32px] shadow-xl p-8 sm:p-10 border border-orange-100 relative z-10">
        <div className="flex flex-col items-center text-center">
          <Link to="/" className="group inline-block mb-3">
            <div className="w-20 h-20 rounded-2xl bg-orange-50/70 p-2 flex items-center justify-center transition-all duration-300 group-hover:scale-105">
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
            Reset Password
          </h2>

          <p className="mt-1.5 text-sm text-gray-500 max-w-sm">
            Create a secure new password for your Pizzario account.
          </p>
        </div>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">
              New Password
            </label>
            <div className="auth-input-group">
              <FaLock className="auth-input-icon" />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">
              Confirm New Password
            </label>
            <div className="auth-input-group">
              <FaLock className="auth-input-icon" />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
                className="auth-input"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-13 mt-4 rounded-2xl bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-bold text-base shadow-lg shadow-red-500/25 transition flex items-center justify-center gap-2 cursor-pointer active:scale-98 disabled:opacity-50"
          >
            {loading ? (
              <span>Updating Password...</span>
            ) : (
              <>
                <span>Save New Password</span>
                <FaArrowRight className="text-xs" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-xs font-bold text-red-600 hover:underline"
          >
            <FaArrowLeft className="text-[10px]" /> Back to Sign In
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ResetPassword;