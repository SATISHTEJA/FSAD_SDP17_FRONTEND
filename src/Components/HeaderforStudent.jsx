import React, { useEffect, useState } from "react";
import { LogOut, GraduationCap } from "lucide-react";
import "../Styles/Dashboard.css";
import { useNavigate } from "react-router-dom";

const HeaderforStudent = () => {
  const navigate = useNavigate();

  const storedStudent =
    JSON.parse(localStorage.getItem("studentProfile")) || {};

  const [student, setStudent] = useState(storedStudent);
  const [imgLoading, setImgLoading] = useState(true);

  useEffect(() => {
  if (!storedStudent?.id) return;

  const cached = localStorage.getItem("studentProfileFull");

  if (cached) {
    const parsed = JSON.parse(cached);
    setStudent(parsed);
    setImgLoading(false);
  }

  fetch(`http://localhost:1305/api/students/${storedStudent.id}`)
    .then((res) => res.json())
    .then((data) => {
      setStudent(data);
      localStorage.setItem("studentProfileFull", JSON.stringify(data));
      setImgLoading(false);
    })
    .catch((err) => console.error(err));
}, [storedStudent?.id]);

  const handleLogout = () => {
    localStorage.removeItem("studentProfile");
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <header className="dash-header">
      <div className="dash-left">
        <div className="logo-box">
          <GraduationCap size={18} color="Blue" />
        </div>
        <h2 style={{ color: "black" , cursor: "pointer"}} onClick={() => navigate("/student-dashboard")}>InternHub Student</h2>
      </div>

      <div className="dash-right">
        <div style={{ textAlign: "right" }}>
          <a href="/student-profile" className="headerloname">
            <strong style={{ color: "black" }}>
              {student.name || "Student"}
            </strong>
          </a>

          <div
            onClick={() => navigate("/student-profile")}
            className="headerloname"
            style={{ fontSize: "12px", color: "#6b7280" }}
          >
            {student.email || "student@gmail.com"}
          </div>
        </div>

        <div
          onClick={() => navigate("/student-profile")}
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
            key={student.image}
            loading="eager"
            src={
              student?.image
                ? student.image.startsWith("data:")
                  ? student.image
                  : `http://localhost:1305/api/students/image/${student.image}`
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

export default HeaderforStudent;