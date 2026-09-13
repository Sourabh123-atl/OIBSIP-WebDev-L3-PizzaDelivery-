import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import offerPizza from "../assets/offer-pizza.png";

function SpecialOffer() {
  return (
    <section className="bg-[#FFF8F2] py-20 sm:py-28">
      <div className="max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-20">
        <div className="grid lg:grid-cols-2 overflow-hidden rounded-3xl shadow-2xl">
          {/* LEFT */}
          <div className="flex flex-col justify-center bg-gradient-to-br from-[#F6B04E] via-[#F8C15A] to-[#FFD978] px-8 sm:px-16 lg:px-20 py-16 lg:py-24">
            <span className="uppercase tracking-[4px] text-red-600 font-bold text-xs sm:text-sm">
              Limited Time Offer
            </span>

            <h2 className="mt-4 text-4xl sm:text-6xl font-black leading-tight text-[#252642]">
              Buy 1
              <br />
              Get 1 Free
            </h2>

            <p className="mt-6 max-w-lg text-base sm:text-lg leading-relaxed text-[#5A3A22]">
              Fresh handcrafted pizzas made with premium mozzarella,
              authentic Italian sauces, and wood-fired crust.
            </p>

            <div className="mt-8">
              <p className="uppercase tracking-[3px] text-xs font-bold text-red-600">
                Promo Code
              </p>
              <h3 className="mt-1 text-3xl sm:text-4xl font-black tracking-wider text-[#252642]">
                PIZZA20
              </h3>
            </div>

            <Link
              to="/menu"
              className="mt-10 flex w-fit items-center gap-3 rounded-full bg-red-600 px-8 py-4 text-base font-bold text-white transition duration-300 hover:bg-red-700 shadow-lg hover:shadow-red-900/20 active:scale-95"
            >
              <span>Claim Offer</span>
              <FaArrowRight />
            </Link>
          </div>

          {/* RIGHT */}
          <div className="relative h-[360px] sm:h-[480px] lg:h-[600px]">
            <img
              src={offerPizza}
              alt="Special Pizza Offer"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SpecialOffer;