import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaDollarSign,
  FaShoppingBag,
  FaClock,
  FaPizzaSlice,
  FaUsers,
  FaArrowRight,
  FaSyncAlt,
  FaCheck,
} from "react-icons/fa";
import AdminLayout from "./AdminLayout";
import { useAuth } from "../../context/AuthContext";
import { API_BASE_URL } from "../../config/api";
import { toast } from "react-toastify";

function AdminDashboard() {
  const { token } = useAuth();
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    activeOrders: 0,
    totalPizzas: 16,
    totalUsers: 4,
    recentOrders: [],
  });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchStats = async (isManual = false) => {
    if (isManual) setRefreshing(true);
    try {
      const headers = {};
      if (token) headers["Authorization"] = `Bearer ${token}`;

      const res = await fetch(`${API_BASE_URL}/admin/stats`, { headers });
      const data = await res.json();
      if (data.success && data.stats) {
        setStats(data.stats);
        if (isManual) toast.success("Dashboard metrics refreshed!");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [token]);

  const updateStatus = async (orderId, newStatus) => {
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
        toast.success(`Order status updated to "${newStatus}"!`);
        fetchStats();
      } else {
        toast.error(data.message || "Failed to update order status");
      }
    } catch (err) {
      toast.error("Failed to update order");
    }
  };

  const statCards = [
    {
      title: "Total Revenue",
      value: `$${Number(stats.totalRevenue).toFixed(2)}`,
      icon: FaDollarSign,
      color: "bg-emerald-500",
      lightColor: "bg-emerald-50 text-emerald-600",
    },
    {
      title: "Total Orders",
      value: stats.totalOrders,
      icon: FaShoppingBag,
      color: "bg-blue-500",
      lightColor: "bg-blue-50 text-blue-600",
    },
    {
      title: "Active Orders",
      value: stats.activeOrders,
      icon: FaClock,
      color: "bg-amber-500",
      lightColor: "bg-amber-50 text-amber-600",
    },
    {
      title: "Menu Items",
      value: stats.totalPizzas,
      icon: FaPizzaSlice,
      color: "bg-red-500",
      lightColor: "bg-red-50 text-red-600",
    },
    {
      title: "Registered Users",
      value: stats.totalUsers,
      icon: FaUsers,
      color: "bg-purple-500",
      lightColor: "bg-purple-50 text-purple-600",
    },
  ];

  return (
    <AdminLayout>
      {/* Dashboard Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Real-time sales, order fulfillment, and kitchen performance.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => fetchStats(true)}
            disabled={refreshing}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-50 shadow-sm transition cursor-pointer"
          >
            <FaSyncAlt className={refreshing ? "animate-spin text-red-600" : ""} />
            <span>Refresh Data</span>
          </button>

          <Link
            to="/admin/menu"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-md shadow-red-200 transition"
          >
            <span>+ Add Menu Item</span>
          </Link>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 mb-10">
        {statCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <div
              key={i}
              className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  {card.title}
                </span>
                <div
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center text-lg ${card.lightColor}`}
                >
                  <Icon />
                </div>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-gray-900">
                {card.value}
              </h3>
            </div>
          );
        })}
      </div>

      {/* Recent Orders Section */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-black text-gray-900">
              Recent Customer Orders
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              Manage incoming tickets and dispatch status
            </p>
          </div>

          <Link
            to="/admin/orders"
            className="inline-flex items-center gap-1 text-xs font-bold text-red-600 hover:underline"
          >
            <span>View All Orders</span>
            <FaArrowRight className="text-[10px]" />
          </Link>
        </div>

        {loading ? (
          <div className="py-12 text-center text-sm text-gray-400">
            Loading recent orders...
          </div>
        ) : stats.recentOrders && stats.recentOrders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="text-xs uppercase bg-gray-50 text-gray-400 font-bold border-b border-gray-100">
                <tr>
                  <th className="px-4 py-3 rounded-l-xl">Order ID</th>
                  <th className="px-4 py-3">Customer</th>
                  <th className="px-4 py-3">Items</th>
                  <th className="px-4 py-3">Total</th>
                  <th className="px-4 py-3">Payment</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 rounded-r-xl">Quick Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {stats.recentOrders.map((order) => {
                  const orderId = order._id || order.id;
                  return (
                    <tr key={orderId} className="hover:bg-gray-50/70 transition">
                      <td className="px-4 py-4 font-black text-gray-900">
                        #{String(orderId).slice(-6).toUpperCase()}
                      </td>
                      <td className="px-4 py-4">
                        <div className="font-bold text-gray-900">
                          {order.customer?.name}
                        </div>
                        <div className="text-xs text-gray-400">
                          {order.customer?.phone}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-xs">
                        <span className="font-semibold text-gray-800">
                          {order.items?.length || 0} items
                        </span>
                        <div className="text-gray-400 truncate max-w-[150px]">
                          {order.items?.map((it) => it.name).join(", ")}
                        </div>
                      </td>
                      <td className="px-4 py-4 font-black text-red-600">
                        ${Number(order.totalAmount).toFixed(2)}
                      </td>
                      <td className="px-4 py-4 text-xs">
                        <span className="font-bold text-gray-700">
                          {order.paymentMethod}
                        </span>
                        <span
                          className={`block font-bold text-[10px] ${
                            order.paymentStatus === "Paid"
                              ? "text-green-600"
                              : "text-amber-600"
                          }`}
                        >
                          {order.paymentStatus}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <select
                          value={order.orderStatus}
                          onChange={(e) => updateStatus(orderId, e.target.value)}
                          className="px-3 py-1.5 rounded-xl text-xs font-bold bg-gray-50 border border-gray-200 outline-none focus:border-red-600 cursor-pointer"
                        >
                          <option value="Placed">Placed</option>
                          <option value="Preparing">Preparing</option>
                          <option value="On the Way">On the Way</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="px-4 py-4 text-xs">
                        <Link
                          to={`/order-tracking/${orderId}`}
                          className="text-red-600 hover:underline font-bold"
                        >
                          Track
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-10 text-center text-sm text-gray-400">
            No recent orders found.
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

export default AdminDashboard;
