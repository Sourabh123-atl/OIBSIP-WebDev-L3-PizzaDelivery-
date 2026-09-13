import { FaArrowRight } from "react-icons/fa";
import offerPizza from "../assets/offer-pizza.png";

function SpecialOffer() {
  return (
    <section className="bg-[#FFF8F2] py-28">

      <div className="max-w-[1700px] mx-auto px-8 lg:px-20">

        <div className="grid lg:grid-cols-2 overflow-hidden shadow-2xl">

          {/* LEFT */}

          <div className="flex flex-col justify-center bg-gradient-to-br from-[#F6B04E] via-[#F8C15A] to-[#FFD978] px-20 py-24">

            <span className="uppercase tracking-[5px] text-red-600 font-semibold">
              Limited Time Offer
            </span>

            <h2 className="mt-6 text-6xl font-black leading-tight text-[#252642]">
              Buy 1
              <br />
              Get 1 Free
            </h2>

            <p className="mt-8 max-w-lg text-lg leading-9 text-[#5A3A22]">
              Fresh handcrafted pizzas made with premium ingredients,
              authentic Italian recipes and rich mozzarella cheese.
            </p>

            <div className="mt-10">

              <p className="uppercase tracking-[4px] text-sm font-semibold text-red-600">
                Promo Code
              </p>

              <h3 className="mt-2 text-5xl font-black tracking-wider text-[#252642]">
                7P1ZZA
              </h3>

            </div>

            <button className="mt-12 flex w-fit items-center gap-3 bg-red-600 px-8 py-4 text-lg font-semibold text-white transition duration-300 hover:bg-red-700">

              Order Now

              <FaArrowRight />

            </button>

          </div>

          {/* RIGHT */}

          <div className="relative h-[620px]">

            <img
              src={offerPizza}
              alt="Pizza"
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