import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);

  // billing states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState(""); 
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [payment, setPayment] = useState("");

  const navigate = useNavigate();
  const SHIPPING = 50;

  // ✅ user based cart key
  const loginData = JSON.parse(localStorage.getItem("loginData"));
  const userId = loginData?.id;
  const cartKey = userId ? `cartData_${userId}` : "cartData";

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(cartKey)) || [];
    setCartItems(data);

    const total = data.reduce(
      (sum, item) => sum + item.price * (item.quantity || 1),
      0
    );
    setSubtotal(total);
  }, [cartKey]);

  const handlePlaceOrder = () => {
    if (!cartItems.length) return alert("Cart is empty");

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !address ||
      !city ||
      !state ||
      !pincode
    ) {
      return alert("Please fill all billing details");
    }

    if (!payment) return alert("Select payment method");

    const newOrder = {
      orderId: Date.now(),
      customer: {
        firstName,
        lastName,
        email,
        phone,
        address,
        city,
        state,
        pincode,
      },
      cart: cartItems,
      subtotal,
      shipping: SHIPPING,
      total: subtotal + SHIPPING,
      payment,
      orderDate: new Date().toISOString(),
      userId, // ✅ optional but useful
    };

    // save order
    const existingOrders =
      JSON.parse(localStorage.getItem("orderData")) || [];
    existingOrders.push(newOrder);
    localStorage.setItem("orderData", JSON.stringify(existingOrders));

    // ❌ DO NOT clear cart here
    // cart will be handled in Invoice page

    navigate("/invoice");
  };

  return (
    <div className="checkout-page">
      <div className="checkout-wrapper">

        <div className="billing-box">
          <h2>🧾 Billing Details</h2>

          <div className="form-grid">
            <div>
              <label>First Name</label>
              <input value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </div>

            <div>
              <label>Last Name</label>
              <input value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </div>

            <div>
              <label>Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div>
              <label>Phone</label>
              <input value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>

            <div>
              <label>Address</label>
              <input value={address} onChange={(e) => setAddress(e.target.value)} />
            </div>

            <div>
              <label>City</label>
              <input value={city} onChange={(e) => setCity(e.target.value)} />
            </div>

            <div>
              <label>Pincode</label>
              <input value={pincode} onChange={(e) => setPincode(e.target.value)} />
            </div>

            <div>
              <label>State</label>
              <input value={state} onChange={(e) => setState(e.target.value)} />
            </div>
          </div>
        </div>

        <div className="order-box">
          <h2>🛒 Your Order</h2>

          {cartItems.map((item, i) => (
            <div className="order-item" key={i}>
              <span>{item.title} (x{item.quantity || 1})</span>
              <span>₹{item.price * (item.quantity || 1)}</span>
            </div>
          ))}

          <div className="order-line">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>

          <div className="order-line">
            <span>Shipping</span>
            <span>₹{subtotal ? SHIPPING : 0}</span>
          </div>

          <div className="total-box">
            <span>Total</span>
            <span>₹{subtotal ? subtotal + SHIPPING : 0}</span>
          </div>

          <div className="payment-box">
            <h3>Payment Method</h3>

            <label>
              <input type="radio" name="payment" value="Google Pay"
                onChange={(e) => setPayment(e.target.value)} />
              Google Pay
            </label>

            <label>
              <input type="radio" name="payment" value="Cash on Delivery"
                onChange={(e) => setPayment(e.target.value)} />
              Cash on Delivery
            </label>
          </div>

          <button className="place-order-btn" onClick={handlePlaceOrder}>
            Place Order
          </button>
        </div>

      </div>
    </div>
  );
};

export default Checkout;
