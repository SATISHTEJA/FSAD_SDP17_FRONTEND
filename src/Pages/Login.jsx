import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/loginbg.png";
import "../Styles/Loginstyling.css";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [role, setRole] = useState(location.state?.role || "student");

  const handleLogin = () => {
    if (role === "student") {
      navigate("/student-dashboard");
    } else {
      navigate("/admin-dashboard");
    }
  };

  return (
    <div
      className="login-bg"
      style={{ backgroundImage: `url(${logo})` }}
    >
      <div className="login-card">

        <div className="role-switch">
          <button
            className={role === "student" ? "active" : ""}
            onClick={() => setRole("student")}
          >
            Student
          </button>

          <button
            className={role === "admin" ? "active" : ""}
            onClick={() => setRole("admin")}
          >
            Admin
          </button>
        </div>

        <h2>Login as {role === "student" ? "Student" : "Admin"}</h2>

        <input type="email" placeholder="Email address" />
        <input type="password" placeholder="Password" />

        <button className="login-btn" onClick={handleLogin}>
          LOGIN
        </button>

        <br />
        <a href="/Forgetpass" className="forgot">Forgot Password?</a>

        <div className="link-row">
          <a href="/register" className="usealignleft">Don't have an account? Register</a>
          <a href="/" className="usealignright">Back to Home</a>
        </div>

      </div>
    </div>
  );
};

export default Login;