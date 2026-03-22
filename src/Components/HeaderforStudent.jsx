import React from "react";
import { LogOut, GraduationCap } from "lucide-react";
import "../Styles/Dashboard.css";

const HeaderforStudent = () => {
  const student =
    JSON.parse(localStorage.getItem("studentProfile")) || {};

  const handleLogout = () => {
    localStorage.removeItem("studentProfile");
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <header className="dash-header">
      <div className="dash-left">
        <div className="logo-box">
          <GraduationCap size={18} color="white" />
        </div>
        <h2 style={{ color: "black" }}>InternHub Student</h2>
      </div>

      <div className="dash-right">
        <div style={{ textAlign: "right" }}>
          <strong style={{ color: "black" }}>{student.name || "Student"}</strong>
          <div style={{ fontSize: "12px", color: "#6b7280" }}>
            {student.email || "student@gmail.com"}
          </div>

        </div>
        <div>
          <img
            src={
              student.image ||
              "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            alt="profile"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              objectFit: "cover"
            }}
          />
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          <LogOut size={18} />
        </button>
      </div>
    </header>
  );
};

export default HeaderforStudent;