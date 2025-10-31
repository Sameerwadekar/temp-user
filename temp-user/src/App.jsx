import { LoginForm } from "./components/Login-form";
import { SignupForm } from "./components/signup-form";
import Home from "./components/ui/Home";
import { Navbar04 } from "./components/ui/Navbar";
import Footer from "./components/Footer";
import { createBrowserRouter, Outlet,RouterProvider } from "react-router-dom";

function Layout() {
  return (
    <>
      <Navbar04 />
      <Outlet />
      <Footer />
    </>
  );
}

function App() {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path:"/login",
          element:<LoginForm/>
        },
        {
          path:"/signin",
          element:<SignupForm/>
        }
      ],
    },
    {
    path:"*",
    element: <>404 not Found</>
    }
  ]);

   return <RouterProvider router={router} />;
}

export default App;
