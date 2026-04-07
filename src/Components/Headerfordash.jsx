import React, { useEffect, useState } from "react";
import { LogOut, GraduationCap } from "lucide-react";
import "../Styles/Dashboard.css";
import { useNavigate } from "react-router-dom";

const HeaderforDash = () => {
  const navigate = useNavigate();

  const storedAdmin =
    JSON.parse(localStorage.getItem("adminProfile")) || {};

  const [admin, setAdmin] = useState(storedAdmin);
  const [imgLoading, setImgLoading] = useState(true);

  useEffect(() => {
  if (!storedAdmin?.id) return;

  // ✅ CHECK CACHE FIRST
  const cached = localStorage.getItem("adminProfileFull");

  if (cached) {
    const parsed = JSON.parse(cached);
    setAdmin(parsed);
    setImgLoading(false);
  }
  fetch(`http://localhost:1305/api/employers/${storedAdmin.id}`)
    .then((res) => res.json())
    .then((data) => {
      setAdmin(data);
      localStorage.setItem("adminProfileFull", JSON.stringify(data));
      setImgLoading(false);
    })
    .catch((err) => console.error(err));
}, [storedAdmin?.id]);

  const handleLogout = () => {
    localStorage.removeItem("adminProfile");
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <header className="dash-header">
      <div className="dash-left">
        <div className="logo-box">
          <GraduationCap size={18} color="Blue" />
        </div>
        <h2 style={{ color: "black" , cursor: "pointer"}} onClick={() => navigate("/admin-dashboard")}>InternHub Student</h2>
      </div>

      <div className="dash-right">
        <div style={{ textAlign: "right" }}>
          <a href="/admin-profile" className="headerloname">
            <strong style={{ color: "black" }}>
              {admin.empname || "Admin"}
            </strong>
          </a>

          <div
            onClick={() => navigate("/admin-profile")}
            className="headerloname"
            style={{ fontSize: "12px", color: "#6b7280" }}
          >
            {admin.email || "admin@gmail.com"}
          </div>
        </div>

        {/* ✅ IMAGE FIX */}
        <div
          onClick={() => navigate("/admin-profile")}
          style={{ cursor: "pointer", position: "relative" }}
        >
          {imgLoading && (
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background: "#e5e7eb",
              }}
            />
          )}

          <img
            key={admin.image}
            loading="eager"
            src={
              admin?.image
                ? admin.image.startsWith("data:")
                  ? admin.image // ✅ base64 directly
                  : `http://localhost:1305/api/employers/image/${admin.image}`
                : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            alt="profile"
            onLoad={() => setImgLoading(false)}
            onError={(e) => {
              e.target.src =
                "https://cdn-icons-png.flaticon.com/512/149/149071.png";
              setImgLoading(false);
            }}
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              objectFit: "cover",
              display: imgLoading ? "none" : "block",
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

export default HeaderforDash;