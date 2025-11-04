import { LoginForm } from "./components/login-form";
import { SignupForm } from "./components/signup-form";
import Home from "./components/ui/Home";
import { Navbar04 } from "./components/ui/Navbar";
import Footer from "./components/Footer";
import { createBrowserRouter, Outlet,RouterProvider } from "react-router-dom";
import Menu from "./components/Menu";

function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar stays on top */}
      <Navbar04 />

      {/* Main content grows and pushes footer down */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer always touches bottom */}
      <Footer />
    </div>
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
        },
        {
          path:"/menu",
          element:<Menu/>
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
