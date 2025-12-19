import React, { useEffect, useContext } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectTrigger,
  SelectItem,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";
import {
  RadioGroup,
  RadioGroupItem
} from "@/components/ui/radio-group";

import { CartContext } from "./Context/CartContext";

export default function CheckOutPage() {
  const { cart, getCart } = useContext(CartContext);

  useEffect(() => {
    getCart();
  }, []);

  return (
    <div className="w-full flex flex-col lg:flex-row gap-6 p-6 bg-gray-50 min-h-screen">
      {/* LEFT SIDE */}
      <div className="w-full lg:w-1/3 flex flex-col gap-4">
        {/* Coupon Code */}
        <Card className="p-4">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Coupon Code</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500 mb-2">
              Enter code to get a discount instantly
            </p>
            <div className="flex gap-2">
              <Input placeholder="Add discount code" />
              <Button>Apply</Button>
            </div>
          </CardContent>
        </Card>

        {/* Shopping Cart */}
        <Card className="p-4">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Order Summary
            </CardTitle>
            <p className="text-sm text-gray-500">
              You have {cart?.items?.length || 0} items in your cart
            </p>
          </CardHeader>

          <CardContent className="flex flex-col gap-4">
            {cart?.items?.map((item) => (
              <div
                key={item.cartItemId}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={`http://localhost:8080/products/${item.productId}/image`}
                    className="w-14 h-14 rounded-md object-cover"
                  />
                  <div>
                    <p className="font-medium">{item.productName}</p>
                    <p className="text-sm text-gray-500">
                      {item.quantity} × ₹{item.price}
                    </p>
                  </div>
                </div>
                <p className="font-semibold">₹{item.totalPrice}</p>
              </div>
            ))}

            <Separator />

            {/* PRICE SUMMARY */}
            <div className="flex justify-between text-sm">
              <p>Subtotal</p>
              <p className="font-semibold">₹{cart?.cartTotal || 0}</p>
            </div>
            <div className="flex justify-between text-sm">
              <p>Shipping (+)</p>
              <p className="font-semibold text-green-600">FREE</p>
            </div>
            <div className="flex justify-between text-sm">
              <p>Discount (-)</p>
              <p className="font-semibold">₹0</p>
            </div>

            <Separator />

            <div className="flex justify-between text-lg font-bold">
              <p>Total Payable</p>
              <p>₹{cart?.cartTotal || 0}</p>
            </div>

            <p className="text-xs text-gray-500 text-center mt-2">
              By placing your order, you agree to our company{" "}
              <span className="underline">Privacy Policy</span> and{" "}
              <span className="underline">Terms & Conditions</span>.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* RIGHT SIDE - DETAILS */}
      <div className="w-full lg:w-2/3">
        <Accordion type="single" collapsible defaultValue="personal">
          {/* PERSONAL DETAILS */}
          <AccordionItem
            className="bg-white rounded-xl border"
            value="personal"
          >
            <AccordionTrigger className="px-4">
              Your Personal Details
            </AccordionTrigger>
            <AccordionContent className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input placeholder="First Name" />
              <Input placeholder="Last Name" />
              <Input placeholder="Email Address" />
              <Input placeholder="Phone" />
              <Input placeholder="Mailing Address" className="md:col-span-2" />
              <Input placeholder="City" />
              <Input placeholder="Post Code" />
              <Input placeholder="Country" />
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a state" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mh">Maharashtra</SelectItem>
                  <SelectItem value="gj">Gujarat</SelectItem>
                  <SelectItem value="dl">Delhi</SelectItem>
                </SelectContent>
              </Select>

              <Button className="md:col-span-2 w-fit">Next Step</Button>
            </AccordionContent>
          </AccordionItem>

          {/* SHIPPING */}
          <AccordionItem
            className="bg-white rounded-xl border mt-4"
            value="shipping"
          >
            <AccordionTrigger className="px-4">
              Shipping Address
            </AccordionTrigger>
            <AccordionContent className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input placeholder="Label (Home/Work)" />
              <Input placeholder="Recipient Name*" />
              <Input placeholder="Phone*" />
              <Input placeholder="Address Line 1*" />
              <Input placeholder="Address Line 2" className="md:col-span-2" />
              <Input placeholder="City" />
              <Input placeholder="Post Code" />
              <Input placeholder="Country" />
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a state" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mh">Maharashtra</SelectItem>
                  <SelectItem value="gj">Gujarat</SelectItem>
                  <SelectItem value="dl">Delhi</SelectItem>
                </SelectContent>
              </Select>

              <Button className="md:col-span-2 w-fit">Next Step</Button>
            </AccordionContent>
          </AccordionItem>

          {/* PAYMENT */}
          <AccordionItem
            className="bg-white rounded-xl border mt-4"
            value="payment"
          >
            <AccordionTrigger className="px-4">Payment Info</AccordionTrigger>

            <AccordionContent className="p-6 space-y-6">
              {/* Payment Methods */}
              <div className="space-y-3">
                <p className="font-medium text-lg">Select Payment Method</p>

                <RadioGroup defaultValue="credit">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="credit" id="credit" />
                    <label htmlFor="credit" className="cursor-pointer">
                      Credit card
                    </label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="paypal" id="paypal" />
                    <label htmlFor="paypal" className="cursor-pointer">
                      Paypal
                    </label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="cod" id="cod" />
                    <label htmlFor="cod" className="cursor-pointer">
                      Cash on delivery
                    </label>
                  </div>
                </RadioGroup>
              </div>

              <div className="border-t pt-4 space-y-4">
                {/* CARD NAME */}
                <div className="space-y-1">
                  <label className="text-sm font-medium">Name on Card:</label>
                  <Input placeholder="John Joe" />
                </div>

                {/* CARD NUMBER */}
                <div className="space-y-1">
                  <label className="text-sm font-medium">Card Number:</label>
                  <Input placeholder="0000 0000 0000 1235" />
                </div>

                {/* EXP + CVV */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium">MM</label>
                    <Input placeholder="25" />
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-medium">YYYY</label>
                    <Input placeholder="2027" />
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-medium">CVV</label>
                    <Input placeholder="248" />
                  </div>
                </div>

                <Button className="w-full md:w-fit mt-4">Place Order</Button>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
