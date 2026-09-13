import { useState } from "react";
import { FaPlus, FaMinus, FaTrash, FaArrowRight, FaTag } from "react-icons/fa";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useCart } from "../../context/CartContext";
import { toast } from "react-toastify";

function Cart() {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    deliveryFee,
    tax,
    total,
  } = useCart();

  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);

  const applyCoupon = (e) => {
    e.preventDefault();
    if (coupon.trim().toUpperCase() === "PIZZA20") {
      const discountVal = Number((subtotal * 0.2).toFixed(2));
      setDiscount(discountVal);
      setCouponApplied(true);
      toast.success("Coupon 'PIZZA20' applied! 20% discount granted! 🎉");
    } else if (coupon.trim().toUpperCase() === "FREEDELIVERY") {
      setDiscount(deliveryFee);
      setCouponApplied(true);
      toast.success("Coupon applied! Free delivery! 🚚");
    } else {
      toast.error("Invalid coupon code. Try 'PIZZA20' for 20% off.");
    }
  };

  const finalTotal = Number(Math.max(0, total - discount).toFixed(2));

  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-[#FFF8F2] pt-32 pb-20 px-4 sm:px-8">
        <div className="w-full max-w-[1280px] mx-auto flex flex-col items-center">
          {/* Header */}
          <div className="text-center mb-10">
            <span className="inline-block rounded-full bg-red-100 px-5 py-2 text-sm font-bold text-red-600 uppercase tracking-widest">
              Review Your Delicious Order
            </span>
            <h1 className="mt-4 text-4xl sm:text-5xl font-black text-red-600 uppercase tracking-tight">
              YOUR CART
            </h1>
            <p className="mt-2 text-gray-500 font-medium">
              Review and customize your items before proceeding to checkout.
            </p>
          </div>

          {/* Cart Content */}
          <div className="w-full grid gap-10 lg:grid-cols-3 justify-center items-start">
            {/* Cart Items List */}
            <div className="lg:col-span-2 space-y-4 w-full">
              {cart.length === 0 ? (
                <div className="rounded-3xl bg-white p-12 text-center shadow-md flex flex-col items-center justify-center border border-orange-50">
                  <div className="w-24 h-24 rounded-full bg-red-50 flex items-center justify-center text-4xl mb-4">
                    🍕
                  </div>
                  <h2 className="text-2xl font-black text-[#252642]">
                    Your cart is currently empty
                  </h2>
                  <p className="mt-2 text-gray-500 max-w-md">
                    Looks like you haven't added any delicious pizzas or treats yet! Check out our menu and treat yourself.
                  </p>
                  <Link
                    to="/menu"
                    className="mt-6 px-8 py-3.5 rounded-full bg-red-600 text-white font-bold text-sm shadow-md hover:bg-red-700 transition active:scale-95"
                  >
                    Browse Our Menu
                  </Link>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-center px-2">
                    <span className="text-sm font-bold text-gray-500">
                      {cart.length} unique item{cart.length > 1 ? "s" : ""}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        clearCart();
                        toast.info("Cart cleared.");
                      }}
                      className="text-xs font-bold text-red-600 hover:underline cursor-pointer"
                    >
                      Clear All Items
                    </button>
                  </div>

                  {cart.map((item) => {
                    const itemId = item._id || item.id;
                    return (
                      <div
                        key={itemId}
                        className="rounded-3xl bg-white p-5 sm:p-6 shadow-sm hover:shadow-md transition duration-300 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 border border-orange-50"
                      >
                        {/* Thumbnail & Info */}
                        <div className="flex items-center gap-4 w-full sm:w-auto">
                          <div className="h-20 w-20 flex-shrink-0 rounded-2xl bg-[#FFF8F2] p-2 flex items-center justify-center">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="h-full w-full object-contain"
                            />
                          </div>

                          <div>
                            <h2 className="text-lg sm:text-xl font-bold text-[#252642]">
                              {item.name}
                            </h2>
                            <p className="mt-1 text-base font-black text-red-600">
                              ${Number(item.price).toFixed(2)}
                            </p>
                          </div>
                        </div>

                        {/* Quantity Controls & Total */}
                        <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-0 border-gray-100">
                          {/* Quantity Selector */}
                          <div className="flex items-center gap-2 bg-[#FFF8F2] p-1.5 rounded-2xl">
                            <button
                              type="button"
                              onClick={() => decreaseQuantity(itemId)}
                              className="flex h-8 w-8 items-center justify-center rounded-xl bg-white text-gray-600 shadow-sm hover:bg-gray-100 transition active:scale-95 cursor-pointer"
                              title="Decrease"
                            >
                              <FaMinus className="text-xs" />
                            </button>

                            <span className="w-8 text-center text-base font-bold text-[#252642]">
                              {item.quantity}
                            </span>

                            <button
                              type="button"
                              onClick={() => increaseQuantity(itemId)}
                              className="flex h-8 w-8 items-center justify-center rounded-xl bg-red-600 text-white shadow-sm hover:bg-red-700 transition active:scale-95 cursor-pointer"
                              title="Increase"
                            >
                              <FaPlus className="text-xs" />
                            </button>
                          </div>

                          {/* Item Total & Remove */}
                          <div className="flex items-center gap-4">
                            <span className="text-lg font-black text-[#252642] min-w-[70px] text-right">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>

                            <button
                              type="button"
                              onClick={() => {
                                removeFromCart(itemId);
                                toast.info(`${item.name} removed from cart`);
                              }}
                              className="flex h-9 w-9 items-center justify-center rounded-full text-gray-400 hover:text-red-600 hover:bg-red-50 transition cursor-pointer"
                              title="Remove"
                            >
                              <FaTrash className="text-base" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </>
              )}
            </div>

            {/* Order Summary Sidebar */}
            <div className="rounded-3xl bg-white p-6 sm:p-8 shadow-md w-full border border-orange-50 sticky top-28">
              <h2 className="text-2xl font-black text-[#252642]">
                Order Summary
              </h2>

              {/* Coupon Code Section */}
              <form onSubmit={applyCoupon} className="mt-6">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                  Have a Promo Code?
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <FaTag className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
                    <input
                      type="text"
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                      placeholder="Try 'PIZZA20'"
                      disabled={couponApplied}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 text-xs font-bold uppercase tracking-wider focus:outline-none focus:border-red-600 uppercase"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={couponApplied || !coupon}
                    className="px-4 py-2.5 rounded-xl bg-gray-900 hover:bg-red-600 disabled:opacity-50 text-white text-xs font-bold transition cursor-pointer"
                  >
                    {couponApplied ? "Applied" : "Apply"}
                  </button>
                </div>
              </form>

              <div className="mt-6 space-y-3 text-sm text-gray-600 border-t border-gray-100 pt-5">
                <div className="flex justify-between font-medium">
                  <span>Subtotal</span>
                  <span className="font-bold text-[#252642]">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between font-medium">
                  <span>Delivery Fee</span>
                  <span className="font-bold text-[#252642]">
                    ${deliveryFee.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between font-medium">
                  <span>Estimated Tax (10%)</span>
                  <span className="font-bold text-[#252642]">
                    ${tax.toFixed(2)}
                  </span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between font-bold text-green-600 bg-green-50 p-2 rounded-lg">
                    <span>Discount</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}

                <hr className="border-gray-100 my-2" />

                <div className="flex justify-between text-xl font-black text-[#252642]">
                  <span>Total Amount</span>
                  <span className="text-red-600">${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              <Link
                to="/checkout"
                state={{ discount, coupon: couponApplied ? coupon : null }}
                className={`mt-6 flex w-full items-center justify-center gap-2 rounded-xl py-4 text-base font-bold text-white shadow-md transition ${
                  cart.length === 0
                    ? "pointer-events-none bg-red-600 opacity-50 cursor-not-allowed"
                    : "bg-red-600 hover:bg-red-700 active:scale-95 shadow-red-200"
                }`}
              >
                <span>Proceed to Checkout</span>
                <FaArrowRight className="text-sm" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Cart;