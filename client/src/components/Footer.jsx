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

      <div className="max-w-[1650px] mx-auto px-10 lg:px-20 py-20">

        <div className="grid gap-14 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}

          <div>

            <h2 className="flex items-center gap-3 text-4xl font-black text-[#252642]">
              🍕 PIZZARIO
            </h2>

            <p className="mt-6 text-lg leading-8 text-gray-600">
              Fresh handcrafted pizzas made with premium ingredients,
              authentic recipes and delivered hot to your doorstep.
            </p>

            <div className="mt-8 flex gap-4">

              <a
                href="#"
                className="flex h-11 w-11 items-center justify-center border border-gray-300 text-[#252642] transition hover:bg-red-600 hover:text-white hover:border-red-600"
              >
                <FaFacebookF />
              </a>

              <a
                href="#"
                className="flex h-11 w-11 items-center justify-center border border-gray-300 text-[#252642] transition hover:bg-red-600 hover:text-white hover:border-red-600"
              >
                <FaInstagram />
              </a>

              <a
                href="#"
                className="flex h-11 w-11 items-center justify-center border border-gray-300 text-[#252642] transition hover:bg-red-600 hover:text-white hover:border-red-600"
              >
                <FaTwitter />
              </a>

              <a
                href="#"
                className="flex h-11 w-11 items-center justify-center border border-gray-300 text-[#252642] transition hover:bg-red-600 hover:text-white hover:border-red-600"
              >
                <FaLinkedinIn />
              </a>

            </div>

          </div>

          {/* Quick Links */}

          <div>

            <h3 className="text-2xl font-bold text-[#252642]">
              Quick Links
            </h3>

            <ul className="mt-6 space-y-4 text-lg text-gray-600">

              <li><a href="#home" className="hover:text-red-600 transition">Home</a></li>
              <li><a href="#menu" className="hover:text-red-600 transition">Menu</a></li>
              <li><a href="#about" className="hover:text-red-600 transition">About</a></li>
              <li><a href="#contact" className="hover:text-red-600 transition">Contact</a></li>

            </ul>

          </div>

          {/* Contact */}

          <div>

            <h3 className="text-2xl font-bold text-[#252642]">
              Contact
            </h3>

            <div className="mt-6 space-y-5 text-lg text-gray-600">

              <div className="flex gap-3">
                <FaMapMarkerAlt className="mt-1 text-red-600"/>
                <span>Karachi, Pakistan</span>
              </div>

              <div className="flex gap-3">
                <FaPhoneAlt className="mt-1 text-red-600"/>
                <span>+92 300 1234567</span>
              </div>

              <div className="flex gap-3">
                <FaEnvelope className="mt-1 text-red-600"/>
                <span>support@pizzario.com</span>
              </div>

            </div>

          </div>

          {/* Opening Hours */}

          <div>

            <h3 className="text-2xl font-bold text-[#252642]">
              Opening Hours
            </h3>

            <div className="mt-6 space-y-5 text-lg text-gray-600">

              <div>

                <p>Mon – Fri</p>

                <p className="font-bold text-[#252642] mt-1">
                  10:00 AM – 11:00 PM
                </p>

              </div>

              <div>

                <p>Sat – Sun</p>

                <p className="font-bold text-[#252642] mt-1">
                  11:00 AM – 12:00 AM
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

      <div className="border-t border-[#E8DDD1]">

        <div className="max-w-[1650px] mx-auto py-6">

          <p className="text-center text-gray-500">
            © 2026 AreeshaKhan. All Rights Reserved. • Crafted with ❤️ for Pizza Lovers.
          </p>

        </div>

      </div>

    </footer>
  );
}

export default Footer;