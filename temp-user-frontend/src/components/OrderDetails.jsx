import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"

function OrderDetails({ order }) {
  return (
    <div className="px-4 pb-4 space-y-6">
      
      {/* ORDER STATUS TIMELINE */}
      {/* <div className="flex justify-between text-sm">
        <StatusStep label="Ordered" />
        <StatusStep label="Processed" />
        <StatusStep label="Shipped" />
        <StatusStep label="Delivered" active />
      </div> */}

      <Separator />

      {/* ADDRESS */}
      {order.address && (
        <div>
          <p className="font-semibold text-sm">Delivery Address</p>
          <p className="text-sm text-muted-foreground">
            {order.address.fullName}, {order.address.house},{" "}
            {order.address.street}, {order.address.city} -{" "}
            {order.address.pincode}
          </p>
        </div>
      )}

      <Separator />

      {/* ITEMS */}
      <div className="space-y-4">
        {order.orderItems.map((item) => (
          <div key={item.id} className="flex gap-4">
            <img
              src={`http://localhost:8080/products/${item.id}/image`}
              alt={item.product.name}
              className="h-16 w-16 rounded object-cover"
            />
            <div className="flex-1">
              <p className="font-medium">{item.product.name}</p>
              <p className="text-sm text-muted-foreground">
                Qty: {item.quantity}
              </p>
              <p className="text-sm">₹{item.price}</p>
            </div>
          </div>
        ))}
      </div>

      <Separator />

      {/* TOTAL */}
      <div className="flex justify-between font-semibold">
        <span>Total Amount</span>
        <span>₹{order.amount}</span>
      </div>

      <div className="flex gap-2">
        <Button variant="outline">Need Help</Button>
        <Button>Reorder</Button>
      </div>
    </div>
  )
}

function StatusStep({ label, active }) {
  return (
    <div
      className={`text-xs ${
        active
          ? "text-primary font-semibold"
          : "text-muted-foreground"
      }`}
    >
      {label}
    </div>
  )
}

export default OrderDetails
