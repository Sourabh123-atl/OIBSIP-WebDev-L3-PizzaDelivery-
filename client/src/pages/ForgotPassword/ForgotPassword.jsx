import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaArrowLeft } from "react-icons/fa";
import authPizza from "../../assets/auth-pizza.png";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../../config/api";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

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

      const data = await res.json();
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
            Forgot Password
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Enter your email and we'll send you instructions to reset your password.
          </p>
        </div>

        {submitted ? (
          <div className="mt-8 text-center space-y-4">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto text-2xl">
              ✓
            </div>
            <h3 className="text-lg font-bold text-gray-800">Check Your Inbox</h3>
            <p className="text-xs text-gray-500">
              We've processed your reset request for <strong>{email}</strong>.
            </p>
            <Link
              to="/reset-password"
              className="block w-full py-3.5 rounded-xl bg-red-600 text-white font-bold text-sm shadow-md hover:bg-red-700 transition"
            >
              Proceed to Set New Password
            </Link>
          </div>
        ) : (
          <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="mb-2 block text-xs font-bold text-gray-700 uppercase tracking-wider">
                Email Address
              </label>
              <div className="flex items-center rounded-xl border border-gray-200 bg-white px-4 py-3.5 transition focus-within:border-red-600 focus-within:ring-2 focus-within:ring-red-600/10">
                <FaEnvelope className="text-gray-400 text-base shrink-0" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your registered email"
                  className="ml-3 w-full min-w-0 bg-transparent text-sm text-gray-800 outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-red-600 py-3.5 text-base font-bold text-white shadow-md transition duration-300 hover:bg-red-700 active:scale-98 disabled:opacity-50 cursor-pointer"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>
        )}

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

export default ForgotPassword;