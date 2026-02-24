import "./Registratiion.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import tempImg from "../assets/image/per5.jpg";
import ConformationModal from "./ConformationModal";

export default function Registration() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    role: "user",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  const handleMobileChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 10) {
      setFormData({ ...formData, mobile: value });
      if (errors.mobile) setErrors({ ...errors, mobile: "" });
    }
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "*Full Name is required";
    if (!formData.email.trim()) newErrors.email = "*Email is required";
    if (!formData.mobile || formData.mobile.length !== 10)
      newErrors.mobile = "*Please enter 10-digit mobile";
    if (!formData.password || formData.password.length < 6)
      newErrors.password = "*Password must be at least 6 characters";
    if (!formData.role) newErrors.role = "*Role is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.warning("Please fill all fields correctly ⚠️");
      return;
    }
    setShowModal(true);
  };

  const confirmRegistration = async () => {
    setShowModal(false);

    // API ke liye keys rename kiye
    const payload = {
      fullname: formData.name,
      email: formData.email,
      mobilenumber: formData.mobile,
      password: formData.password,
      role: formData.role,
    };

    try {
      const response = await fetch(
        "https://69833dc79c3efeb892a4fb78.mockapi.io/Registration",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) throw new Error("API Error");

      // 🔥 Local storage me save karo taki login me match ho
      localStorage.setItem("registerData", JSON.stringify(payload));

      toast.success("Registration Successful 🎉");
      navigate("/loginpage");
    } catch {
      toast.error("Registration failed ❌");
    }
  };

  return (
    <div className="register-page">
      <div className="register-left">
        <img src={tempImg} alt="registration" />
      </div>

      <div className="register-right">
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="register-header">
            <h2>Create Account 🎉</h2>
            <p>Join us and start exploring</p>
          </div>

          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Full name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? "input-error" : ""}
            />
            {errors.name && <p className="error">{errors.name}</p>}
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? "input-error" : ""}
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>

          <div className="form-group">
            <label>Mobile Number</label>
            <input
              type="text"
              name="mobile"
              placeholder="Mobile number"
              value={formData.mobile}
              onChange={handleMobileChange}
              maxLength={10}
              className={errors.mobile ? "input-error" : ""}
            />
            {errors.mobile && <p className="error">{errors.mobile}</p>}
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? "input-error" : ""}
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>

          <div className="form-group">
            <label>Select Role</label>
            <select name="role" value={formData.role} onChange={handleChange}>
              <option value="">Select role</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button type="submit" className="register-btn">
            Register
          </button>

          <p className="login-link">
            Already have an account?
            <span onClick={() => navigate("/loginpage")}> Login</span>
          </p>
        </form>
      </div>

      {showModal && (
        <ConformationModal
          title="Confirm Registration"
          disc="Are you sure you want to register with this information?"
          confirmBtnText="Register"
          onConfirm={confirmRegistration}
          onClose={() => setShowModal(false)}
        />
      )}

      <ToastContainer />
    </div>
  );
}
