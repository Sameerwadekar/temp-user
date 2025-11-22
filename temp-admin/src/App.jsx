import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/common/Layout";
import Login from "./components/user/Login";
import Orders from "./components/Orders";
import Product from "./components/Product";


function App() {
  const routes = createBrowserRouter([
    {
      path:"",
      element:<Layout/>,
      children:[
        {index:true,element:<Login/>},
        {path:"orders",element:<Orders/>},
        {path:"products",element:<Product/>}
      ]
    }
  ])
  return (
  <>
    <RouterProvider router={routes}/>
  </>
)}

export default App;
