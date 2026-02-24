import { Navigate, Outlet } from "react-router-dom";
import RootLayout from "../pages/RootLayout";

export default function Authguard() {
  const loginData = JSON.parse(localStorage.getItem("loginData"));

  if (!loginData) {
    return <Navigate to="/loginpage" replace />;
  }

  return <RootLayout />;
}
