import pizzaHero from "../assets/pizza-hero.png";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section
      id="home"
      className="bg-gradient-to-b from-[#FFF8F2] via-[#FFF5EC] to-[#FFF1E6] pt-28 pb-16 overflow-hidden"
    >
      <div className="max-w-[1650px] mx-auto px-8 md:px-14 lg:px-20 xl:px-28">

        <div className="grid lg:grid-cols-[46%_54%] items-center">

          {/* LEFT */}

          <div>

            <span className="inline-flex items-center gap-2 rounded-full bg-red-100 px-5 py-2 text-sm font-semibold text-red-600">
              🍕 Freshly Baked Every Day
            </span>

            <h1 className="mt-7 text-[60px] xl:text-[78px] font-black leading-[1.05] text-[#252642]">
              Freshly Crafted
              <br />

              Pizza
              <span className="text-red-600"> Delivered </span>

              <br />

              To Your Door.
            </h1>

            <p className="mt-8 max-w-xl text-xl leading-9 text-gray-600">
              Experience authentic Italian recipes prepared with handcrafted
              dough, premium mozzarella, farm-fresh vegetables and signature
              sauces — delivered hot and fresh straight to your doorstep.
            </p>

            <div className="mt-10 flex flex-wrap gap-5">

              <button className="flex items-center gap-3 rounded-full bg-red-600 px-10 py-5 font-semibold text-white shadow-xl transition duration-300 hover:bg-red-700">

                Order Now

                <FaArrowRight />

              </button>

              <Link
                 to="/menu"
                className="rounded-full border-2 border-red-600 px-10 py-5 font-semibold text-red-600 transition duration-300 hover:bg-red-600 hover:text-white"
              >
                View Menu
              </Link>

            </div>

            <div className="mt-16 flex gap-16">

              <div>

                <h2 className="text-4xl font-bold text-red-600">
                  50+
                </h2>

                <p className="mt-2 text-gray-500">
                  Pizza Varieties
                </p>

              </div>

              <div>

                <h2 className="text-4xl font-bold text-red-600">
                  20K+
                </h2>

                <p className="mt-2 text-gray-500">
                  Happy Customers
                </p>

              </div>

              <div>

                <h2 className="text-4xl font-bold text-red-600">
                  30 min
                </h2>

                <p className="mt-2 text-gray-500">
                  Fast Delivery
                </p>

              </div>

            </div>

          </div>

          {/* RIGHT */}

          <div className="flex justify-end">

            <img
              src={pizzaHero}
              alt="Pizza"
              className="w-[620px] xl:w-[840px] float-animation pizza-shadow"
            />

          </div>

        </div>

      </div>
    </section>
  );
}

export default Hero;