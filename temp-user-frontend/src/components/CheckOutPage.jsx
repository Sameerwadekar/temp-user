import React, { useEffect, useContext, useState } from "react";
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
import { useForm } from "react-hook-form";

import { CartContext } from "./Context/CartContext";
import OrderPayment from "./OrderPayment";

export default function CheckOutPage({ userId, jwtToken }) {
  const { cart, getCart } = useContext(CartContext);
  const [shippingAddress, setShippingAddress] = useState(null);

  useEffect(() => {
    getCart();
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Shipping Address:", data);
    setShippingAddress(data);
    // onSubmitAddress(data); // send to backend
  };

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

            <AccordionContent className="p-4">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <Input
                  placeholder="Full Name*"
                  {...register("fullName", { required: true })}
                />

                <Input
                  placeholder="Phone*"
                  {...register("phone", {
                    required: true,
                    pattern: /^[0-9]{10}$/,
                  })}
                />

                <Input
                  placeholder="House / Flat*"
                  {...register("house", { required: true })}
                />

                <Input
                  placeholder="Street / Road*"
                  {...register("street", { required: true })}
                />

                <Input placeholder="Area" {...register("area")} />

                <Input
                  placeholder="City*"
                  {...register("city", { required: true })}
                />

                <Input
                  placeholder="Pincode*"
                  {...register("pincode", {
                    required: true,
                    pattern: /^[0-9]{6}$/,
                  })}
                />

                <Input
                  placeholder="Country*"
                  defaultValue="India"
                  {...register("country", { required: true })}
                />

                {/* STATE SELECT */}
                <Select onValueChange={(value) => setValue("state", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select State" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Maharashtra">Maharashtra</SelectItem>
                    <SelectItem value="Gujarat">Gujarat</SelectItem>
                    <SelectItem value="Delhi">Delhi</SelectItem>
                  </SelectContent>
                </Select>

                <Button type="submit" className="md:col-span-2 w-fit">
                  Save Address
                </Button>

                {shippingAddress && (
                  <OrderPayment
                    address={shippingAddress}
                  />
                )}
              </form>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
