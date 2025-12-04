import React from "react";
import { useContext } from "react";
import { CartContext } from "./Context/CartContext";
import { IndianRupee } from "lucide-react";

function CartPage() {
  const { cart } = useContext(CartContext);
  console.log("cart", cart);
  return (
    <>
      <section class="py-24 relative">
        <div class="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
          <div class="flex items-start flex-col gap-6 xl:flex-row ">
            <div class="w-full max-w-sm md:max-w-3xl max-xl:mx-auto h-[500px] overflow-auto">
              <div class="grid grid-cols-1 gap-6">
                {cart?.items?.length > 0 ? (
                  <>
                    {cart.items.map((cartItem, index) => (
                      <>
                        <div
                          key={index}
                          className="rounded-3xl p-6 bg-gray-100 border border-gray-100 flex flex-col md:flex-row md:items-center gap-5 transition-all duration-500 hover:border-gray-400"
                        >
                          <div className="img-box">
                            <img
                              src="https://pagedone.io/asset/uploads/1701167635.png"
                              alt="Product"
                              className="w-full md:max-w-[122px] rounded-lg object-cover"
                            />
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-3 md:gap-8">
                            <div>
                              <h2 className="font-medium text-xl leading-8 text-black mb-3">
                                {cartItem.productName}
                              </h2>
                              <form class="max-w-xs mx-auto">
                                <div class="flex items-center max-w-[9rem] rounded-lg overflow-hidden border border-gray-300 bg-gray-100">
                                  <button
                                    type="button"
                                    class="flex items-center justify-center w-10 h-10 bg-gray-200 hover:bg-gray-300 border-r border-gray-300 text-gray-700"
                                    onclick="decrementQty()"
                                  >
                                    <svg
                                      class="w-4 h-4"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M5 12h14"
                                      />
                                    </svg>
                                  </button>

                                  <input
                                    type="text"
                                    id="quantity-input"
                                    class="h-10 w-full text-center bg-gray-50 outline-none"
                                    value="1"
                                  />
                                  <button
                                    type="button"
                                    class="flex items-center justify-center w-10 h-10 bg-gray-200 hover:bg-gray-300 border-l border-gray-300 text-gray-700"
                                    onclick="incrementQty()"
                                  >
                                    <svg
                                      class="w-4 h-4"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M5 12h14m-7 7V5"
                                      />
                                    </svg>
                                  </button>
                                </div>
                              </form>
                            </div>
                            <div className="flex items-center  gap-8">
                              <h6 className="font-medium text-xl leading-8 text-indigo-600">
                                Each
                                <span>
                                  <IndianRupee className="inline-block" />
                                  {cartItem.price}
                                </span>
                              </h6>
                              <h6 className="font-medium text-xl leading-8 text-indigo-600">
                                Total
                                <span>
                                  <IndianRupee className="inline-block" />
                                  {cartItem.totalPrice}
                                </span>
                              </h6>
                            </div>
                          </div>
                        </div>
                      </>
                    ))}
                  </>
                ) : (
                  <>
                    <div className="text-center py-4 font-medium text-gray-500">
                      Cart is Empty
                    </div>
                  </>
                )}
              </div>
            </div>
            <div class="w-full max-w-sm md:max-w-3xl xl:max-w-sm flex items-start flex-col gap-8 max-xl:mx-auto">
              <div class="p-6 border border-gray-200 rounded-3xl w-full group transition-all duration-500 hover:border-gray-400 ">
                <h2 class="font-manrope font-bold text-3xl leading-10 text-black pb-6 border-b border-gray-200 ">
                  Order Summary
                </h2>
                <div class="data py-6 border-b border-gray-200">
                  <div class="flex items-center justify-between gap-4 mb-5">
                    <p class="font-normal text-lg leading-8 text-gray-400 transition-all duration-500 group-hover:text-gray-700">
                      Product Cost
                    </p>
                    <p class="font-medium text-lg leading-8 text-gray-900">
                      $360.00
                    </p>
                  </div>
                  <div class="flex items-center justify-between gap-4 mb-5">
                    <p class="font-normal text-lg leading-8 text-gray-400 transition-all duration-500 group-hover:text-gray-700">
                      Shipping
                    </p>
                    <p class="font-medium text-lg leading-8 text-gray-600">
                      $40.00
                    </p>
                  </div>
                  <div class="flex items-center justify-between gap-4 ">
                    <p class="font-normal text-lg leading-8 text-gray-400 transition-all duration-500 group-hover:text-gray-700 ">
                      Coupon Code
                    </p>
                    <p class="font-medium text-lg leading-8 text-emerald-500">
                      #APPLIED
                    </p>
                  </div>
                </div>
                <div class="total flex items-center justify-between pt-6">
                  <p class="font-normal text-xl leading-8 text-black ">
                    Subtotal
                  </p>
                  <h5 class="font-manrope font-bold text-2xl leading-9 text-indigo-600">
                    $400.00
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default CartPage;
