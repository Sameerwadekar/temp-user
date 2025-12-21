import { LoginForm } from "./components/login-form";
import { SignupForm } from "./components/signup-form";
import Home from "./components/ui/Home";
import { Navbar04 } from "./components/ui/Navbar";
import Footer from "./components/Footer";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Menu from "./components/Menu";
import { ToastContainer } from "react-toastify";
import { LoginProvider, useLogin } from "./components/Context/LoginContext";
import CartPage from "./components/CartPage";
import OrderSummary from "./components/OrderSummary";
import { CartContext } from "./components/Context/CartContext";
import { useContext, useEffect } from "react";
import CheckOutPage from "./components/CheckOutPage";
import { MenuProvider } from "./components/Context/AdminMenuContext";
import Product from "./components/Product";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

function Layout() {
  const { token, user } = useLogin();
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar stays on top */}
      <Navbar04 />

      {/* Main content grows and pushes footer down */}
      <main className="grow">
        <Outlet />
      </main>
      {token && user.roleName == "ROLE_ADMIN" ? (
        <div className="d-hidden"></div>
      ) : (
        <>
          <Footer />
        </>
      )}
    </div>
  );
}

function App() {
  const { getCart } = useContext(CartContext);
  useEffect(() => {
    getCart();
  }, []);
  const router = createBrowserRouter([
    {
      element: (
        <LoginProvider>
          <MenuProvider>
            <Layout />
          </MenuProvider>
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
          element:<ProtectedRoute/>,
          children:[
          { path: "/menu", element: <Menu /> },
          { path: "/cart", element: <CartPage /> },
          { path: "/checkout", element: <CheckOutPage /> },
          ]
        },
        {
          element:<AdminRoute/>,
          children:[
            { path: "/admin/products", element: <Product /> },
          ]
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
