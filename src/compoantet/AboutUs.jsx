import React from "react";
import "./AboutUs.css";
import tempImg from "../assets/image/per5.jpg"; // image change kari sako

const AboutUs = () => {
  return (
    <section className="about-section">
      {/* Background Image */}
      <div className="about-bg">
      </div>

      {/* Content Card */}
      <div className="about-wrapper">
        <div className="about-left">
          <span className="about-tag">About Us</span>

          <h1>
            Where Fragrance <br /> Becomes Identity
          </h1>

          <p className="about-intro">
            Welcome to <strong>Essenza Perfumes</strong> — where every scent is a
            statement of elegance, confidence, and luxury.
          </p>

          <p>
            We believe perfume is not just a fragrance, it is an emotion. Our
            creations are crafted with premium ingredients to deliver
            long-lasting impressions that define your personality.
          </p>

          <div className="about-stats">
            <div>
              <h3>10k+</h3>
              <span>Happy Customers</span>
            </div>
            <div>
              <h3>50+</h3>
              <span>Exclusive Scents</span>
            </div>
            <div>
              <h3>5+</h3>
              <span>Years Experience</span>
            </div>
          </div>
        </div>

        <div className="about-right">
          <img src={tempImg} alt="Essenza Perfumes" />
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
