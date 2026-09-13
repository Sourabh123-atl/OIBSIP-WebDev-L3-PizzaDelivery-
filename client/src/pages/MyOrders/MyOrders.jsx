import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaClock, FaBoxOpen, FaArrowRight, FaPizzaSlice } from "react-icons/fa";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useAuth } from "../../context/AuthContext";
import { API_BASE_URL } from "../../config/api";

function MyOrders() {
  const { token, user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const headers = {};
        if (token) headers["Authorization"] = `Bearer ${token}`;

        const res = await fetch(`${API_BASE_URL}/orders/my-orders`, { headers });
        const data = await res.json();
        if (data.success && data.orders) {
          setOrders(data.orders);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  const getStatusBadge = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700 border-green-200";
      case "On the Way":
        return "bg-blue-100 text-blue-700 border-blue-200 animate-pulse";
      case "Preparing":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "Cancelled":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-[#FFF8F2] pt-32 pb-20 px-4 sm:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-10">
            <span className="inline-block rounded-full bg-red-100 px-4 py-1.5 text-xs font-bold text-red-600 uppercase tracking-widest mb-2">
              Customer Portal
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-[#252642]">
              My Order <span className="text-red-600">History</span>
            </h1>
            <p className="mt-1 text-gray-500 text-sm">
              Keep track of all your recent pizza deliveries and cravings.
            </p>
          </div>

          {loading ? (
            <div className="py-20 text-center flex flex-col items-center justify-center">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-red-600 mb-3"></div>
              <p className="text-sm text-gray-500">Loading your orders...</p>
            </div>
          ) : orders.length === 0 ? (
            <div className="rounded-3xl bg-white p-12 text-center shadow-sm border border-orange-50 max-w-lg mx-auto">
              <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center text-4xl mx-auto mb-4">
                <FaPizzaSlice className="text-red-600" />
              </div>
              <h3 className="text-2xl font-black text-[#252642]">
                No orders yet!
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                You haven't ordered any pizzas yet. Browse our menu and find your favorite slice!
              </p>
              <Link
                to="/menu"
                className="mt-6 inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-red-600 text-white font-bold text-sm shadow-md hover:bg-red-700 transition"
              >
                <span>Order Now</span>
                <FaArrowRight className="text-xs" />
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => {
                const orderId = order._id || order.id;
                return (
                  <div
                    key={orderId}
                    className="rounded-3xl bg-white p-6 sm:p-8 shadow-sm hover:shadow-md transition border border-orange-50 flex flex-col md:flex-row md:items-center justify-between gap-6"
                  >
                    <div className="space-y-3 flex-1">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="font-black text-lg text-[#252642]">
                          #{String(orderId).slice(-6).toUpperCase()}
                        </span>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-extrabold border ${getStatusBadge(
                            order.orderStatus
                          )}`}
                        >
                          {order.orderStatus}
                        </span>
                        <span className="text-xs text-gray-400 flex items-center gap-1">
                          <FaClock />
                          {new Date(order.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>

                      {/* Items list preview */}
                      <div className="flex flex-wrap gap-2 text-xs text-gray-600">
                        {order.items?.map((item, idx) => (
                          <span
                            key={idx}
                            className="bg-gray-100 px-3 py-1 rounded-lg font-medium"
                          >
                            {item.quantity}x {item.name}
                          </span>
                        ))}
                      </div>

                      <div className="text-xs text-gray-400">
                        Deliver to:{" "}
                        <span className="text-gray-700 font-medium">
                          {order.customer?.address}
                        </span>
                      </div>
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 pt-4 sm:pt-0 border-gray-100 gap-2">
                      <div>
                        <span className="text-xs text-gray-400 block sm:text-right">
                          Total Paid
                        </span>
                        <span className="text-2xl font-black text-red-600">
                          ${Number(order.totalAmount).toFixed(2)}
                        </span>
                      </div>

                      <Link
                        to={`/order-tracking/${orderId}`}
                        state={{ order }}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-sm transition"
                      >
                        <span>Live Tracking</span>
                        <FaArrowRight className="text-[10px]" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}

export default MyOrders;
