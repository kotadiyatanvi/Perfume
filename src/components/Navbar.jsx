import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import ConformationModal from "./ConformationModal";
import EditProfileModal from "./EditProfileModal";

export function Navbar() {
  const navigate = useNavigate();

  const loginData = localStorage.getItem("loginData");
  const loggedInUserData = loginData ? JSON.parse(loginData) : null;

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    const updateCartCount = () => {
      const uId = JSON.parse(localStorage.getItem("loginData"))?.id;
      const cartKey = uId ? `cartData_${uId}` : "cartData";
      const cartData = JSON.parse(localStorage.getItem(cartKey)) || [];
      const count = cartData.length;
      setCartCount(count);
    };

    updateCartCount();
    window.addEventListener("cartUpdated", updateCartCount);
    window.addEventListener("storage", updateCartCount);

    return () => {
      window.removeEventListener("cartUpdated", updateCartCount);
      window.removeEventListener("storage", updateCartCount);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loginData");
    setShowLogoutModal(false);
    setShowDropdown(false);
    setCartCount(0);
    navigate("/loginpage");
  };

  return (
    <>
      <nav className="custom-navbar">
        <div className="nav-logo" onClick={() => navigate("/")}>
          <div className="logo-wrapper">
            <span className="logo-main">Fragrance</span>
            <span className="logo-sub">Spot</span>
          </div>
        </div>

        <ul className="nav-links">
          <li>
            <NavLink to="/" className={({ isActive }) => (isActive ? "active-link" : "")} end>
              Home
            </NavLink>
          </li>

          {loggedInUserData?.role === "admin" ? (
            <>
              <li><NavLink to="/newpost" className={({ isActive }) => (isActive ? "active-link" : "")}>Add Product</NavLink></li>
              <li><NavLink to="/addcategory" className={({ isActive }) => (isActive ? "active-link" : "")}>Add Category</NavLink></li>
              <li><NavLink to="/vieworder" className={({ isActive }) => (isActive ? "active-link" : "")}>Orders</NavLink></li>
              <li><NavLink to="/ManageUsers" className={({ isActive }) => (isActive ? "active-link" : "")}>Users</NavLink></li>
              <li><NavLink to="/ViewFeedback" className={({ isActive }) => (isActive ? "active-link" : "")}>Feedback</NavLink></li>
              <li><NavLink to="/viewcontact" className={({ isActive }) => (isActive ? "active-link" : "")}>Contact</NavLink></li>
            </>
          ) : (
            <>
              <li><NavLink to="/product" className={({ isActive }) => (isActive ? "active-link" : "")}>Product</NavLink></li>
              <li><NavLink to="/about" className={({ isActive }) => (isActive ? "active-link" : "")}>About</NavLink></li>
              <li><NavLink to="/contact" className={({ isActive }) => (isActive ? "active-link" : "")}>Contact</NavLink></li>
              <li><NavLink to="/Feedback" className={({ isActive }) => (isActive ? "active-link" : "")}>Feedback</NavLink></li>
            </>
          )}
        </ul>

        <div className="nav-right">
          <div className="theme-toggle" onClick={toggleTheme}>
            {theme === "light" ? "☀️" : "🌙"}
          </div>

          {loggedInUserData?.role !== "admin" && (
            <NavLink to="/cart" className="cart-wrapper">
              <span className="cart-icon">🛒</span>
              {cartCount > 0 && (
                <span className="cart-badge">{cartCount}</span>
              )}
            </NavLink>
          )}

          {!loggedInUserData ? (
            <NavLink to="/loginpage" className="login-btn">Login</NavLink>
          ) : (
            <div className="profile-container">
              <div
                className="role-badge"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <span className="role-name">{loggedInUserData.role}</span>
                <span className={`arrow-icon ${showDropdown ? "open" : ""}`}>
                  ▾
                </span>
              </div>

              {showDropdown && (
                <div className="profile-dropdown-menu">
                  <button
                    className="dropdown-item"
                    onClick={() => {
                      setShowEditProfile(true);
                      setShowDropdown(false);
                    }}
                  >
                    👤 Edit Profile
                  </button>
                  <button
                    className="dropdown-item logout-link"
                    onClick={() => {
                      setShowLogoutModal(true);
                      setShowDropdown(false);
                    }}
                  >
                    🚪 Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>

      {showLogoutModal && (
        <ConformationModal
          title="Logout?"
          disc="You are about to logout. Are you sure?"
          onConfirm={handleLogout}
          confirmBtnText="Logout"
          onClose={() => setShowLogoutModal(false)}
        />
      )}

      {showEditProfile && (
        <EditProfileModal
          userId={loggedInUserData?.id}
          onClose={() => setShowEditProfile(false)}
        />
      )}
    </>
  );
}