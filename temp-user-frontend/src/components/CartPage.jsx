import React, { useEffect } from "react";
import { useContext } from "react";
import { CartContext } from "./Context/CartContext";
import { IndianRupee } from "lucide-react";

function CartPage() {
  const { cart, getCart, removeFromCart, updateCartQuantity } =
    useContext(CartContext);
  useEffect(() => {
    getCart();
   
  }, []);

   console.log("cartPage",cart);

  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId);
  };

  const handleUpdateQuantity = (cartItemId, quantity) => {
    updateCartQuantity(cartItemId, quantity);
  };

  return (
    <>
      <section className="py-24 relative">
        <div className="w-full max-w-7xl px-4 md:px-5 lg:px-6 mx-auto">
          <div className="flex items-start flex-col gap-6 xl:flex-row">
            {/* 🔹 LEFT — CART ITEMS (scrolling area) */}
            <div className="w-full max-w-sm md:max-w-3xl max-xl:mx-auto h-[500px] overflow-auto">
              <div className="grid grid-cols-1 gap-6">
                {cart?.items?.length > 0 ? (
                  <>
                    {cart.items.map((cartItem, index) => (
                      <div
                        key={index}
                        className="rounded-3xl p-6 bg-gray-100 border border-gray-100 flex flex-col md:flex-row md:items-center gap-5 transition-all duration-500 hover:border-gray-400"
                      >
                        <div className="img-box">
                          <img
                            src={`http://localhost:8080/products/${cartItem.productId}/image`}
                            alt="Product"
                            className="w-full md:max-w-[122px] rounded-lg object-cover"
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-3 md:gap-8">
                          <div>
                            <h2 className="font-medium text-xl leading-8 text-black mb-3">
                              {cartItem.productName}
                            </h2>

                            {/* Quantity Counter */}
                            <div className="flex items-center max-w-36 rounded-lg overflow-hidden border border-gray-300 bg-gray-100">
                              <button
                                type="button"
                                className="flex items-center justify-center w-10 h-10 bg-gray-200 hover:bg-gray-300 border-r border-gray-300 text-gray-700"
                                onClick={() =>
                                  handleUpdateQuantity(
                                    cartItem.cartItemId,
                                    cartItem.quantity - 1
                                  )
                                }
                                disabled={cartItem.quantity === 1}
                              >
                                −
                              </button>

                              <input
                                type="text"
                                className="h-10 w-full text-center bg-gray-50 outline-none"
                                readOnly
                                value={cartItem.quantity}
                              />

                              <button
                                type="button"
                                className="flex items-center justify-center w-10 h-10 bg-gray-200 hover:bg-gray-300 border-l border-gray-300 text-gray-700"
                                onClick={() =>
                                  handleUpdateQuantity(
                                    cartItem.cartItemId,
                                    cartItem.quantity + 1
                                  )
                                }
                              >
                                +
                              </button>
                            </div>
                          </div>

                          <div className="flex items-center  gap-8">
                            <div className="price-container">
                              <h6 className="font-medium text-xl leading-8 text-indigo-600">
                                Each
                                <span>
                                  <IndianRupee className="inline-block" />
                                  <span className="price">
                                    {cartItem.price}
                                  </span>
                                </span>
                              </h6>
                              <h6 className="font-medium text-xl leading-8 text-indigo-600">
                                Total
                                <span>
                                  <IndianRupee className="inline-block" />
                                  <span className="price">
                                    {cartItem.totalPrice}
                                  </span>
                                </span>
                              </h6>
                            </div>
                          </div>
                        </div>

                        <button
                          type="button"
                          className="text-red-500 text-sm font-medium hover:text-red-700 transition-all duration-300"
                          onClick={() =>
                            handleRemoveFromCart(cartItem.productId)
                          }
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </>
                ) : (
                  <div className="text-center py-4 font-medium text-gray-500">
                    Cart is Empty
                  </div>
                )}
              </div>
            </div>

            {/* 🔹 RIGHT — ORDER SUMMARY (NOT inside scroll) */}
            {cart?.items?.length > 0 && (
              <div className="p-6 border border-gray-200 rounded-3xl w-full max-w-[420px] transition-all duration-500 hover:border-gray-400">
                <h2 className="font-manrope font-bold text-3xl leading-10 text-black pb-6 border-b border-gray-200">
                  Order Summary
                </h2>

                <div className="py-6 border-b border-gray-200">
                  <div className="flex items-center justify-between mb-5">
                    <p className="text-lg text-gray-400">Subtotal</p>
                    <p className="text-lg text-gray-900">Rs.{cart.cartTotal}</p>
                  </div>

                  <div className="flex items-center justify-between mb-5">
                    <p className="text-lg text-gray-400">Shipping</p>
                    <p className="text-lg text-emerald-500">#FREE</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-6">
                  <p className="text-xl text-black">Subtotal</p>
                  <h5 className="font-bold text-2xl text-indigo-600">
                    Rs.{cart.cartTotal}
                  </h5>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default CartPage;
