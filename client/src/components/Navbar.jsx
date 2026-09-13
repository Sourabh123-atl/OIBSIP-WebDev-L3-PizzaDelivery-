import { Link } from "react-router-dom";
import { FaBars, FaShoppingCart } from "react-icons/fa";

function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">

      <div className="max-w-[1650px] mx-auto h-[90px] px-8 md:px-14 lg:px-20 xl:px-28 flex items-center justify-between">

        {/* Logo */}

        <Link
          to="/"
          className="flex items-center gap-3"
        >

          <span className="text-4xl">
            🍕
          </span>

          <span className="text-[38px] font-black tracking-tight text-[#252642]">
            PIZZARIO
          </span>

        </Link>

        {/* Desktop Navigation */}

        <nav className="hidden lg:flex items-center gap-12 text-[18px] font-semibold text-gray-700">

          <Link
            to="/"
            className="hover:text-red-600 transition duration-300"
          >
            Home
          </Link>

          <Link
            to="/menu"
            className="hover:text-red-600 transition duration-300"
          >
            Menu
          </Link>

          <a
            href="/#about"
            className="hover:text-red-600 transition duration-300"
          >
            About
          </a>

          <a
            href="/#contact"
            className="hover:text-red-600 transition duration-300"
          >
            Contact
          </a>

        </nav>

        {/* Right Side */}

        <div className="hidden lg:flex items-center gap-5">

          <Link
            to="/cart"
            className="relative text-2xl text-gray-700 transition hover:text-red-600"
          >

            <FaShoppingCart />

            <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[11px] font-bold text-white">
              0
            </span>

          </Link>

          <Link
            to="/login"
            className="rounded-full border-2 border-red-600 px-8 py-3 font-semibold text-red-600 transition duration-300 hover:bg-red-600 hover:text-white"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="rounded-full bg-red-600 px-8 py-3 font-semibold text-white shadow-lg transition duration-300 hover:bg-red-700"
          >
            Register
          </Link>

        </div>

        {/* Mobile */}

        <button className="lg:hidden text-3xl text-red-600">
          <FaBars />
        </button>

      </div>

    </header>
  );
}

export default Navbar;