import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaFilter,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
  FaSyncAlt,
  FaExternalLinkAlt,
} from "react-icons/fa";
import AdminLayout from "./AdminLayout";
import { useAuth } from "../../context/AuthContext";
import { API_BASE_URL } from "../../config/api";
import { toast } from "react-toastify";

const STATUSES = ["All", "Placed", "Preparing", "On the Way", "Delivered", "Cancelled"];

function AdminOrders() {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchOrders = async (isManual = false) => {
    if (isManual) setRefreshing(true);
    try {
      const headers = {};
      if (token) headers["Authorization"] = `Bearer ${token}`;

      const url =
        selectedStatus === "All"
          ? `${API_BASE_URL}/orders`
          : `${API_BASE_URL}/orders?status=${selectedStatus}`;

      const res = await fetch(url, { headers });
      const data = await res.json();
      if (data.success && data.orders) {
        setOrders(data.orders);
        if (isManual) toast.success("Orders refreshed!");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [selectedStatus, token]);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const headers = { "Content-Type": "application/json" };
      if (token) headers["Authorization"] = `Bearer ${token}`;

      const res = await fetch(`${API_BASE_URL}/orders/${orderId}/status`, {
        method: "PUT",
        headers,
        body: JSON.stringify({ orderStatus: newStatus }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success(`Order #${String(orderId).slice(-6)} set to "${newStatus}"!`);
        fetchOrders();
      } else {
        toast.error(data.message || "Failed to update order");
      }
    } catch (err) {
      toast.error("Status update error");
    }
  };

  const getStatusColor = (status) => {
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
    <AdminLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            Order Fulfillment & Dispatch
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Real-time management of incoming customer orders, tickets, and drivers.
          </p>
        </div>

        <button
          type="button"
          onClick={() => fetchOrders(true)}
          disabled={refreshing}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-50 shadow-sm transition cursor-pointer"
        >
          <FaSyncAlt className={refreshing ? "animate-spin text-red-600" : ""} />
          <span>Refresh List</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {STATUSES.map((status) => (
          <button
            key={status}
            type="button"
            onClick={() => setSelectedStatus(status)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              selectedStatus === status
                ? "bg-red-600 text-white shadow-md shadow-red-200"
                : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Orders List */}
      {loading ? (
        <div className="py-20 text-center text-sm text-gray-400">
          Loading orders...
        </div>
      ) : orders.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-sm">
          <span className="text-4xl">📦</span>
          <h3 className="mt-3 text-lg font-bold text-gray-800">
            No orders found
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            There are currently no orders in this status category.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => {
            const orderId = order._id || order.id;
            return (
              <div
                key={orderId}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm hover:shadow-md transition"
              >
                {/* Top Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-100 gap-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-xl font-black text-gray-900">
                      #{String(orderId).slice(-6).toUpperCase()}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-extrabold border ${getStatusColor(
                        order.orderStatus
                      )}`}
                    >
                      {order.orderStatus}
                    </span>
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <FaClock />
                      {new Date(order.createdAt).toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-gray-500">Update Status:</span>
                    <select
                      value={order.orderStatus}
                      onChange={(e) => handleStatusChange(orderId, e.target.value)}
                      className="px-3.5 py-2 rounded-xl text-xs font-bold bg-gray-50 border border-gray-200 outline-none focus:border-red-600 cursor-pointer"
                    >
                      <option value="Placed">Placed</option>
                      <option value="Preparing">Preparing</option>
                      <option value="On the Way">On the Way</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>

                    <Link
                      to={`/order-tracking/${orderId}`}
                      target="_blank"
                      className="p-2 rounded-xl text-gray-400 hover:text-red-600 hover:bg-red-50 transition"
                      title="Open Live Tracker"
                    >
                      <FaExternalLinkAlt className="text-xs" />
                    </Link>
                  </div>
                </div>

                {/* Middle Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-5">
                  {/* Customer Information */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                      Customer Info
                    </h4>
                    <p className="font-bold text-gray-900 text-sm">
                      {order.customer?.name}
                    </p>
                    <p className="text-xs text-gray-500 mt-1 flex items-center gap-1.5">
                      <FaPhoneAlt className="text-[10px]" />
                      {order.customer?.phone}
                    </p>
                    <p className="text-xs text-gray-500 mt-1 flex items-center gap-1.5">
                      <FaEnvelope className="text-[10px]" />
                      {order.customer?.email}
                    </p>
                  </div>

                  {/* Delivery Destination */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                      Delivery Address
                    </h4>
                    <p className="text-xs text-gray-700 flex items-start gap-1.5 leading-relaxed">
                      <FaMapMarkerAlt className="text-red-500 mt-0.5 flex-shrink-0" />
                      <span>{order.customer?.address}</span>
                    </p>
                    {order.customer?.notes && (
                      <p className="text-xs text-gray-400 italic mt-1 pl-4">
                        Note: "{order.customer.notes}"
                      </p>
                    )}
                  </div>

                  {/* Order Financials & Payment */}
                  <div className="bg-gray-50 p-4 rounded-2xl">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                      Payment & Total
                    </h4>
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>Method:</span>
                      <span className="font-bold text-gray-800">
                        {order.paymentMethod}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-600 mb-2">
                      <span>Payment Status:</span>
                      <span
                        className={`font-bold ${
                          order.paymentStatus === "Paid"
                            ? "text-green-600"
                            : "text-amber-600"
                        }`}
                      >
                        {order.paymentStatus}
                      </span>
                    </div>
                    <div className="pt-2 border-t border-gray-200 flex justify-between items-center">
                      <span className="text-xs font-bold text-gray-700">Total:</span>
                      <span className="text-xl font-black text-red-600">
                        ${Number(order.totalAmount).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Items Ordered List */}
                <div className="mt-5 pt-4 border-t border-gray-100">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
                    Items ({order.items?.reduce((s, i) => s + i.quantity, 0) || 0})
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {order.items?.map((item, idx) => (
                      <div
                        key={idx}
                        className="bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-xl text-xs flex items-center gap-2"
                      >
                        <span className="font-black text-red-600">
                          {item.quantity}x
                        </span>
                        <span className="font-bold text-gray-800">
                          {item.name}
                        </span>
                        <span className="text-gray-400">
                          (${Number(item.price).toFixed(2)})
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </AdminLayout>
  );
}

export default AdminOrders;
