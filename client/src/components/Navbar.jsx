import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaShoppingCart,
  FaUser,
  FaSignOutAlt,
  FaClipboardList,
  FaShieldAlt,
} from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

function Navbar() {
  const { cartCount } = useCart();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setUserDropdownOpen(false);
    setMobileMenuOpen(false);
    toast.info("You have been logged out.");
    navigate("/");
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all duration-300">
      <div className="max-w-[1650px] mx-auto h-[85px] px-4 sm:px-8 md:px-14 lg:px-20 xl:px-28 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 sm:gap-3 group"
          onClick={() => setMobileMenuOpen(false)}
        >
          <span className="text-3xl sm:text-4xl transition duration-300 group-hover:rotate-12">
            🍕
          </span>
          <span className="text-2xl sm:text-3xl font-black tracking-tight text-[#252642]">
            PIZZA<span className="text-red-600">RIO</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-10 text-[17px] font-semibold text-gray-700">
          <Link
            to="/"
            className="hover:text-red-600 transition duration-200"
          >
            Home
          </Link>
          <Link
            to="/menu"
            className="hover:text-red-600 transition duration-200"
          >
            Menu
          </Link>
          {isAuthenticated && (
            <Link
              to="/my-orders"
              className="hover:text-red-600 transition duration-200 flex items-center gap-1.5"
            >
              <span>My Orders</span>
            </Link>
          )}
          {isAdmin && (
            <Link
              to="/admin/dashboard"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-700 hover:bg-red-600 hover:text-white transition duration-200 font-bold text-sm"
            >
              <FaShieldAlt className="text-xs" />
              <span>Admin Panel</span>
            </Link>
          )}
        </nav>

        {/* Right Side Controls */}
        <div className="hidden lg:flex items-center gap-5">
          {/* Cart Icon */}
          <Link
            to="/cart"
            className="relative p-2.5 text-2xl text-gray-700 hover:text-red-600 transition duration-200 hover:scale-105"
            title="Shopping Cart"
          >
            <FaShoppingCart />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[11px] font-bold text-white shadow-md animate-bounce">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </Link>

          {/* User Auth Section */}
          {isAuthenticated ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-3 px-4 py-2 rounded-full border border-gray-200 bg-gray-50 hover:bg-red-50 hover:border-red-200 transition duration-200 cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">
                  {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                </div>
                <span className="font-semibold text-gray-800 text-sm max-w-[120px] truncate">
                  {user?.name?.split(" ")[0] || "Account"}
                </span>
              </button>

              {/* Dropdown Menu */}
              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-4 py-2.5 border-b border-gray-100">
                    <p className="text-xs text-gray-400 font-medium">
                      Signed in as
                    </p>
                    <p className="text-sm font-bold text-gray-800 truncate">
                      {user?.email}
                    </p>
                    <span className="inline-block mt-1 text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-red-50 text-red-600">
                      {user?.role || "Customer"}
                    </span>
                  </div>

                  <Link
                    to="/my-orders"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 font-medium transition"
                  >
                    <FaClipboardList className="text-gray-400" />
                    <span>My Orders</span>
                  </Link>

                  {isAdmin && (
                    <Link
                      to="/admin/dashboard"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 font-bold transition"
                    >
                      <FaShieldAlt />
                      <span>Admin Dashboard</span>
                    </Link>
                  )}

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 font-medium transition text-left border-t border-gray-100 mt-1"
                  >
                    <FaSignOutAlt className="text-gray-400" />
                    <span>Log Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="rounded-full border-2 border-red-600 px-6 py-2.5 text-sm font-bold text-red-600 transition duration-300 hover:bg-red-600 hover:text-white"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="rounded-full bg-red-600 px-6 py-2.5 text-sm font-bold text-white shadow-md transition duration-300 hover:bg-red-700 hover:shadow-lg"
              >
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger & Cart */}
        <div className="flex lg:hidden items-center gap-4">
          <Link
            to="/cart"
            className="relative p-1 text-2xl text-gray-700"
            onClick={() => setMobileMenuOpen(false)}
          >
            <FaShoppingCart />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white">
                {cartCount}
              </span>
            )}
          </Link>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-2xl text-red-600 p-1 focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-gray-200 px-6 py-5 space-y-4 shadow-lg animate-in slide-in-from-top-4">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-bold text-gray-800 hover:text-red-600"
          >
            Home
          </Link>
          <Link
            to="/menu"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-bold text-gray-800 hover:text-red-600"
          >
            Menu
          </Link>
          {isAuthenticated && (
            <Link
              to="/my-orders"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-bold text-gray-800 hover:text-red-600"
            >
              My Orders
            </Link>
          )}
          {isAdmin && (
            <Link
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-bold text-red-600 bg-red-50 px-3 rounded-lg"
            >
              ⚡ Admin Panel
            </Link>
          )}

          <div className="pt-4 border-t border-gray-100 flex flex-col gap-3">
            {isAuthenticated ? (
              <div className="space-y-3">
                <div className="text-sm font-semibold text-gray-500">
                  Signed in as: <span className="text-gray-900">{user?.name}</span>
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full py-2.5 rounded-xl bg-gray-100 font-bold text-gray-700 hover:bg-red-50 hover:text-red-600 transition text-center"
                >
                  Log Out
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 rounded-xl border border-red-600 font-bold text-red-600 text-center text-sm"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 rounded-xl bg-red-600 font-bold text-white text-center text-sm shadow-md"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;