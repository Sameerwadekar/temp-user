import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

const LoginContext = createContext();

export function LoginProvider({ children }) {
  const [user, setuser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || null;
    } catch {
      return null;
    }
  });

  const [token, settoken] = useState(localStorage.getItem("token") || null);

  const loginUser = (token, user) => {
    settoken(token);
    setuser(user);
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user)); // ✔ correct
    toast.success("Login Successful");
  };

  const logOutUser = () => {
    settoken(null);
    setuser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("LogOut Successfully");
  };

  return (
    <LoginContext.Provider value={{ user, token, loginUser, logOutUser }}>
      {children}
    </LoginContext.Provider>
  );
}

export const useLogin = () => useContext(LoginContext);
