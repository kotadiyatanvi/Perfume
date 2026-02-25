import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand - Compact Look */}
        <div className="footer-brand">
          <div className="logo-wrapper">
            <span className="logo-main">Fragrance</span>
          </div>
          <p>Luxury fragrances for every mood.</p>
        </div>

        {/* Links - Compact */}
        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </div>

        {/* Social - Minimalist */}
        <div className="footer-social">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <span>🌐</span>
            <span>📘</span>
            <span>📸</span>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} Fragrance Spot. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;