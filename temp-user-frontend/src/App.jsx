import { LoginForm } from "./components/login-form";
import { SignupForm } from "./components/signup-form";
import Home from "./components/ui/Home";
import { Navbar04 } from "./components/ui/Navbar";
import Footer from "./components/Footer";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Menu from "./components/Menu";
import { ToastContainer } from "react-toastify";
import { LoginProvider } from "./components/Context/LoginContext";
import CartPage from "./components/CartPage";
import OrderSummary from "./components/OrderSummary";
import { CartContext } from "./components/Context/CartContext";
import { useContext, useEffect } from "react";
import CheckOutPage from "./components/CheckOutPage";

function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar stays on top */}
      <Navbar04 />

      {/* Main content grows and pushes footer down */}
      <main className="grow">
        <Outlet />
      </main>

      {/* Footer always touches bottom */}
      <Footer />
    </div>
  );
}

function App() {
  const {  getCart } =
        useContext(CartContext);
      useEffect(() => {
        getCart();
      }, []);
  const router = createBrowserRouter([
    {
      element: (
        <LoginProvider>
          <Layout />
        </LoginProvider>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/login",
          element: <LoginForm />,
        },
        {
          path: "/signin",
          element: <SignupForm />,
        },
        {
          path: "/menu",
          element: <Menu />,
        },
        {
          path:"/cart",
          element:<CartPage/>
        },
        {
          path:"/checkout",
          element:<CheckOutPage/>
        },
        {
          path:"/admin",
          element:<CheckOutPage/>
        }
      ],
    },
    {
      path: "*",
      element: <>404 not Found</>,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={2000} // 2 seconds
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default App;
