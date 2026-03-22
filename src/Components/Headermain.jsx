import React from "react";
import "../Styles/Cardh.css";
import logo from "../assets/header1.png";
import { Link, useNavigate } from "react-router-dom";

const HeaderMain = () => {
  const navigate = useNavigate();

  return (
    <header className="header">
      
      <div className="left">
        <img
          src={logo}
          alt="Remote Internship"
          className="logo"
          onClick={() => navigate("/")}
        />
      </div>

      <div className="right">
        <Link to="/login" className="login">
          Login
        </Link>

        <Link to="/register" className="register">
          Register
        </Link>
      </div>
    </header>
  );
};

export default HeaderMain;