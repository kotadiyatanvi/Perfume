import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "./Cart.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate(); 

  // Get current logged in user and create specific cartKey
  const loginData = JSON.parse(localStorage.getItem("loginData"));
  const userId = loginData?.id;
  const cartKey = userId ? `cartData_${userId}` : "cartData";

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(cartKey)) || [];
    setCartItems(data);
  }, [cartKey]);

  const updateCart = (updated) => {
    localStorage.setItem(cartKey, JSON.stringify(updated));
    setCartItems(updated);
    // ✅ Navbar ને અપડેટ કરવા માટે ઈવેન્ટ ફાયર કરવી
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const removeItem = (id) => {
    const updated = cartItems.filter((i) => String(i.id) !== String(id));
    updateCart(updated);
  };

  const changeQty = (id, type) => {
    const updated = cartItems.map((item) => {
      if (String(item.id) === String(id)) {
        let qty = item.quantity || 1;
        qty = type === "inc" ? qty + 1 : qty - 1;
        return { ...item, quantity: qty < 1 ? 1 : qty };
      }
      return item;
    });
    updateCart(updated);
  };

  const subtotal = cartItems.reduce(
    (s, i) => s + i.price * (i.quantity || 1),
    0
  );

  return (
    <div className="cart-page">
      <div className="cart-container">
        <div className="cart-table">
          <div className="cart-header">
            <span>Product</span>
            <span>Name</span>
            <span>Price</span>
            <span>Qty</span>
            <span>Total</span>
            <span></span>
          </div>

          {cartItems.length === 0 ? (
            <p className="empty">Your cart is empty</p>
          ) : (
            cartItems.map((item) => (
              <div className="cart-row" key={item.id}>
                <img src={item.image} alt={item.title} />
                <span className="name">{item.title}</span>
                <span>${item.price}</span>

                <div className="qty-box">
                  <button onClick={() => changeQty(item.id, "dec")}>−</button>
                  <span>{item.quantity || 1}</span>
                  <button onClick={() => changeQty(item.id, "inc")}>+</button>
                </div>

                <span>
                  ${(item.price * (item.quantity || 1)).toFixed(2)}
                </span>

                <button
                  className="remove"
                  onClick={() => removeItem(item.id)}
                >
                  ✖
                </button>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-summary">
            <h2>Cart Totals</h2>
            <div className="sum-line">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="sum-line total">
              <span>Total</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <button className="checkout-btn" onClick={() => navigate("/checkout")}>
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;