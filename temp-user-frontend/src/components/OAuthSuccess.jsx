// OAuth2Success.jsx
import { useEffect } from "react";
import { useLogin } from "./Context/LoginContext";
import { useNavigate } from "react-router-dom";

export default function OAuth2Success() {
  const { loginUser } = useLogin();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (!token) {
      navigate("/login");
      return;
    }

    // fetch user details using token
    fetch("http://localhost:8080/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(user => {
        loginUser(token, user);
      });
  }, []);

  return <p>Logging you in...</p>;
}
