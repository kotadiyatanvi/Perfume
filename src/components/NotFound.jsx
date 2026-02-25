import { Navbar } from "./Navbar";
import { FaMoon } from "react-icons/fa";
import errorGif from "../assets/Error 404.gif"; 
export default function NotFound() {
  return (
    <>
      <Navbar icon={<FaMoon size={40} className="text-white" />} />
      <div
        style={{
          textAlign: "center",
          padding: "40px",
        }}
      >
        <h1>404 - Page Not Found</h1>
        <p>Page does not exist!!</p>

       
        <img
          src={errorGif}
          alt="404 error"
          style={{
            width: "250px",
            maxWidth: "80%",
            marginTop: "20px",
            borderRadius: "8px",
          }}
        />
      </div>
    </>
  );
}
