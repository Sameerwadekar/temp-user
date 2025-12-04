import  { createContext,useState } from "react";
import { toast } from "react-toastify";

export const CartContext = createContext();

export function CartProvider({children}){
    const [cart, setCart] = useState(null)
    
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

    return (
        <CartContext.Provider value={{addToCart,cart}}>
            {children}
        </CartContext.Provider>
    )
}
