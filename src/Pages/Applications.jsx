import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Headerfordash from "../Components/Headerfordash";
import "../Styles/Dashboard.css";
import {
  LayoutDashboard,
  FileText,
  Users,
  TrendingUp,
  ClipboardCheck,
  User,
} from "lucide-react";

const Applications = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const stored =
      JSON.parse(localStorage.getItem("applications")) || [];
    setApplications(stored);
  }, []);

  const updateStatus = (id, newStatus) => {
    const updated = applications.map((app) =>
      app.id === id ? { ...app, status: newStatus } : app
    );

    setApplications(updated);
    localStorage.setItem("applications", JSON.stringify(updated));
  };

  return (
    <>
      <Headerfordash />

      <div className="admin-layout" style={{ paddingTop: "70px" }}>
        <aside className="admin-sidebar">
          <button onClick={() => navigate("/admin-dashboard")}>
            <LayoutDashboard size={18} />
            Dashboard
          </button>

          <button onClick={() => navigate("/post-internship")}>
            <FileText size={18} />
            Post Internship
          </button>

          <button className="active">
            <Users size={18} />
            Applications
          </button>

          <button onClick={() => navigate("/track-progress")}>
            <TrendingUp size={18} />
            Track Progress
          </button>

          <button onClick={() => navigate("/evaluations")}>
            <ClipboardCheck size={18} />
            Evaluations
          </button>

          <button onClick={() => navigate("/admin-profile")}>
            <User size={18} />
            Profile
          </button>
        </aside>

        <main className="admin-main">
          <div className="page-header">
            <h1>Student Applications</h1>
            <p>Review internship applications.</p>
          </div>

          {applications.length === 0 ? (
            <p>No applications yet.</p>
          ) : (
            applications.map((app) => (
              <div key={app.id} className="application-card">
                <div>
                  <h3>{app.internshipTitle}</h3>
                  <p><strong>Name:</strong> {app.name}</p>
                  <p><strong>Email:</strong> {app.email}</p>
                  <p><strong>University:</strong> {app.university}</p>
                  <p><strong>GPA:</strong> {app.gpa}</p>
                  <p><strong>Status:</strong> {app.status}</p>
                  <p><strong>Resume:</strong></p>
                </div>

                <div className="app-right">

                  {(!app.status || app.status === "Pending") && (
                    <>
                      <button
                        className="quick-action primary"
                        onClick={() => updateStatus(app.id, "Approved")}
                      >
                        Approve
                      </button>

                      <button
                        className="quick-action secondary"
                        onClick={() => updateStatus(app.id, "Rejected")}
                      >
                        Reject
                      </button>
                    </>
                  )}

                  {app.status === "Approved" && (
                    <div
                      style={{
                        background: "#d4edda",
                        color: "#155724",
                        padding: "8px 12px",
                        borderRadius: "6px",
                        fontWeight: "bold",
                      }}
                    >
                      ✅ Approved
                    </div>
                  )}

                  {app.status === "Rejected" && (
                    <div
                      style={{
                        background: "#f8d7da",
                        color: "#721c24",
                        padding: "8px 12px",
                        borderRadius: "6px",
                        fontWeight: "bold",
                      }}
                    >
                      ❌ Rejected
                    </div>
                  )}

                </div>
              </div>
            ))
          )}
        </main>
      </div>
    </>
  );
};

export default Applications;