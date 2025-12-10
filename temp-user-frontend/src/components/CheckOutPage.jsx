import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Select, SelectTrigger, SelectItem, SelectValue, SelectContent } from "@/components/ui/select";

export default function CheckoutPage() {
  return (
    <div className="w-full flex flex-col lg:flex-row gap-6 p-6 bg-gray-50 min-h-screen">
      {/* Left Side - Coupon + Cart */}
      <div className="w-full lg:w-1/3 flex flex-col gap-4">
        {/* Coupon Code */}
        <Card className="p-4">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Coupon Code</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500 mb-2">Enter code to get discount instantly</p>
            <div className="flex gap-2">
              <Input placeholder="Add discount code" className="" />
              <Button>Apply</Button>
            </div>
          </CardContent>
        </Card>

        {/* Shopping Cart */}
        <Card className="p-4">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Shopping Cart</CardTitle>
            <p className="text-sm text-gray-500">You have 3 items in your cart</p>
          </CardHeader>

          <CardContent className="flex flex-col gap-4">
            {/* Item */}
            {[{
              name: "Red cap",
              desc: "Red and white cap",
              price: 36,
              img: "https://via.placeholder.com/60"
            },{
              name: "Oversized T-shirt",
              desc: "Awesome white T-shirt",
              price: 29,
              img: "https://via.placeholder.com/60"
            },{
              name: "Girl brown T-shirt",
              desc: "it's a nice brown t-shirt",
              price: 30,
              img: "https://via.placeholder.com/60"
            }].map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={item.img} alt={item.name} className="w-14 h-14 rounded-md" />
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                </div>
                <p className="font-semibold">${item.price}.00</p>
              </div>
            ))}

            <Separator />

            {/* Summary */}
            <div className="flex justify-between text-sm">
              <p>Subtotal</p>
              <p className="font-semibold">$95.00</p>
            </div>
            <div className="flex justify-between text-sm">
              <p>Shipping Cost (+)</p>
              <p className="font-semibold">$10.66</p>
            </div>
            <div className="flex justify-between text-sm">
              <p>Discount (-)</p>
              <p className="font-semibold">$9.00</p>
            </div>

            <Separator />

            <div className="flex justify-between text-lg font-bold">
              <p>Total Payable</p>
              <p>$96.66</p>
            </div>

            <Button className="w-full mt-2">Place Order</Button>

            <p className="text-xs text-gray-500 text-center mt-2">
              By placing your order, you agree to our company <span className="underline">Privacy Policy</span> and <span className="underline">Conditions of use</span>.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Right Side - Details */}
      <div className="w-full lg:w-2/3">
        <Accordion type="single" collapsible defaultValue="personal">
          {/* Personal Details */}
          <AccordionItem value="personal" className="bg-white rounded-xl border">
            <AccordionTrigger className="px-4">Your Personal Details</AccordionTrigger>
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

          {/* Shipping */}
          <AccordionItem value="shipping" className="bg-white rounded-xl border mt-4">
            <AccordionTrigger className="px-4">Shipping Address</AccordionTrigger>
            <AccordionContent className="p-4 text-sm text-gray-600">Add shipping details here...</AccordionContent>
          </AccordionItem>

          {/* Payment */}
          <AccordionItem value="payment" className="bg-white rounded-xl border mt-4">
            <AccordionTrigger className="px-4">Payment Info</AccordionTrigger>
            <AccordionContent className="p-4 text-sm text-gray-600">Add payment details here...</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
