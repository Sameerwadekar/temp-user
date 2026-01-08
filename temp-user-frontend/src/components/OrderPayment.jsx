import React from "react";

const OrderPayment = ({ userId, jwtToken }) => {

  const startPayment = async () => {
    try {
      // 1️⃣ Place Order
      const orderRes = await fetch(
        `http://localhost:8080/orders/place/${userId}`,
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${jwtToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!orderRes.ok) {
        throw new Error("Order placement failed");
      }

      const order = await orderRes.json();

      // 2️⃣ Create Razorpay Payment Order
      const paymentRes = await fetch(
        `http://localhost:8080/orders/payment/${order.id}`,
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${jwtToken}`,
          },
        }
      );

      if (!paymentRes.ok) {
        throw new Error("Payment order creation failed");
      }

      const paymentOrder = await paymentRes.json();

      // 3️⃣ Razorpay options
      const options = {
        key: "rzp_test_S060WMnc2eFoWe",
        amount: paymentOrder.amount,
        currency: "INR",
        name: "EcoTrack",
        description: "Order Payment",
        order_id: paymentOrder.razorpayOrderId,

        handler: async function (response) {
          // 4️⃣ Confirm Payment
          const confirmRes = await fetch(
            "http://localhost:8080/orders/confirm",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwtToken}`,
              },
              body: JSON.stringify({
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
              }),
            }
          );

          if (!confirmRes.ok) {
            throw new Error("Payment verification failed");
          }

          alert("✅ Payment Successful!");
        },

        prefill: {
          name: "User",
          email: "user@example.com",
        },

        theme: {
          color: "#2ecc71",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();

    } catch (error) {
      console.error(error);
      alert("❌ Something went wrong");
    }
  };

  return (
    <button onClick={startPayment}>
      Pay Now
    </button>
  );
};

export default OrderPayment;
