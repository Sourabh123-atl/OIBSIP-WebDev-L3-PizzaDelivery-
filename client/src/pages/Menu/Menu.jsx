import { useState, useEffect } from "react";
import { FaStar, FaHeart, FaShoppingCart, FaSearch } from "react-icons/fa";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useCart } from "../../context/CartContext";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../../config/api";

// Local image imports for reliable fallbacks
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

const fallbackMenu = [
  { id: "1", name: "Pepperoni Pizza", category: "Pizza", price: 14.99, rating: 4.8, image: pepperoni, description: "Loaded with crispy pepperoni and rich mozzarella." },
  { id: "2", name: "Margherita Pizza", category: "Pizza", price: 12.99, rating: 4.7, image: margherita, description: "Classic Italian basil, ripe tomatoes, and fresh mozzarella." },
  { id: "3", name: "BBQ Chicken Pizza", category: "Pizza", price: 16.99, rating: 4.9, image: bbqChicken, description: "Grilled chicken breast with tangy BBQ sauce and red onion." },
  { id: "4", name: "Veggie Pizza", category: "Pizza", price: 13.99, rating: 4.6, image: veggie, description: "Garden fresh bell peppers, onions, olives, and mushrooms." },
  { id: "5", name: "Cheese Lovers Pizza", category: "Pizza", price: 15.49, rating: 4.8, image: cheeseLovers, description: "Extra gooey blend of aged cheddar and shredded mozzarella." },
  { id: "6", name: "Meat Feast Pizza", category: "Pizza", price: 17.99, rating: 5.0, image: meatFeast, description: "Loaded with seasoned beef, sausage, and crispy toppings." },
  { id: "7", name: "Beef Burger", category: "Burger", price: 9.99, rating: 4.7, image: beefBurger, description: "Juicy flame-broiled beef patty with melted cheese." },
  { id: "8", name: "Zinger Burger", category: "Burger", price: 8.99, rating: 4.8, image: zingerBurger, description: "Spicy crisp-fried chicken fillet with garlic mayo." },
  { id: "9", name: "Penne Pasta", category: "Pasta", price: 11.99, rating: 4.6, image: pennePasta, description: "Al dente penne in authentic Italian spiced tomato sauce." },
  { id: "10", name: "Alfredo Pasta", category: "Pasta", price: 12.99, rating: 4.8, image: alfredoPasta, description: "Rich garlic butter parmesan cream sauce." },
  { id: "11", name: "French Fries", category: "Sides", price: 4.99, rating: 4.4, image: fries, description: "Crispy golden french fries seasoned with sea salt." },
  { id: "12", name: "Garlic Bread", category: "Sides", price: 5.49, rating: 4.6, image: garlicBread, description: "Toasted baguette spread with savory roasted garlic butter." },
  { id: "13", name: "Coca-Cola", category: "Drinks", price: 2.99, rating: 4.5, image: coke, description: "Chilled classic refreshing beverage (500ml)." },
  { id: "14", name: "Sprite", category: "Drinks", price: 2.99, rating: 4.4, image: sprite, description: "Zesty lemon-lime thirst quencher (500ml)." },
  { id: "15", name: "Chocolate Brownie", category: "Desserts", price: 5.99, rating: 4.8, image: brownie, description: "Warm, fudgy chocolate brownie with chocolate fudge." },
  { id: "16", name: "Chocolate Lava Cake", category: "Desserts", price: 6.99, rating: 5.0, image: lavaCake, description: "Warm molten center cake bursting with cocoa ganache." },
];

const categories = ["All", "Pizza", "Burger", "Pasta", "Sides", "Drinks", "Desserts"];

