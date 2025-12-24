import { createContext, useEffect, useState } from "react";
import { useLogin } from "./LoginContext";

export const OrderContext = createContext();

export default function OrderProvider({ children }) {
  const [orders, setOrders] = useState([]);
  const { token, user } = useLogin();

  useEffect(() => {
    if (!token) return; // wait for login

    fetch("http://localhost:8080/orders/new-orders", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch orders");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data, user);
        setOrders(data);
      })
      .catch((err) => console.error(err));
  }, [token]); // runs only when token changes

  return (
    <OrderContext.Provider value={{ orders }}>
      {children}
    </OrderContext.Provider>
  );
}
