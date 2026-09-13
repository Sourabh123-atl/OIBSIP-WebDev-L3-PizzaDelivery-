import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaChartPie,
  FaClipboardList,
  FaPizzaSlice,
  FaUsers,
  FaArrowLeft,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaShieldAlt,
} from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

function AdminLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { label: "Dashboard", path: "/admin", icon: FaChartPie },
    { label: "Orders Management", path: "/admin/orders", icon: FaClipboardList },
    { label: "Menu & Products", path: "/admin/menu", icon: FaPizzaSlice },
    { label: "Users & Roles", path: "/admin/users", icon: FaUsers },
  ];

  const handleLogout = () => {
    logout();
    toast.info("Logged out from admin console.");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Mobile Topbar */}
      <div className="md:hidden bg-gray-900 text-white p-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🍕</span>
          <span className="font-black tracking-tight text-lg">
            PIZZARIO <span className="text-red-500 text-xs uppercase px-2 py-0.5 bg-red-950 rounded-full border border-red-800">Admin</span>
          </span>
        </div>
        <button
          type="button"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-white text-xl p-1"
        >
          {sidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "block" : "hidden"
        } md:block w-full md:w-64 bg-gray-900 text-white flex-shrink-0 flex flex-col justify-between z-30 md:sticky md:top-0 md:h-screen p-5`}
      >
        <div>
          {/* Brand */}
          <div className="flex items-center gap-3 px-2 py-3 mb-8">
            <span className="text-3xl">🍕</span>
            <div>
              <h2 className="text-xl font-black tracking-tight text-white leading-none">
                PIZZA<span className="text-red-500">RIO</span>
              </h2>
              <span className="text-[10px] font-bold uppercase tracking-widest text-red-400 bg-red-950/80 px-2 py-0.5 rounded-md mt-1 inline-block border border-red-800/60">
                Admin Console
              </span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition duration-200 ${
                    isActive
                      ? "bg-red-600 text-white shadow-md shadow-red-900/30"
                      : "text-gray-400 hover:text-white hover:bg-gray-800/60"
                  }`}
                >
                  <Icon className="text-base" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="pt-6 border-t border-gray-800 space-y-3">
          <Link
            to="/"
            className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-bold text-gray-400 hover:text-white hover:bg-gray-800 rounded-xl transition"
          >
            <FaArrowLeft />
            <span>Back to Public Store</span>
          </Link>

          <div className="p-3 rounded-2xl bg-gray-800/50 border border-gray-700/50 flex items-center justify-between">
            <div className="overflow-hidden pr-2">
              <p className="text-xs font-bold text-white truncate">
                {user?.name || "Admin"}
              </p>
              <p className="text-[11px] text-gray-400 truncate">{user?.email}</p>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="p-2 rounded-xl text-gray-400 hover:text-red-400 hover:bg-gray-800 transition cursor-pointer"
              title="Logout"
            >
              <FaSignOutAlt />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-8 md:p-10 overflow-y-auto max-w-7xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
}

export default AdminLayout;
