import { FaStar, FaHeart } from "react-icons/fa";

function PizzaCard({ pizza }) {
  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-[30px] bg-white p-8 shadow-lg transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl">
      {/* Favorite Button */}
      <button className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-red-50 text-red-500 transition hover:bg-red-600 hover:text-white">
        <FaHeart />
      </button>

      {/* Pizza Image */}
      <div className="flex justify-center">
        <img
          src={pizza.image}
          alt={pizza.name}
          className="h-64 w-64 object-contain transition duration-500 group-hover:scale-110 group-hover:rotate-6"
        />
      </div>

      {/* Rating */}
      <div className="mt-6 flex items-center justify-between">

        <span className="flex items-center gap-2 rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">
          <FaStar />
          {pizza.rating}
        </span>

        <span className="text-sm font-semibold uppercase tracking-wide text-red-500">
          Popular
        </span>

      </div>

      {/* Name */}
      <h3 className="mt-6 text-3xl font-bold text-[#252642]">
        {pizza.name}
      </h3>

      {/* Description */}
      <p className="mt-3 leading-7 text-gray-500">
        {pizza.description}
      </p>

      {/* Bottom */}
      <div className="mt-8">

        <h4 className="text-4xl font-extrabold text-red-600 text-center">
          ${pizza.price}
        </h4>

        <button className="mt-5 w-full rounded-2xl bg-red-600 py-4 font-semibold text-white shadow-md transition-all duration-300 hover:bg-red-700 hover:shadow-lg">
          Add To Cart
        </button>

      </div>

    </div>
  );
}

export default PizzaCard;