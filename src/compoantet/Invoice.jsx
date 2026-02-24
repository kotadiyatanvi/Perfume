import React, { useEffect, useState } from "react";
import "./Invoice.css";
import { useNavigate } from "react-router-dom";

const Invoice = () => {
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  // ✅ logged-in user based cart key
  const loginData = JSON.parse(localStorage.getItem("loginData"));
  const userId = loginData?.id;
  const cartKey = userId ? `cartData_${userId}` : "cartData";

  useEffect(() => {
    const orders = JSON.parse(localStorage.getItem("orderData")) || [];

    if (orders.length === 0) {
      alert("⚠️ No orders found. Please place an order first.");
      navigate("/checkout");
      return;
    }

    setOrder(orders[orders.length - 1]); // latest order
  }, [navigate]);

  if (!order) return null;

  const { customer, cart, subtotal, shipping, total, payment } = order;

  // ❌ Close → cart clear + navbar count update
  const handleClose = () => {
    localStorage.removeItem(cartKey);
    window.dispatchEvent(new Event("cartUpdated"));
    navigate("/");
  };

  // ✅ Cancel → cart restore + navbar count SAME
  const handleCancel = () => {
    // 1️⃣ Restore cart
    localStorage.setItem(cartKey, JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));

    // 2️⃣ Remove latest order from admin data
    const orders = JSON.parse(localStorage.getItem("orderData")) || [];
    orders.pop();
    localStorage.setItem("orderData", JSON.stringify(orders));

    // 3️⃣ Back to cart
    navigate("/cart");
  };

  // 🖨️ Print → cart clear + navbar count update
  const handlePrint = () => {
    window.print();
    localStorage.removeItem(cartKey);
    window.dispatchEvent(new Event("cartUpdated"));
  };

  return (
    <div className="invoice-page">
      <div className="invoice-card">
        <span className="invoice-close" onClick={handleClose}>✖</span>

        <h1 className="invoice-title">🧾 INVOICE</h1>

        <div className="invoice-box">
          <h3>👤 Customer Info</h3>
          <p><b>Name:</b> {customer.firstName} {customer.lastName}</p>
          <p><b>Email:</b> {customer.email}</p>
          <p><b>Phone:</b> {customer.phone}</p>
        </div>

        <div className="invoice-box">
          <h3>📦 Shipping Address</h3>
          <p>
            {customer.address}, {customer.city}, {customer.state} -{" "}
            {customer.pincode}
          </p>
          <p><b>Payment Method:</b> {payment}</p>
        </div>

        <table className="invoice-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Qty</th>
              <th>Price (₹)</th>
              <th>Total (₹)</th>
            </tr>
          </thead>

          <tbody>
            {cart.map((item, index) => (
              <tr key={index}>
                <td>{item.title}</td>
                <td>{item.quantity || 1}</td>
                <td>₹{item.price}</td>
                <td>₹{item.price * (item.quantity || 1)}</td>
              </tr>
            ))}
          </tbody>

          <tfoot>
            <tr>
              <td colSpan="3">Subtotal</td>
              <td>₹{subtotal}</td>
            </tr>
            <tr>
              <td colSpan="3">Shipping</td>
              <td>₹{shipping}</td>
            </tr>
            <tr className="grand-total">
              <td colSpan="3">Total</td>
              <td>₹{total}</td>
            </tr>
          </tfoot>
        </table>

        <div className="invoice-actions">
          <button className="cancel-btn" onClick={handleCancel}>
            Cancel Order
          </button>

          <button className="print-btn" onClick={handlePrint}>
            Print Invoice
          </button>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
