import { useState, useEffect } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import {
  FaCheckCircle,
  FaClock,
  FaMotorcycle,
  FaUtensils,
  FaFire,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaArrowLeft,
  FaSyncAlt,
} from "react-icons/fa";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { API_BASE_URL, parseJsonResponse } from "../../config/api";
import { toast } from "react-toastify";

const STAGES = [
  { key: "Order Received", label: "Order Received", icon: FaClock, desc: "Order confirmed in kitchen" },
  { key: "Preparing", label: "Preparing Items", icon: FaUtensils, desc: "Prepping dough & fresh toppings" },
  { key: "In Kitchen", label: "In Kitchen & Oven", icon: FaFire, desc: "Baking hot to perfection" },
  { key: "Out for Delivery", label: "Out for Delivery", icon: FaMotorcycle, desc: "Driver on the way to your door" },
  { key: "Delivered", label: "Delivered", icon: FaCheckCircle, desc: "Delivered! Enjoy your hot pizza! 🍕" },
];

function OrderTracking() {
  const { id } = useParams();
  const location = useLocation();
  const [order, setOrder] = useState(location.state?.order || null);
  const [loading, setLoading] = useState(!order);
  const [refreshing, setRefreshing] = useState(false);

  const fetchOrder = async (isManual = false) => {
    if (isManual) setRefreshing(true);
    try {
      const res = await fetch(`${API_BASE_URL}/orders/${id}`);
      const data = await parseJsonResponse(res);
      if (data.success && data.order) {
        setOrder(data.order);
        if (isManual) toast.success("Order status refreshed!");
      }
    } catch (err) {
      console.error("Tracking fetch error:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchOrder();
    const interval = setInterval(() => {
      fetchOrder();
    }, 8000);
    return () => clearInterval(interval);
  }, [id]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-[#FFF8F2] pt-36 pb-20 flex flex-col items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
          <p className="mt-4 text-gray-600 font-medium">Locating your pizza order...</p>
        </div>
        <Footer />
      </>
    );
  }

  if (!order) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-[#FFF8F2] pt-36 pb-20 px-4 flex flex-col items-center justify-center">
          <div className="bg-white p-10 rounded-3xl shadow-md text-center max-w-md border border-orange-50">
            <span className="text-5xl">🔍</span>
            <h2 className="mt-4 text-2xl font-black text-[#252642]">
              Order Not Found
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              We couldn't locate order #{id}. Please check your order ID or view your order history.
            </p>
            <Link
              to="/my-orders"
              className="mt-6 inline-block px-8 py-3 bg-red-600 text-white font-bold text-sm rounded-xl"
            >
              View My Orders
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const normalizedStatus = (order.orderStatus || "Order Received").trim();
  const currentStatusIndex = STAGES.findIndex(
    (s) => s.key.toLowerCase() === normalizedStatus.toLowerCase()
  );

  const isCancelled = normalizedStatus.toLowerCase() === "cancelled";
  const itemsList = order.orderedItems || order.items || [];

  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-[#FFF8F2] pt-32 pb-20 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Top Actions */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-red-600 transition"
            >
              <FaArrowLeft /> Continue Shopping
            </Link>

            <button
              type="button"
              onClick={() => fetchOrder(true)}
              disabled={refreshing}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-gray-200 text-xs font-bold text-gray-700 hover:bg-red-50 hover:text-red-600 shadow-sm transition cursor-pointer"
            >
              <FaSyncAlt className={refreshing ? "animate-spin text-red-600" : ""} />
              <span>Refresh Status</span>
            </button>
          </div>

          {/* Main Card */}
          <div className="rounded-3xl bg-white p-6 sm:p-10 shadow-lg border border-orange-50">
            {/* Order Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-gray-100 gap-4">
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-red-100 text-red-600 font-bold text-xs uppercase tracking-wider mb-2">
                  Live Order Tracker
                </span>
                <h1 className="text-2xl sm:text-3xl font-black text-[#252642]">
                  Order #{order.orderId || String(order._id || order.id).slice(-6).toUpperCase()}
                </h1>
                <p className="text-xs sm:text-sm text-gray-400 mt-1">
                  Placed on: {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-xs text-gray-400 font-bold block uppercase">
                  Current Status
                </span>
                <span
                  className={`inline-block mt-1 px-4 py-1.5 rounded-full text-sm font-black uppercase tracking-wider ${
                    isCancelled
                      ? "bg-red-100 text-red-700"
                      : order.orderStatus === "Delivered"
                      ? "bg-green-100 text-green-700"
                      : "bg-amber-100 text-amber-700 animate-pulse"
                  }`}
                >
                  {order.orderStatus}
                </span>
              </div>
            </div>

            {/* Stepper / Timeline */}
            {!isCancelled ? (
              <div className="py-10">
                <div className="relative">
                  {/* Progress Line */}
                  <div className="hidden md:block absolute top-1/2 left-10 right-10 -translate-y-1/2 h-1.5 bg-gray-100 z-0">
                    <div
                      className="h-full bg-red-600 transition-all duration-700"
                      style={{
                        width: `${Math.max(
                          0,
                          (Math.max(0, currentStatusIndex) / (STAGES.length - 1)) * 100
                        )}%`,
                      }}
                    ></div>
                  </div>

                  {/* Steps */}
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative z-10">
                    {STAGES.map((stage, index) => {
                      const Icon = stage.icon;
                      const isCompleted = index <= currentStatusIndex;
                      const isCurrent = index === currentStatusIndex;

                      return (
                        <div
                          key={stage.key}
                          className="flex md:flex-col items-center gap-4 md:gap-2 text-left md:text-center"
                        >
                          <div
                            className={`w-12 h-12 rounded-2xl flex items-center justify-center text-lg transition duration-500 shadow-md ${
                              isCurrent
                                ? "bg-red-600 text-white scale-110 shadow-red-200 ring-4 ring-red-100"
                                : isCompleted
                                ? "bg-red-600 text-white"
                                : "bg-gray-100 text-gray-400"
                            }`}
                          >
                            <Icon />
                          </div>

                          <div>
                            <h4
                              className={`text-xs sm:text-sm font-extrabold ${
                                isCompleted ? "text-gray-900" : "text-gray-400"
                              }`}
                            >
                              {stage.label}
                            </h4>
                            <p className="text-[11px] text-gray-400 mt-0.5 max-w-[120px] md:mx-auto">
                              {stage.desc}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-8 text-center bg-red-50 rounded-2xl my-6">
                <span className="text-3xl">⚠️</span>
                <h3 className="mt-2 text-lg font-black text-red-700">
                  This order has been cancelled
                </h3>
                <p className="text-xs text-red-600 mt-1">
                  If you have questions or wish to re-order, please contact store support.
                </p>
              </div>
            )}

            {/* Delivery & Order Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-gray-100">
              {/* Delivery Details */}
              <div className="space-y-4">
                <h3 className="text-base font-black text-[#252642] flex items-center gap-2">
                  <FaMapMarkerAlt className="text-red-600" />
                  Delivery Destination
                </h3>

                <div className="bg-gray-50 rounded-2xl p-4 text-xs sm:text-sm text-gray-700 space-y-2">
                  <p>
                    <strong className="text-gray-900 font-bold">Recipient:</strong>{" "}
                    {order.userName || order.customer?.name}
                  </p>
                  {(order.phone || order.customer?.phone) && (
                    <p className="flex items-center gap-1.5">
                      <FaPhoneAlt className="text-gray-400 text-xs" />
                      {order.phone || order.customer?.phone}
                    </p>
                  )}
                  <p>
                    <strong className="text-gray-900 font-bold">Address:</strong>{" "}
                    {order.deliveryAddress || order.customer?.address}
                  </p>
                  {(order.notes || order.customer?.notes) && (
                    <p className="text-gray-500 italic">
                      Note: "{order.notes || order.customer?.notes}"
                    </p>
                  )}
                  <p className="pt-2 border-t border-gray-200">
                    <strong className="text-gray-900 font-bold">Payment:</strong>{" "}
                    {order.paymentMethod} (
                    <span
                      className={
                        order.paymentStatus === "Paid"
                          ? "text-green-600 font-bold"
                          : "text-amber-600 font-bold"
                      }
                    >
                      {order.paymentStatus}
                    </span>
                    )
                  </p>
                </div>
              </div>

              {/* Items Ordered */}
              <div className="space-y-4">
                <h3 className="text-base font-black text-[#252642] flex items-center gap-2">
                  <FaUtensils className="text-red-600" />
                  Items in this Order
                </h3>

                <div className="bg-gray-50 rounded-2xl p-4 space-y-3 max-h-56 overflow-y-auto">
                  {itemsList.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between text-xs sm:text-sm"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-lg bg-red-100 text-red-600 font-bold flex items-center justify-center text-xs">
                          {item.quantity}x
                        </span>
                        <span className="font-semibold text-gray-800 line-clamp-1 max-w-[180px]">
                          {item.pizzaName || item.name}
                        </span>
                      </div>
                      <span className="font-bold text-gray-900">
                        ${((Number(item.itemPrice !== undefined ? item.itemPrice : item.price) || 0) * (Number(item.quantity) || 1)).toFixed(2)}
                      </span>
                    </div>
                  ))}

                  <div className="pt-3 border-t border-gray-200 space-y-1 text-xs text-gray-500">
                    <div className="flex justify-between">
                      <span>Delivery Fee:</span>
                      <span>${Number(order.deliveryFee !== undefined ? order.deliveryFee : 3.99).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-sm text-gray-900 pt-1 border-t border-gray-200">
                      <span>Total:</span>
                      <span className="text-red-600">
                        ${Number(order.totalAmount).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default OrderTracking;
