import { FaStar } from "react-icons/fa";

function Trusted() {
  return (
    <section className="bg-white py-20">

      <div className="max-w-[1650px] mx-auto px-8 md:px-14 lg:px-20 xl:px-28">

        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">

          {/* Left */}

          <div>

            <h2 className="text-4xl font-bold text-[#252642]">
              Trusted by{" "}
              <span className="text-red-600">
                20,000+
              </span>{" "}
              Pizza Lovers
            </h2>

            <p className="mt-4 text-xl text-gray-500 leading-8 max-w-xl">
              Fresh pizzas delivered every day using premium ingredients,
              handcrafted recipes, and lightning-fast delivery.
            </p>

          </div>

          {/* Right */}

          <div className="flex items-center gap-8">

            {/* Customers */}

            <div className="flex -space-x-5">

              <img
                src="https://i.pravatar.cc/90?img=11"
                alt=""
                className="w-16 h-16 rounded-full border-4 border-white shadow-lg"
              />

              <img
                src="https://i.pravatar.cc/90?img=21"
                alt=""
                className="w-16 h-16 rounded-full border-4 border-white shadow-lg"
              />

              <img
                src="https://i.pravatar.cc/90?img=31"
                alt=""
                className="w-16 h-16 rounded-full border-4 border-white shadow-lg"
              />

              <img
                src="https://i.pravatar.cc/90?img=41"
                alt=""
                className="w-16 h-16 rounded-full border-4 border-white shadow-lg"
              />

            </div>

            {/* Rating */}

            <div>

              <div className="flex gap-1 text-yellow-500 text-xl">

                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />

              </div>

              <p className="mt-2 text-lg font-medium text-gray-600">
                4.9 / 5 from over 20,000 customers
              </p>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Trusted;