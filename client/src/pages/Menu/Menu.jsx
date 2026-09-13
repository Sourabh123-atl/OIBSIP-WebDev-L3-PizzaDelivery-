import { useState } from "react";
import { FaStar, FaHeart, FaShoppingCart } from "react-icons/fa";

// Image Imports
import pepperoni from "../../assets/pizzas/pepperoni.png";
import margherita from "../../assets/pizzas/margherita.png";
import bbqChicken from "../../assets/pizzas/bbq.png";
import veggie from "../../assets/pizzas/veggie.png";
import cheeseLovers from "../../assets/pizzas/cheese.png";
import meatFeast from "../../assets/pizzas/beef.png";

import beefBurger from "../../assets/Menu/beef-burger.png";
import zingerBurger from "../../assets/Menu/zinger-burger.png";

import pennePasta from "../../assets/Menu/penne-pasta.png";
import alfredoPasta from "../../assets/Menu/alfredo-pasta.png";

import fries from "../../assets/Menu/fries.png";
import garlicBread from "../../assets/Menu/garlic-bread.png";

import coke from "../../assets/Menu/coke.png";
import sprite from "../../assets/Menu/sprite.png";

import brownie from "../../assets/Menu/brownie.png";
import lavaCake from "../../assets/Menu/lava-cake.png";

const menu = [
  // PIZZAS
  { id: 1, name: "Pepperoni Pizza", category: "Pizza", price: 14.99, rating: 4.8, image: pepperoni },
  { id: 2, name: "Margherita Pizza", category: "Pizza", price: 12.99, rating: 4.7, image: margherita },
  { id: 3, name: "BBQ Chicken Pizza", category: "Pizza", price: 16.99, rating: 4.9, image: bbqChicken },
  { id: 4, name: "Veggie Pizza", category: "Pizza", price: 13.99, rating: 4.6, image: veggie },
  { id: 5, name: "Cheese Lovers Pizza", category: "Pizza", price: 15.49, rating: 4.8, image: cheeseLovers },
  { id: 6, name: "Meat Feast Pizza", category: "Pizza", price: 17.99, rating: 5.0, image: meatFeast },

  // BURGERS
  { id: 7, name: "Beef Burger", category: "Burger", price: 9.99, rating: 4.7, image: beefBurger },
  { id: 8, name: "Zinger Burger", category: "Burger", price: 8.99, rating: 4.8, image: zingerBurger },

  // PASTA
  { id: 9, name: "Penne Pasta", category: "Pasta", price: 11.99, rating: 4.6, image: pennePasta },
  { id: 10, name: "Alfredo Pasta", category: "Pasta", price: 12.99, rating: 4.8, image: alfredoPasta },

  // SIDES
  { id: 11, name: "French Fries", category: "Sides", price: 4.99, rating: 4.4, image: fries },
  { id: 12, name: "Garlic Bread", category: "Sides", price: 5.49, rating: 4.6, image: garlicBread },

  // DRINKS
  { id: 13, name: "Coca-Cola", category: "Drinks", price: 2.99, rating: 4.5, image: coke },
  { id: 14, name: "Sprite", category: "Drinks", price: 2.99, rating: 4.4, image: sprite },

  // DESSERTS
  { id: 15, name: "Chocolate Brownie", category: "Desserts", price: 5.99, rating: 4.8, image: brownie },
  { id: 16, name: "Chocolate Lava Cake", category: "Desserts", price: 6.99, rating: 5.0, image: lavaCake },
];

function Menu() {
  const [filteredMenu] = useState(menu);

  return (
    <section className="min-h-screen bg-[#FFF8F2] py-12 px-4 sm:px-8 flex flex-col items-center justify-center">
      
      {/* Centered wrapper that stretches cleanly up to max 1280px */}
      <div className="w-full max-w-[1280px] mx-auto flex flex-col items-center">
        
        {/* Bold Red Menu Heading */}
        <h1 className="text-4xl sm:text-5xl font-black text-red-600 uppercase tracking-widest text-center mb-10">
          MENU
        </h1>

        {/* Menu Grid - Automatically centered across columns */}
        <div className="w-full grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center justify-center">
          {filteredMenu.map((item) => (
            <div
              key={item.id}
              className="w-full max-w-[300px] group overflow-hidden rounded-3xl bg-white shadow-md transition duration-300 hover:-translate-y-1.5 hover:shadow-xl flex flex-col justify-between"
            >
              {/* Image Container */}
              <div className="relative bg-[#FFF8F2] flex items-center justify-center p-4">
                <button 
                  type="button"
                  className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white text-gray-400 shadow-sm transition hover:bg-red-600 hover:text-white cursor-pointer"
                >
                  <FaHeart className="text-sm" />
                </button>

                <img
                  src={item.image}
                  alt={item.name}
                  className="h-48 w-full object-contain transition duration-300 group-hover:scale-105"
                />
              </div>

              {/* Card Body */}
              <div className="p-5 flex flex-col justify-between flex-grow">
                <div>
                  {/* Category & Rating */}
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-600">
                      {item.category}
                    </span>

                    <div className="flex items-center gap-1.5 text-yellow-500 text-sm">
                      <FaStar />
                      <span className="font-bold text-gray-700">
                        {item.rating}
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="mt-3 text-lg font-bold text-[#252642] line-clamp-1">
                    {item.name}
                  </h3>
                </div>

                {/* Price & Add Button */}
                <div className="mt-5 flex items-center justify-between pt-2">
                  <span className="text-xl font-black text-red-600">
                    ${item.price.toFixed(2)}
                  </span>

                  <button
                    type="button"
                    onClick={() => console.log(`${item.name} added to cart`)}
                    className="flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700 active:scale-95 cursor-pointer"
                  >
                    <FaShoppingCart />
                    <span>Add</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Menu;