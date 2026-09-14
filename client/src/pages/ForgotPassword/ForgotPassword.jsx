import { useState } from "react";
import { Link } from "react-router-dom";
import { FaEnvelope, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import authPizza from "../../assets/auth-pizza.png";
import { toast } from "react-toastify";
import { API_BASE_URL, parseJsonResponse } from "../../config/api";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Please enter your registered email address.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await parseJsonResponse(res);
      setLoading(false);

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to process request.");
      }

      setSubmitted(true);
      toast.success(data.message || "Reset token generated!");
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
            Forgot Password
          </h2>

          <p className="mt-1.5 text-sm text-gray-500 max-w-sm">
            Enter your email and we'll help you securely reset your password.
          </p>
        </div>

        {submitted ? (
          <div className="mt-8 text-center space-y-4">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mx-auto text-2xl font-bold">
              ✓
            </div>
            <h3 className="text-lg font-bold text-gray-800">Reset Link Ready</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              We've processed your reset request for <strong>{email}</strong>.
            </p>
            <Link
              to="/reset-password"
              className="w-full h-12 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2"
            >
              <span>Set New Password</span>
              <FaArrowRight className="text-xs" />
            </Link>
          </div>
        ) : (
          <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">
                Registered Email
              </label>
              <div className="auth-input-group">
                <FaEnvelope className="auth-input-icon" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="auth-input"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-13 mt-2 rounded-2xl bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-bold text-base shadow-lg shadow-red-500/25 transition flex items-center justify-center gap-2 cursor-pointer active:scale-98 disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>
        )}

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

export default ForgotPassword;