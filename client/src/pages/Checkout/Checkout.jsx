import { useState } from "react";

function Checkout() {
  const [payment, setPayment] = useState("Cash on Delivery");

  return (
    <section className="min-h-screen bg-[#FFF8F2] py-20">

      <div className="max-w-6xl mx-auto px-6">

        <div className="text-center">

          <h1 className="text-5xl font-black text-red-600">
            Checkout
          </h1>

          <p className="mt-3 text-gray-500">
            Complete your order by filling in your details.
          </p>

        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-3">

          {/* Customer Details */}

          <div className="lg:col-span-2 rounded-3xl bg-white p-8 shadow">

            <h2 className="text-3xl font-bold text-[#252642]">
              Delivery Information
            </h2>

            <div className="mt-8 grid gap-6">

              <input
                type="text"
                placeholder="Full Name"
                className="rounded-xl border p-4 outline-none focus:border-red-600"
              />

              <input
                type="email"
                placeholder="Email Address"
                className="rounded-xl border p-4 outline-none focus:border-red-600"
              />

              <input
                type="text"
                placeholder="Phone Number"
                className="rounded-xl border p-4 outline-none focus:border-red-600"
              />

              <textarea
                rows="4"
                placeholder="Delivery Address"
                className="rounded-xl border p-4 outline-none focus:border-red-600"
              />

            </div>

            <h2 className="mt-10 text-3xl font-bold text-[#252642]">
              Payment Method
            </h2>

            <div className="mt-6 space-y-4">

              <label className="flex items-center gap-3">

                <input
                  type="radio"
                  checked={payment === "Cash on Delivery"}
                  onChange={() =>
                    setPayment("Cash on Delivery")
                  }
                />

                Cash on Delivery

              </label>

              <label className="flex items-center gap-3">

                <input
                  type="radio"
                  checked={payment === "Credit Card"}
                  onChange={() =>
                    setPayment("Credit Card")
                  }
                />

                Credit / Debit Card

              </label>

            </div>

          </div>

          {/* Summary */}

          <div className="rounded-3xl bg-white p-8 shadow h-fit">

            <h2 className="text-3xl font-bold text-[#252642]">
              Order Summary
            </h2>

            <div className="mt-8 space-y-4">

              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>$34.97</span>
              </div>

              <div className="flex justify-between">
                <span>Delivery</span>
                <span>$3.99</span>
              </div>

              <div className="flex justify-between">
                <span>Tax</span>
                <span>$2.10</span>
              </div>

              <hr />

              <div className="flex justify-between text-2xl font-bold">

                <span>Total</span>

                <span className="text-red-600">
                  $41.06
                </span>

              </div>

            </div>

            <button className="mt-10 w-full rounded-xl bg-red-600 py-4 text-lg font-semibold text-white hover:bg-red-700">

              Place Order

            </button>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Checkout;