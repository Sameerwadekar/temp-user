import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

const LoginContext = createContext();

export function LoginProvider({ children }) {
  const [user, setuser] = useState(localStorage.getItem("user"));
  const [token, settoken] = useState(localStorage.getItem("token"));

  const loginUser = (token, user) => {
    settoken(token);
    setuser(user);
    console.log("login details " + token, user);
    localStorage.setItem("token", token);
    localStorage.setItem("user", user);
    toast.success("LogIn Succesfully")
  };

  const logOutUser = () => {
    settoken(null);
    setuser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("LogOut Succesfully")
  };
  return <LoginContext.Provider value={{user,token,logOutUser,loginUser}}>{children}</LoginContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const useLogin = () => useContext(LoginContext);
