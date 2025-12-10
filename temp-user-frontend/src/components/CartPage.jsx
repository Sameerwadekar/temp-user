import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { IndianRupee, Trash2 } from "lucide-react";
import React, { useContext, useEffect } from "react";
import { CartContext } from "./Context/CartContext";
import { useNavigate } from "react-router-dom";

function CartPage() {
  const { cart, getCart, removeFromCart, updateCartQuantity } =
      useContext(CartContext);
    useEffect(() => {
      getCart();
    }, []);
    const navigate = useNavigate()
  return (
    <>
      <div className="w-full flex justify-center py-10 bg-muted/40">
      <Card className="w-full max-w-5xl  shadow-lg p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* ▶ LEFT SIDE — CART ITEMS */}
          <div className="h-[500px] overflow-auto  lg:col-span-2 ">
            <CardHeader>
              <CardTitle className="text-xl">Order Summary</CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              {cart?.items?.length > 0 ? (
                cart.items.map((item) => (
                  <div
                    key={item.cartItemId}
                    className="flex items-center gap-4 rounded-lg p-4 border"
                  >
                    {/* Product Image */}
                    <img
                      src={`http://localhost:8080/products/${item.productId}/image`}
                      alt={item.productName}
                      className="w-20 h-15 rounded-md object-cover"
                    />

                    {/* Name + Quantity */}
                    <div className="flex-1 space-y-1">
                      <p className="font-semibold text-gray-800">
                        {item.productName}
                      </p>

                      <div className="flex items-center gap-2 rounded-md border px-2 py-1 w-fit">
                        <button
                          className="px-2 text-lg cursor-pointer"
                          disabled={item.quantity === 1}
                          onClick={() =>
                            updateCartQuantity(
                              item.cartItemId,
                              item.quantity - 1
                            )
                          }
                        >
                          –
                        </button>
                        <span className="w-6 text-center">{item.quantity}</span>
                        <button
                          className="px-2 text-lg cursor-pointer"
                          onClick={() =>
                            updateCartQuantity(
                              item.cartItemId,
                              item.quantity + 1
                            )
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Price + Delete */}
                    <div className="text-right space-y-1">
                      <button
                        className="text-red-500 hover:text-red-700 mb-1 cursor-pointer"
                        onClick={() => removeFromCart(item.cartItemId)}

                      >
                        <Trash2 size={18} />
                      </button>

                      <p className="font-bold flex justify-end items-center gap-1">
                        <IndianRupee size={15} className="text-red-600"/> <span className="text-red-600">{item.totalPrice}</span>
                      </p>
                      <p className="text-sm text-gray-600 flex justify-end items-center gap-1">
                        <IndianRupee size={13} /> {item.price} each
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500">Cart is Empty</p>
              )}
            </CardContent>
          </div>

          {/* ▶ RIGHT SIDE — BILLING & PRICE SUMMARY */}
          {cart?.items?.length > 0 && (
            <div className="border rounded-lg p-6 bg-white shadow-sm lg:col-span-1">
              <h2 className="text-lg font-semibold">Order Summary</h2>
              <Separator className="my-6" />
              {/* PRICE SUMMARY */}
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <p className="text-muted-foreground">Subtotal</p>
                  <p className="font-medium">₹{cart.cartTotal}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-muted-foreground">Shipping</p>
                  <p className="font-medium text-green-500">FREE</p>
                </div>
                <Separator />
                <div className="flex justify-between text-base font-semibold">
                  <p>Total</p>
                  <p>₹{cart.cartTotal}</p>
                </div>
              </div>

              <Button className="w-full mt-6 cursor-pointer" onClick={() => navigate("/checkout")}>Proceed To Checkout</Button>
            </div>
          )}
        </div>
      </Card>
    </div>
    </>
  );
}

export default CartPage;

