import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

function Footer() {
  return (
    <footer id="contact" className="bg-[#FFF8F2] border-t border-[#E8DDD1]">
      <div className="max-w-[1650px] mx-auto px-6 sm:px-10 lg:px-20 py-16 sm:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <h2 className="flex items-center gap-2 text-3xl font-black text-[#252642]">
              🍕 PIZZA<span className="text-red-600">RIO</span>
            </h2>

            <p className="mt-4 text-base leading-relaxed text-gray-600">
              Fresh handcrafted pizzas made with premium mozzarella,
              authentic recipes, and delivered piping hot to your doorstep.
            </p>

            <div className="mt-6 flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-gray-200 text-[#252642] transition hover:bg-red-600 hover:text-white hover:border-red-600 shadow-xs"
              >
                <FaFacebookF />
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-gray-200 text-[#252642] transition hover:bg-red-600 hover:text-white hover:border-red-600 shadow-xs"
              >
                <FaInstagram />
              </a>

              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-gray-200 text-[#252642] transition hover:bg-red-600 hover:text-white hover:border-red-600 shadow-xs"
              >
                <FaTwitter />
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-gray-200 text-[#252642] transition hover:bg-red-600 hover:text-white hover:border-red-600 shadow-xs"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold text-[#252642]">Quick Links</h3>
            <ul className="mt-4 space-y-2.5 text-base text-gray-600">
              <li>
                <Link to="/" className="hover:text-red-600 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/menu" className="hover:text-red-600 transition">
                  Full Menu
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-red-600 transition">
                  Shopping Cart
                </Link>
              </li>
              <li>
                <Link to="/my-orders" className="hover:text-red-600 transition">
                  Order Tracking
                </Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-red-600 transition font-bold text-red-600">
                  Admin Console
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-xl font-bold text-[#252642]">Get in Touch</h3>
            <div className="mt-4 space-y-3 text-sm text-gray-600">
              <div className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-red-600 shrink-0" />
                <span>MG Road, Pune, Maharashtra, India</span>
              </div>
              <div className="flex items-center gap-3">
                <FaPhoneAlt className="text-red-600 shrink-0" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-red-600 shrink-0" />
                <span>support@pizzario.com</span>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-xl font-bold text-[#252642]">Opening Hours</h3>
            <div className="mt-4 space-y-3 text-sm text-gray-600">
              <div>
                <p className="text-xs text-gray-400 uppercase font-semibold">
                  Monday – Friday
                </p>
                <p className="font-bold text-[#252642]">10:00 AM – 11:30 PM</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase font-semibold">
                  Saturday – Sunday
                </p>
                <p className="font-bold text-[#252642]">10:00 AM – 12:30 AM</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-[#E8DDD1] py-6 px-4">
        <div className="max-w-[1650px] mx-auto text-center text-xs text-gray-500">
          © 2026 Pizzario. Developed by{" "}
          <strong className="text-gray-800">Sourabh Patel</strong> • OASIS
          Infobyte Web Development Internship (OIBSIP Level 3).
        </div>
      </div>
    </footer>
  );
}

export default Footer;