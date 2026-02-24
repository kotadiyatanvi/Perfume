import { useNavigate } from "react-router-dom";
import "./HomePage.css";

export const HomePage = () => {
  const navigate = useNavigate();

  // ✅ Logged in user data
  const loggedInUserData = JSON.parse(localStorage.getItem("loginData"));

  return (
    <>
      {/* ================= HERO SECTION ================= */}
      <section className="home-section">
        <div className="home-wrapper">
          <span className="home-tag">Luxury Perfumes</span>
          <h1>
            Where <span>Fragrance</span>
            <br /> Becomes Identity
          </h1>
          <p>
            Discover premium scents crafted to express elegance,
            confidence, and timeless luxury.
          </p>

          <div className="home-buttons">
            <button
              className="primary"
              onClick={() => navigate("/product")}
            >
              Explore Collection
            </button>

            {/* ✅ ONLY ADMIN CAN SEE */}
            {loggedInUserData?.role === "user" && (
              <button
                className="secondary"
                onClick={() => navigate("/contact")}
              >
                Contact Us
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ================= SCROLL TO TOP ================= */}
      <div
        className="scroll-wrapper"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <span className="arrow-up"></span>
      </div>
    </>
  );
};
