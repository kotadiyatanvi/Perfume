import React, { useState } from "react";
import "./Login.css";
import tempImg from "../assets/image/per5.jpg";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ConformationModal from "../compoantet/ConformationModal";

const Login = () => {
  const Navigate = useNavigate();
  const [mobile, setMobile] = useState("");
  const [role, setRole] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [enteredOtp, setEnteredOtp] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [roleError, setRoleError] = useState("");
  const [otpError, setOtpError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [otpGenerated, setOtpGenerated] = useState(false);

  // ✅ Loader state
  const [isLoading, setIsLoading] = useState(false);

  const handleMobileChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 10) {
      setMobile(value);
      setMobileError("");
    }
  };

  const handleGenerateOtp = async () => {
    if (!mobile) { setMobileError("*Mobile number is required"); return; }
    if (mobile.length !== 10) { setMobileError("*Please enter valid 10-digit mobile"); return; }
    if (!role) { setRoleError("*Role is required"); return; }

    try {
      const res = await fetch(`https://69833dc79c3efeb892a4fb78.mockapi.io/Registration?mobilenumber=${mobile}&role=${role}`);
      const data = await res.json();
      if (!data || data.length === 0) { toast.error("No user found. Please register first ❌"); return; }
      const user = data[0];
      const randomOtp = Math.floor(1000 + Math.random() * 9000).toString();
      setGeneratedOtp(randomOtp);
      setOtpGenerated(true);
      alert("Your OTP: " + randomOtp);
      setEnteredOtp(randomOtp);
      localStorage.setItem("loginData", JSON.stringify({
        id: user.id,
        name: user.fullname,
        mobilenumber: user.mobilenumber,
        role: user.role,
        otp: randomOtp,
      }));
      toast.success("OTP sent successfully 📲");
    } catch (err) { toast.error("Failed to fetch user ❌"); }
  };

  const handleSubmit = () => {
    if (!enteredOtp) { setOtpError("*OTP is required"); return; }
    if (enteredOtp !== generatedOtp) { setOtpError("*Invalid OTP"); return; }
    setShowModal(true);
  };

  const confirmLogin = () => {
    setShowModal(false);
    setIsLoading(true); // ✅ લોડર શરૂ કરો

    // ✅ 2 સેકન્ડ પછી હોમપેજ પર મોકલો
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Login Successfully 🎉");
      Navigate("/");
    }, 2000);
  };

  return (
    <div className="login-page">
      {/* ✅ Loader Overlay */}
      {isLoading && (
        <div className="loader-overlay">
          <div className="custom-loader"></div>
          <p>Verifying Credentials...</p>
        </div>
      )}

      <div className="login-left"><img src={tempImg} alt="login" /></div>
      <div className="login-right">
        <form className="login-form" onSubmit={(e) => e.preventDefault()}>
          <h2>Hello, Again 👋</h2>
          <div className="form-group">
            <input type="text" placeholder="Enter mobile number" value={mobile} onChange={handleMobileChange} maxLength={10} disabled={otpGenerated} />
            {mobileError && <p className="error">{mobileError}</p>}
          </div>
          <div className="form-group">
            <select value={role} onChange={(e) => setRole(e.target.value)} disabled={otpGenerated}>
              <option value="">Select role</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            {roleError && <p className="error">{roleError}</p>}
          </div>
          <button type="button" className="login-btn" onClick={handleGenerateOtp}>Generate OTP</button>
          <div className="form-group">
            <input type="text" placeholder="Enter OTP" maxLength={4} value={enteredOtp} onChange={(e) => setEnteredOtp(e.target.value)} />
            {otpError && <p className="error">{otpError}</p>}
          </div>
          <button type="button" className="login-btn" onClick={handleSubmit}>Login</button>
          <p className="register-link">Are you new here? <span onClick={() => Navigate("/registerpage")}> Register</span></p>
        </form>
      </div>
      {showModal && <ConformationModal title="Confirm Login" disc="Are you sure?" onConfirm={confirmLogin} onClose={() => setShowModal(false)} />}
      <ToastContainer />
    </div>
  );
};
export default Login;