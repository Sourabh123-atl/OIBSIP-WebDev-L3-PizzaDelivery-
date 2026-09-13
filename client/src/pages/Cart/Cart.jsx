import { useState } from "react";
import { FaPlus, FaMinus, FaTrash, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

// Image Imports
import pepperoni from "../../assets/pizzas/pepperoni.png";
import beefBurger from "../../assets/Menu/beef-burger.png";

function Cart() {
  const [cart, setCart] = useState([
    {
      id: 1,
      name: "Pepperoni Pizza",
      price: 14.99,
      quantity: 1,
      image: pepperoni,
    },
    {
      id: 2,
      name: "Beef Burger",
      price: 9.99,
      quantity: 2,
      image: beefBurger,
    },
  ]);

  const increase = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decrease = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const delivery = cart.length ? 3.99 : 0;
  const tax = subtotal * 0.1;
  const total = subtotal + delivery + tax;

  return (
    <section className="min-h-screen bg-[#FFF8F2] py-12 px-4 sm:px-8 flex flex-col items-center justify-center">
      
      {/* Main Centered Container */}
      <div className="w-full max-w-[1280px] mx-auto flex flex-col items-center">

        {/* Bold Red Cart Heading */}
        <div className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-black text-red-600 uppercase tracking-widest text-center">
            YOUR CART
          </h1>
          <p className="mt-3 text-gray-500 font-medium">
            Review your selected items before checkout.
          </p>
        </div>

        {/* Content Section */}
        <div className="w-full grid gap-10 lg:grid-cols-3 justify-center items-start">

          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-4 w-full max-w-[800px] mx-auto">
            {cart.length === 0 ? (
              <div className="rounded-3xl bg-white p-12 text-center shadow-md flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold text-[#252642]">
                  Your cart is empty
                </h2>
                <p className="mt-2 text-gray-500">
                  Add some delicious food from the menu.
                </p>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="rounded-3xl bg-white p-5 sm:p-6 shadow-md hover:shadow-lg transition duration-300 flex flex-col sm:flex-row items-center justify-between gap-6"
                >
                  {/* Left Side: Thumbnail & Details */}
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    {item.image && (
                      <div className="h-20 w-20 flex-shrink-0 rounded-2xl bg-[#FFF8F2] p-2 flex items-center justify-center">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-contain"
                        />
                      </div>
                    )}

                    <div>
                      <h2 className="text-lg sm:text-xl font-bold text-[#252642]">
                        {item.name}
                      </h2>
                      <p className="mt-1 text-base font-black text-red-600">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  {/* Right Side: Quantity Controls & Delete */}
                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-0 border-gray-100">
                    {/* Quantity Selector */}
                    <div className="flex items-center gap-3 bg-[#FFF8F2] p-1.5 rounded-2xl">
                      <button
                        type="button"
                        onClick={() => decrease(item.id)}
                        className="flex h-8 w-8 items-center justify-center rounded-xl bg-white text-gray-600 shadow-sm hover:bg-gray-100 transition active:scale-95 cursor-pointer"
                      >
                        <FaMinus className="text-xs" />
                      </button>

                      <span className="w-6 text-center text-base font-bold text-[#252642]">
                        {item.quantity}
                      </span>

                      <button
                        type="button"
                        onClick={() => increase(item.id)}
                        className="flex h-8 w-8 items-center justify-center rounded-xl bg-red-600 text-white shadow-sm hover:bg-red-700 transition active:scale-95 cursor-pointer"
                      >
                        <FaPlus className="text-xs" />
                      </button>
                    </div>

                    {/* Total Price for item & Delete Button */}
                    <div className="flex items-center gap-4">
                      <span className="text-lg font-black text-[#252642]">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>

                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="flex h-9 w-9 items-center justify-center rounded-full text-gray-400 hover:text-red-600 hover:bg-red-50 transition cursor-pointer"
                      >
                        <FaTrash className="text-base" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="rounded-3xl bg-white p-6 sm:p-8 shadow-md w-full max-w-[400px] mx-auto lg:max-w-none">
            <h2 className="text-2xl font-extrabold text-[#252642]">
              Order Summary
            </h2>

            <div className="mt-6 space-y-4 text-gray-600">
              <div className="flex justify-between font-medium">
                <span>Subtotal</span>
                <span className="font-bold text-[#252642]">${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between font-medium">
                <span>Delivery</span>
                <span className="font-bold text-[#252642]">${delivery.toFixed(2)}</span>
              </div>

              <div className="flex justify-between font-medium">
                <span>Tax (10%)</span>
                <span className="font-bold text-[#252642]">${tax.toFixed(2)}</span>
              </div>

              <hr className="border-gray-100 my-2" />

              <div className="flex justify-between text-xl font-black text-[#252642]">
                <span>Total</span>
                <span className="text-red-600">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>

            <Link
              to="/checkout"
              className={`mt-8 flex w-full items-center justify-center gap-2 rounded-xl py-4 text-base font-bold text-white shadow-md transition ${
                cart.length === 0
                  ? "pointer-events-none bg-red-600 opacity-50 cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-700 active:scale-95"
              }`}
            >
              <span>Proceed to Checkout</span>
              <FaArrowRight className="text-sm" />
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}

export default Cart;