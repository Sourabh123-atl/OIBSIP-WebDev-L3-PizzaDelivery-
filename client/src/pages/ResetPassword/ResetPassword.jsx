import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import authPizza from "../../assets/auth-pizza.png";

function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
            Reset Password
          </h2>

          <p className="mt-3 text-base text-gray-500">
            Create a new password for your account.
          </p>

        </div>

        {/* Form */}

        <form
          className="mt-8 space-y-6"
          onSubmit={(e) => e.preventDefault()}
        >

          {/* New Password */}

          <div>

            <label className="mb-2.5 block text-base font-semibold text-[#252642]">
              New Password
            </label>

            <div className="flex items-center rounded-xl border border-gray-300 bg-white px-5 py-4 transition-all duration-300 focus-within:border-red-600 focus-within:ring-2 focus-within:ring-red-600/20">

              <FaLock className="text-lg text-gray-400 shrink-0" />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter new password"
                className="ml-3.5 w-full bg-transparent text-base text-gray-800 outline-none placeholder:text-gray-400"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="ml-2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>

            </div>

          </div>

          {/* Confirm Password */}

          <div>

            <label className="mb-2.5 block text-base font-semibold text-[#252642]">
              Confirm Password
            </label>

            <div className="flex items-center rounded-xl border border-gray-300 bg-white px-5 py-4 transition-all duration-300 focus-within:border-red-600 focus-within:ring-2 focus-within:ring-red-600/20">

              <FaLock className="text-lg text-gray-400 shrink-0" />

              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm new password"
                className="ml-3.5 w-full bg-transparent text-base text-gray-800 outline-none placeholder:text-gray-400"
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                className="ml-2 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>

            </div>

          </div>

          <div style={{ marginTop: "15px" }}>

            <button
              type="submit"
              className="w-full rounded-xl bg-red-600 py-4 text-lg font-semibold text-white shadow-md transition duration-300 hover:bg-red-700 active:scale-[0.99] cursor-pointer"
            >
              Reset Password
            </button>

          </div>

        </form>

        {/* Footer */}

        <div className="mt-8 border-t border-gray-100 pt-6">

          <p className="text-center text-sm sm:text-base text-gray-600">

            Back to{" "}

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

export default ResetPassword;