function Menu() {
  const { addToCart } = useCart();
  const [menuItems, setMenuItems] = useState(fallbackMenu);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites] = useState({});

  useEffect(() => {
    // Try fetching from backend API
    fetch(`${API_BASE_URL}/pizzas`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data && data.data.length > 0) {
          // Map backend items or mix with images
          const merged = data.data.map((item, i) => {
            const match = fallbackMenu.find(
              (f) => f.name.toLowerCase() === item.name.toLowerCase()
            );
            return {
              ...item,
              id: item._id || item.id,
              image: match ? match.image : item.image || fallbackMenu[i % fallbackMenu.length].image,
            };
          });
          setMenuItems(merged);
        }
      })
      .catch(() => {
        // use fallbackMenu
      });
  }, []);

  const toggleFavorite = (id) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
    toast.info(!favorites[id] ? "Added to favorites!" : "Removed from favorites", {
      autoClose: 1500,
    });
  };

  const handleAddToCart = (item) => {
    addToCart(item);
    toast.success(`${item.name} added to cart! 🍕`, {
      autoClose: 2000,
    });
  };

  const filteredItems = menuItems.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" ||
      item.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-[#FFF8F2] pt-32 pb-20 px-4 sm:px-8">
        <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="inline-block rounded-full bg-red-100 px-5 py-2 text-sm font-bold text-red-600 uppercase tracking-widest">
              Taste the Goodness
            </span>
            <h1 className="mt-4 text-4xl sm:text-5xl font-black text-[#252642] uppercase tracking-tight">
              EXPLORE OUR <span className="text-red-600">MENU</span>
            </h1>
            <p className="mt-3 text-gray-600 text-base sm:text-lg">
              Freshly handcrafted pizzas, juicy burgers, authentic pastas, sides, and refreshing drinks.
            </p>
          </div>

          {/* Search & Filter Bar */}
          <div className="w-full max-w-4xl mx-auto mb-10 flex flex-col sm:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full sm:w-80">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search favorite item..."
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white border border-gray-200 text-sm focus:outline-none focus:border-red-600 shadow-sm"
              />
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap gap-2 justify-center sm:justify-end w-full">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition duration-200 cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-red-600 text-white shadow-md shadow-red-200"
                      : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Menu Grid */}
          {filteredItems.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl p-10 shadow-sm max-w-md w-full">
              <span className="text-5xl">🔍</span>
              <h3 className="mt-4 text-xl font-bold text-gray-800">No items found</h3>
              <p className="mt-2 text-sm text-gray-500">
                Try searching for something else or switch categories.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchTerm("");
                }}
                className="mt-5 px-6 py-2.5 bg-red-600 text-white text-sm font-bold rounded-xl"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="w-full grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="w-full max-w-[320px] group overflow-hidden rounded-3xl bg-white shadow-md hover:shadow-2xl transition duration-300 hover:-translate-y-1.5 flex flex-col justify-between border border-orange-50"
                >
                  {/* Image Container */}
                  <div className="relative bg-[#FFF8F2]/70 flex items-center justify-center p-6 h-52">
                    <button
                      type="button"
                      onClick={() => toggleFavorite(item.id)}
                      className={`absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full transition shadow-sm cursor-pointer ${
                        favorites[item.id]
                          ? "bg-red-600 text-white"
                          : "bg-white text-gray-400 hover:bg-red-600 hover:text-white"
                      }`}
                    >
                      <FaHeart className="text-sm" />
                    </button>

                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-44 w-auto object-contain transition duration-300 group-hover:scale-105"
                    />
                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex flex-col justify-between flex-grow">
                    <div>
                      {/* Category & Rating */}
                      <div className="flex items-center justify-between">
                        <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-600">
                          {item.category}
                        </span>

                        <div className="flex items-center gap-1.5 text-yellow-500 text-sm font-bold">
                          <FaStar />
                          <span className="text-gray-700">
                            {item.rating || 4.8}
                          </span>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="mt-3 text-lg font-extrabold text-[#252642] group-hover:text-red-600 transition line-clamp-1">
                        {item.name}
                      </h3>

                      {/* Description */}
                      <p className="mt-1 text-xs text-gray-500 line-clamp-2">
                        {item.description || "Prepared fresh upon ordering."}
                      </p>
                    </div>

                    {/* Price & Add Button */}
                    <div className="mt-5 flex items-center justify-between pt-3 border-t border-gray-100">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-gray-400">Price</span>
                        <div className="text-xl font-black text-red-600">
                          ${Number(item.price).toFixed(2)}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleAddToCart(item)}
                        className="flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-red-700 active:scale-95 cursor-pointer"
                      >
                        <FaShoppingCart />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Menu;