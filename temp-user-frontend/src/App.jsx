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
import { CartContext } from "./components/Context/CartContext";
import { useContext, useEffect } from "react";
import CheckOutPage from "./components/CheckOutPage";
import { MenuProvider } from "./components/Context/AdminMenuContext";
import Product from "./components/Product";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import OrderProvider from "./components/Context/OrderContext";
import OrderPayment from "./components/OrderPayment";

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
          path: "/done",
          element: (
            <OrderPayment
              userId={"6b0ad1c6-9523-4996-8d51-242c2ecb69b4"}
              workshopId={2}
              jwtToken={
                "eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJzYW1lZXJAZ21haWwuY29tIiwicm9sZXMiOiJST0xFX1VTRVIiLCJpYXQiOjE3Njc3NzEzMzIsImV4cCI6MTc3MDM2MzMzMn0.YzQF2GDqM_KmqDeOukB2FMmhfzHEafYj5A_U-UFIXniv90ZDXlG6Nizp0zhO4IKMn"
              }
            /> 
          ),
        },
        {
          element: <ProtectedRoute />,
          children: [
            { path: "/menu", element: <Menu /> },
            { path: "/cart", element: <CartPage /> },
            { path: "/checkout", element: <CheckOutPage /> },
          ],
        },
        {
          element: (
            <OrderProvider>
              <AdminRoute />
            </OrderProvider>
          ),
          children: [{ path: "/admin/products", element: <Product /> }],
        },
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
