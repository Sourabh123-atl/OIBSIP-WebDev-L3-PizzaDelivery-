import { Link } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa";
import authPizza from "../../assets/auth-pizza.png";

function ForgotPassword() {
  return (
    <section className="min-h-screen bg-[#FFF8F2] flex items-center justify-center p-6">

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
            Forgot Password
          </h2>

          <p className="mt-3 text-base text-gray-500">
            Enter your email address and we'll send you a password reset link.
          </p>

        </div>

        {/* Form */}
        <form
          className="mt-8"
          onSubmit={(e) => e.preventDefault()}
        >

          <div>

            <label className="mb-2.5 block text-base font-semibold text-[#252642]">
              Email Address
            </label>

            <div className="flex items-center rounded-xl border border-gray-300 bg-white px-5 py-4 transition-all duration-300 focus-within:border-red-600 focus-within:ring-2 focus-within:ring-red-600/20">

              <FaEnvelope className="text-lg text-gray-400 shrink-0" />

              <input
                type="email"
                placeholder="Enter your email"
                className="ml-3.5 w-full min-w-0 bg-transparent text-base text-gray-800 outline-none placeholder:text-gray-400"
              />

            </div>

          </div>

          {/* Hardcoded spacing directly above button */}
          <div style={{ marginTop: "15px" }}>
            <button
              type="submit"
              className="w-full rounded-xl bg-red-600 py-4 text-lg font-semibold text-white shadow-md transition duration-300 hover:bg-red-700 active:scale-[0.99] cursor-pointer"
            >
              Send Reset Link
            </button>
          </div>

        </form>

        {/* Footer */}
        <div className="mt-8 border-t border-gray-100 pt-6">

          <p className="text-center text-sm sm:text-base text-gray-600">

            Remember your password?{" "}

            <Link
              to="/login"
              className="font-semibold text-red-600 hover:underline"
            >
              Back to Login
            </Link>

          </p>

        </div>

      </div>

    </section>
  );
}

export default ForgotPassword;