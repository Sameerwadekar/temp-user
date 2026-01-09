import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronRight } from "lucide-react"
import OrderDetails from "./OrderDetails"

export function OrdersList({ orders }) {
  return (
    <Accordion type="single" collapsible className="space-y-4">
      {orders.map((order) => (
        <AccordionItem
          key={order.id}
          value={String(order.id)}
          className="border rounded-lg"
        >
          {/* COLLAPSED VIEW */}
          <AccordionTrigger className="hover:no-underline px-4">
            <div className="flex w-full items-center justify-between">
              <div className="space-y-1 text-left">
                <p className="text-sm font-semibold">
                  Order #{order.id}
                </p>
                <p className="text-xs text-muted-foreground">
                  {order.orderItems.length} item(s) • ₹{order.amount}
                </p>
                <Badge variant={order.paymentStatus === "SUCCESS" ? "success" : "secondary"}>
                  {order.paymentStatus}
                </Badge>
              </div>

              {/* Product thumbnails */}
              <div className="flex items-center gap-2">
                {order.orderItems.slice(0, 2).map((item) => (
                  <img
                    key={item.id}
                    src={`http://localhost:8080/products/${item.id}/image`}
                    className="h-10 w-10 rounded object-cover"
                  />
                ))}
              </div>
            </div>
          </AccordionTrigger>

          {/* EXPANDED VIEW */}
          <AccordionContent>
            <OrderDetails order={order} />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
