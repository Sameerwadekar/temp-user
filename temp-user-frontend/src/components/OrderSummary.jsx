import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

const orderItems = [
  {
    id: 1,
    name: "Vokline Women sports shoes, Running shoes",
    size: "6",
    price: 100,
    image: "https://via.placeholder.com/70", // add image URL to avoid undefined
    quantity: 1,
  },
  {
    id: 2,
    name: "Men Printed Round Neck Cotton Purple T-Shirt",
    size: "M",
    price: 79,
    image: "https://via.placeholder.com/70",
    quantity: 1,
  },
  {
    id: 3,
    name: "Men Solid Hooded Neck Purple Sweater",
    size: "M",
    price: 89,
    image: "https://via.placeholder.com/70",
    quantity: 1,
  },
];

export default function OrderSummary() {
  return (
    <div className="w-full flex justify-center py-10 bg-muted/40">
      <Card className="w-full max-w-5xl p-6 shadow-lg">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* LEFT SIDE – ORDER SUMMARY */}
          <div>
            <CardHeader>
              <CardTitle className="text-xl">Order Summaries</CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              
              {/* Header info */}
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Delivery Date</p>
                  <p className="font-medium">Dec 10, 2025</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Order ID</p>
                  <p className="font-medium">#56489454284</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Payment Method</p>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                    <div className="h-3 w-3 rounded-full bg-red-600"></div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* ITEMS */}
              <div className="space-y-4">
                {orderItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between border rounded-lg p-4"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        width={70}
                        height={70}
                        className="rounded-md object-cover"
                      />
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Size : {item.size}
                        </p>
                      </div>
                    </div>
                    <p className="font-medium">${item.price}.00</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </div>

          {/* RIGHT SIDE – BILLING */}
          <div className="border rounded-lg p-6 bg-white shadow-sm">
            <h2 className="text-lg font-semibold">Billing Address</h2>

            <div className="mt-4 space-y-3 text-sm">
              <div>
                <p className="text-muted-foreground">Name</p>
                <p className="font-medium">Cristofer Schleifer</p>
              </div>

              <div>
                <p className="text-muted-foreground">Email Address</p>
                <p className="font-medium">cristofer@example.com</p>
              </div>

              <div>
                <p className="text-muted-foreground">Phone Number</p>
                <p className="font-medium">+1 (212) 4 178 368</p>
              </div>

              <div>
                <p className="text-muted-foreground">Address</p>
                <p className="font-medium">
                  Street 91, Empire State, 350 Fifth Avenue, New York
                </p>
              </div>
            </div>

            <Separator className="my-6" />

            {/* PRICE SUMMARY */}
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <p className="text-muted-foreground">Subtotal</p>
                <p className="font-medium">$268.00</p>
              </div>

              <div className="flex justify-between">
                <p className="text-muted-foreground">Discount</p>
                <p className="font-medium text-red-500">- $50.00</p>
              </div>

              <Separator />

              <div className="flex justify-between text-base font-semibold">
                <p>Total</p>
                <p>$218.00</p>
              </div>
            </div>

            <Button className="w-full mt-6">Continue Shopping</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
