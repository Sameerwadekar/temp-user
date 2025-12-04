import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { MenuProvider } from "./components/Context/MenuContext.jsx";
import { LoginProvider } from "./components/Context/LoginContext.jsx";
import { CartProvider } from "./components/Context/CartContext.jsx";

createRoot(document.getElementById("root")).render(
   <StrictMode>
    <MenuProvider>
      <CartProvider>
      <App />
      </CartProvider>
    </MenuProvider>
  </StrictMode>
);
