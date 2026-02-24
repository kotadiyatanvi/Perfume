import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ViewOrder.css";

const ViewOrder = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const loginData = JSON.parse(localStorage.getItem("loginData"));
  const isAdmin = loginData?.role === "admin";

  useEffect(() => {
    if (!isAdmin) {
      navigate("/");
      return;
    }
    const allOrders = JSON.parse(localStorage.getItem("orderData")) || [];
    setOrders(allOrders);
  }, [isAdmin, navigate]);

  if (!isAdmin) {
    return (
      <div className="order-page">
        <div className="access-denied">
          <h2>Access Denied</h2>
          <p>This page is only for admin</p>
        </div>
      </div>
    );
  }

  return (
    <div className="order-page">
      <div className="order-main-container">
        
        <div className="order-header-section">
          <span className="access-label">Access Level: Admin</span>
          <h2 className="container-title">📦 Registered Order Database</h2>
        </div>

        {orders.length === 0 ? (
          <p className="no-data-msg">No orders found in the database.</p>
        ) : (
          <div className="table-wrapper">
            <table className="luxury-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Order Date</th>
                  <th>Customer</th>
                  <th>Contact Info</th>
                  <th>Location</th>
                  <th>Products & Qty</th>
                  <th>Total Amount</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order, index) => (
                  <tr key={order.orderId || index}>
                    <td className="id-cell">#{index + 1}</td>

                    <td>{order.orderDate?.split("T")[0]}</td>

                    <td className="user-name-cell">
                      {order.customer?.firstName} {order.customer?.lastName}
                    </td>

                    <td>
                      <div className="contact-stack">
                        <span>{order.customer?.email}</span>
                        <small>{order.customer?.phone}</small>
                      </div>
                    </td>

                    {/* ✅ FULL ADDRESS */}
                    <td className="address-cell">
                      {order.customer?.address}, {order.customer?.city},{" "}
                      {order.customer?.state} - {order.customer?.pincode}
                    </td>

                    <td>
                      {(order.cart || []).map((item, i) => (
                        <div key={i} className="product-item">
                          {item.title}
                          <span className="qty-badge">
                            x{item.quantity || 1}
                          </span>
                        </div>
                      ))}
                    </td>

                    <td className="total-cell">
                      ₹{Number(order.total).toLocaleString("en-IN")}
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewOrder;
