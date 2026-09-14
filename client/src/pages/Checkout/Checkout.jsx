import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import {
  FaMoneyBillWave,
  FaCreditCard,
  FaMobileAlt,
  FaShieldAlt,
  FaArrowLeft,
} from "react-icons/fa";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../../config/api";

function Checkout() {
  const { cart, subtotal, deliveryFee, tax, total, clearCart } = useCart();
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const discount = location.state?.discount || 0;
  const coupon = location.state?.coupon || null;
  const finalTotal = Math.max(0, total - discount);

  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
    notes: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    if (!formData.name.trim() || !formData.phone.trim() || !formData.address.trim()) {
      toast.error("Please fill in your name, phone number, and delivery address.");
      return;
    }

    setLoading(true);

    const orderPayload = {
      userName: formData.name.trim(),
      email: (formData.email.trim() || user?.email || "customer@example.com").toLowerCase(),
      phone: formData.phone.trim(),
      deliveryAddress: formData.address.trim(),
      notes: formData.notes.trim(),
      orderedItems: cart.map((item) => ({
        pizzaId: String(item._id || item.id || ""),
        pizzaName: item.name,
        quantity: item.quantity,
        size: item.size || "Regular",
        customizations: item.customizations || "",
        itemPrice: Number(item.price),
        image: item.image || "",
      })),
      subtotal: Number(subtotal.toFixed(2)),
      deliveryFee: Number(deliveryFee.toFixed(2)),
      tax: Number(tax.toFixed(2)),
      totalAmount: Number(finalTotal.toFixed(2)),
      paymentMethod,
    };

    try {
      const headers = { "Content-Type": "application/json" };
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const res = await fetch(`${API_BASE_URL}/orders`, {
        method: "POST",
        headers,
        body: JSON.stringify(orderPayload),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to place order.");
      }

      toast.success("Order Placed Successfully! 🍕 Tracking your delivery now!");
      clearCart();

      const orderId = data.order?.orderId || data.order?._id || data.order?.id;
      navigate(`/order-tracking/${orderId}`, { state: { order: data.order } });
    } catch (error) {
      setLoading(false);
      toast.error(error.message || "Something went wrong while placing your order.");
    }
  };

  if (cart.length === 0) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-[#FFF8F2] pt-36 pb-20 px-4 flex flex-col items-center justify-center">
          <div className="bg-white p-10 rounded-3xl shadow-md text-center max-w-md w-full border border-orange-50">
            <span className="text-5xl">🛒</span>
            <h2 className="mt-4 text-2xl font-black text-[#252642]">
              Nothing to checkout
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Your cart is empty. Add delicious pizzas first!
            </p>
            <Link
              to="/menu"
              className="mt-6 inline-block px-8 py-3.5 rounded-xl bg-red-600 text-white font-bold text-sm shadow-md hover:bg-red-700 transition"
            >
              Browse Menu
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-[#FFF8F2] pt-32 pb-20 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link
              to="/cart"
              className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-red-600 transition mb-4"
            >
              <FaArrowLeft /> Back to Cart
            </Link>
            <h1 className="text-3xl sm:text-4xl font-black text-[#252642]">
              Complete Your <span className="text-red-600">Order</span>
            </h1>
            <p className="mt-1 text-gray-500 text-sm sm:text-base">
              Enter your delivery information and select your preferred payment method.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid gap-10 lg:grid-cols-3">
              {/* Customer & Delivery Details */}
              <div className="lg:col-span-2 space-y-8">
                {/* Contact Card */}
                <div className="rounded-3xl bg-white p-6 sm:p-8 shadow-sm border border-orange-50">
                  <h2 className="text-2xl font-black text-[#252642] mb-6 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-red-100 text-red-600 text-sm font-black flex items-center justify-center">
                      1
                    </span>
                    Delivery Information
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Sourabh Patel"
                        className="w-full rounded-xl border border-gray-200 p-3.5 text-sm outline-none focus:border-red-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        className="w-full rounded-xl border border-gray-200 p-3.5 text-sm outline-none focus:border-red-600"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="sourabh@example.com"
                        className="w-full rounded-xl border border-gray-200 p-3.5 text-sm outline-none focus:border-red-600"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-2">
                        Street Address *
                      </label>
                      <textarea
                        rows="3"
                        name="address"
                        required
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Flat No, Building, Landmark, Street name..."
                        className="w-full rounded-xl border border-gray-200 p-3.5 text-sm outline-none focus:border-red-600"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-2">
                        Delivery Instructions (Optional)
                      </label>
                      <input
                        type="text"
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        placeholder="e.g. Ring doorbell, leave at gate"
                        className="w-full rounded-xl border border-gray-200 p-3.5 text-sm outline-none focus:border-red-600"
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Method Card */}
                <div className="rounded-3xl bg-white p-6 sm:p-8 shadow-sm border border-orange-50">
                  <h2 className="text-2xl font-black text-[#252642] mb-6 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-red-100 text-red-600 text-sm font-black flex items-center justify-center">
                      2
                    </span>
                    Payment Method
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <label
                      onClick={() => setPaymentMethod("Cash on Delivery")}
                      className={`flex flex-col items-center justify-center p-5 rounded-2xl border-2 cursor-pointer transition text-center ${
                        paymentMethod === "Cash on Delivery"
                          ? "border-red-600 bg-red-50/50 text-red-600"
                          : "border-gray-200 hover:border-gray-300 text-gray-700"
                      }`}
                    >
                      <FaMoneyBillWave className="text-3xl mb-2" />
                      <span className="font-bold text-sm">Cash on Delivery</span>
                      <span className="text-[11px] text-gray-500 mt-1">
                        Pay upon arrival
                      </span>
                    </label>

                    <label
                      onClick={() => setPaymentMethod("Credit Card")}
                      className={`flex flex-col items-center justify-center p-5 rounded-2xl border-2 cursor-pointer transition text-center ${
                        paymentMethod === "Credit Card"
                          ? "border-red-600 bg-red-50/50 text-red-600"
                          : "border-gray-200 hover:border-gray-300 text-gray-700"
                      }`}
                    >
                      <FaCreditCard className="text-3xl mb-2" />
                      <span className="font-bold text-sm">Credit / Debit Card</span>
                      <span className="text-[11px] text-gray-500 mt-1">
                        Visa, MasterCard, Amex
                      </span>
                    </label>

                    <label
                      onClick={() => setPaymentMethod("UPI")}
                      className={`flex flex-col items-center justify-center p-5 rounded-2xl border-2 cursor-pointer transition text-center ${
                        paymentMethod === "UPI"
                          ? "border-red-600 bg-red-50/50 text-red-600"
                          : "border-gray-200 hover:border-gray-300 text-gray-700"
                      }`}
                    >
                      <FaMobileAlt className="text-3xl mb-2" />
                      <span className="font-bold text-sm">UPI / QR</span>
                      <span className="text-[11px] text-gray-500 mt-1">
                        GPay, PhonePe, Paytm
                      </span>
                    </label>
                  </div>

                  <div className="mt-6 flex items-center gap-2 text-xs text-gray-500">
                    <FaShieldAlt className="text-green-600 text-sm" />
                    <span>256-bit encrypted secure checkout. Your data is protected.</span>
                  </div>
                </div>
              </div>

              {/* Order Summary & Submit Button */}
              <div className="space-y-6">
                <div className="rounded-3xl bg-white p-6 sm:p-8 shadow-md border border-orange-50 sticky top-28">
                  <h2 className="text-2xl font-black text-[#252642]">
                    Order Summary
                  </h2>

                  {/* Items mini list */}
                  <div className="mt-4 space-y-3 max-h-56 overflow-y-auto pr-1">
                    {cart.map((item) => (
                      <div
                        key={item._id || item.id}
                        className="flex items-center justify-between text-xs"
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-red-600">
                            {item.quantity}x
                          </span>
                          <span className="font-semibold text-gray-800 line-clamp-1 max-w-[150px]">
                            {item.name}
                          </span>
                        </div>
                        <span className="font-bold text-gray-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 space-y-3 text-sm text-gray-600 border-t border-gray-100 pt-4">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-bold text-[#252642]">
                        ${subtotal.toFixed(2)}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span>Delivery</span>
                      <span className="font-bold text-[#252642]">
                        ${deliveryFee.toFixed(2)}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span>Tax (10%)</span>
                      <span className="font-bold text-[#252642]">
                        ${tax.toFixed(2)}
                      </span>
                    </div>

                    {discount > 0 && (
                      <div className="flex justify-between text-green-600 font-bold bg-green-50 p-2 rounded-lg">
                        <span>Coupon ({coupon || "Discount"})</span>
                        <span>-${discount.toFixed(2)}</span>
                      </div>
                    )}

                    <hr className="border-gray-100 my-2" />

                    <div className="flex justify-between text-xl font-black text-[#252642]">
                      <span>Total</span>
                      <span className="text-red-600">
                        ${finalTotal.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="mt-8 w-full rounded-2xl bg-red-600 py-4 text-base font-bold text-white shadow-lg transition duration-300 hover:bg-red-700 hover:shadow-red-200 active:scale-98 disabled:opacity-50 cursor-pointer"
                  >
                    {loading ? "Placing Order..." : `Place Order • $${finalTotal.toFixed(2)}`}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Checkout;