import { useState } from "react";
import { FaStar, FaHeart, FaShoppingCart } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";

function PizzaCard({ pizza }) {
  const { addToCart } = useCart();
  const [isFavorite, setIsFavorite] = useState(false);

  const handleAddToCart = () => {
    addToCart(pizza);
    toast.success(`${pizza.name} added to cart! 🍕`, {
      autoClose: 2000,
    });
  };

  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-[30px] bg-white p-6 sm:p-8 shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-orange-50">
      {/* Favorite Button */}
      <button
        type="button"
        onClick={() => {
          setIsFavorite(!isFavorite);
          toast.info(
            !isFavorite ? `Added to favorites!` : `Removed from favorites`,
            { autoClose: 1500 }
          );
        }}
        className={`absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full transition cursor-pointer shadow-sm ${
          isFavorite
            ? "bg-red-600 text-white"
            : "bg-red-50 text-red-500 hover:bg-red-600 hover:text-white"
        }`}
        title="Favorite"
      >
        <FaHeart />
      </button>

      {/* Pizza Image */}
      <div className="flex justify-center items-center h-56 sm:h-64 overflow-hidden rounded-2xl bg-[#FFF8F2]/60 p-4">
        <img
          src={pizza.image}
          alt={pizza.name}
          className="h-48 sm:h-56 w-auto object-contain transition duration-500 group-hover:scale-110 group-hover:rotate-6"
        />
      </div>

      {/* Rating & Tag */}
      <div className="mt-6 flex items-center justify-between">
        <span className="flex items-center gap-1.5 rounded-full bg-yellow-100 px-3.5 py-1.5 text-xs sm:text-sm font-bold text-yellow-800">
          <FaStar className="text-yellow-500" />
          {pizza.rating || 4.8}
        </span>

        <span className="text-xs font-bold uppercase tracking-wider text-red-600 bg-red-50 px-3 py-1 rounded-full">
          {pizza.category || "Signature"}
        </span>
      </div>

      {/* Name */}
      <h3 className="mt-4 text-2xl font-black text-[#252642] group-hover:text-red-600 transition">
        {pizza.name}
      </h3>

      {/* Description */}
      <p className="mt-2 text-sm leading-relaxed text-gray-500 flex-grow line-clamp-2">
        {pizza.description}
      </p>

      {/* Bottom Action */}
      <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
        <div>
          <span className="text-xs text-gray-400 uppercase font-semibold">Price</span>
          <h4 className="text-2xl sm:text-3xl font-black text-red-600">
            ${Number(pizza.price).toFixed(2)}
          </h4>
        </div>

        <button
          type="button"
          onClick={handleAddToCart}
          className="flex items-center gap-2 rounded-2xl bg-red-600 px-5 py-3 text-sm font-bold text-white shadow-md transition-all duration-300 hover:bg-red-700 hover:shadow-lg active:scale-95 cursor-pointer"
        >
          <FaShoppingCart />
          <span>Add</span>
        </button>
      </div>
    </div>
  );
}

export default PizzaCard;