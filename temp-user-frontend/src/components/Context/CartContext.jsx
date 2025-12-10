/* eslint-disable react-refresh/only-export-components */
import  { createContext,useState } from "react";
import { toast } from "react-toastify";

export const CartContext = createContext();

export function CartProvider({children}){
    const [cart, setCart] = useState(null)
    const user = JSON.parse(localStorage.getItem("user"));

    const getCart = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;

    try {
      const res = await fetch(`http://localhost:8080/cart/${user.id}`);
      const result = await res.json();
      setCart(result);
    } catch (error) {
      console.log(error);
    }
  };
    
    const addToCart = async (productId) => {
        const user = JSON.parse(localStorage.getItem("user"));
        if(!user){
            alert("Login First")
            return ;
        }
        const payload = {
            userId : user.id,
            productId : productId,
            quantity : 1
        }
        await fetch("http://localhost:8080/cart/add",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(payload)
        })
        .then(async (res)=>{
            const result = await res.json()
            if(!res.ok){
                toast.error("Something went wrong")
            }
            toast.success("product added to cart")
            setCart(result)
        })
        .then((data)=>console.log(data))
        .catch((err)=>console.log(err))
    }

    const updateCartQuantity = async (cartItemId, newQuantity) => {
  try {
    const res = await fetch(
      `http://localhost:8080/cart/update/${cartItemId}?quantity=${newQuantity}`,
      { method: "PUT" }
    );
    const data = await res.json();
    setCart(data);
  } catch (e) {
    console.error("Update failed", e);
  }
};

const removeFromCart = async (cartItemId) => {
  const res = await fetch(`http://localhost:8080/cart/remove/${cartItemId}`, {
    method: "DELETE",
  });

  const updatedCart = await res.json();
  setCart(updatedCart); // update cart in context
};

    return (
        <CartContext.Provider value={{addToCart,cart,getCart,updateCartQuantity,removeFromCart}}>
            {children}
        </CartContext.Provider>
    )
}
