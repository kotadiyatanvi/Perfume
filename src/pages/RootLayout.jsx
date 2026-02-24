import { Navbar } from "../compoantet/Navbar";
import { Outlet } from "react-router-dom";
import { FaMoon } from "react-icons/fa";
import Snowfall from "react-snowfall";
import Footer from "../compoantet/Footer";

export default function RootLayout() {
  return (
    <>
    
      

      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}
