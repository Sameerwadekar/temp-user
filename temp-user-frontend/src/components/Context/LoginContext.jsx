import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LoginContext = createContext();

export function LoginProvider({ children }) {
  const [loginStatus, setloginStatus] = useState(false);
  const navigate =  useNavigate();
  const handleLogin = async (data) => {
    try {
      const res = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorBody = await res.json();
        throw new Error(errorBody.message || "Login failed");
      }

      // eslint-disable-next-line no-unused-vars
      const result = await res.json();
      setloginStatus(true);
      toast.success("Login successful");
      setTimeout(()=>{
        navigate("/")
      },2000)
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <LoginContext.Provider value={{ handleLogin, loginStatus, setloginStatus }}>
      {children}
    </LoginContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useLogin = () => useContext(LoginContext);
