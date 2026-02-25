import React, { useEffect, useState } from "react";
import "./EditProfileModal.css";

export default function EditProfileModal({ onClose, userId }) {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const loginData = JSON.parse(localStorage.getItem("loginData")) || {};

  // ✅ INITIAL STATE
  const [formData, setFormData] = useState({
    name: loginData?.name || "",
    mobileNumber: loginData?.mobilenumber || "",
    role: loginData?.role || "",
    otp: loginData?.otp || "",
  });

  const cleanValue = (value) =>
    typeof value === "string" && value.includes("Invalid faker method")
      ? ""
      : value || "";

  // 🔹 FETCH USER DATA
  useEffect(() => {
    if (!userId) return;

    const fetchUser = async () => {
      try {
        const res = await fetch(
          `https://69833dc79c3efeb892a4fb78.mockapi.io/Registration/${userId}`
        );

        if (!res.ok) return;

        const data = await res.json();

        setFormData({
          // ✅ FIX IS HERE 👇
          name: cleanValue(data?.fullname || loginData?.name),
          mobileNumber: cleanValue(
            data?.mobilenumber || loginData?.mobilenumber
          ),
          role: data?.role || loginData?.role || "",
          otp: cleanValue(data?.otp || loginData?.otp),
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
  }, [userId]);

  // 🔹 INPUT CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "mobileNumber" && !/^\d*$/.test(value)) return;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 🔹 SAVE UPDATED PROFILE
  const handleSave = async () => {
    if (!formData.name || !formData.mobileNumber) {
      setError("Name and mobile number are required");
      return;
    }

    try {
      setSaving(true);
      setError("");

      const res = await fetch(
        `https://69833dc79c3efeb892a4fb78.mockapi.io/Registration/${userId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fullname: formData.name,          // ✅ API KEY MATCH
            mobilenumber: formData.mobileNumber,
            role: formData.role,
            otp: formData.otp,
          }),
        }
      );

      if (!res.ok) throw new Error("Save failed");

      // 🔹 UPDATE LOCAL STORAGE
      localStorage.setItem(
        "loginData",
        JSON.stringify({
          ...loginData,
          name: formData.name,
          mobilenumber: formData.mobileNumber,
          role: formData.role,
          otp: formData.otp,
        })
      );

      onClose();
    } catch (err) {
      setError("Failed to save profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box modern">
        <div className="modal-header">
          <h2>Edit Profile</h2>
          <span className="close-btn" onClick={onClose}>✖</span>
        </div>

        {error && <p className="error-text">{error}</p>}

        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Mobile Number</label>
          <input
            type="tel"
            name="mobileNumber"
            maxLength="10"
            value={formData.mobileNumber}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Role</label>
          <input type="text" value={formData.role} disabled />
        </div>

        <div className="form-group">
          <label>OTP</label>
          <input type="text" value={formData.otp} disabled />
        </div>

        <div className="modal-actions">
          <button className="btn-outline" onClick={onClose} disabled={saving}>
            Cancel
          </button>
          <button className="btn-primary" onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
