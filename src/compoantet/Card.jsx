import React from "react";
import "./Card.css";

const Card = ({
  img,
  title1,
  desc,
  price,      // Price prop
  onRedirect,
  onEdit,
  onDelete,
  id,
}) => {
  // ✅ Get logged-in user data from localStorage
  const loginData = localStorage.getItem("loginData");
  const loggedInUserData = loginData ? JSON.parse(loginData) : null;

  // Display image fallback
  const displayImage =
    img || `https://picsum.photos/seed/${id || title1}/300/200`;

  // ✅ Only true admin can see buttons
  const isUserAdmin = loggedInUserData?.role?.toLowerCase() === "admin";

  return (
    <div className="premium-card">
      {/* Card Image */}
      <div className="card-image-wrapper" onClick={onRedirect}>
        <img src={displayImage} alt={title1} />
        <div className="image-overlay"></div>
      </div>

      {/* Card Body */}
      <div className="card-body">
        <h2 className="card-title" onClick={onRedirect}>
          {title1}
        </h2>

        {/* Price */}
        <div
          className="card-price"
          style={{ color: "#ffb703", fontWeight: "bold", margin: "5px 0" }}
        >
          ${price || "0.00"}
        </div>

        {/* Description */}
        <p className="card-description">
          {desc?.length > 80 ? desc.substring(0, 80) + "..." : desc}
        </p>
      </div>

      {/* Admin Actions: ONLY FOR LOGGED-IN ADMINS */}
      {isUserAdmin && (
        <div className="admin-actions1">
          <button className="edit-btn2" onClick={onEdit}>
            Edit
          </button>
          <button className="delete-btn2" onClick={() => onDelete(id)}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default Card;
