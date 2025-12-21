import { Navigate, Outlet } from "react-router-dom";
import { useLogin } from "./Context/LoginContext";


export default function AdminRoute() {
  const { token, user } = useLogin();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (user?.roleName !== "ROLE_ADMIN") {
    return <Navigate to="/menu" replace />;
  }

  return <Outlet />;
}
