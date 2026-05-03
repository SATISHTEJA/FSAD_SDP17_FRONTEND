import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import logo from "../assets/loginbg.png";
import "../Styles/Loginstyling.css";

const Forgetpass = () => {

  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);


  // SEND OTP
  const handleSendOtp = async () => {

    if (!email) {
      alert("Enter email");
      return;
    }

    try {

      setLoading(true);

      const res = await fetch(
        `https://fsad-sdp17-backend-2.onrender.com/emailotp/send?email=${encodeURIComponent(email)}`,
        {
          method: "POST"
        }
      );

      const msg = await res.text();

      if (!res.ok) {
        alert(msg);
        return;
      }

      alert("OTP sent");
      setStep(2);

    } catch (e) {
      console.error(e);
      alert("Failed sending OTP");
    }
    finally {
      setLoading(false);
    }

  };

  const handleVerifyOtp = async () => {

    if (!otp) {
      alert("Enter OTP");
      return;
    }

    try {

      setLoading(true);

      const res = await fetch(
        `https://fsad-sdp17-backend-2.onrender.com/emailotp/verify?email=${encodeURIComponent(email)}&otp=${otp}`,
        {
          method: "POST"
        }
      );

      const msg = await res.text();

      if (
        msg.toLowerCase().includes("verified")
        ||
        msg.toLowerCase().includes("success")
      ) {
        alert("OTP verified");
        setStep(3);
      }
      else {
        alert(msg);
      }

    } catch (e) {
      console.error(e);
      alert("OTP verification failed");
    }
    finally {
      setLoading(false);
    }

  };

  const handleResetPassword = async () => {

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {

      setLoading(true);

      const res = await fetch(
        "https://fsad-sdp17-backend-2.onrender.com/api/auth/forgot-password/reset",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: email,
            newPassword: newPassword
          })
        }
      );

      const msg = await res.text();

      if (!res.ok) {
        alert(msg);
        return;
      }

      alert("Password updated successfully");
      navigate("/login");

    } catch (e) {
      console.error(e);
      alert("Password reset failed");
    }
    finally {
      setLoading(false);
    }

  };


  return (

    <div className="login-bg"
      style={{ backgroundImage: `url(${logo})` }}>
      <div className="login-card">

        <h2>Forgot Password</h2>


        {/* STEP1 */}
        {step === 1 && (
          <>
            <input
              type="email"
              placeholder="Enter Registered Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button
              className="login-btn"
              onClick={handleSendOtp}
              disabled={loading}
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </>
        )}



        {/* STEP2 */}
        {step === 2 && (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            <div className="link-row">
              <button
                className="login-btn"
                onClick={() => setStep(1)}
              >
                Back
              </button>

              <button
                className="login-btn"
                onClick={handleVerifyOtp}
                disabled={loading}
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
            </div>
          </>
        )}



        {/* STEP3 */}
        {step === 3 && (
          <>
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <div className="link-row">
              <button
                className="login-btn"
                onClick={() => setStep(2)}
              >
                Back
              </button>

              <button
                className="login-btn"
                onClick={handleResetPassword}
                disabled={loading}
              >
                {loading ? "Updating..." : "Update Password"}
              </button>

            </div>
          </>
        )}
        <div className="link-row">
          <Link to="/register" className="usealignleft">
            Don't have an account? Register
          </Link>

          <Link to="/" className="usealignright">
            Back to Home
          </Link>
        </div>

      </div>
    </div>

  )

}

export default Forgetpass;