import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderforStudent from "../Components/HeaderforStudent";
import Loader from "../Components/Loader";
import "../Styles/Dashboard.css";
import {
  LayoutDashboard,
  Search,
  FileText,
  ClipboardList,
  MessageSquare,
  User,
  FileCheck,
  Clock,
  CheckCircle,
  XCircle,
  MapPin,
  Calendar,
} from "lucide-react";

const MyApplications = () => {
  const navigate = useNavigate();

  const student =
    JSON.parse(localStorage.getItem("studentProfile")) || {};

  const [applications, setApplications] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!student.id) {
      setLoading(false);
      return;
    }

    setLoading(true);

    fetch(`https://fsad-sdp17-backend-2.onrender.com/api/applications/student/${student.id}`)
      .then((res) => res.json())
      .then((data) => {
        setApplications(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [student.id]);

  const total = applications.length;
  const underReview = applications.filter(
    (app) =>
      app.status?.toLowerCase() === "under review" ||
      app.status?.toLowerCase() === "pending"
  ).length;
  const approved = applications.filter(
    (app) => app.status?.toLowerCase() === "approved"
  ).length;
  const rejected = applications.filter(
    (app) => app.status?.toLowerCase() === "rejected"
  ).length;
  const handleWithdraw = async (id) => {
    if (!window.confirm("Are you sure you want to withdraw this application?"))
      return;

    try {
      await fetch(`https://fsad-sdp17-backend-2.onrender.com/api/applications/${id}`, {
        method: "DELETE",
      });
      setApplications((prev) => prev.filter((app) => app.id !== id));
      if (selectedApp?.id === id) setSelectedApp(null);

    } catch (err) {
      console.error(err);
      alert("Failed to withdraw application");
    }
  };


  return (
    <>
      <div className="admin-layout" style={{ paddingTop: "70px" }}>
        <aside className="admin-sidebar">
          <button onClick={() => navigate("/student-dashboard")}>
            <LayoutDashboard size={18} />
            Dashboard
          </button>

          <button onClick={() => navigate("/browse-internships")}>
            <Search size={18} />
            Browse Internships
          </button>

          <button className="active">
            <FileText size={18} />
            My Applications
          </button>

          <button onClick={() => navigate("/mytasks")}>
            <ClipboardList size={18} />
            My Tasks
          </button>

          <button onClick={() => navigate("/feedback")}>
            <MessageSquare size={18} />
            Feedback
          </button>

          <button onClick={() => navigate("/student-profile")}>
            <User size={18} />
            Profile
          </button>
        </aside>

        <main className="admin-main">
          <div className="page-header">
            <h1>My Applications</h1>
            <p>Track the status of your internship applications.</p>
          </div>

          {loading ? (
            <Loader />
          ) : (
            <>
              <section className="stats-grid">
                <div className="stat-card">
                  <div className="stat-left">
                    <p>Total Applications</p>
                    <h3>{total}</h3>
                  </div>
                  <FileCheck className="stat-icon blue" size={32} />
                </div>

                <div className="stat-card">
                  <div className="stat-left">
                    <p>Under Review</p>
                    <h3>{underReview}</h3>
                  </div>
                  <Clock className="stat-icon orange" size={32} />
                </div>

                <div className="stat-card">
                  <div className="stat-left">
                    <p>Approved</p>
                    <h3>{approved}</h3>
                  </div>
                  <CheckCircle className="stat-icon green" size={32} />
                </div>

                <div className="stat-card">
                  <div className="stat-left">
                    <p>Rejected</p>
                    <h3>{rejected}</h3>
                  </div>
                  <XCircle className="stat-icon purple" size={32} />
                </div>
              </section>

              {applications.length === 0 ? (
                <div className="dashboard-card">
                  <p>You haven't applied to any internships yet.</p>
                </div>
              ) : (
                applications.map((app) => (
                  <div key={app.id} className="application-card">

                    <div>
                      <h3>{app.internshipTitle || "Internship"}</h3>
                      <p style={{ color: "#6b7280" }}>
                        {app.companyName || "Company"}
                      </p>

                      <div className="progress-meta">
                        <div>
                          <MapPin size={16} />
                          {app.location || "Remote"}
                        </div>

                        <div>
                          <Calendar size={16} />
                          Applied: {app.appliedDate || "N/A"}
                        </div>
                      </div>

                      {app.status?.toLowerCase() === "approved" && (
                        <div className="dashboard-card" style={{ marginTop: "15px", background: "#ecfdf5", border: "1px solid #bbf7d0" }}>
                          🎉 Congratulations! Your application has been approved.
                        </div>
                      )}

                      {(app.status?.toLowerCase() === "under review" ||
                        app.status?.toLowerCase() === "pending") && (
                          <div className="dashboard-card" style={{ marginTop: "15px", background: "#fef9c3", border: "1px solid #fde68a" }}>
                            ⏳ Your application is currently under review.
                          </div>
                        )}

                      {app.status?.toLowerCase() === "rejected" && (
                        <div className="dashboard-card" style={{ marginTop: "15px", background: "#fee2e2", border: "1px solid #fecaca" }}>
                          ❌ Unfortunately, your application was rejected.
                        </div>
                      )}
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "flex-end" }}>
                      <span className={`status-badge ${app.status?.toLowerCase()}`}>
                        {app.status}
                      </span>

                      <button
                        className="view-button"
                        onClick={() => setSelectedApp(app)}
                      >
                        View
                      </button>

                      {(app.status?.toLowerCase() === "under review" ||
                        app.status?.toLowerCase() === "pending") && (
                          <button
                            className="delete-btn"
                            onClick={() => handleWithdraw(app.id)}
                          >
                            Withdraw
                          </button>
                        )}
                    </div>
                  </div>
                ))
              )}
            </>
          )}
        </main>
      </div>

      {selectedApp && (
        <div className="modal-overlay">
          <div className="modal-container">
            <h2>{selectedApp.internshipTitle}</h2>

            <p><strong>Company:</strong> {selectedApp.companyName}</p>
            <p><strong>Location:</strong> {selectedApp.location}</p>
            <p><strong>Description:</strong> {selectedApp.description}</p>
            <p><strong>Role Applied:</strong> {selectedApp.role}</p>
            <p><strong>University:</strong> {selectedApp.university}</p>
            <p><strong>Status:</strong> {selectedApp.status}</p>

            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setSelectedApp(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MyApplications;