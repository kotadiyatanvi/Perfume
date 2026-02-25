import React, { useEffect, useState } from "react";
import "./PostDetail.css";
import ConformationModal from "../components/ConformationModal";
import { useNavigate, useParams } from "react-router-dom";

const PostDetail = () => {
  const navigate = useNavigate();
  const { postId } = useParams();
  const loggedInUserData = JSON.parse(localStorage.getItem("loginData"));

  const [postData, setPostData] = useState([]);
  const [currentPost, setCurrentPost] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // ✅ યુઝર આઈડી અને યુનિક કાર્ટ કી મેળવો
  const userId = loggedInUserData?.id;
  const cartKey = userId ? `cartData_${userId}` : "cartData";

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem("postData")) || [];
    setPostData(storedPosts);
    const filtered = storedPosts.find(
      (item) => String(item.id) === String(postId)
    );
    setCurrentPost(filtered || null);
  }, [postId]);

  const handleDeleteConfirm = () => {
    const updatedPosts = postData.filter(
      (item) => String(item.id) !== String(postId)
    );
    localStorage.setItem("postData", JSON.stringify(updatedPosts));
    setShowDeleteModal(false);
    navigate("/");
  };

  // ================= ADD TO CART (ONLY FOR NON-ADMINS) =================
  const handleAddToCart = () => {
    if (!currentPost) return;

    // ✅ સાચી કી (cartKey) થી ડેટા મેળવો
    const existingCart = JSON.parse(localStorage.getItem(cartKey)) || [];

    const isProductInCart = existingCart.find(
      (item) => String(item.id) === String(currentPost.id)
    );

    let updatedCart;

    if (isProductInCart) {
      updatedCart = existingCart.map((item) =>
        String(item.id) === String(currentPost.id)
          ? { ...item, quantity: (item.quantity || 1) + 1 }
          : item
      );
    } else {
      const newCartItem = {
        id: currentPost.id,
        title: currentPost.title,
        price: currentPost.price,
        image: currentPost.image,
        category: currentPost.category,
        quantity: 1,
      };
      updatedCart = [...existingCart, newCartItem];
    }

    // ✅ સાચી કી (cartKey) માં ડેટા સેવ કરો
    localStorage.setItem(cartKey, JSON.stringify(updatedCart));

    // Notify cart icon (Navbar)
    window.dispatchEvent(new Event("cartUpdated"));

    alert(`${currentPost.title} added to cart successfully!`);
  };
  // ======================================================================

  if (!currentPost) {
    return (
      <div className="error-msg">
        <h2>Post not found</h2>
      </div>
    );
  }

  const isAdmin = loggedInUserData?.role?.toLowerCase() === "admin";

  return (
    <div className="detail-page-container">
      <div className="horizontal-glass-card">
        {/* Left Side */}
        <div className="card-image-section">
          <img
            src={currentPost.image || "/react-logo.png"}
            alt={currentPost.title}
          />
        </div>

        {/* Right Side */}
        <div className="card-content-section">
          <span className="category-tag">
            {currentPost.category || "PREMIUM PERFUME"}
          </span>

          <h1 className="detail-title">{currentPost.title}</h1>

          <div className="detail-price">${currentPost.price || "0.00"}</div>

          <p className="detail-description">{currentPost.body}</p>

          {/* Only show Add to Cart if user is NOT admin */}
          {!isAdmin && (
            <button className="btn-add-cart" onClick={handleAddToCart}>
              Add to Cart
            </button>
          )}

          {/* Admin Actions */}
          {isAdmin && (
            <div className="detail-actions">
              <button
                className="btn-edit"
                onClick={() =>
                  navigate("/newpost", {
                    state: { id: currentPost.id },
                  })
                }
              >
                Edit
              </button>

              <button
                className="btn-delete"
                onClick={() => setShowDeleteModal(true)}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {showDeleteModal && (
        <ConformationModal
          title="Delete Post?"
          disc="Are you sure you want to delete this post? This action cannot be undone."
          confirmBtnText="Delete"
          onConfirm={handleDeleteConfirm}
          onClose={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  );
};

export default PostDetail;